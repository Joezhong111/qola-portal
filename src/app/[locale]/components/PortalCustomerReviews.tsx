"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PremiumButton from "./PremiumButton";

gsap.registerPlugin(ScrollTrigger);

const REVIEWS = [
  {
    name: "Michael Anderson",
    role: "Marketing Manager",
    quote: '"NEVER THOUGHT I\'D CARE ABOUT HOW A POUCH BRAND LOOKS, BUT QOLA\'S ON A DIFFERENT LEVEL."',
  },
  {
    name: "Emily Johnson",
    role: "Freelance Graphic Designer",
    quote: '"I CAN RUN MEETINGS, WORK OUT, WHATEVER AND NOT HAVE TO SPIT IT OUT HALFWAY THROUGH. GAME CHANGER."',
  },
  {
    name: "Daniel Thompson",
    role: "Software Engineer",
    quote: '"FEELS LIKE THE FRUIT OF NICOTINE. CLEAN DESIGN, CLEAN TASTE."',
  },
  {
    name: "Christopher Miller",
    role: "Real Estate Consultant",
    quote: '"MOST POUCHES START BURNING AFTER A COUPLE MINUTES. QOLA JUST STAYS SMOOTH THE WHOLE TIME."',
  },
  {
    name: "Sophia Williams",
    role: "Lifestyle Blogger",
    quote: '"IT\'S NOT JUST THE POUCHES, IT\'S THE WHOLE VIBE. FEELS LIKE THEY ACTUALLY CARE ABOUT THE PEOPLE USING THEM."',
  },
  {
    name: "Alexander Brown",
    role: "Financial Analyst",
    quote: '"I TRIED OTHER POUCHES BUT THEY EITHER TASTED BAD OR GAVE ME HEADACHES. QOLA\'S THE ONLY ONE THAT STUCK."',
  },
  {
    name: "Olivia Martinez",
    role: "Public Relations Specialist",
    quote: '"EVERYTHING ABOUT QOLA FEELS PREMIUM. THE PACK, THE FLAVOR, EVEN HOW IT FITS IN MY POCKET. I\'VE NEVER HAD THAT WITH ANY OTHER POUCH."',
  },
  {
      name: "James Wilson",
      role: "Creative Director",
      quote: '"FINALLY A POUCH THAT DOESN\'T LOOK LIKE MEDICINE. SLEEK, STYLISH AND HITS JUST RIGHT."'
  }
];

