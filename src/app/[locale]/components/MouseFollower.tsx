"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * MouseFollower 组件
 * 实现一个深色小球跟随鼠标的动画效果
 * 
 * 特性：
 * 1. 顺滑跟随：使用 gsap.quickTo 实现高性能的平滑追踪。
 * 2. 交互反馈：移动到按钮或 a 标签时，小球变大、变浅、透明。
 * 3. 性能优化：采用 gsap.context 管理生命周期，使用 will-change 优化渲染。
 */
export default function MouseFollower() {
  const ballRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !ballRef.current) return;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      ballRef.current.style.display = "none";
      return;
    }

    const ball = ballRef.current;

    const ctx = gsap.context(() => {
      // 基础尺寸调整为 100px
      // 普通状态 (16px) = scale(0.16)
      // 放大状态 (100px) = scale(1)
      gsap.set(ball, { 
        xPercent: -50, 
        yPercent: -50,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        opacity: 0,
        scale: 0,
        force3D: true, // 强制 3D 加速
      });

      const xTo = gsap.quickTo(ball, "x", { duration: 0.4, ease: "power3.out" });
      const yTo = gsap.quickTo(ball, "y", { duration: 0.4, ease: "power3.out" });

      let hasMoved = false;

      const handleMouseMove = (e: MouseEvent) => {
        if (!hasMoved) {
          gsap.to(ball, { opacity: 1, scale: 0.16, duration: 0.5, overwrite: "auto" });
          hasMoved = true;
        }
        xTo(e.clientX);
        yTo(e.clientY);
      };

      const handleHoverEnter = () => {
        gsap.to(ball, {
          scale: 1, // 放大到 100px
          backgroundColor: "rgba(80, 80, 80, 0.5)",
          borderColor: "rgba(255, 255, 255, 0.2)",
          duration: 0.4,
          ease: "back.out(1.2)",
          overwrite: "auto",
        });
      };

      const handleHoverLeave = () => {
        gsap.to(ball, {
          scale: 0.16, // 恢复到 16px
          backgroundColor: "#1c1917", 
          borderColor: "rgba(255, 255, 255, 0.1)",
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      let isHovering = false;

      const handleGlobalOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target || !target.closest) return;

        const isIgnore = target.closest("[data-cursor-ignore]");
        const isActionable = !isIgnore && (target.closest("button") || target.closest("a"));
        
        if (isIgnore) {
          gsap.to(ball, { opacity: 0, duration: 0.3, overwrite: "auto" });
          if (isHovering) {
            isHovering = false;
            handleHoverLeave();
          }
          return;
        }

        if (hasMoved) {
          gsap.to(ball, { opacity: 1, duration: 0.3, overwrite: "auto" });
        }
        
        if (isActionable) {
          if (!isHovering) {
            isHovering = true;
            handleHoverEnter();
          }
        } else {
          if (isHovering) {
            isHovering = false;
            handleHoverLeave();
          }
        }
      };

      const handleWindowLeave = () => {
        gsap.to(ball, { opacity: 0, duration: 0.3, overwrite: "auto" });
        if (isHovering) {
          isHovering = false;
          handleHoverLeave();
        }
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseover", handleGlobalOver);
      window.addEventListener("mouseleave", handleWindowLeave);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseover", handleGlobalOver);
        window.removeEventListener("mouseleave", handleWindowLeave);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ballRef}
      className="fixed top-0 left-0 w-20 h-20 rounded-full pointer-events-none z-[9999] border border-white/10 shadow-sm"
      style={{ 
        willChange: "transform, opacity",
        backgroundColor: "#1c1917",
      }}
    />
  );
}
