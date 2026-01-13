"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import PremiumButton from "./PremiumButton";

const FLAVOR_DATA = [
  { name: "COOL MINT(4MG)", image: "/images/home-float/COOLMINT_4MG.webp" },
  { name: "WATERMELON SPLASH(4MG)", image: "/images/home-float/WATERMELONSPLASH_4MG.webp" },
  { name: "STRAWBERRY SPRINKLE(4MG)", image: "/images/home-float/STRAWBERRYSPRINKLE_4MG.webp" },
  { name: "LEMON SPARK(4MG)", image: "/images/home-float/LEMONSPARK_4MG.webp" },
  { name: "CLASSICAL ORIGINAL(4MG)", image: "/images/home-float/CLASSICALORIGINAL_4MG.webp" },
  { name: "COOL MINT(8MG)", image: "/images/home-float/COOLMINT_8MG.webp" },
  { name: "CLASSICAL ORIGINAL(8MG)", image: "/images/home-float/CLASSICALORIGINAL_8MG.webp" },
  { name: "LEMON SPARK(8MG)", image: "/images/home-float/LEMONSPARK_8MG.webp" },
  { name: "VELVET ROSE(8MG)", image: "/images/home-float/VELVETROSE_8MG.webp" },
  { name: "DOUBLE MINT(12MG)", image: "/images/home-float/DOUBLEMINT_12MG.webp" },
  { name: "PEPPERMINT STORM(16MG)", image: "/images/home-float/PEPPERMINTSTORM_16MG.webp" },
  { name: "PEPPER WHIRLWIND(20MG)", image: "/images/home-float/PEPPERMINTWHIRLWIND_20MG-1-2048x2048.webp" },
];

export default function PortalFlavors() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const imageRef = useRef<HTMLDivElement>(null);
  const lastX = useRef(0);

  const xSetter = useRef<any>(null);
  const ySetter = useRef<any>(null);

  useEffect(() => {
    if (imageRef.current) {
      xSetter.current = gsap.quickSetter(imageRef.current, "x", "px");
      ySetter.current = gsap.quickSetter(imageRef.current, "y", "px");
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    // 高性能位置更新
    if (xSetter.current && ySetter.current) {
      xSetter.current(e.clientX);
      ySetter.current(e.clientY);
    }

    // 计算移动速度/方向
    if (lastX.current === 0) lastX.current = e.clientX;
    const deltaX = e.clientX - lastX.current;
    lastX.current = e.clientX;

    // 仅在悬浮在 flavour 链接上时处理图片倾斜
    if (hoveredIndex !== null && imageRef.current) {
      // 往右移 (deltaX > 0) -> 往左倾斜 (负角度)
      // 往左移 (deltaX < 0) -> 往右倾斜 (正角度)
      const tiltAngle = -deltaX * 0.6; // 倾斜系数，可根据需要微调
      const clampedTilt = Math.max(Math.min(tiltAngle, 15), -15); // 限制角度最大 15 度

      gsap.to(imageRef.current, {
        rotate: clampedTilt,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
        onComplete: () => {
          // 停止移动后，平滑回正
          gsap.to(imageRef.current, {
            rotate: 0,
            duration: 0.8,
            ease: "back.out(1.2)"
          });
        }
      });
    }
  };

  const handleFlavorEnter = (index: number) => {
    setHoveredIndex(index);
    const flavor = FLAVOR_DATA[index];
    if (flavor.image) {
      setActiveImage(flavor.image);
    }
    
    if (imageRef.current) {
      // 仅显示图片，不播放初始晃动
      gsap.killTweensOf(imageRef.current);
      gsap.to(imageRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const handleFlavorLeave = () => {
    setHoveredIndex(null);
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        opacity: 0,
        scale: 0.5,
        rotate: 0, // 离开时确保旋转归零
        duration: 0.4,
        ease: "power2.inOut",
      });
    }
  };

  return (
    <section 
      className="relative w-full min-h-screen bg-[#ecebe9] py-12 md:py-20 px-6 md:px-12 flex flex-col justify-between font-sans text-black overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Floating Image */}
      <div
        ref={imageRef}
        className="pointer-events-none fixed top-0 left-0 w-64 h-64 md:w-[500px] md:h-[500px] z-50 opacity-0 scale-50 -translate-x-1/2 -translate-y-1/2 select-none will-change-transform"
      >
        {activeImage && (
          <Image
            src={activeImage}
            alt="Flavor"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        )}
      </div>

      {/* Top Header */}
      <div className="flex justify-center mb-8">
        <span className="text-gray-500 text-xs md:text-sm font-normal uppercase tracking-widest">
          ( Flavors and Mg )
        </span>
      </div>

      {/* Main Content: Three Columns */}
      <div className="flex-1 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0 z-10">
        {/* Left Column */}
        <div className="md:w-1/4">
          <p className="text-sm md:text-base leading-relaxed max-w-[320px]">
            Browse our complete range of tobacco-free nicotine pouches in multiple flavours and strengths. Available in 4mg to 20mg nicotine levels across mint, fruit, and specialty varieties. All pouches contain pharmaceutical-grade nicotine and are designed as a smoke-free alternative to traditional tobacco products.
          </p>
        </div>

        {/* Middle Column: Flavor Links */}
        <div className="flex-1 flex flex-col items-center lg:items-start w-full">
          <div className="flex flex-col gap-1 md:gap-2 w-full">
            {FLAVOR_DATA.map((flavor, index) => (
              <a
                key={index}
                href="#"
                data-cursor-ignore
                className={`text-xl sm:text-2xl md:text-2xl lg:text-5xl font-bold tracking-tight uppercase transition-all duration-300 border-l-4 border-transparent ease-in-out whitespace-nowrap w-full py-1 
                  text-center lg:text-left lg:pl-[20%] ${
                  hoveredIndex !== null && hoveredIndex !== index
                    ? "text-gray-400 opacity-40 scale-[0.98]"
                    : "text-black scale-100"
                }`}
                onMouseEnter={() => handleFlavorEnter(index)}
                onMouseLeave={handleFlavorLeave}
              >
                {flavor.name}
              </a>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="md:w-1/4 flex justify-end">
          <p className="text-sm md:text-base leading-relaxed text-right max-w-[320px]">
            Designed to taste natural, not chemical. qola products are made without: microplastics, artificial preservatives, coloring agents, seed oil, trans fats, pesticides, titanium dioxide, sodium benzoate, potassium sorbate, sorbic acid, ammonium chloride, tartaric acid, acesulfame k, aspartame, ascorbic acid, magnesium hydroxide, sodium hydroxide, tocopherols.
          </p>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="flex justify-center mt-12 z-10">
        <PremiumButton 
          text="Check The Details"
          size="md"
        />
      </div>
    </section>
  );
}
