"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * PortalVideo 组件
 * 实现一个随滚动展开至全屏的视频播放器
 */
export default function PortalVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const ctx = gsap.context(() => {
      // 使用 ScrollTrigger 同时处理动画和视频播放控制
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          if (self.isActive) {
            video.play().catch((e) => {
              // 某些浏览器环境下（如低电量模式）即使禁音也可能静默失败
              console.warn("Autoplay failed", e);
            });
          } else {
            video.pause();
          }
        },
      });

      // 展开动画：保持 100% 宽度，仅对圆角、高度和间距进行过渡
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 95%",
        end: "top top",
        scrub: true,
        animation: gsap.fromTo(
          wrapperRef.current,
          {
            width: "100%",
            height: "80vh",
            borderRadius: "2rem",
            marginTop: "2rem",
          },
          {
            width: "100%",
            height: "100vh",
            borderRadius: "0rem",
            marginTop: "0rem",
            ease: "none",
          }
        ),
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full z-10 flex flex-col items-center justify-start -mt-10 overflow-hidden shadow-2xl pointer-events-none"
    >
      <div
        ref={wrapperRef}
        className="relative overflow-hidden shadow-2xl bg-stone-900 mx-auto pointer-events-auto will-change-transform"
      >
        <video
          ref={videoRef}
          src="/video/QOLA30s.mp4"
          className="w-full h-full object-cover"
          playsInline
          muted
          loop
          preload="metadata"
          autoPlay={false}
        />
        
        {/* 蒙层：增加视频质感，防止高亮溢出影响文字阅读 */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      </div>
    </section>
  );
}
