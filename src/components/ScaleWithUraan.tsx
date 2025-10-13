import bg from "../assets/images/ScaleWithUraan-bg.svg";
import logo from "../assets/images/ScaleWithUraan-logo.png";

export default function ScaleWithUraan({ onCtaClick: _onCtaClick }: { onCtaClick?: () => void }) {
  return (
    <>
      <section id="partners" className="w-full bg-black">
        <div className="relative w-full h-[185px] md:h-[400px] overflow-hidden">
          {/* Background image */}
          <img src={bg} alt="" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
          <div className="absolute inset-0 bg-black/65" />

          {/* Centered content */}
          <div className="relative z-10 h-full w-full flex flex-col justify-between text-center px-4 md:px-6 py-6 md:py-10">
            {/* Heading */}
            <div className="pt-6 md:pt-10">
              <h2 className="font-roboto-condensed font-bold uppercase leading-[1] tracking-[0.01em] text-white text-[22px] md:text-[60px]">
                READY TO SCALE WITH URAAN?
              </h2>

            <span className="mt-2 md:mt-4 block font-urbanist font-[700] uppercase leading-[1] tracking-[0.01em] text-white/90 text-[16px] md:text-[40px]">
              SUPPORTED BY
            </span>
            </div>

            {/* ✅ Logo slider shifted near section bottom */}
            <div className="mt-4 md:mt-10 mb-2 md:mb-4 w-full overflow-hidden">
              <div className="marquee">
                <div className="track">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <img key={`a-${i}`} src={logo} alt="Partner logo" className="logo" draggable={false} />
                  ))}
                  {Array.from({ length: 10 }).map((_, i) => (
                    <img key={`b-${i}`} src={logo} alt="Partner logo duplicate" className="logo" draggable={false} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/30" />
        </div>
      </section>

      <style>{`
        :root {
          --gap: 1.5rem;
          --speed: 60s;
        }

        @keyframes scrollLoop {
          0% { transform: translateX(0); }
          100% { transform: translateX(-51%); }
        }

        .marquee {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .track {
          display: flex;
          align-items: center;
          gap: var(--gap);
          animation: scrollLoop var(--speed) linear infinite;
          width: max-content;
        }

        .logo {
          height: 25px;
          flex: 0 0 auto;
          object-fit: contain;
          filter: brightness(100%);
        }

        @media (min-width: 768px) {
          .logo { height: 45px; }
        }

        .marquee:hover .track {
          animation-play-state: paused;
        }
      `}</style>
    </>
  );
}
