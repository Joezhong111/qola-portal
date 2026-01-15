"use client";

import { useState, memo, useCallback } from "react";
import Link from 'next/link';
import { useParams } from "next/navigation";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";

const NAV_ITEMS = [
  { label: 'Home', path: '' },
  { label: 'Products', path: 'products' },
  { label: 'Shop', path: 'shop' },
  { label: 'Locator', path: 'locator' },
  { label: 'Contact', path: 'contact' }
];

const MOBILE_SHORTCUTS = ['Home', 'Shop'];
const DISABLED_ITEMS = ['Products', 'Shop'];

interface NavLinkProps {
  label: string;
  href: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

// 提取并使用 memo 优化，避免不必要的重新渲染
const NavLink = memo(({ label, href, className = "", onClick }: NavLinkProps) => (
  <Link
    href={href}
    className={`relative py-1 group transition-opacity ${className}`}
    onClick={onClick}
  >
    {label}
    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-current group-hover:w-full transition-all duration-300 ease-out"></span>
  </Link>
));

NavLink.displayName = "NavLink";

const handleDisabledClick = (e: React.MouseEvent) => {
  e.preventDefault();
};

export default function PortalHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const params = useParams();
  
  // 优化参数获取的健壮性，处理可能的数组情况
  const rawLocale = params?.locale;
  const locale = (Array.isArray(rawLocale) ? rawLocale[0] : rawLocale) || 'en-glo';

  // Dynamically generate links based on locale
  const navLinks = NAV_ITEMS.map(item => ({
    label: item.label,
    href: DISABLED_ITEMS.includes(item.label) ? '#' : (item.label === 'Home' ? `/${locale}` : `/${locale}/${item.path}`)
  }));

  const mobileNavLinks = navLinks.filter(link => MOBILE_SHORTCUTS.includes(link.label));

  // 使用 useCallback 确保函数引用稳定，配合 NavLink 的 memo 使用
  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);

  const handleOverlayLinkClick = (e: React.MouseEvent, label: string) => {
     if (DISABLED_ITEMS.includes(label)) {
        e.preventDefault();
        return;
     }
     setIsMenuOpen(false);
  };

  return (
    <>
      {/* Logo Layer - Keeps Logo Natural Color (No Mix Blend) */}
      <header className="fixed top-0 left-0 right-0 py-4 px-4 md:px-8 flex justify-between items-center z-[71] pointer-events-none">
        <div className="relative w-16 h-7 md:w-24 md:h-7 flex items-center pointer-events-auto">
          <Image 
            src={getAssetPath("/left-top-logo2.webp")} 
            alt="Qola Logo" 
            fill 
            className="object-contain object-left"
            priority
          />
        </div>
      </header>

      {/* Interactive Layer - Control (Nav/Button) with Mix Blend Difference */}
      <header className={`fixed top-0 left-0 right-0 py-4 px-4 md:px-8 flex justify-between items-center z-[70] transition-colors duration-500 ${isMenuOpen ? 'text-white' : 'text-white mix-blend-difference'}`}>
        {/* Logo Placeholder - Invisible but maintains layout spacing */}
        <div className="relative w-16 h-7 md:w-24 md:h-7 flex items-center invisible">
          {/* Empty placeholder div with same dimensions */}
        </div>

        {/* 桌面端导航 */}
        <nav className={`hidden md:flex gap-10 text-sm tracking-[0.2em] uppercase font-medium items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          {navLinks.map((link) => (
            <NavLink 
              key={link.label} 
              {...link} 
              onClick={DISABLED_ITEMS.includes(link.label) ? handleDisabledClick : undefined}
            />
          ))}
        </nav>


        {/* 移动端快捷导航 */}
        <nav className={`flex md:hidden gap-5 text-sm uppercase tracking-[0.2em] font-medium items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          {mobileNavLinks.map((link) => (
            <NavLink 
              key={link.label} 
              {...link} 
              onClick={DISABLED_ITEMS.includes(link.label) ? handleDisabledClick : undefined}
            />
          ))}
        </nav>

        {/* 菜单切换按钮 */}
        <button
          className="uppercase text-sm tracking-[0.2em] font-medium cursor-pointer relative z-50 group py-1 bg-transparent border-none outline-none"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? "Close" : "Menu"}
          <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-current group-hover:w-full transition-all duration-300 ease-out"></span>
        </button>
      </header>

      {/* 全屏菜单遮罩层 - 实现圆形展开效果 */}
      <div 
        className={`fixed inset-0 bg-stone-900 z-[60] flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isMenuOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible pointer-events-none'
        }`}
        style={{
          clipPath: isMenuOpen 
            ? 'circle(150% at calc(100% - 40px) 40px)' 
            : 'circle(0% at calc(100% - 40px) 40px)',
        }}
      >
        <nav className={`flex flex-col items-center gap-8 text-3xl md:text-5xl text-[#FAF7F2] [perspective:1000px] transition-all duration-500 delay-300 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {navLinks.map((link) => (
            <Link 
              key={link.label}
              href={link.href} 
              className="relative group py-2" 
              onClick={(e) => handleOverlayLinkClick(e, link.label)}
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-current group-hover:w-full transition-all duration-300 ease-out"></span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}


