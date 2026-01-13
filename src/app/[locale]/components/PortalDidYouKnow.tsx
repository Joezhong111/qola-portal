"use client";
import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PremiumButton from "./PremiumButton";

// 注册 GSAP 插件
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PortalDidYouKnow() {
  const text = "Did you know us?";
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!titleRef.current) return;

      const chars = titleRef.current.querySelectorAll(".char-item");
      
      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: -150,
          rotate: 15,
        },
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "bounce.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert(); // 安全清理该 context 下的所有动画和 ScrollTriggers
  }, []);
  
  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    
    if (gsap.isTweening(target)) return;

    gsap.to(target, {
      rotationY: "+=360", // 使用增量旋转，更加稳健
      duration: 0.6,
      ease: "power2.inOut",
      transformPerspective: 1000,
    });
  };

  return (
    <section className="relative w-full bg-white pt-24 pb-12 px-4 md:px-8 lg:px-12 flex flex-col justify-center min-h-[80vh] lg:h-screen">
      {/* Header */}
      <div className="w-full mx-auto mb-10">
        <div className="flex justify-between items-start">
          <div>
            <h2 
              ref={titleRef}
              className="text-4xl md:text-6xl font-bold tracking-tight text-black mb-2 flex flex-wrap"
              style={{ perspective: "1000px" }} // 为 3D 效果提供透视
            >
              {text.split("").map((char, index) => (
                <span
                  key={index}
                  className="char-item inline-block cursor-default whitespace-pre"
                  onMouseEnter={handleMouseEnter}
                >
                  {char}
                </span>
              ))}
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
              ( Have you used qola since then ? )
            </p>
          </div>
          <div className="text-2xl md:text-4xl font-medium text-black">
            2026
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full mx-auto flex flex-col md:flex-row justify-center items-start gap-6 md:gap-12 flex-grow">
        {/* Left Card */}
        <div className="flex flex-col max-w-[420px] w-full">
          <div className="relative group w-full aspect-square overflow-hidden bg-gray-100 rounded-lg">
            <Image
              src="/images/home/66-1_1024x1024.webp"
              alt="New to nicotine pouches"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay Gradient for Text Readability */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white text-left">
              <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-2">
                I'M NEW
              </h3>
              <p className="text-sm md:text-lg font-medium opacity-90">
                TO NICOTINE POUCHES
              </p>
            </div>
          </div>
          
          <div className="mt-4">
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-4 px-6 rounded-md flex items-center justify-between transition-colors">
              <span>LEARN THE BASICS</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Card */}
        <div className="flex flex-col max-w-[420px] w-full">
          <div className="relative group w-full aspect-square overflow-hidden bg-gray-100 rounded-lg">
            <Image
              src="/images/home/63-1-1024x1024.webp"
              alt="Using nicotine pouches"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay Gradient for Text Readability */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300" />

            <div className="absolute bottom-6 left-6 right-6 text-white text-left">
              <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-2">
                I'M USING
              </h3>
              <p className="text-sm md:text-lg font-medium opacity-90">
                TO NICOTINE POUCHES
              </p>
            </div>
          </div>
          
          <div className="mt-4">
            <button className="w-full bg-gray-900 hover:bg-black text-orange-500 font-bold py-4 px-6 rounded-md flex items-center justify-between transition-colors border border-gray-700">
              <span>BROWSE ALL FLAVORS</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Footer Text */}
      <div className="w-full mx-auto mt-8 flex justify-between items-end">
        <div className="max-w-md text-black text-sm md:text-base">
          <p>
            It starts with heat and tingling sensations, it can be a little weird at first, but then gives way to wonderful, long-lasting enjoyment.
          </p>
        </div>

        {/* Instructions Button */}
        <div>
          <PremiumButton 
            text="Instructions For Use" 
            variant="light" 
            size="md"
          />
        </div>
      </div>
    </section>
  );
}
