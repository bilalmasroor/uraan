import whitelogo from "../assets/images/whitelogo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const closeDrawer = () => setIsDrawerOpen(false);

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
    <>
      {/* ---------- DESKTOP HEADER ---------- */}
      <header className="w-full bg-black border-b border-white/20 fixed top-0 left-0 z-50">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="hidden md:grid grid-cols-[140px_1fr_180px] items-center h-[90px]">
            {/* Logo */}
            <Link to="/" className="flex items-center w-[140px]">
              <img src={whitelogo} alt="Uraan" className="h-12 w-auto" />
            </Link>

            {/* Navigation */}
            <nav className="flex justify-center">
              <ul className="flex items-center gap-16">
                <li>
                  <Link
                    to="/about"
                    className="font-homenaje text-[36px] uppercase text-white hover:text-[#FC4C00] transition-colors"
                  >
                    ABOUT
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => handleSectionClick("offerings")}
                    className="font-homenaje text-[36px] uppercase text-white hover:text-[#FC4C00] transition-colors"
                  >
                    OFFERINGS
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSectionClick("team")}
                    className="font-homenaje text-[36px] uppercase text-white hover:text-[#FC4C00] transition-colors"
                  >
                    TEAM
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSectionClick("partners")}
                    className="font-homenaje text-[36px] uppercase text-white hover:text-[#FC4C00] transition-colors"
                  >
                    PARTNERS
                  </button>
                </li>
              </ul>
            </nav>

            {/* Contact Us Pill */}
            <div className="flex justify-end">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.openContactModal?.();
                }}
                className="font-homenaje text-[24px] uppercase bg-[#FC4C00] text-white py-2 px-8 rounded-full 
                transition-all duration-300 hover:bg-white hover:text-[#FC4C00] hover:shadow-[0_0_15px_rgba(252,76,0,0.6)] hover:scale-[1.03]"
              >
                Contact Us
              </button>
            </div>
          </div>

          {/* ---------- MOBILE HEADER ---------- */}
          <div className="md:hidden flex items-center justify-between h-[70px]">
            <Link to="/" className="flex items-center">
              <img src={whitelogo} alt="Uraan" className="h-10 w-auto" />
            </Link>

            <button
              onClick={toggleDrawer}
              className="flex flex-col gap-1 p-2"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
            </button>
          </div>
        </div>
      </header>

      {/* ---------- MOBILE DRAWER ---------- */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black z-40 md:hidden">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <Link to="/" onClick={closeDrawer}>
                <img src={whitelogo} alt="Uraan" className="h-10 w-auto" />
              </Link>
              <button
                onClick={closeDrawer}
                className="flex flex-col gap-1 p-2"
                aria-label="Close menu"
              >
                <div className="w-6 h-0.5 bg-white rotate-45 translate-y-1"></div>
                <div className="w-6 h-0.5 bg-white -rotate-45 -translate-y-1"></div>
              </button>
            </div>

            {/* Mobile Links */}
            <nav className="flex-1 p-6">
              <ul className="space-y-8">
                <li>
                  <Link
                    to="/about"
                    onClick={closeDrawer}
                    className="block font-homenaje text-[48px] uppercase text-gray-300 hover:text-white transition-colors"
                  >
                    ABOUT
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleSectionClick("offerings");
                      closeDrawer();
                    }}
                    className="block font-homenaje text-[48px] uppercase text-gray-300 hover:text-white transition-colors w-full text-left"
                  >
                    OFFERINGS
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleSectionClick("team");
                      closeDrawer();
                    }}
                    className="block font-homenaje text-[48px] uppercase text-gray-300 hover:text-white transition-colors w-full text-left"
                  >
                    TEAM
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleSectionClick("partners");
                      closeDrawer();
                    }}
                    className="block font-homenaje text-[48px] uppercase text-gray-300 hover:text-white transition-colors w-full text-left"
                  >
                    PARTNERS
                  </button>
                </li>

                {/* Mobile Contact Button */}
                <li>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      window.openContactModal?.();
                      closeDrawer();
                    }}
                    className="block font-homenaje text-[48px] uppercase text-[#FC4C00] hover:text-white transition-colors w-full text-left"
                  >
                    CONTACT
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}

      <main className="pt-[70px] md:pt-[88px]" />
    </>
  );
}
