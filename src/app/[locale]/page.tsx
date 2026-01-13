import { use } from "react";
import ClientPortal from "./ClientPortal";

// Define the static paths for export
export function generateStaticParams() {
  return [
    { locale: "en-my" },
    { locale: "zh-my" },
    { locale: "en-ae" },
  ];
}

export default function Page({ params }: { params: Promise<{ locale: string }> }) {
  // Await the params
  const { locale } = use(params);

  return <ClientPortal locale={locale} />;
}
