
import React from "react";

const ITEMS = [
  { title: "BUILD PRODUCTS THAT MATTER", text: "Turn bold ideas into scalable ventures with Uraan’s expert team." },
  { title: "UNLOCK MARKET GROWTH", text: "Sharpen positioning and go-to-market. Identify channels that compound and scale efficiently." },
  { title: "RAISE SMART CAPITAL", text: "Craft an investor-ready narrative, data room, and warm intros to aligned capital for your stage." },
  { title: "EXECUTE WITH PRECISION", text: "Roadmaps, operating cadence, and metrics that turn plans into measurable outcomes." },
] as const;

export default function WhatWeHelpYouDoSection() {
  const [active, setActive] = React.useState(1);

  // Auto-swipe: move to next heading every 3s
  React.useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % ITEMS.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="w-full px-4 md:px-8 xl:px-20 pt-12 md:pt-16 xl:pt-4 pb-16 md:pb-24">
      {/* Top Heading */}
      <h2 className="font-roboto-condensed font-bold leading-[1] tracking-[0.01em] text-[42px] md:text-[clamp(32px,6vw,96px)] mb-6 md:mb-10 text-center">
        <span className="text-black">What We </span>
        <span className="text-[#FC4C00]">Help You Do</span>
      </h2>

      {/* Main content area with headings on left and description on right */}
      <div className="flex flex-row gap-4 md:gap-12">
        {/* Left: List of headings */}
        <div className="flex-1">
          <div role="tablist" aria-label="What We Help You Do" className="space-y-2 md:space-y-4">
            {ITEMS.map((item, i) => {
              const isActive = i === active;
              return (
                <button
                  key={item.title}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="wwehd-panel"
                  onClick={(e) => {
                    setActive(i);
                    (e.currentTarget as HTMLButtonElement).blur(); // <-- blur to drop focus color
                  }}
                  className={[
                    "block w-full text-left uppercase font-roboto-condensed font-[800] tracking-[0.01em]",
                    "text-[23px] md:text-[clamp(52px,3.5vw,42px)] leading-[1]",
                    "transition-colors duration-200 focus:outline-none",
                    // Inactive no longer becomes bright orange on hover/focus
                    isActive ? "text-[#FC4C00]" : "text-orange-300 hover:text-orange-400 focus:text-orange-400",
                  ].join(" ")}
                >
                  {item.title}
                </button>
              );
            })}
          </div>
        </div>

{/* Right: Dynamic description text for active heading */}
<div className="flex-1 flex items-start" id="wwehd-panel" aria-live="polite">
  <div
    key={active}
    className={[
      "text-center mx-auto max-w-[28ch]",
      "font-urbanist font-bold",
      "text-[9px] md:text-[25px] leading-[1] tracking-[0.01em]",
      "transition-opacity duration-300",
    ].join(" ")}
  >
    <p className="!text-[#5B5B5B]">{ITEMS[active].text}</p>
    {/* If it still shows black, force hex: <p className="!text-[#5B5B5B]">... */}
  </div>
</div>


      </div>
    </section>
  );
}
