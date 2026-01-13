import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  //如果您将此应用部署在 example.github.io/my-repo 下，
  //则需要将 basePath 设置为 "/my-repo"
  //您可以在 GitHub Actions 中设置环境变量 NEXT_PUBLIC_BASE_PATH
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
