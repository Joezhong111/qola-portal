import ClientPortal from "./[locale]/ClientPortal";

export default function Home() {
  // 首页默认使用 en-my 渲染，或者可以根据某些逻辑选择默认语言
  return <ClientPortal locale="en-my" />;
}
