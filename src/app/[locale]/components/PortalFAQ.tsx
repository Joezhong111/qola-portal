"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import PremiumButton from "./PremiumButton";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const FAQ_DATA = [
  {
    question: "Is it safer than smoking?",
    answer: (
      <>
        <p className="mb-4 text-[#424242] text-sm">Nicotine pouches are different from smoking.</p>
        <p>
          While not risk-free, nicotine pouches eliminate combustion-related
          toxins found in cigarettes. Many see them as a less harmful
          alternative.
        </p>
      </>
    ),
  },
  {
    question: "How do you use a nicotine pouch?",
    answer: (
      <>
        <p className="mb-4 text-[#424242] text-sm">
          Define who you are. Shape how the world sees you.
        </p>
        <p>
          Place qola under your upper lip (do not swallow or chew), let it sit
          for up to 60 minutes, once satisfied, dispose of the pouch in a waste
          bin.
        </p>
      </>
    ),
  },
  {
    question: "Are they suitable for quitting smoking?",
    answer: (
      <>
        <p className="mb-4 text-[#424242] text-sm">
          Qola is not a smoking cessation therapy.
        </p>
        <p>
          Qola is not a smoking cessation therapy. if you want to quit smoking,
          consult a registered physician about fda approved nicotine replacement
          therapies.
        </p>
      </>
    ),
  },
  {
    question: "Who should not use qola?",
    answer: (
      <>
        <p className="mb-4 text-[#424242] text-sm">
          You must be at least 21-years old to purchase qola.
        </p>
        <p>
          You must be at least 21-years old to purchase qola. age-verification
          is required at the time of purchase. the product is intended for adult
          tobacco and nicotine users only and is not to be used by adults with
          cardiovascular diseases or women who are pregnant or breastfeeding.
        </p>
      </>
    ),
  },
  {
    question: "Can qola discolor teeth?",
    answer: (
      <>
        <p className="mb-4 text-[#424242] text-sm">
          Define who you are. Shape how the world sees you.
        </p>
        <p>
          QOLA should not stain your teeth, whereas traditional snus often does.
          however, a minimal risk of slight discoloration cannot be entirely
          ruled out, as it depends on individual dental characteristics.
        </p>
      </>
    ),
  },
];

const TAGS = [
  "General questions",
  "Using pouches",
  "About qola",
  "Orders & shipping",
  "Brand Architecture",
  "Technology patent",
  "Market Differentiation",
  "About qola's ideal"
];

