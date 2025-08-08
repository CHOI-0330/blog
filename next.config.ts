import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ["ja", "en", "ko"],
    defaultLocale: "ja",
  },
};

export default nextConfig;
