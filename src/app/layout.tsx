import type { Metadata } from "next";
import "./globals.css";
import { cn, getAssetPath } from "@/lib/utils";
import { montserrat } from "./fonts/fonts";

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
    <html lang="zh-CN" className={montserrat.variable}>
      <body className={cn(montserrat.className, "antialiased bg-background text-foreground min-h-screen")}>
        {children}
      </body>
    </html>
  );
}
