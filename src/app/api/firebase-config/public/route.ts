import { NextResponse } from "next/server";
import {
  getActiveFirebaseConfig,
  getDefaultFirebaseConfig,
} from "../../../../../lib/firestore-config";

export async function GET() {
  try {
    // Firestore에서 현재 활성 설정 가져오기
    let config = await getActiveFirebaseConfig();

    // Firestore에 설정이 없으면 환경 변수에서 기본값 사용
    if (!config) {
      config = getDefaultFirebaseConfig();
    }

    // 민감한 정보는 제외하고 필요한 설정만 반환
    const publicConfig = {
      apiKey: config.apiKey,
      authDomain: config.authDomain,
      projectId: config.projectId,
      storageBucket: config.storageBucket,
      messagingSenderId: config.messagingSenderId,
      appId: config.appId,
      measurementId: config.measurementId,
    };

    return NextResponse.json(publicConfig);
  } catch (error) {
    console.error("Public Firebase config GET error:", error);

    // 에러 발생 시 환경 변수에서 기본값 반환
    const fallbackConfig = getDefaultFirebaseConfig();
    const publicConfig = {
      apiKey: fallbackConfig.apiKey,
      authDomain: fallbackConfig.authDomain,
      projectId: fallbackConfig.projectId,
      storageBucket: fallbackConfig.storageBucket,
      messagingSenderId: fallbackConfig.messagingSenderId,
      appId: fallbackConfig.appId,
      measurementId: fallbackConfig.measurementId,
    };

    return NextResponse.json(publicConfig);
  }
}