export default function PortalCustomerReviews() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  const reviewsContainerRef = useRef<HTMLDivElement>(null);
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !marqueeInnerRef.current) return;

    // --- 1. Marquee Animation ---
    // Duplicate content for seamless loop is handled in render by repeating array
    const marqueeContent = marqueeInnerRef.current;
    
    // We want the text to move LEFT when scrolling DOWN (page goes up)
    // and RIGHT when scrolling UP.
    // Standard scrubbing: x percent linked to scroll progress.
    
    // Setup infinite loop logic is complex with pure ScrollTrigger if we want constant movement + scroll influence.
    // The request says: "Page Scroll Up -> Text Left, Page Scroll Down -> Text Right" (or vice versa).
    // Specifically: "Current page scrolls UP (user finger down), text rolls LEFT. Current page scrolls DOWN, text rolls RIGHT."
    
    // Let's use a simple horizontal scroll scrub.
    const scrollWidth = marqueeContent.scrollWidth;
    const clientWidth = marqueeContent.clientWidth; // Container width
    
    // To make it loop, we usually need at least 2 duplicates. We render 4.
    
    gsap.to(marqueeContent, {
      xPercent: -50, // Move left by 50% of total width (assuming 2 sets ensures loop if setup right)
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1, // Smooth interaction
      }
    });


    // --- 2. Reviews Parallax (Overlap/Separate) ---
    // Logic: "Top 4 and Bottom 4 start overlapped. Scroll separates them."
    // Trigger should be the reviews container.
    
    const topRow = topRowRef.current;
    const bottomRow = bottomRowRef.current;

    if (topRow && bottomRow) {
        // Initial state set in CSS matches "overlapped" if we position them absolute or transform them close.
        // Let's assume standard flow layout, margin-bottom on top row is small/negative?
        // Or we use GSAP `from` to define overlap, and `to` to separate.
        
        // Wait, User says: "Start overlap. Scroll up -> Separate." (Meaning as we view more?)
        // "When page scrolls up (we go down), top row moves up, separating from bottom row."
        // "When page scrolls down (we go up), top row moves down, overlapping."
        
        // So as we scroll down the page, they Separate.
        
        gsap.to(topRow, {
            y: -100, // Move Up
            ease: "none",
            scrollTrigger: {
                trigger: reviewsContainerRef.current,
                start: "top center+=20%", // Start separating when it's near center
                end: "bottom center",
                scrub: true,
            }
        });

        gsap.to(bottomRow, {
            y: 50, // Move Down slightly or stay? User said "separate".
            // "Top moves up, Bottom moves down (relative?)"
            // Let's just move top up for separation effect.
            // Requirement: "Top row moves up... Bottom row moves down? Or just separate?"
            // "When page slides UP (view down), top row moves up... separate."
             ease: "none",
            scrollTrigger: {
                trigger: reviewsContainerRef.current,
                start: "top center+=20%",
                end: "bottom center",
                scrub: true,
            }
        });
    }

    // --- 3. Drawer Effect (Entrance) ---
    // The user wants "Mouse slide, close previous page in drawer way, expand current page".
    // This implies a sticky footer reveal or a z-index overlay.
    // We will set this component to z-30 (matches others) but maybe add a transform Y animation from bottom?
    // Or just let natural scroll handle it if the bg is opaque video.
    // Let's rely on the design (video bg) covering the prev section.
    
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-[150vh] bg-black text-white overflow-hidden flex flex-col items-center pt-5 pb-40 z-40" // Increased Z to cover prev?
    >
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-60 z-0 pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/video/custom_review_bg.mp4" type="video/mp4" />
      </video>

      {/* Marquee Header */}
      <div 
        ref={marqueeRef} 
        className="relative z-10 w-full overflow-hidden mb-80 mt-5"
      >
        <div 
          ref={marqueeInnerRef}
          className="flex whitespace-nowrap text-[150px] font-bold leading-none tracking-tighter uppercase font-['Oswald']" // Fallback font, adjust custom
        >
          {/* Repeat text for loop illusion */}
          {[1, 2, 3, 4].map((i) => (
             <span key={i} className="mx-8">
               CUSTOMER REVIEW
             </span>
          ))}
        </div>
      </div>

      {/* Reviews Grid */}
      <div 
        ref={reviewsContainerRef}
        className="relative z-10 w-full max-w-[1400px] px-8 flex flex-col items-center justify-center gap-4" // base gap small
      >
        {/* Top Row */}
        <div 
            ref={topRowRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full translate-y-[50px]" // Start pushed down (overlapped)
            style={{ marginBottom: '-100px' }} // Start overlapped with bottom
        >
            {REVIEWS.slice(0, 4).map((review, idx) => (
                <ReviewCard key={`top-${idx}`} review={review} />
            ))}
        </div>

        {/* Bottom Row */}
        <div 
            ref={bottomRowRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full translate-y-[0px] -rotate-[2deg] origin-center"
        >
             {REVIEWS.slice(4, 8).map((review, idx) => (
                <ReviewCard key={`bottom-${idx}`} review={review} />
            ))}
        </div>
      </div>

      {/* Footer Button */}
      <div className="relative z-10 mt-auto pt-80">
        <PremiumButton 
          text="Let's Start" 
          size="md" 
          variant="dark" 
          className="bg-[#070707] hover:bg-[#111111] border-[#070707] text-white" 
          iconClassName="bg-[#191919] text-white" 
        />
      </div>

    </section>
  );
}

function ReviewCard({ review }: { review: { name: string; role: string; quote: string } }) {
  return (
    <div className="bg-black/40 border border-white/20 rounded-xl p-7 flex flex-col justify-between h-[280px] hover:bg-black/50 transition-colors duration-300">
       <div className="mb-4">
          <h4 className="text-white font-bold text-lg leading-tight">{review.name}</h4>
          <p className="text-white/60 text-xs uppercase tracking-wider mt-1">{review.role}</p>
       </div>
       <p className="text-white/90 text-sm font-medium leading-relaxed">
         {review.quote}
       </p>
    </div>
  );
}
