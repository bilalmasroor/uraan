import blacklogo from "../assets/images/blacklogo.png";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#fafafa] text-black">
      <div className="w-full max-w-[1280px] mx-auto px-8 md:px-12 xl:px-16 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 items-start">
          
          {/* --- Col 1: Logo + tagline + socials --- */}
          <div>
            <a href="/" className="inline-block">
              <img
                src={blacklogo}
                alt="Uraan Logo"
                className="h-[56px] w-auto mb-4 hover:opacity-80 transition-opacity"
              />
            </a>
            <p className="font-roboto text-black/80 text-[16px] md:text-[18px] leading-snug">
              Empowering entrepreneurs to move the world forward.
            </p>

            <div className="mt-6 flex items-center gap-4">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-10 w-10 flex items-center justify-center rounded-full border border-black/30 hover:bg-[#FC4C00] hover:border-[#FC4C00] transition-all"
                >
                  <Icon size={18} className="text-black group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* --- Col 2 --- */}
          <div className="flex flex-col gap-3 font-homenaje text-[18px] uppercase">
            <a href="#about" className="hover:text-[#FC4C00] transition">
              About
            </a>
            <a href="#team" className="hover:text-[#FC4C00] transition">
              Team
            </a>
          </div>

          {/* --- Col 3 --- */}
          <div className="flex flex-col gap-3 font-homenaje text-[18px] uppercase">
            <a href="#offerings" className="hover:text-[#FC4C00] transition">
              Offerings
            </a>
            <a href="#partners" className="hover:text-[#FC4C00] transition">
              Partners
            </a>
          </div>

          {/* --- Col 4: CTA + Copyright (bottom aligned) --- */}
          <div className="flex flex-col items-start md:items-end justify-between h-full">
            <div className="inline-flex overflow-hidden rounded-full shadow-md border border-black/10 mb-6">
              <span className="select-none bg-[#FC4C00] text-white px-5 py-2 text-sm md:text-base">
                Get More Information
              </span>
              <button
                type="button"
                onClick={() => window.openContactModal?.()}
                className="bg-black text-white px-5 py-2 text-sm md:text-base hover:bg-[#222] transition"
              >
                Contact Us
              </button>
            </div>

            <p className="text-sm md:text-base text-right w-full border-t border-black/10 pt-4">
              © 2025 <span className="font-semibold">Branding2go</span>. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
