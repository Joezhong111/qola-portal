import { use } from "react";
import { Metadata } from "next";
import PortalHeader from "../components/PortalHeader";
import PortalFooter from "../components/PortalFooter";
import MouseFollower from "../components/MouseFollower";
import ContactLink from "../components/ContactLink";

export const metadata: Metadata = {
  title: "Contact Us - QOLA",
  description: "Get in touch with our team via email or phone.",
};

export function generateStaticParams() {
  return [
    { locale: "en-my" },
    { locale: "zh-my" },
    { locale: "en-ae" },
  ];
}

interface ContactItem {
  region: string;
  href: string;
  text: string;
}

function ContactCard({
  icon,
  title,
  subtitle,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  items: ContactItem[];
}) {
  return (
    <div className="bg-[#FAF7F2] text-stone-900 rounded-3xl p-6 md:p-10 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl group">
      <div className="w-20 h-20 bg-[#F5E6D3] rounded-full flex items-center justify-center mb-6 text-[#E6B375] transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-500 mb-8 font-medium">{subtitle}</p>

      <div className="space-y-6 mb-10 w-full">
        {items.map((item) => (
          <div
            key={item.region}
            className="bg-white/50 p-4 rounded-xl transition-colors hover:bg-white"
          >
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 text-left">
              {item.region}
            </span>
            <ContactLink href={item.href} text={item.text} />
          </div>
        ))}
      </div>
    </div>
  );
}

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export default function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  return (
    <div className="relative bg-white min-h-screen text-stone-900 font-sans">
      <MouseFollower />
      <PortalHeader />
      {/* Main Content */}
      <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4 text-center mt-10">
          Contact Us
        </h1>
        <div className="mb-16 flex items-center gap-1 text-sm md:text-base font-medium">
          <span className="text-[#74613f]">
            If you have questions, check out our
          </span>
          <a
            href={`/${locale}#faq`}
            className="text-[#E6B375] hover:text-[#d4a060] transition-colors flex items-center gap-1"
          >
            Frequently asked questions <span aria-hidden="true">&rarr;</span>
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">
          <ContactCard
            icon={<MailIcon />}
            title="By mail"
            subtitle="Get in touch via email"
            items={[
              {
                region: "UAE",
                href: "mailto:johnson25@Vitanicvision.com",
                text: "johnson25@Vitanicvision.com",
              },
              {
                region: "Iraq",
                href: "mailto:qola.iraqofficial@gmail.com",
                text: "qola.iraqofficial@gmail.com",
              },
            ]}
          />

          <ContactCard
            icon={<PhoneIcon />}
            title="By phone"
            subtitle="Speak to our team directly"
            items={[
              {
                region: "UAE",
                href: "tel:+971505330682",
                text: "+971 505330682",
              },
              {
                region: "Iraq",
                href: "tel:009647511004511",
                text: "009647511004511",
              },
            ]}
          />
        </div>
      </main>

      <PortalFooter />
    </div>
  );
}
