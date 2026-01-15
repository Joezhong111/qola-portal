import { ReactNode } from 'react';

// 使用 edge runtime 以兼容 Cloudflare Pages
export const runtime = 'edge';

// 允许所有 locale 参数动态处理
export const dynamicParams = true;

export default function LocaleLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