export default function PortalFAQ() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stRef = useRef<globalThis.ScrollTrigger | null>(null);

  const activeIndexRef = useRef(0);

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    // Reset refs array to match data length
    itemsRef.current = itemsRef.current.slice(0, FAQ_DATA.length);
    contentRefs.current = contentRefs.current.slice(0, FAQ_DATA.length);

    const mm = gsap.matchMedia();

    // Desktop: ScrollTrigger Animation
    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        // Create independent timeline
        const tl = gsap.timeline({
          paused: true,
          defaults: { ease: "none" } // Linear ease for direct scrubbing
        });

        // Initialize state: Item 0 open, others closed
        contentRefs.current.forEach((content, i) => {
          const item = itemsRef.current[i];
          const title = item?.querySelector('h3');
          
          if (content && item && title) {
            if (i === 0) {
              gsap.set(content, { height: "auto", opacity: 1, marginTop: 16 });
              gsap.set(item, { opacity: 1, paddingTop: 32, paddingBottom: 32 });
              gsap.set(title, { color: "white" });
            } else {
              gsap.set(content, { height: 0, opacity: 0, marginTop: 0 });
              gsap.set(item, { opacity: 0.3, paddingTop: 16, paddingBottom: 16 });
              gsap.set(title, { color: "#585858" }); 
            }
          }
        });

        // Build timeline: Step through each transition
        FAQ_DATA.forEach((_, i) => {
          if (i < FAQ_DATA.length - 1) {
            const currentContent = contentRefs.current[i];
            const nextContent = contentRefs.current[i + 1];
            const currentItem = itemsRef.current[i];
            const nextItem = itemsRef.current[i + 1];
            const currentTitle = currentItem?.querySelector('h3');
            const nextTitle = nextItem?.querySelector('h3');

            if (currentContent && currentItem && currentTitle && nextContent && nextItem && nextTitle) {
              tl.addLabel(`step-${i}`)
                  .to(currentContent, { height: 0, opacity: 0, marginTop: 0, duration: 1 }, i)
                  .to(currentItem, { opacity: 0.3, paddingTop: 16, paddingBottom: 16, duration: 1 }, i)
                  .to(currentTitle, { color: "#a8a29e", duration: 1 }, i)
                  
                  .to(nextContent, { height: "auto", opacity: 1, marginTop: 16, duration: 1 }, i)
                  .to(nextItem, { opacity: 1, paddingTop: 32, paddingBottom: 32, duration: 1 }, i)
                  .to(nextTitle, { color: "white", duration: 1 }, i);
            }
          }
        });

        // Link timeline to scroll
        stRef.current = ScrollTrigger.create({
          trigger: trigger,
          start: "top top",
          end: `+=${FAQ_DATA.length * 100}%`,
          pin: true,
          scrub: 1, 
          animation: tl,
          invalidateOnRefresh: true, 
        });

      }, containerRef);
      
      return () => ctx.revert();
    });

    // Mobile: Accordion Behavior
    mm.add("(max-width: 767px)", () => {
      // Initialize state for mobile (default to first open or all closed? Let's match desktop: first open)
      // Reset active index
      activeIndexRef.current = 0;

      contentRefs.current.forEach((content, i) => {
        const item = itemsRef.current[i];
        const title = item?.querySelector('h3');
        
        if (content && item && title) {
          if (i === 0) {
            gsap.set(content, { height: "auto", opacity: 1, marginTop: 16 });
            gsap.set(item, { opacity: 1, paddingTop: 32, paddingBottom: 32 });
            gsap.set(title, { color: "white" });
          } else {
            gsap.set(content, { height: 0, opacity: 0, marginTop: 0 });
            gsap.set(item, { opacity: 0.3, paddingTop: 16, paddingBottom: 16 });
            gsap.set(title, { color: "#585858" }); 
          }
        }
      });
    });

    return () => mm.revert();
  }, []);

  const handleItemClick = React.useCallback((index: number) => {
    // Check if we are on Desktop or Mobile based on window width
    // GSAP matchMedia uses 768px break point in our setup
    const isDesktop = window.innerWidth >= 768;

    if (isDesktop) {
        const trigger = triggerRef.current;
        const st = stRef.current;
        
        if(!trigger || !st) return;

        const progress = index / (FAQ_DATA.length - 1);
        const scrollPos = st.start + (st.end - st.start) * progress;

        if (Math.abs(window.scrollY - scrollPos) < 20) return;

        gsap.to(window, { scrollTo: scrollPos, duration: 1 });
    } else {
        // Mobile Logic: Accordion
        if (index === activeIndexRef.current) return; // Already open

        // Close currently active
        const oldIndex = activeIndexRef.current;
        const oldContent = contentRefs.current[oldIndex];
        const oldItem = itemsRef.current[oldIndex];
        const oldTitle = oldItem?.querySelector('h3');

        if (oldContent) gsap.to(oldContent, { height: 0, opacity: 0, marginTop: 0, duration: 0.4, ease: "power2.out" });
        if (oldItem) gsap.to(oldItem, { opacity: 0.3, paddingTop: 16, paddingBottom: 16, duration: 0.4 });
        if (oldTitle) gsap.to(oldTitle, { color: "#a8a29e", duration: 0.4 });

        // Open new item
        const newContent = contentRefs.current[index];
        const newItem = itemsRef.current[index];
        const newTitle = newItem?.querySelector('h3');

        if (newContent) gsap.to(newContent, { height: "auto", opacity: 1, marginTop: 16, duration: 0.4, ease: "power2.out" });
        if (newItem) gsap.to(newItem, { opacity: 1, paddingTop: 32, paddingBottom: 32, duration: 0.4 });
        if (newTitle) gsap.to(newTitle, { color: "white", duration: 0.4 });

        activeIndexRef.current = index;

        // Optional: Scroll slightly to ensure visibility if needed
        setTimeout(() => {
             newItem?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }, 100);
    }
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#191919] text-white">
      <div ref={triggerRef} className="min-h-screen w-full flex flex-col md:flex-row max-w-[1920px] mx-auto px-4 sm:px-8 md:px-16 lg:px-24 pt-24 md:pt-0 pb-12 md:pb-0">
        
        {/* Left Side: Title */}
        <div className="w-full md:w-1/2 flex flex-col justify-start pt-0 md:pt-32 mb-8 md:mb-0">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-heading uppercase leading-tight tracking-tighter -ml-4 md:-ml-12 lg:-ml-16">
            Question And <br />
            Answer
          </h2>
          
          <div className="mt-12 md:mt-24 lg:mt-32 max-w-md ml-8 md:ml-24 lg:ml-32">
            <p className="text-[#424242] mb-4 text-sm font-medium tracking-wide">( about qola pouches: )</p>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-8 leading-tight">
              what our first users are saying about QOLA.
            </h3>
            <PremiumButton 
              text="Our Services" 
              variant="dark" 
              className="border-transparent" 
              iconClassName="bg-[#191919] text-white"
            />
          </div>
        </div>

        {/* Right Side: Accordion */}
        <div className="w-full md:w-1/2 flex flex-col justify-center h-full relative">
            <div className="relative w-full">
                {FAQ_DATA.map((item, index) => (
                    <div 
                        key={index}
                        ref={el => { itemsRef.current[index] = el; }}
                        className="border-b border-white/20 overflow-hidden cursor-pointer"
                        style={{
                            // Set initial render state for SSR/First Paint to match logic
                            opacity: index === 0 ? 1 : 0.3,
                            paddingTop: index === 0 ? '32px' : '16px',
                            paddingBottom: index === 0 ? '32px' : '16px',
                        }}
                        onClick={() => handleItemClick(index)}
                    >
                        <h3 className="text-2xl md:text-4xl font-semibold mb-4" 
                            style={{ color: index === 0 ? 'white' : '#a8a29e' }}>
                            {item.question}
                        </h3>
                        
                        <div 
                            ref={el => { contentRefs.current[index] = el; }}
                            className="overflow-hidden cursor-auto"
                            onClick={(e) => e.stopPropagation()}
                            style={{ 
                                height: index === 0 ? 'auto' : 0, 
                                opacity: index === 0 ? 1 : 0,
                                marginTop: index === 0 ? '16px' : 0
                            }}
                        >
                            <div className="text-lg md:text-xl text-stone-300 leading-relaxed max-w-xl">
                                {item.answer}
                            </div>

                            {/* Moved Bottom Links */}
                            <div className="mt-6 flex flex-wrap gap-2">
                                {TAGS.map((tag, tIndex) => (
                                    <span key={tIndex} className="px-3 py-1 bg-[#0f0f0f] rounded-full text-sm text-white hover:bg-white/10 transition-colors cursor-pointer">
                                        {tag}
                                    </span>
                                 ))}
                            </div>
                             <a href="#" className="mt-4 mb-6 flex items-center gap-2 text-white transition-colors cursor-pointer group">
                                <span className="font-medium text-sm">Learn More</span>
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                        </div>
                    </div>
                ))}
            </div>


        </div>
      </div>
    </div>
  );
}
