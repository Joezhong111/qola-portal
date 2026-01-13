"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PremiumButton from "./PremiumButton";

// Register ScrollTrigger if not already done globally, but safe to call multiple times
gsap.registerPlugin(ScrollTrigger);

const communityImages = [
  "/images/home/58.webp",
  "/images/home/59.webp",
  "/images/home/60.webp",
  "/images/home/61.webp",
  "/images/home/62.webp",
];

export default function PortalCommunity() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const trigger = triggerRef.current;
    const scrollContainer = scrollContainerRef.current;

    if (!section || !trigger || !scrollContainer) return;

    // Metric getters to ensure freshness on resize/refresh
    const getMetrics = () => {
      const { scrollWidth, clientWidth } = scrollContainer;
      const sectionWidth = section.clientWidth;
      const xMovement = scrollWidth - sectionWidth;
      // Add extra scroll distance for empty space on sides
      const extraMargin = sectionWidth * 0.25; 
      const startX = extraMargin;
      const endX = -(xMovement + extraMargin);
      return { startX, endX };
    };

    const ctx = gsap.context(() => {
      // Number counter animation
      const counter = { value: 0 };
      gsap.to(counter, {
        value: 100,
        duration: 2.5,
        ease: "power3.out",
        onUpdate: () => {
          if (countRef.current) {
            countRef.current.textContent = Math.round(counter.value).toString();
          }
        },
        scrollTrigger: {
          trigger: trigger,
          start: "top 80%",
          once: true,
        },
      });

      // 2. Horizontal Scroll Animation
      // Using a timeline ensures initial position and destination are both 
      // managed by ScrollTrigger's refresh cycle.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: "+=200%", 
          pin: true,
          scrub: 1, 
          invalidateOnRefresh: true, 
        }
      });

      tl.fromTo(scrollContainer, 
        { 
          x: () => getMetrics().startX 
        }, 
        {
          x: () => getMetrics().endX,
          ease: "none",
          force3D: true, // GPU acceleration
        }
      );


    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={triggerRef} className="relative z-30 bg-[#F5F5F7] text-black">
       {/* Height Wrapper for Pinning */}
      <div 
        ref={sectionRef} 
        className="relative h-screen w-full flex flex-col justify-between overflow-hidden"
      >
        
        {/* Header */}
        <div className="flex justify-between items-start px-8 pt-24 md:px-12 md:pt-10 z-10 select-none pointer-events-none">
          {/* Top Left */}
          <div className="flex flex-col">
            <h1 
              ref={countRef}
              className="text-[60px] md:text-[120px] leading-[0.8] font-bold tracking-tighter"
            >
              0
            </h1>
            <span className="text-xs md:text-base ml-1 md:ml-2 mt-2 font-medium text-black/60">
              Our Social Media
            </span>
          </div>

          {/* Top Right */}
          <div className="text-right mt-4 md:mt-2">
            <h2 className="text-2xl md:text-5xl font-bold tracking-tight mb-1">
              Join our community.
            </h2>
            <p className="text-stone-400 text-xs md:text-lg font-light">
              follow our instagram & whatsapp group.
            </p>
          </div>
        </div>

        {/* Horizontal Scroll Area - Centered Vertically */}
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 overflow-visible">
          {/* 
            Container width needs to be enough to hold all images. 
            We'll use flex and nowrap.
            Centered vertically relative to screen (via absolute top-1/2 above).
          */}
          <div 
            ref={scrollContainerRef} 
            className="flex items-center gap-4 md:gap-6 px-[5vw] w-max will-change-transform"
          >
             {/* Render Images */}
             {communityImages.map((src, idx) => (
                <div 
                  key={idx} 
                  className="relative w-[60vw] md:w-[20vw] aspect-[3/4] flex-shrink-0"
                >
                  <div className="relative w-full h-full overflow-hidden bg-gray-200 hover:scale-95 transition-transform duration-500">
                     <Image
                      src={src}
                      alt={`Community image ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 60vw, 25vw"
                     />
                     
                     {/* Overlay Text - Matching the reference image style */}
                     <div className="absolute bottom-4 left-0 w-full text-center">
                       <span className="text-orange-400 text-xs md:text-sm font-semibold tracking-widest uppercase">
                         QOLA
                       </span>
                     </div>
                  </div>
                </div>
             ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end px-8 pb-8 md:px-12 md:pb-12 z-10 pointer-events-none">
           {/* Bottom Left Text */}
           <div className="max-w-[60%] md:max-w-md">
             <p className="text-xs md:text-base font-medium leading-relaxed">
               If you enjoy our content, remember to follow us on social media! We'll be sharing more interesting and insightful content regularly, so let's have fun together.
             </p>
           </div>

           {/* Bottom Right Button */}
           <div className="pointer-events-auto">
             <PremiumButton text="Our Team" className="bg-gray-200 hover:bg-gray-300 border-none" />
           </div>
        </div>

      </div>
    </div>
  );
}
