import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn, getAssetPath } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QOLA｜QOLA Mall",
  description: "QOLA",
  icons: {
    icon: { url: getAssetPath("/logo-100x100.webp"), type: "image/webp" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={cn(inter.className, "antialiased bg-background text-foreground min-h-screen")}>
        {children}
      </body>
    </html>
  );
}
