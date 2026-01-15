import { Metadata } from "next";
import PortalHeader from "../components/PortalHeader";
import PortalFooter from "../components/PortalFooter";
import MouseFollower from "../components/MouseFollower";
import PortalStoreLocator from "../components/PortalStoreLocator";

export const metadata: Metadata = {
  title: "Store Locator - QOLA",
  description: "Find a QOLA store near you.",
};

export default function LocatorPage() {
  return (
    <div className="relative bg-white min-h-screen text-stone-900 font-sans">
      <MouseFollower />
      <PortalHeader />
      <main className="pt-24 pb-0 w-full flex flex-col items-center">
        <div className="w-full min-h-[600px]">
           <PortalStoreLocator />
        </div>
      </main>
      <PortalFooter />
    </div>
  );
}
