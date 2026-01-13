"use client";
import { useRef } from "react";
import gsap from "gsap";

import { cn } from "@/lib/utils";

interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark" | "orange";
}

export default function PremiumButton({ 
  text, 
  // onClick is now part of props
  className = "", 
  size = "md",
  variant = "light",
  iconClassName = "",
  ...props
}: PremiumButtonProps & { iconClassName?: string }) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const getVariantStyles = () => {
    switch (variant) {
      case "dark":
        return "bg-black text-white hover:bg-gray-900 border-gray-800";
      case "orange":
        return "bg-orange-500 text-black hover:bg-orange-600 border-orange-400";
      default:
        return "bg-white text-black hover:bg-gray-50 border-gray-200";
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return {
          button: "py-0.5 pl-0.5 pr-4 text-xs space-x-2",
          iconContainer: "w-6 h-6",
          icon: "w-3 h-3",
          textHeight: "h-4"
        };
      case "lg":
        return {
          button: "py-1.5 pl-1.5 pr-8 text-base space-x-4",
          iconContainer: "w-12 h-12",
          icon: "w-6 h-6",
          textHeight: "h-6"
        };
      default: // md
        return {
          button: "py-1 pl-1 pr-6 text-sm space-x-3",
          iconContainer: "w-10 h-10",
          icon: "w-5 h-5",
          textHeight: "h-5"
        };
    }
  };

  const styles = getSizeStyles();

  const handleMouseEnter = () => {
    if (!buttonRef.current) return;
    
    const arrow = buttonRef.current.querySelector(".arrow-icon");
    const textInner = buttonRef.current.querySelector(".text-inner");

    const tl = gsap.timeline();
    tl.to(arrow, {
      x: 20,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in"
    }).set(arrow, {
      x: -20,
    }).to(arrow, {
      x: 0,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out"
    });

    gsap.to(textInner, {
      y: "-50%",
      duration: 0.4,
      ease: "power2.inOut"
    });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;

    const arrow = buttonRef.current.querySelector(".arrow-icon");
    const textInner = buttonRef.current.querySelector(".text-inner");

    const tl = gsap.timeline();
    tl.to(arrow, {
      x: -20,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in"
    }).set(arrow, {
      x: 20,
    }).to(arrow, {
      x: 0,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out"
    });

    gsap.to(textInner, {
      y: "0%",
      duration: 0.4,
      ease: "power2.inOut"
    });
  };

  return (
    <button 
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
      className={cn(
        "rounded-full flex items-center shadow-sm border transition-colors font-semibold group w-fit",
        getVariantStyles(),
        styles.button,
        className
      )}
    >
      <div className={cn(
        "rounded-full flex items-center justify-center overflow-hidden relative shrink-0",
        variant === 'dark' ? 'bg-white text-black' : 'bg-black text-white',
        styles.iconContainer,
        iconClassName
      )}>
        <svg 
          className="arrow-icon text-current"
          style={{ width: '1.25rem', height: '1.25rem' }}
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={2}
          stroke="currentColor" 
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </div>
      <div className={`${styles.textHeight} overflow-hidden relative`}>
        <div className="text-inner">
          <div className={`${styles.textHeight} flex items-center whitespace-nowrap`}>{text}</div>
          <div className={`${styles.textHeight} flex items-center whitespace-nowrap`}>{text}</div>
        </div>
      </div>
    </button>
  );
}
