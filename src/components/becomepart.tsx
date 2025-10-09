import Lottie from "lottie-react";
import type { LottieRefCurrentProps } from "lottie-react";
import { useEffect, useRef, useState } from "react";
import becomepart from "../assets/Becomepart.json";
import EnhancedContactModal from "./EnhancedContactModal";

// 1920×900 aspect
export default function Becomepart({ speed = 1.5 }: { speed?: number }) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null); // observe this (the Lottie box)
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  // Play once when the Lottie box is ≥60% in view (strict start-on-reach)
  useEffect(() => {
    if (!triggerRef.current || hasPlayed) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          lottieRef.current?.play?.();
          io.disconnect(); // never replay
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.6, 0.75, 1],
        root: null,
        rootMargin: "0px 0px -10% 0px", // avoids early trigger near bottom
      }
    );

    io.observe(triggerRef.current);
    return () => io.disconnect();
  }, [hasPlayed]);

  // Apply playback speed whenever it changes
  useEffect(() => {
    lottieRef.current?.setSpeed?.(speed);
  }, [speed]);

  // Freeze on final frame
  const freezeToLastFrame = () => {
    const total = Math.floor(lottieRef.current?.getDuration?.(true) ?? 0);
    lottieRef.current?.goToAndStop?.(Math.max(total - 1, 0), true);
  };

  // Desktop/original button style (unchanged)
  const btnBase =
    "rounded-full bg-[#ff5a1f] px-10 py-3 text-white shadow-[0_6px_18px_rgba(255,90,31,0.25)] " +
    "focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300";

  // Mobile-only smaller buttons (unchanged)
  const btnMobile =
    "inline-flex items-center justify-center leading-none rounded-[9999px] " +
    "bg-[#ff5a1f] text-white whitespace-nowrap shadow-[0_6px_18px_rgba(255,90,31,0.25)] " +
    "focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300 " +
    "h-[30px] px-3 text-[10px] min-w-[112px] " +
    "max-[360px]:h-[30px] max-[360px]:px-2.5 max-[360px]:text-[9px] max-[360px]:min-w-[100px]";

  const btnTextStyle: React.CSSProperties = { fontFamily: "Urbanist", fontWeight: 500 as any };

  return (
    <section ref={sectionRef} className="w-full" aria-label="Become a part of Uraan">
      <div className="mx-auto max-w-[1280px] px-6">
        <div ref={triggerRef} className="relative w-full aspect-[1920/900]">
          <Lottie
            autoplay={false}
            loop={false}
            animationData={becomepart}
            lottieRef={lottieRef}
            onComplete={() => {
              freezeToLastFrame();
              setHasPlayed(true);
            }}
            className="absolute inset-0 h-full w-full"
          />

          {/* ---- MOBILE overlay (only < md) ---- */}
          <div className="absolute inset-0 z-10 md:hidden">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.openContactModal?.(); }}
              aria-hidden={!hasPlayed}
              className={[
                btnMobile,
                "absolute bottom-[3.5%] left-[23%] -translate-x-1/2",
                "max-[360px]:bottom-[3%]",
                hasPlayed ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none",
              ].join(" ")}
              style={{ fontFamily: "Urbanist", fontWeight: 500 }}
            >
              Join As Investor
            </a>

            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.openEnhancedContactModal?.(); }}
              aria-hidden={!hasPlayed}
              className={[
                btnMobile,
                "absolute bottom-[3.5%] left-[77%] -translate-x-1/2",
                "max-[360px]:bottom-[3%]",
                hasPlayed ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none",
              ].join(" ")}
              style={{ fontFamily: "Urbanist", fontWeight: 500 }}
            >
              Join As Founder
            </a>
          </div>

          {/* ---- DESKTOP/TABLET overlay (unchanged md+) ---- */}
          <div className="absolute inset-0 hidden md:block">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.openContactModal?.(); }}
              aria-hidden={!hasPlayed}
              className={[
                btnBase,
                "absolute bottom-[9%] md:left-[22%] lg:left-[20%] xl:left-[23%] 2xl:left-[18%] -translate-x-1/2",
                hasPlayed ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none",
              ].join(" ")}
              style={btnTextStyle}
            >
              Join As Investor
            </a>

            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.openEnhancedContactModal?.(); }}
              aria-hidden={!hasPlayed}
              className={[
                btnBase,
                "absolute bottom-[9%] md:left-[78%] lg:left-[80%] xl:left-[79%] 2xl:left-[82%] -translate-x-1/2",
                hasPlayed ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none",
              ].join(" ")}
              style={btnTextStyle}
            >
              Join As Founder
            </a>
          </div>
        </div>
      </div>
      <EnhancedContactModal />
    </section>
  );
}
