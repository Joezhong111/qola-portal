"use client";
import Image from "next/image";
import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import PremiumButton from "./PremiumButton";

const STATIC_LOGOS = [
  "/images/home/logo3.webp",
  "/images/home/logo1-1.webp",
  "/images/home/logo2.webp",
];

export default function PortalAboutUs() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    // 使用 gsap.context 确保在 React 严格模式或卸载时能正确清理动画
    const ctx = gsap.context(() => {
      // 无缝滚动逻辑：利用 xPercent 实现相对位移，避免手动计算像素导致的误差
      // 因为 displayLogos 是原数组的 6 倍，所以向左滚动 1/6 (约 16.66%) 正好是一个完整周期
      gsap.to(scrollRef.current, {
        xPercent: - (100 / 6),
        duration: 15, // 控制滚动速度
        ease: "none",
        repeat: -1,
      });
    }, scrollRef);

    return () => ctx.revert();
  }, []);

  // 将静态数据移出组件外，避免重复创建
  // 为实现无缝滚动并适配大屏（如4K），增加重复次数。6个副本足以覆盖绝大多数显示器
  // 使用 useMemo 确保引用稳定，避免在每次渲染时重新创建数组
  const displayLogos = useMemo(() => Array(6).fill(STATIC_LOGOS).flat(), []);

  return (
    <section className="relative w-full bg-[#f0f0f0] pt-20 pb-10 overflow-hidden">
      {/* Top Text Section */}
      <div className="px-6 md:px-12 mb-36">
        <div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-sm md:text-base font-medium text-gray-500 align-middle mr-8">(About Us)</span>
            <span className="mr-8 align-middle"></span>
            We are a leading global solutions provider offering a complete synthetic nicotine platform, covering R&D, production, and commercialization, ensuring product innovation and compliance.
          </h2>
        </div>
      </div>

      {/* Middle Content Section */}
      <div className="flex flex-col lg:flex-row items-start justify-center px-6 md:px-12 gap-12 lg:gap-16 mb-32">
        {/* Left Image */}
        <div className="w-full lg:w-[26%] aspect-[4/5] relative">
          <Image
            src="/images/home/10001.webp"
            alt="Vitanic Vision Office"
            fill
            className="object-cover"
          />
        </div>

        {/* Center Text and Button */}
        <div className="w-full lg:w-[32%] flex flex-col gap-8 pb-12 lg:pt-10">
          <p className="text-lg leading-relaxed text-gray-800 max-w-[65%]">
            The name Vitanic Vision is inspired by our commitment to the vision articulated in the "UAE vision 2031". We promoting smoke-free lifestyles to improve public health and improve citizens' quality of life, while also fostering sustainable economic development.
          </p>
          <p className="text-lg leading-relaxed text-gray-800 max-w-[65%]">
            Vitanic Vision represents our commitment to creating positive societal change and a healthier, more prosperous future.
          </p>
          <div className="mt-4">
            <PremiumButton text="About Us" variant="light" size="md" />
          </div>
        </div>


        {/* Right Image */}
        <div className="w-full lg:w-[18%] aspect-square relative lg:-mb-12 lg:self-end">
          <Image
            src="/images/home/10002.webp"
            alt="Research and Development"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Bottom Text Section */}
      <div className="w-full text-center mb-16">
        <p className="text-lg font-medium text-gray-800">
          ( We are not only researchers, but also practitioners driving a shift towards healthier lifestyles. )
        </p>
      </div>

      {/* Logo Scrolling Section */}
      <div className="w-full relative overflow-hidden h-20 flex items-center bg-transparent">
        <div 
          ref={scrollRef}
          className="flex whitespace-nowrap gap-32 items-center pr-32"
        >
          {displayLogos.map((logo, index) => (
            <div key={index} className="flex-shrink-0 flex items-center">
               <div className="relative h-8 w-32">
                 <Image
                   src={logo}
                   alt="Partner Logo"
                   fill
                   className="object-contain"
                   priority={index < 8}
                 />
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
