import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import aboutImage from "../assets/images/about-1.svg";

export default function Aboutus() {
  const DESKTOP_SEGMENTS = [
    "We support innovative founders",
    "moving the world forward",
  ];
  const MOBILE_SEGMENTS = [
    "We support innovative",
    "founders moving",
    "the world forward",
  ];
  const TOTAL = DESKTOP_SEGMENTS.join("").length;

  const [count, setCount] = useState(0);
  const TYPE_SPEED_MS = 45;

  useEffect(() => {
    if (count >= TOTAL) return;
    const t = setInterval(
      () => setCount((c) => Math.min(c + 1, TOTAL)),
      TYPE_SPEED_MS
    );
    return () => clearInterval(t);
  }, [count]);

  function sliceSegments(segments: string[], chars: number) {
    const parts: string[] = [];
    let used = 0;
    for (const s of segments) {
      const remain = Math.max(0, chars - used);
      parts.push(s.slice(0, Math.min(remain, s.length)));
      used += s.length;
    }
    return parts;
  }
  function activeLineIndex(segments: string[], chars: number) {
    let used = 0;
    for (let i = 0; i < segments.length; i++) {
      if (chars <= used + segments[i].length) return i;
      used += segments[i].length;
    }
    return segments.length - 1;
  }

  const desktopParts = useMemo(() => sliceSegments(DESKTOP_SEGMENTS, count), [count]);
  const mobileParts  = useMemo(() => sliceSegments(MOBILE_SEGMENTS, count), [count]);
  const desktopActive = activeLineIndex(DESKTOP_SEGMENTS, count);
  const mobileActive  = activeLineIndex(MOBILE_SEGMENTS, count);

  return (
    // FIX: prevent any stray horizontal overflow at the page level
    <main className="flex flex-col items-center w-full overflow-x-hidden">
      <section
        // FIX: remove fixed 1920px width; use full width with a max
        className="bg-black text-white w-full max-w-[1920px] h-[290px] md:h-[400px] flex items-center justify-center"
        aria-label="We support innovative founders moving the world forward"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-[36px] md:text-[65px] leading-[1.15] md:leading-[1.05] text-center font-roboto-condensed font-bold uppercase"
        >
          {/* Desktop (2 lines) */}
          <span className="hidden md:block">
            {desktopParts[0]}
            {desktopActive === 0 && <Caret typing={count < TOTAL} />}
          </span>
          <span className="hidden md:block">
            {desktopParts[1]}
            {desktopActive === 1 && <Caret typing={count < TOTAL} />}
          </span>

          {/* Mobile (3 lines) */}
          <span className="block md:hidden">
            {mobileParts[0]}
            {mobileActive === 0 && <Caret typing={count < TOTAL} />}
            <br />
            {mobileParts[1]}
            {mobileActive === 1 && <Caret typing={count < TOTAL} />}
            <br />
            {mobileParts[2]}
            {mobileActive === 2 && <Caret typing={count < TOTAL} />}
          </span>
        </motion.h1>
      </section>

      {/* keyframes for blinking caret */}
      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>

      {/* About section below hero */}
      <section className="w-full bg-white text-black overflow-x-hidden">
        <div className="mx-auto max-w-[1280px] px-6 py-8 md:py-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-roboto-condensed font-bold uppercase leading-none text-center text-[64px] md:text-[128px] text-black"
          >
            About Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="mt-4 text-center text-[#FC4C00] font-roboto-condensed font-bold text-[20px] md:text-[40px]"
          >
            Learn more about our vision and the team behind Uraan
          </motion.p>

          <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* Image + accents */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative inline-block w-full max-w-[640px]"
            >
              <span aria-hidden className="absolute -z-10 left-6 top-6 w-full h-full rounded-md bg-[#FC4C00]" />
              <span aria-hidden className="absolute -left-4 top-8 bottom-0 w-[14px] bg-[#FC4C00] rounded-sm" />
              <span aria-hidden className="absolute left-0 right-16 -bottom-4 h-[14px] bg-[#FC4C00] rounded-sm" />

              {/* FIX: make image responsive on small screens (no fixed 420px) */}
              <img
                src={aboutImage}
                alt="Uraan workspace"
                className="block w-full md:w-[600px] aspect-[5/3] object-cover rounded-sm shadow-xl"
                draggable={false}
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
              className="space-y-5 text-[16px] md:text-[18px] leading-relaxed text-[#5B5B5B] max-w-[680px]"
            >
              <motion.p variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}>
                At Uraan, we act as Co-Builders!
              </motion.p>
              <motion.p variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}>
                Founded with the vision to empower entrepreneurs and accelerate innovation in Pakistan. By bridging expertise, capital, and execution under one roof, we’re not just supporting startups — we’re actively co-creating them.
              </motion.p>
              <motion.p variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}>
                We go beyond just investment, our team brings strategic guidance, industry expertise, and long-term partnerships to help businesses grow sustainably.
              </motion.p>
              <motion.p variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}>
                Every founder we support, every idea we help scale, and every venture we co-create is part of a larger vision: a thriving, collaborative community of innovators, investors, and builders shaping the future of this country. Together, we’re not just launching startups — we’re building the launchpad for Pakistan’s next generation of unicorns.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Caret({ typing }: { typing: boolean }) {
  return (
    <span
      className="inline-block align-baseline w-[0.6ch] ml-[0.1ch] border-r-2"
      style={{
        animation: "blink 1s steps(1,end) infinite",
        borderColor: "currentColor",
        opacity: typing ? 1 : 0,
      }}
      aria-hidden="true"
    />
  );
}
