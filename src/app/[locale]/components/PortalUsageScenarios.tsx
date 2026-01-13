"use client";
import Image from "next/image";
import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import PremiumButton from "./PremiumButton";

// 将静态数据移到组件外，避免重复创建
const IMAGES = [
  "/images/home-midcar/10003.webp",
  "/images/home-midcar/10004.webp",
  "/images/home-midcar/10005.webp",
  "/images/home-midcar/10006.webp",
  "/images/home-midcar/10007.webp",
  "/images/home-midcar/10008.webp",
  "/images/home-midcar/10009.webp",
  "/images/home-midcar/10010.webp",
  "/images/home-midcar/10011.webp",
  "/images/home-midcar/10012.webp",
];

export default function PortalUsageScenarios() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollTweenRef = useRef<gsap.core.Tween | null>(null);

  // 使用 useMemo 确保引用稳定
  const displayImages = useMemo(() => [...IMAGES, ...IMAGES, ...IMAGES], []);

  useEffect(() => {
    if (!scrollRef.current) return;

    let ctx = gsap.context(() => {
      const target = scrollRef.current;
      if (!target) return;

      const initAnimation = () => {
        // 重设前先停止当前所有相关动画
        gsap.killTweensOf(target);
        
        // 计算一组图片的真实宽度
        const totalWidth = target.scrollWidth / 3;
        
        // 设置初始位置：由于是从左往右，我们从 -totalWidth 开始，向 0 滚动
        gsap.set(target, { x: -totalWidth });

        scrollTweenRef.current = gsap.to(target, {
          x: 0,
          duration: 35,
          ease: "none",
          repeat: -1,
          onRepeat: () => {
            // 每一轮循环结束（到达0）后，瞬间跳回 -totalWidth 位置
            gsap.set(target, { x: -totalWidth });
          }
        });
      };

      // 首次初始化
      initAnimation();

      // 处理窗口大小改变时的重置逻辑
      const handleResize = () => {
        initAnimation();
      };
      
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, scrollRef);

    return () => ctx.revert();
  }, []);

  const scenariosText = "Usage Scenarios";

  const handleTextMouseEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    const target = e.currentTarget;
    
    if (gsap.isTweening(target)) return;

    gsap.to(target, {
      rotationY: 360,
      duration: 0.6,
      ease: "power2.inOut",
      transformPerspective: 1000,
      onComplete: () => {
        gsap.set(target, { rotationY: 0 });
      }
    });
  };

  return (
    <section className="relative w-full h-screen bg-white py-12 md:py-20 overflow-hidden font-sans flex flex-col justify-between">
      {/* Top Header */}
      <div className="px-6 md:px-12 flex justify-between items-end">
        <div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-black uppercase leading-[0.9] flex flex-wrap">
            {scenariosText.split("").map((char, index) => (
              <span
                key={index}
                className="inline-block cursor-default whitespace-pre"
                onMouseEnter={handleTextMouseEnter}
              >
                {char}
              </span>
            ))}
          </h2>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-gray-500 text-sm md:text-base font-normal">
              ( Where I can use a nicotine pouch ? )
            </span>
          </div>
        </div>
        <div className="text-3xl md:text-5xl font-bold text-black tracking-tighter">
          2026
        </div>
      </div>

      {/* GSAP Scrolling Section */}
      <div 
        className="w-full relative py-8 overflow-hidden cursor-pointer"
        onMouseEnter={() => scrollTweenRef.current?.pause()}
        onMouseLeave={() => scrollTweenRef.current?.play()}
      >
        <div 
          ref={scrollRef}
          className="flex whitespace-nowrap gap-10 will-change-transform"
          style={{ width: 'fit-content' }}
        >
          {displayImages.map((src, index) => (
            <div key={index} className="flex-shrink-0 w-[240px] md:w-[320px]">
              <div className="aspect-[4/5] relative mb-4">
                <Image
                  src={src}
                  alt={`Usage Scenario ${index}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 240px, 320px"
                  priority={index < 8}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
        <div className="max-w-xl">
          <p className="text-sm md:text-lg leading-snug font-medium text-black">
            QOLA nicotine pouches are suitable for various public environments—healthcare facilities, hotel lobbies, airports, conference rooms, airplanes, trains, and other smoke-free areas—showcasing their versatility and wider applicability compared to traditional tobacco products.
          </p>
        </div>
        <div>
          <PremiumButton 
            text="View All Works" 
            variant="light" 
            size="md"
            className="bg-[#f5f5f5] hover:bg-[#e0e0e0] border-transparent"
          />
        </div>
      </div>
    </section>
  );
}
