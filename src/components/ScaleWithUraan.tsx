import bg from "../assets/images/ScaleWithUraan-bg.svg";
import logo from "../assets/images/ScaleWithUraan-logo.png";

export default function ScaleWithUraan({ onCtaClick: _onCtaClick }: { onCtaClick?: () => void }) {
  return (
    <section id="partners" className="w-full bg-black">
      {/* ⬇️ Mobile 185px, md+ 400px */}
      <div className="relative w-full h-[185px] md:h-[400px] overflow-hidden">
        <img src={bg} alt="" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-4 md:px-6">
          <h2 className="font-roboto-condensed font-bold uppercase leading-[1] tracking-[0.01em] text-white text-[22px] md:text-[60px]">
            READY TO SCALE WITH URAAN?
          </h2>

          {/* Removed subtitle and CTA button */}

          <div className="mt-4 md:mt-6 flex flex-col items-center gap-2 md:gap-3">
            <span className="font-urbanist font-[700] uppercase leading-[1] tracking-[0.01em] text-white/90 text-[16px] md:text-[40px]">
              SUPPORTED BY 
            </span>
            <img src={logo} alt="Supported by" className="mt-2 h-6 md:mt-6 md:h-12 w-[40px] md:w-[100px] object-contain" draggable={false} />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/30" />
      </div>
    </section>
  );
}
