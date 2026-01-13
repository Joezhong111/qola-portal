"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 提取静态变量到组件外部，避免重复计算
const TEXT_CONTENT = "QOLA IS A POUCH UNLIKE ANY OTHER ";
const REPEATED_TEXT = Array(8).fill(TEXT_CONTENT).join("");

export default function PortalPouchFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const bar1Ref = useRef<HTMLDivElement>(null);
  const bar2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 确保滚动位置计算准确
    ScrollTrigger.refresh();
    const ctx = gsap.context(() => {
      // Line 1: Black text, scrolls LEFT when page scrolls DOWN (content moves up)
      // "页面向上滚动时" -> Page scrolls UP (usually means User scrolls DOWN).
      // Line 1 moves Left -> x goes negative.
      gsap.to(line1Ref.current, {
        xPercent: -50, // Move left
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom", // Start when top of component hits bottom of viewport
          end: "bottom top",   // End when bottom of component hits top of viewport
          scrub: 1,
        },
      });

      // Line 2: White text, scrolls RIGHT when page scrolls DOWN
      // Line 2 moves Right -> x goes positive
      // Initial position might need to be offset to left so it can scroll right? 
      // Or just start at 0 and scroll positive? If it starts at 0 and goes positive, we see empty space entering from left.
      // So we start at -50% and scroll to 0% (or positive).
      gsap.fromTo(line2Ref.current, 
        { xPercent: -50 }, 
        {
          xPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      // Bar Animations
      gsap.fromTo(bar1Ref.current, 
        { width: "0%" }, 
        {
          width: "100%",
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bar1Ref.current,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(bar2Ref.current, 
        { width: "0%" }, 
        {
          width: "60%",
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bar2Ref.current,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#191919] overflow-hidden flex flex-col pt-4 pb-96">
      
      {/* Scrolling Text Section */}
      <div className="flex flex-col w-full mb-5 md:mb-10">
        {/* Line 1: Black Text (on dark bg? Black text on #191919 is invisible. Wait.
           Prompt says: "First line black, second line white".
           Background is #191919 (Very Dark Grey). 
           Black text (#000000) on #191919 is essentially invisible or very low contrast. 
           Maybe the "Black" meant "Darker" or "Stroke"? 
           Looking at the user request: "第一行黑色 (Black), 第二行白色 (White)".
           Note: The provided image shows "QOLA" logo top left in low contrast.
           But usually "Black on Dark" is a style choice (shiny black on matte black).
           I will stick to strict request: text-black.
        */}
        <div className="w-full overflow-hidden whitespace-nowrap select-none pointer-events-none" aria-hidden="true">
          <div ref={line1Ref} className="text-[50px] md:text-[100px] font-bold text-black leading-none tracking-tighter uppercase will-change-transform">
            {REPEATED_TEXT}
          </div>
        </div>

        {/* Line 2: White Text */}
        <div className="w-full overflow-hidden whitespace-nowrap select-none pointer-events-none" aria-hidden="true">
          <div ref={line2Ref} className="text-[50px] md:text-[100px] font-bold text-white leading-none tracking-tighter uppercase will-change-transform">
            {REPEATED_TEXT}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-20 gap-10 md:gap-20">
        
        {/* Left Side: Text */}
        <div className="flex flex-col w-full max-w-3xl mt-10 md:mt-40 mb-12 md:mb-24">
          <h2 className="text-white text-2xl md:text-4xl font-bold leading-tight mb-4 whitespace-nowrap">
            a long, balanced release.
          </h2>
          <p className="text-white text-xs md:text-sm tracking-widest uppercase opacity-80 leading-relaxed font-medium">
            EACH QOLA POUCH CONTAINS NICOTINE,<br />
            DELIVERED SMOOTHLY FOR UP TO 60 MINUTES.
          </p>
        </div>

        {/* Right Side: Comparison Chart */}
        <div className="flex flex-col w-full max-w-3xl">
          
          {/* Item 1: QOLA */}
          <div className="mb-8">
            <div className="mb-2">
              <span className="text-white text-sm font-bold uppercase tracking-wider">QOLA POUCHES</span>
            </div>
            <div className="flex items-center gap-4">
              {/* Orange Bar */}
              <div className="flex-1 h-4 bg-transparent rounded-full overflow-hidden relative">
                 <div 
                   ref={bar1Ref}
                   className="absolute top-0 left-0 h-full bg-orange-500 rounded-full"
                   style={{ width: "0%" }}
                 ></div>
              </div>
              <span className="text-orange-500 text-2xl md:text-3xl font-bold uppercase tracking-wide whitespace-nowrap">UP TO 60 MINS</span>
            </div>
          </div>

          {/* Item 2: TYPICAL */}
          <div>
            <div className="mb-2">
              <span className="text-stone-500 text-xs font-bold uppercase tracking-wider">TYPICAL POUCHES</span>
            </div>
            <div className="flex items-center gap-4">
              {/* Grey Bar - shorter */}
              <div className="flex-1 h-4 bg-transparent rounded-full overflow-hidden relative">
                 {/* Image shows it about 50-60% width of the orange one */}
                 <div 
                   ref={bar2Ref}
                   className="absolute top-0 left-0 h-full bg-stone-600 rounded-full"
                   style={{ width: "0%" }}
                 ></div>
              </div>
              <div className="flex flex-col items-start whitespace-nowrap">
                <span className="text-stone-500 text-sm font-bold uppercase">IN JUST</span>
                <span className="text-stone-400 text-lg font-bold uppercase">30-45 MINS</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
