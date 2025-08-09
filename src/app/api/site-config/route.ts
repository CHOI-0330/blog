import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { siteConfigService } from "@/lib/firestore";

export async function GET() {
  try {
    const config = await siteConfigService.getSiteConfig();

    if (!config) {
      // 설정이 없으면 기본값 반환
      const defaultConfig = await siteConfigService.getDefaultSiteConfig();
      return NextResponse.json(defaultConfig);
    }

    return NextResponse.json(config);
  } catch (error) {
    console.error("사이트 설정 조회 오류:", error);
    // 오류 발생 시에도 기본값 반환
    const defaultConfig = await siteConfigService.getDefaultSiteConfig();
    return NextResponse.json(defaultConfig);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const config = await request.json();
    await siteConfigService.updateSiteConfig(config);

    return NextResponse.json({
      success: true,
      message: "사이트 설정이 성공적으로 업데이트되었습니다.",
    });
  } catch (error) {
    console.error("사이트 설정 업데이트 오류:", error);
    return NextResponse.json(
      { error: "사이트 설정 업데이트에 실패했습니다." },
      { status: 500 }
    );
  }
}
