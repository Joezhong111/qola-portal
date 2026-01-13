"use client";

import React, { useRef } from "react";
import gsap from "gsap";

export default function PortalPageTransition() {
  const containerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate strips:
      // - Start: Full width (scaleX: 1)
      // - End: No width (scaleX: 0)
      // - Transform Origin: Left (Simulates "shrinking to the left", revealing from right)
      // - Stagger: Random order for "uneven/jagged" effect
      
      const tl = gsap.timeline({
        onComplete: () => {
           if (containerRef.current) {
              gsap.set(containerRef.current, { display: "none" });
           }
        }
      });

      tl.to(".transition-strip", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.0,
        stagger: {
          from: "random",
          amount: 0.5,
        },
        ease: "power4.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      // Z-index 9999 ensures it covers everything. Removed pointer-events-none to block interaction during transition.
      className="fixed inset-0 z-[9999] flex flex-col w-full h-full"
      aria-hidden="true"
    >
      {/* Generate 10 horizontal strips */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div 
          key={i} 
          className="transition-strip flex-1 w-full bg-stone-900 origin-left will-change-transform"
          style={{ transform: "scaleX(1)" }} // Ensure initial state
        />
      ))}
    </div>
  );
}
