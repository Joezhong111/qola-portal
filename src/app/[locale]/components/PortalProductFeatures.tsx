"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PortalProductFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
        // Animation: Fade in elements when scrolling into view
        gsap.from(imageRef.current, {
            opacity: 0,
            x: -50,
            duration: 1,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%",
                end: "bottom bottom",
                toggleActions: "play none none reverse"
            }
        });

        gsap.from(textRef.current, {
            opacity: 0,
            x: 50,
            duration: 1,
            delay: 0.3,
             scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%",
                end: "bottom bottom",
                 toggleActions: "play none none reverse"
            }
        });

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen w-full bg-stone-100 flex items-center justify-center p-4 md:p-8 overflow-hidden">
      <div className="max-w-[95%] mx-auto w-full grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8 items-center">
        
        {/* Left: Image Stack */}
        <div ref={imageRef} className="relative flex justify-center items-center">
             <div className="relative w-[90%] max-w-full aspect-[4/5]">
                <Image
                    src="/images/home/QOLA.235-1.webp"
                    alt="Qola Pouches Stack"
                    fill
                    className="object-contain"
                    priority
                />
             </div>
        </div>

        {/* Right: Features List */}
        <div ref={textRef} className="flex flex-col space-y-8 text-stone-900 justify-center">
             <ul className="space-y-6 text-2xl md:text-3xl font-medium tracking-wide">
                <li className="flex items-center">
                    <span>20 pouches</span>
                </li>
                <li className="flex items-center">
                     <span>soft mouthfeel</span>
                </li>
                <li className="flex items-center">
                     <span>minimal mouth burn</span>
                </li>
                <li className="flex items-center">
                     <span>natural tasting</span>
                </li>
                <li className="flex items-center">
                     <span>3x longer release</span>
                </li>
             </ul>
        </div>

      </div>
    </div>
  );
}
