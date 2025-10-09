import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import team1 from "../assets/images/team1.jpeg";
import team2 from "../assets/images/team2.jpeg";

export default function MeetTheTeam() {
  const members = [
    {
      name: "Nauman Aftab",
      role: "Co-Founder / GP",
      img: team1,
      linkedin: "https://linkedin.com/in/nauman-aftab",
    },
    {
      name: "Zirar Khalid Khan",
      role: "Co-Founder",
      img: team2,
      linkedin: "https://linkedin.com/in/zirar-khalid-khan",
    },
  ];

  return (
    <section id="team" className="bg-white py-16 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* LEFT SIDE TEXT */}
        <div className="text-left space-y-6">
          <h2 className="font-['Roboto_Condensed'] font-bold leading-[1] text-[70px] md:text-[100px] tracking-tight">
            <span className="text-[#141414]">Meet </span> 
            <span className="text-[#FC4C00]">The Team</span>
          </h2>
          <p className="font-['Roboto_Condensed'] font-normal text-[12px] md:text-[24px] leading-snug text-[#595959] max-w-2xl">
            At Uraan, our team is the driving force behind every successful
            venture. With a blend of investors, strategists, and innovators, we
            work together to help founders take their ideas to new heights.
          </p>
        </div>

        {/* RIGHT SIDE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {members.map((m, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden rounded-md border border-gray-200 group bg-white"
            >
              {/* IMAGE */}
              <div className="relative overflow-hidden">
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-full h-[360px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* FOOTER */}
              <div className="flex justify-between items-center transition-all duration-500">
                <div className="bg-white text-[#FC4C00] group-hover:bg-[#FC4C00] group-hover:text-white w-full px-4 py-2.5 flex justify-between items-center transition-all duration-500">
                  <div>
                    <h3 className="font-['Urbanist'] font-bold text-[38.07px] leading-none tracking-tight transition-all duration-500">
                      {m.name}
                    </h3>
                    <p className="font-['Urbanist'] font-medium text-[15px] mt-1 opacity-90 transition-all duration-500">
                      {m.role}
                    </p>
                  </div>

                  {/* LINKEDIN BUTTON */}
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#FC4C00] text-white p-2 rounded-sm group-hover:bg-black transition-all duration-500"
                  >
                    <Linkedin size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
