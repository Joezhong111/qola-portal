"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 定义 Item 类型以提高代码严谨性
interface CarouselItem {
  image: string;
  title: React.ReactNode;
  description: React.ReactNode;
  buttonText: React.ReactNode;
  textContainerClass: string;
  titleClass: string;
  descClass: string;
  buttonClass: string;
  alt: string;
  imageFit?: string;
}

const CAROUSEL_ITEMS: CarouselItem[] = [
  {
    image: "/images/home-carousel/slide-1.webp",
    title: (
      <>
        nicotine pouches
        <br />
        without constraint.
      </>
    ),
    description: (
      <>
        SMOOTH, LONG LASTING POUCHES.
        <br />
        MADE IN CHINA WITHOUT MICROPLASTICS.
      </>
    ),
    buttonText: (
        <>
            DISCOVER QOLA <span className="ml-2">➔</span>
        </>
    ),
    // Style configurations
    textContainerClass: "text-white", 
    titleClass: "text-5xl md:text-[5rem] font-black lowercase tracking-tighter mb-6 leading-[0.9]",
    descClass: "text-sm md:text-lg font-bold uppercase leading-relaxed opacity-90 mb-10 max-w-xl",
    buttonClass: "bg-[#EDA740] hover:bg-[#D69130] text-white font-bold uppercase tracking-widest py-4 px-12 text-sm md:text-base transition-all transform hover:scale-105 flex items-center",
    alt: "Nicotine pouches without constraint",
    imageFit: "object-contain object-right"
  },
  {
    image: "/images/home-carousel/slide-2.webp",
    title: "FUTURE FUSION", 
    description: "Experience the next generation of flavor profiles, crafted for those who seek the extraordinary. A blend of tradition and innovation.",
    buttonText: "EXPLORE",
    // Default/Dark specific styles
    textContainerClass: "text-white",
    titleClass: "text-5xl md:text-[5rem] font-black uppercase tracking-tighter mb-6 leading-[0.9]",
    descClass: "text-sm md:text-lg font-medium leading-relaxed opacity-90 mb-10 max-w-xl",
    buttonClass: "bg-[#B0B0B0] hover:bg-white text-stone-900 font-bold uppercase tracking-widest py-4 px-12 text-sm md:text-base transition-all transform hover:scale-105",
    alt: "Future Fusion",
    imageFit: "object-cover"
  }
];

