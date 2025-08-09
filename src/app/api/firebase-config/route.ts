import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import {
  saveFirebaseConfig,
  getActiveFirebaseConfig,
  getDefaultFirebaseConfig,
  getFirebaseConfigHistory,
} from "../../../lib/firestore-config";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // URL에서 히스토리 요청인지 확인
    const { searchParams } = new URL(request.url);
    const isHistoryRequest = searchParams.get("history") === "true";

    if (isHistoryRequest) {
      // 설정 히스토리 요청
      try {
        const history = await getFirebaseConfigHistory();
        return NextResponse.json(history);
      } catch (historyError) {
        console.error("설정 히스토리 조회 실패:", historyError);
        return NextResponse.json(
          { error: "설정 히스토리를 가져올 수 없습니다." },
          { status: 500 }
        );
      }
    }

    // 기본: 현재 활성 설정 요청
    try {
      // Firestore에서 현재 활성 설정 가져오기
      let config = await getActiveFirebaseConfig();

      // Firestore에 설정이 없으면 환경 변수에서 기본값 사용
      if (!config) {
        config = getDefaultFirebaseConfig();
      }

      return NextResponse.json(config);
    } catch (configError) {
      console.error("Firebase 설정 조회 실패:", configError);
      // 환경 변수에서 기본값 반환
      const defaultConfig = getDefaultFirebaseConfig();
      return NextResponse.json(defaultConfig);
    }
  } catch (error) {
    console.error("Firebase config GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      apiKey,
      authDomain,
      projectId,
      storageBucket,
      messagingSenderId,
      appId,
      measurementId,
    } = body;

    // 필수 필드 검증
    if (
      !apiKey ||
      !authDomain ||
      !projectId ||
      !storageBucket ||
      !messagingSenderId ||
      !appId
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 설정 유효성 검사 (간단한 형식 검사)
    if (!apiKey.startsWith("AIzaSy")) {
      return NextResponse.json(
        { error: "Invalid API Key format" },
        { status: 400 }
      );
    }

    if (!authDomain.includes(".firebaseapp.com")) {
      return NextResponse.json(
        { error: "Invalid Auth Domain format" },
        { status: 400 }
      );
    }

    if (
      !storageBucket.includes(".appspot.com") &&
      !storageBucket.includes(".firebasestorage.app")
    ) {
      return NextResponse.json(
        { error: "Invalid Storage Bucket format" },
        { status: 400 }
      );
    }

    if (measurementId && !measurementId.startsWith("G-")) {
      return NextResponse.json(
        { error: "Invalid Measurement ID format" },
        { status: 400 }
      );
    }

    try {
      const result = await saveFirebaseConfig(
        {
          apiKey,
          authDomain,
          projectId,
          storageBucket,
          messagingSenderId,
          appId,
          measurementId: measurementId || "",
        },
        (session.user as any).id || (session.user as any).email || "unknown"
      );

      return NextResponse.json({
        success: true,
        message: "Firebase 설정이 성공적으로 Firestore에 저장되었습니다.",
        config: result.config,
      });
    } catch (saveError) {
      console.error("Firebase 설정 저장 실패:", saveError);
      return NextResponse.json(
        { error: "설정을 Firestore에 저장할 수 없습니다." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Firebase config POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
