import React from 'react'

type CardItem = {
  id: number
  title: string
  description: string
}

const items: CardItem[] = [
  { id: 1, title: 'Sales Support', description: 'Leverage curated networks to accelerate sales and partnerships' },
  { id: 2, title: 'Fundraising Support', description: 'Craft investor‑ready narratives and secure the right capital.' },
  { id: 3, title: 'Tech Support', description: 'Engineer scalable, resilient, and future‑proof technology stacks' },
  { id: 4, title: 'Talent Support', description: 'Recruit high‑impact leaders and teams that drive scale' },
  { id: 5, title: 'Marketing Support', description: 'Transform positioning into measurable demand and growth' },
  { id: 6, title: 'Legal Support', description: 'Establish governance and compliance that safeguard growth' },
  { id: 7, title: 'Financial Models', description: 'Build investor‑grade models and decks that win funding' },
  { id: 8, title: 'Operations Support', description: 'Remove bottlenecks with processes designed for scale.' },
  { id: 9, title: 'Accounting Support', description: 'Deliver financial clarity and credibility trusted by investors' },
  { id: 10, title: 'Strategic Guidance', description: 'Drive repeatable growth with disciplined PMF and GTM playbooks' },
]

const Card: React.FC<{ item: CardItem }> = ({ item }) => {
  const defaultIcon = new URL(`../assets/images/${item.id}.svg`, import.meta.url).toString()
  const hoverIcon = new URL(`../assets/images/${item.id}-w.svg`, import.meta.url).toString()
  return (
    <div
      className="group relative w-[100px] h-[120px] md:w-[240px] md:h-[260px] shrink-0 rounded-2xl border border-black/5 bg-transparent shadow-sm transition-shadow duration-300 hover:shadow-lg"
    >
      <div className="rounded-2xl h-full w-full p-3 md:p-6 bg-[#F9F6F6] transition-[background-color,transform] duration-300 group-hover:bg-[#FC4C00] will-change-transform flex flex-col items-center text-center group-hover:scale-[1.02]">
        <div className="relative mb-3 md:mb-6 h-6 w-6 md:h-14 md:w-14 mx-auto">
          <img
            src={defaultIcon}
            alt=""
            className="h-full w-full object-contain transition-opacity duration-200 group-hover:opacity-0"
          />
          <img
            src={hoverIcon}
            alt=""
            className="absolute left-0 top-0 h-full w-full object-contain opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          />
        </div>
        <h3 className="mb-1 font-urbanist font-bold text-[9px] md:text-[20.98px] text-[#141414] transition-colors duration-300 group-hover:text-white">
          {item.title}
        </h3>
        <p className="font-urbanist font-normal text-[6px] md:text-[12.59px] leading-snug text-neutral-700 transition-colors duration-300 group-hover:text-white/90">
          {item.description}
        </p>
      </div>
    </div>
  )
}

function MarqueeRow({ direction }: { direction: 'rtl' | 'ltr' }) {
  // Duplicate list to enable seamless 50% translate loop
  const doubled = [...items, ...items]
  const animation = direction === 'rtl' ? 'animate-marquee-rtl' : 'animate-marquee-ltr'
  return (
    <div className="relative w-full overflow-hidden py-4 ">
      {/* gradient fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-white/0" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-white/0" />

      <div className="[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] px-4 md:px-6">
        <div
          className={`${animation} motion-reduce:animate-none flex w-[max-content] gap-4 md:gap-6`}
          style={{ willChange: 'transform' }}
        >
          {doubled.map((item, idx) => (
            <Card key={`${item.id}-${idx}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

const WhatYouGet: React.FC = () => {
  return (
    <section id="offerings" className="mx-auto max-w-[1400px] px-4 py-12 max-[767px]:pb-6">
      <h2 className="mb-8 text-center font-roboto-condensed font-bold text-[40px] md:text-[100px] leading-none text-[#141414] tracking-tight">
      <span className="text-black">What </span>
      <span className="text-[#FC4C00]">You Get</span>
      </h2>

      {/* Top row: right -> left */}
      <div className="group/row">
        <MarqueeRow direction="rtl" />
      </div>

      {/* Bottom row: left -> right */}
      <div className="group/row">
        <MarqueeRow direction="ltr" />
      </div>

      {/* Pause on hover for both rows */}
      <style>{`
        .group\\/row:hover .animate-marquee-rtl,
        .group\\/row:hover .animate-marquee-ltr { animation-play-state: paused; }
      `}</style>
    </section>
  )
}

export default WhatYouGet


