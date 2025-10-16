import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import team1 from "../assets/images/team1.jpeg";

export default function MeetTheTeam() {
  const member = {
    name: "Nauman Aftab",
    role: "Co-Founder / GP",
    img: team1,
    linkedin: "https://www.linkedin.com/in/naumanaftab/",
  };

  return (
    <section id="team" className="bg-white py-4 md:py-16">
      <div className="max-w-6xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        
        {/* LEFT SIDE TEXT (fade-in) */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-left space-y-6 md:space-y-8"
        >
          <h2 className="font-['Roboto_Condensed'] font-bold leading-[1] text-[60px] md:text-[100px] tracking-tight">
            <span className="text-[#141414]">
              Meet
              <br />
            </span>
            <span className="text-[#FC4C00]">The Team</span>
          </h2>

          <p className="font-['Roboto_Condensed'] font-normal text-[14px] md:text-[22px] leading-snug text-[#595959] max-w-xl">
            At Uraan, our team is the driving force behind every successful
            venture. With a blend of investors, strategists, and innovators, we
            work together to help founders take their ideas to new heights.
          </p>
        </motion.div>

        {/* RIGHT SIDE CARD (fade-in from right, no borders) */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex justify-center md:justify-end"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden rounded-md group bg-white w-full max-w-[380px] shadow-sm"
          >
            {/* IMAGE — no border or bg */}
            <div className="relative overflow-hidden">
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-[360px] md:h-[360px] object-contain bg-white transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* FOOTER */}
            <div className="flex justify-between items-center transition-all duration-500">
              <div className="bg-white text-[#FC4C00] group-hover:bg-[#FC4C00] group-hover:text-white 
                              w-full px-3 sm:px-4 py-2 sm:py-2.5 flex justify-between items-center transition-all duration-500">
                <div>
                  <h3 className="font-['Urbanist'] font-bold text-[22px] sm:text-[26px] md:text-[28px] leading-none tracking-tight transition-all duration-500">
                    {member.name}
                  </h3>
                  <p className="font-['Urbanist'] font-medium text-[12px] sm:text-[14px] md:text-[14px] mt-1 opacity-90 transition-all duration-500">
                    {member.role}
                  </p>
                </div>

                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#FC4C00] text-white p-2 rounded-sm group-hover:bg-black transition-all duration-500"
                >
                  <Linkedin size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
