"use client";

import PortalHero from "./components/PortalHero";
import PortalVideo from "./components/PortalVideo";
import PortalProductFeatures from "./components/PortalProductFeatures";
import PortalHeader from "./components/PortalHeader";
import PortalDidYouKnow from "./components/PortalDidYouKnow";
import PortalUsageScenarios from "./components/PortalUsageScenarios";
import PortalAboutUs from "./components/PortalAboutUs";
import PortalFlavors from "./components/PortalFlavors";
import PortalCustomerReviews from "./components/PortalCustomerReviews";
import PortalFAQ from "./components/PortalFAQ";
import PortalCommunity from "./components/PortalCommunity";
import PortalPouchFeatures from "./components/PortalPouchFeatures";
import MouseFollower from "./components/MouseFollower";
import PortalPageTransition from "./components/PortalPageTransition";
import PortalUserGuide from "./components/PortalUserGuide";
import PortalFooter from "./components/PortalFooter";

export default function ClientPortal({ locale }: { locale: string }) {
  return (
    <div className="relative bg-stone-900 min-h-screen">
      {/* Mouse Follower - Global in this page */}
      <MouseFollower />
      {/* Page Transition Overlay */}
      <PortalPageTransition />

      {/* Fixed Header - Always visible */}
      <PortalHeader />

      {/* Sticky Hero Section - Auto z-index/0 to allow children z-indexes (Header z-50) to pop out */}
      <div className="sticky top-0 h-screen w-full bg-stone-900">
        <PortalHero />
      </div>

      {/* Video Section - Drawer Effect */}
      {/* z-30 ensures it covers Hero Content (z-20) and Warning (z-30), but stays under Menu Overlay (z-40) and Header (z-50) */}
      <div className="relative z-30">
        <PortalVideo />
        <PortalProductFeatures />
        <PortalDidYouKnow />
        <PortalAboutUs />
        <PortalUsageScenarios />
        <PortalFlavors />
        <PortalCustomerReviews />
        <PortalFAQ />
        <PortalCommunity />
        <PortalPouchFeatures />
        <PortalUserGuide />
        <PortalFooter />
      </div>
    </div>
  );
}
