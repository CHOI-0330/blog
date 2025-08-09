import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "파일이 없습니다." }, { status: 400 });
    }

    // 파일 타입 검증
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "이미지 파일만 업로드 가능합니다." },
        { status: 400 }
      );
    }

    // 파일 크기 검증 (5MB 제한)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "파일 크기는 5MB 이하여야 합니다." },
        { status: 400 }
      );
    }

    // 파일명 생성 (중복 방지)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 실제 프로덕션에서는 클라우드 스토리지(S3, Cloudinary 등) 사용 권장
    const fileName = `${Date.now()}-${file.name}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadDir, fileName);

    // 업로드 디렉토리 생성 (없는 경우)
    try {
      await writeFile(filePath, buffer);
    } catch (error) {
      // 디렉토리가 없는 경우 생성
      const fs = require("fs");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      await writeFile(filePath, buffer);
    }

    return NextResponse.json({
      success: true,
      url: `/uploads/${fileName}`,
      fileName: fileName,
    });
  } catch (error) {
    console.error("이미지 업로드 오류:", error);
    return NextResponse.json(
      { error: "이미지 업로드 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
