// Minimal Tailwind + TSX component
// Replace the icon URLs with your provided logo images when ready.

import v1 from "../assets/images/v-1.svg";
import v2 from "../assets/images/v-2.svg";
import v3 from "../assets/images/v-3.svg";
import v4 from "../assets/images/v-4.svg";

export default function AboutValues() {
  const items = [
    {
      title: "Trusted Partner",
      body:
        "We believe trust and mutual support is a cornerstone of the work we do. From our investors to our founders, we believe in transparency with each other as well as following through on commitments.",
      icon: v1,
    },
    {
      title: "Conviction-led",
      body:
        "We are decisive and believe in honouring our decisions. To remain accountable, every decision is consensus based and evidence driven; we don’t mind putting our judgement on the line.",
      icon: v2,
    },
    {
      title: "Beyond Capital Returns",
      body:
        "Our work is purpose-led and that drives our investment philosophy. We care about our impact on the overall community and like to share our learnings across.",
      icon: v3,
    },
    {
      title: "Here for Good",
      body:
        "We focus on building long-term and sustainable partnerships. We value diversity in our community and consider it a strong tenet of the Uraan legacy.",
      icon: v4,
    },
  ] as const;

  return (
    <section className="w-full bg-white text-black">
      <div className="mx-auto max-w-[1280px] px-6 py-14 md:py-20">
        <h2 className="text-center font-roboto-condensed font-bold leading-none text-[48px] md:text-[80px]">
          Our Values
        </h2>

        {/* 4-in-a-row on desktop; equal card sizing */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-stretch gap-6 md:gap-8 auto-rows-[1fr]">
          {items.map((it) => (
            <article
              key={it.title}
              className="group bg-[#F3F3F3] rounded-md p-6 flex flex-col h-full text-center ring-1 ring-black/10 transition-all duration-300 hover:-translate-y-1 hover:ring-[#FC4C00] hover:bg-[#FC4C00]"
              style={{ minHeight: 280 }}
            >
              {/* Icon (swap src with your assets). Filters make it white on hover */}
              <div className="mx-auto flex items-center justify-center">
                <img
                  src={it.icon}
                  alt=""
                  className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:brightness-0 group-hover:invert"
                  draggable={false}
                />
              </div>

              <h3 className="mt-4 font-roboto-condensed font-bold text-[20px] md:text-[22px] text-[#FC4C00] transition-colors duration-300 group-hover:text-white">
                {it.title}
              </h3>
              <p className="mt-2 text-[13px] md:text-[14px] leading-relaxed text-black/80 transition-colors duration-300 group-hover:text-white/90">
                {it.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
