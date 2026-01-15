"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";

interface ContactLinkProps {
  href: string;
  text: string;
}

export default function ContactLink({ href, text }: ContactLinkProps) {
  const arrowRef = useRef<SVGSVGElement>(null);

  const handleMouseEnter = () => {
    if (!arrowRef.current) return;
    
    const arrow = arrowRef.current;
    
    // Kill any running animations on the arrow
    gsap.killTweensOf(arrow);
    
    const tl = gsap.timeline();
    // Arrow moves from left to right (out)
    tl.to(arrow, { 
      x: 20, 
      opacity: 0, 
      duration: 0.3, 
      ease: "power2.in" 
    })
    // Reset position to the left side
    .set(arrow, { 
      x: -20, 
      opacity: 0 
    })
    // Arrow comes in from left to center (reset)
    .to(arrow, { 
      x: 0, 
      opacity: 1, 
      duration: 0.3, 
      ease: "power2.out" 
    });
  };

  const handleMouseLeave = () => {
    if (!arrowRef.current) return;
    
    const arrow = arrowRef.current;
    
    gsap.killTweensOf(arrow);
    
    const tl = gsap.timeline();
    // Opposite effect: Arrow moves from center to left (out)
    tl.to(arrow, { 
      x: -20, 
      opacity: 0, 
      duration: 0.3, 
      ease: "power2.in" 
    })
    // Reset position to the right side
    .set(arrow, { 
      x: 20, 
      opacity: 0 
    })
    // Arrow comes in from right to center
    .to(arrow, { 
      x: 0, 
      opacity: 1, 
      duration: 0.3, 
      ease: "power2.out" 
    });
  };

  return (
    <a 
      href={href} 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex items-center justify-between text-lg hover:text-[#E6B375] transition-colors group/link w-full cursor-pointer"
    >
      <span className="flex-1 break-all text-left mr-2">{text}</span>
      <ArrowRight 
        ref={arrowRef} 
        className="w-5 h-5 text-[#E6B375]" 
        aria-hidden="true"
      />
    </a>
  );
}
