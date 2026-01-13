"use client";

import { useState, memo } from "react";

const NAV_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'Products', href: '#' },
  { label: 'Shop', href: '#' },
  { label: 'Locator', href: '#' },
  { label: 'Contact', href: '#' }
];

const MOBILE_SHORTCUTS = ['Home', 'Shop'];
// 预先过滤移动端链接，避免在每轮渲染中执行 filter
const MOBILE_NAV_LINKS = NAV_LINKS.filter(link => MOBILE_SHORTCUTS.includes(link.label));

interface NavLinkProps {
  label: string;
  href: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

// 提取并使用 memo 优化，避免不必要的重新渲染
const NavLink = memo(({ label, href, className = "", onClick }: NavLinkProps) => (
  <a
    href={href}
    className={`relative py-1 group transition-opacity ${className}`}
    onClick={onClick || ((e) => e.preventDefault())}
  >
    {label}
    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-current group-hover:w-full transition-all duration-300 ease-out"></span>
  </a>
));

NavLink.displayName = "NavLink";

export default function PortalHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 使用稳定的函数引用
  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const handleOverlayLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 py-4 px-4 md:px-8 flex justify-between items-center z-[70] transition-colors duration-500 ${isMenuOpen ? 'text-white' : 'text-white mix-blend-difference'}`}>
        <div className="relative w-24 h-6 md:w-28 md:h-8 flex items-center">
          <span className="font-serif text-2xl font-bold tracking-widest leading-none">QOLA</span>
        </div>

        {/* 桌面端导航 */}
        <nav className={`hidden md:flex gap-10 text-sm tracking-[0.2em] uppercase font-medium items-center absolute left-1/2 -translate-x-1/2 transition-opacity duration-500 ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          {NAV_LINKS.map((link) => (
            <NavLink key={link.label} {...link} />
          ))}
        </nav>

        {/* 移动端快捷导航 */}
        <nav className={`flex md:hidden gap-5 text-sm uppercase tracking-[0.2em] font-medium items-center absolute left-1/2 -translate-x-1/2 transition-opacity duration-500 ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          {MOBILE_NAV_LINKS.map((link) => (
            <NavLink key={link.label} {...link} />
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
        <nav className={`flex flex-col items-center gap-8 text-3xl md:text-5xl font-serif text-[#FAF7F2] [perspective:1000px] transition-all duration-500 delay-300 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {NAV_LINKS.map((link) => (
            <a 
              key={link.label}
              href={link.href} 
              className="relative group py-2" 
              onClick={handleOverlayLinkClick}
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-current group-hover:w-full transition-all duration-300 ease-out"></span>
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}


