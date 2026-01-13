"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 提取静态数据，方便维护和未来的国际化处理
const NAV_LINKS = ['Home', 'Products', 'Shop', 'Locator', 'Contact'];
const SERVICE_LINKS = ['Privacy Policy', 'Refund Policy', 'Shipping Policy', 'Terms Of Service', 'Wholesale'];
const SOCIAL_LINKS = [
  { name: 'Instagram', href: '#' },
  { name: 'Facebook', href: '#' },
  { name: 'WhatsApp', href: '#' },
  { name: 'TikTok', href: '#' },
  { name: 'Dribbble', href: '#' },
];

export default function PortalFooter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const impactfulTextRef = useRef<HTMLHeadingElement>(null);
  const wavyRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLHeadingElement>(null);
  const iconCRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. 顶部标语进入动画
      gsap.from(impactfulTextRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: impactfulTextRef.current,
          start: "top 90%",
        },
      });

      // 2. 红色波浪线/下划线展开动画
      gsap.from(wavyRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.5,
        delay: 0.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: impactfulTextRef.current,
          start: "top 90%",
        },
      });

      // 3. 底部文字与图标进入动画 (翻转一次)
      const footerChars = visionRef.current?.querySelectorAll('span');
      if (footerChars) {
        const targets = [...Array.from(footerChars), iconCRef.current];
        gsap.fromTo(targets, 
          { rotateY: 0 },
          {
            rotateY: 360,
            duration: 1.2,
            stagger: 0.05,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: visionRef.current,
              start: "top 95%",
            },
            onComplete: () => {
              gsap.set(targets, { rotateY: 0 });
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 动画处理辅助函数
  const handleSocialHover = (e: React.MouseEvent<HTMLAnchorElement>, active: boolean) => {
    const line = e.currentTarget.querySelector('.bottom-line');
    if (!line) return;
    gsap.to(line, {
      scaleX: active ? 1 : 0,
      transformOrigin: "left",
      duration: 0.3,
      ease: active ? "power2.out" : "power2.inOut"
    });
  };

  const handleCharHover = (e: React.MouseEvent<HTMLSpanElement>) => {
    const target = e.currentTarget;
    if (gsap.isTweening(target)) return;
    gsap.to(target, {
      rotateY: 360,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(target, { rotateY: 0 });
      }
    });
  };

  return (
    <footer ref={containerRef} className="relative w-full overflow-hidden font-sans">
      {/* Top Section: Ready to build something impactful? */}
      <div className="bg-gray-50 py-8 md:py-10 px-6 md:px-12 lg:px-16">
        <div className="max-w-[1920px] mx-auto">
          <h2 
            ref={impactfulTextRef}
            className="text-4xl md:text-6xl font-bold tracking-tighter text-black leading-[0.9] relative text-left inline-block"
          >
            Ready to build <br />
            something <span className="relative inline-block overflow-visible">
              impactful?
              <div 
                ref={wavyRef}
                className="absolute left-0 bottom-[-2px] md:bottom-[-4px] w-full h-[4px] md:h-[6px] bg-[#FF0000] z-[50]"
                style={{ transformOrigin: 'left center' }}
              />
            </span>
          </h2>
        </div>
      </div>

      {/* Middle Section: Main Footer Content */}
      <div className="bg-[#191919] text-white py-8 md:py-10 px-6 md:px-12 lg:px-16">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* Column 1: Logo & Info */}
          <div className="md:col-span-3 space-y-12">
            <div className="text-3xl font-serif tracking-widest uppercase"></div>
            <div className="text-[10px] md:text-xs space-y-1 font-bold text-gray-400">
              <p>Qola</p>
              <p>Al Barsha</p>
              <p>Dubai Al Barsha</p>
              <p>UAE</p>
            </div>
            <div className="space-y-4 pt-4">
              <Link href="mailto:contact@qolapouch.com" className="text-sm border-b border-white/30 hover:border-white pb-1 group flex items-center w-fit transition-colors">
                contact@qolapouch.com <span className="ml-1 inline-block transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
              </Link>
              <Link href="tel:+11111111111" className="text-sm border-b border-white/30 hover:border-white pb-1 group flex items-center w-fit transition-colors">
                +11 11 1111 1111 <span className="ml-1 inline-block transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
              </Link>
            </div>
          </div>

          {/* Column 2: Navigate */}
          <div className="md:col-span-3">
            <h3 className="text-xs text-gray-500 mb-8 font-semibold tracking-widest uppercase">( Navigate )</h3>
            <ul className="flex flex-col gap-y-1 group/nav">
              {NAV_LINKS.map((item, index) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase()}`} 
                    className={`text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter transition-colors inline-block 
                      ${index === 0 
                        ? 'text-white group-hover/nav:text-gray-500 hover:!text-white' 
                        : 'text-gray-500 hover:text-white'}`}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="md:col-span-2">
            <h3 className="text-xs text-gray-500 mb-8 font-medium uppercase">( Services )</h3>
            <ul className="space-y-1 text-[10px] md:text-xs font-bold text-gray-400">
              {SERVICE_LINKS.map((item) => (
                <li key={item}>
                  <span className="cursor-default hover:text-white transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Stay Connected */}
          <div className="md:col-span-3 space-y-12">
            <div>
              <h3 className="text-xs text-gray-500 mb-8 font-semibold tracking-widest uppercase">( Stay Connected )</h3>
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-[10px] md:text-xs font-bold">
                {SOCIAL_LINKS.map((item) => (
                  <Link 
                    key={item.name} 
                    href={item.href} 
                    className="relative text-gray-400 hover:text-white transition-colors py-0.5 group"
                    onMouseEnter={(e) => handleSocialHover(e, true)}
                    onMouseLeave={(e) => handleSocialHover(e, false)}
                    aria-label={`Follow us on ${item.name}`}
                  >
                    {item.name}
                    <div className="bottom-line absolute bottom-0 left-0 w-full h-[1px] bg-white scale-x-0 origin-left" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-6 pt-12 border-t border-gray-800">
              <p className="text-sm text-gray-400 leading-relaxed font-medium">
                If you have any questions about the guide, please contact us, and we will assign a representative to assist you.
              </p>
              <div className="relative mt-8">
                <input 
                  type="email" 
                  id="footer-email"
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-gray-700 py-4 pr-12 text-sm focus:border-white outline-none transition-all placeholder:opacity-0"
                />
                <label 
                  htmlFor="footer-email"
                  className="absolute left-0 top-4 text-gray-600 text-sm transition-all duration-300 pointer-events-none
                    peer-focus:-translate-y-7 peer-focus:text-xs peer-focus:text-white
                    peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-white"
                >
                  Your email <span className="text-red-600 font-bold">*</span>
                </label>
                <button className="absolute right-0 bottom-3 p-2 rounded-full border border-gray-700 hover:border-white hover:bg-white hover:text-black transition-all group/btn overflow-hidden" aria-label="Subscribe">
                  <div className="relative w-4 h-4">
                    <svg 
                      className="absolute inset-0 transition-transform duration-500 ease-in-out group-hover/btn:translate-x-8 -translate-x-0"
                      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                    <svg 
                      className="absolute inset-0 transition-transform duration-500 ease-in-out -translate-x-8 group-hover/btn:translate-x-0"
                      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Vitanic Vision */}
      <div className="bg-[#191919] text-white pt-24 pb-12 px-6 md:px-12 lg:px-16 border-t border-gray-900">
        <div className="max-w-[1920px] mx-auto relative pt-24 pb-4">
          <div className="flex justify-between text-[10px] md:text-xs text-gray-600 font-bold mb-4">
            <div>All rights reserved — 2026</div>
            <div>© VitanicVision</div>
          </div>
          <div className="relative flex items-end justify-center gap-12">
            <h1 
              ref={visionRef}
              className="text-[12vw] font-medium tracking-tighter text-black select-none leading-[0.8] flex overflow-hidden lg:opacity-100"
            >
              {"Vitanic Vision".split("").map((char, i) => (
                <span 
                  key={i} 
                  className="inline-block min-w-[0.2em] transform-gpu"
                  onMouseEnter={handleCharHover}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>
            <div 
              ref={iconCRef}
              className="text-xl md:text-2xl text-black border-[1px] md:border-2 border-black rounded-full w-8 h-8 md:w-12 md:h-12 flex items-center justify-center font-bold mb-[1.5vw] cursor-pointer"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  rotateY: 360,
                  duration: 0.8,
                  ease: "power2.out",
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  rotateY: 0,
                  duration: 0.5,
                  ease: "power2.inOut",
                });
              }}
            >
              C
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
