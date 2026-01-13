"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PremiumButton from "./PremiumButton";

// 注册插件
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    id: 1,
    title: "STEP 1",
    desc: "Take a pouch out of the box",
    image: "/images/home/bz-10001.webp",
  },
  {
    id: 2,
    title: "STEP 2",
    desc: "Tuck between the upper lip and gum",
    image: "/images/home/bz-10002.webp",
  },
  {
    id: 3,
    title: "STEP 3",
    desc: "Start to feel a tingling sensation up to 30 mins",
    image: "/images/home/bz-10003.webp",
  },
  {
    id: 4,
    title: "STEP 4",
    desc: "Discard the pouch in the waste compartment",
    image: "/images/home/bz-10004.webp",
  },
];

export default function PortalUserGuide() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  // 入场动画
  useEffect(() => {
    const ctx = gsap.context(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%",
            }
        });

        // Title entrance
        tl.from(".guide-title", {
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
        });

        // Steps sequence animation
        steps.forEach((_, index) => {
            tl.to({}, {
                duration: 0.8,
                onStart: () => setActiveStep(index),
            }, "-=0.3");
        });

        // Reset after sequence
        tl.to({}, {
            duration: 0.8,
            onStart: () => {
                setActiveStep(null);
                setIsAutoPlaying(false);
            },
        });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Handle GSAP animations for hover states
  useEffect(() => {
    const ctx = gsap.context(() => {
      stepsRef.current.forEach((el, index) => {
          if (!el) return;
          
          const bgGradient = el.querySelector('.step-gradient');
          const bgImage = el.querySelector('.step-image');
          
          const isActive = activeStep === index;

          if (isActive) {
              gsap.to(bgGradient, { opacity: 0, duration: 0.5 });
              gsap.to(bgImage, { opacity: 1, duration: 0.5 });
          } else {
              gsap.to(bgGradient, { opacity: 1, duration: 0.5 });
              gsap.to(bgImage, { opacity: 0, duration: 0.5 });
          }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeStep]);

  const handleMouseEnter = (index: number) => {
    if (isAutoPlaying) return;
    setActiveStep(index);
  };

  const handleMouseLeave = () => {
    if (isAutoPlaying) return;
    setActiveStep(null);
  };

  return (
    <section 
      ref={containerRef} 
      className="relative w-full md:min-h-screen bg-white flex flex-col items-center justify-center overflow-hidden py-16 md:py-0"
    >
      {/* Top Header Layout */}
      <div className="absolute top-4 md:top-8 left-0 w-full px-6 md:px-12 py-4 md:py-8 flex flex-row justify-between items-center z-20">
        {/* Top Left Text */}
        <div className="text-black text-[10px] sm:text-xs md:text-base font-medium leading-[1.2] md:leading-relaxed">
          <p>New to qola nicotine pouches?</p>
          <p>Let's break that down, shall we..</p>
        </div>

        {/* Top Right Button */}
        <PremiumButton 
          text="How To Qola"
          size="md"
          className="bg-[#E5E5E5] hover:bg-[#d4d4d4] border-transparent scale-90 md:scale-100"
        />
      </div>

      <div className="container mx-auto px-6 mb-8 md:mb-16 text-center z-10 guide-title mt-24 md:mt-0">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-6 text-black tracking-tight leading-tight">
            Qola pouch user guide.
        </h2>
        <p className="text-base sm:text-xl md:text-2xl text-gray-400 font-light tracking-wide">
          ( Say hello to qola subscriptions. )
        </p>
      </div>

      <div className="w-full px-6 md:px-12 flex flex-col md:flex-row gap-4 md:gap-6 h-auto md:h-[480px] mt-12 md:mt-24 mb-12 md:mb-0">
        {steps.map((step, index) => (
          <div
            key={step.id}
            ref={(el) => { stepsRef.current[index] = el; }}
            className="group relative h-72 md:flex-1 md:h-full cursor-pointer overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-shadow duration-300 ring-1 ring-black/5"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => setActiveStep(index)}
          >
            {/* Background Image Layer */}
            <div className="step-image absolute inset-0 z-0 opacity-0 transition-transform duration-700 group-hover:scale-105">
                <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                    priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Default Gradient Background */}
            <div className="step-gradient absolute inset-0 z-10 bg-gradient-to-b from-white to-black/60" />

            {/* Content */}
             <div className="absolute bottom-6 left-6 md:left-8 z-20 pointer-events-none pr-4">
                <h3 className="step-text text-2xl md:text-4xl font-bold mb-2 md:mb-3 text-white drop-shadow-md mix-blend-overlay group-hover:mix-blend-normal group-hover:text-white transition-all">
                    {step.title}
                </h3>
                <p className="step-text text-sm md:text-lg text-white/90 drop-shadow-md max-w-full font-medium min-h-[auto] md:min-h-[3.5rem]">
                    {step.desc}
                </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