export default function PortalHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentParamsRef = useRef<HTMLDivElement>(null); // Ref for the content we want to parallax

  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const ctxRef = useRef<gsap.Context | null>(null);

  // Initial Content Animation & Slide Setup
  useEffect(() => {
    ctxRef.current = gsap.context(() => {
      // Initialize slides: Hide all, then show the first one
      gsap.set(slideRefs.current, { opacity: 0, zIndex: 0 });
      if (slideRefs.current[0]) {
        gsap.set(slideRefs.current[0], { opacity: 1, zIndex: 1 });
      }

      // Parallax Effect for Content on Exit
      gsap.to(contentParamsRef.current, {
          yPercent: -50, // Move up by 50% for more obvious slide
          opacity: 0, // Fade out completely
          scale: 0.9, // Scale down more
          ease: "power1.in", // Use easing for smoother "taking off" feel
          scrollTrigger: {
              trigger: typeof document !== "undefined" ? document.body : null, 
              start: "top top",
              end: "40% top", // Finish animation earlier (by 40% scroll) so it feels faster
              scrub: true
          }
      });
    }, containerRef);

    return () => ctxRef.current?.revert();
  }, []);

  // Carousel Transition Logic
  const changeSlide = useCallback((nextIndex: number) => {
    if (isAnimating || nextIndex === currentSlide) return;
    
    ctxRef.current?.add(() => {
      setIsAnimating(true);

      const currentSlideEl = slideRefs.current[currentSlide];
      const nextSlideEl = slideRefs.current[nextIndex];

      const tl = gsap.timeline({
        onComplete: () => {
          setIsAnimating(false);
          setCurrentSlide(nextIndex);
          // Ensure old slide is fully reset
          if (currentSlideEl) {
            gsap.set(currentSlideEl, { opacity: 0, zIndex: 0, scale: 1 });
          }
        }
      });

      // Prepare next slide (on top)
      if (nextSlideEl) {
        gsap.set(nextSlideEl, { zIndex: 2, opacity: 0, scale: 1.05 });
      }
      
      // Keep current slide below but visible
      if (currentSlideEl) {
        gsap.set(currentSlideEl, { zIndex: 1 });
      }

      // Animate current slide out
      if (currentSlideEl) {
        tl.to(currentSlideEl, {
          opacity: 0,
          scale: 0.95,
          duration: 1.2,
          ease: "power2.inOut"
        }, 0);
      }

      // Animate next slide in
      if (nextSlideEl) {
        tl.to(nextSlideEl, {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.inOut"
        }, 0);
      }
    });
  }, [currentSlide, isAnimating]);

  const nextSlide = useCallback(() => {
    const next = (currentSlide + 1) % CAROUSEL_ITEMS.length;
    changeSlide(next);
  }, [currentSlide, changeSlide]);

  const prevSlide = useCallback(() => {
    const prev = (currentSlide - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length;
    changeSlide(prev);
  }, [currentSlide, changeSlide]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);


  return (
    <div ref={containerRef} className="min-h-screen bg-stone-900 text-white font-sans selection:bg-white selection:text-stone-900 overflow-hidden relative">
        
        {/* We wrap everything relevant in a ref div to apply parallax */}
        <div ref={contentParamsRef} className="absolute inset-0 w-full h-full"> 

            {/* Background Carousel */}
            <div className="absolute inset-0 z-0">
            {CAROUSEL_ITEMS.map((item, index) => (
                <div 
                key={index}
                ref={el => { slideRefs.current[index] = el }}
                className="absolute inset-0 w-full h-full opacity-0" // Default hidden, controlled by GSAP
                >
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/40 z-10" />
                <Image 
                    src={item.image} 
                    alt={item.alt}
                    fill 
                    className={item.imageFit || "object-cover"}
                    priority={index === 0}
                    sizes="100vw"
                />

                {/* Text Content Overlay */}
                <div className="absolute inset-0 z-20 flex items-center justify-start px-6 md:px-24 pt-20">
                        <div className={`max-w-[700px] ${item.textContainerClass}`}>
                            <h1 className={item.titleClass}>
                                {item.title}
                            </h1>
                            <p className={item.descClass}>
                                {item.description}
                            </p>
                            <button type="button" className={item.buttonClass}>
                                {item.buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            </div>


        
             {/* Warning Banner */}
            <div className="absolute top-[60px] md:top-[70px] left-0 right-0 flex justify-center z-30 pointer-events-none px-4">
                <div className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full text-[10px] md:text-xs text-white font-medium uppercase tracking-widest border border-white/10 shadow-sm">
                    Warning: This product contains nicotine. Nicotine is an addictive chemical.
                </div>
            </div>

            {/* Navigation Arrows */}
            <button 
                type="button"
                aria-label="Previous slide"
                onClick={prevSlide}
                className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 cursor-pointer z-20 p-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-stone-900 transition-all duration-300 group"
            >
                <svg width="24" height="24" className="w-6 h-6 md:w-8 md:h-8 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            
            <button 
                type="button"
                aria-label="Next slide"
                onClick={nextSlide}
                className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 cursor-pointer z-20 p-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-stone-900 transition-all duration-300 group"
            >
                <svg width="24" height="24" className="w-6 h-6 md:w-8 md:h-8 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-4 z-20">
            {CAROUSEL_ITEMS.map((_, index) => (
                <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => changeSlide(index)}
                className={`w-12 h-1 rounded-full transition-all duration-500 ${index === currentSlide ? 'bg-white' : 'bg-white/30 hover:bg-white/50'}`}
                />
            ))}
            </div>

        </div>

    </div>
  );
}
