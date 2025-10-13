import blacklogo from "../assets/images/blacklogo.png";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  // Same smooth scroll logic as header
  const handleSectionClick = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-[#fafafa] text-black">
      <div className="w-full max-w-[1280px] mx-auto px-8 md:px-12 xl:px-16 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 items-start">
          
          {/* --- Col 1: Logo + email + socials --- */}
          <div>
            <Link to="/" className="inline-block">
              <img
                src={blacklogo}
                alt="Uraan Logo"
                className="h-[56px] w-auto mb-4 hover:opacity-80 transition-opacity"
              />
            </Link>

            {/* ✅ Updated clickable email */}
            <a
              href="mailto:support@uraanvc.com"
              className="font-roboto text-black text-[16px] md:text-[18px] leading-snug hover:text-[#FC4C00] transition-colors duration-300"
            >
              support@uraanvc.com
            </a>

            {/* ✅ Social Icons with proper links */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61581866656168"
                target="_blank"
                rel="noreferrer"
                className="group h-10 w-10 flex items-center justify-center rounded-full border border-black/30 hover:bg-[#FC4C00] hover:border-[#FC4C00] transition-all"
              >
                <Facebook size={18} className="text-black group-hover:text-white transition-colors" />
              </a>

              <a
                href="https://www.instagram.com/uraann.vc/"
                target="_blank"
                rel="noreferrer"
                className="group h-10 w-10 flex items-center justify-center rounded-full border border-black/30 hover:bg-[#FC4C00] hover:border-[#FC4C00] transition-all"
              >
                <Instagram size={18} className="text-black group-hover:text-white transition-colors" />
              </a>

              <a
                href="#"
                className="group h-10 w-10 flex items-center justify-center rounded-full border border-black/30 hover:bg-[#FC4C00] hover:border-[#FC4C00] transition-all"
              >
                <Linkedin size={18} className="text-black group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* --- Col 2: Navigation Links --- */}
          <div className="flex flex-col gap-3 font-homenaje text-[18px] uppercase">
            {/* ✅ About page navigates properly using Link */}
            <Link
              to="/about"
              className="hover:text-[#FC4C00] transition-colors duration-300"
            >
              About
            </Link>

            {/* ✅ Team section (smooth scroll) */}
            <button
              onClick={() => handleSectionClick("team")}
              className="text-left hover:text-[#FC4C00] transition-colors duration-300"
            >
              Team
            </button>
          </div>

          {/* --- Col 3: Offerings / Partners --- */}
          <div className="flex flex-col gap-3 font-homenaje text-[18px] uppercase">
            <button
              onClick={() => handleSectionClick("offerings")}
              className="text-left hover:text-[#FC4C00] transition-colors duration-300"
            >
              Offerings
            </button>
            <button
              onClick={() => handleSectionClick("partners")}
              className="text-left hover:text-[#FC4C00] transition-colors duration-300"
            >
              Partners
            </button>
          </div>

          {/* --- Col 4: CTA + Copyright --- */}
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
              © 2025 <span className="font-semibold">Uraanvc</span> Powered by <span className="font-semibold">Branding2go</span>. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
