import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section id="about" className="py-32 px-6 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-[1fr_1.15fr] gap-16 lg:gap-24 items-center">

          {/* Left: Text */}
          <motion.div
            className="space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >

            {/* Heading */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <span
                className="text-[#f3e218] tracking-[3px] mb-4 block"
                style={{ fontSize: "11px", fontWeight: 400 }}
              >
                ABOUT US
              </span>

              <h2
                className="text-[#2B2B2B] mb-8"
                style={{
                  fontSize: "clamp(1.5rem, 3.2vw, 2.25rem)",
                  fontWeight: 700,
                  letterSpacing: "0.01em",
                  lineHeight: 1.3,
                }}
              >
                Creating Thoughtful & Functional Spaces Since 1996
              </h2>
            </motion.div>

            {/* Paragraphs */}
            {[ 
              "Established in 1996 in Nashik, our architectural and interior design firm has been dedicated to creating thoughtful and functional spaces for nearly three decades.",
              "We specialize in a diverse range of projects including private residential bungalows, offices, commercial spaces, industrial projects, hospitality environments, healthcare facilities, farmhouses, and exhibition stall design.",
              "Our design philosophy focuses on creating simple, neat, and humble spaces that are highly functional. With a strong emphasis on natural light and ventilation, we aim to design environments that feel open, connected, and truly enchanting.",
              "The firm was founded by Architect Santosh Kapadnekar and Interior Designer Darshana Kapadnekar, who together bring over three decades of professional experience and a legacy of many satisfied clients.",
            ].map((text, index) => (
              <motion.p
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="text-[#2B2B2B]"
                style={{
                  fontSize: "1rem",
                  fontWeight: 400,
                  lineHeight: 2,
                  letterSpacing: "0.01em",
                }}
              >
                {text}
              </motion.p>
            ))}

            {/* Achievements */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              className="space-y-3"
            >
              <p
                className="text-[#2B2B2B]"
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  letterSpacing: "0.01em",
                }}
              >
                <strong>Achievements</strong>
              </p>

              <ul
                className="list-disc pl-5 space-y-2 text-[#2B2B2B]"
                style={{
                  fontSize: "1rem",
                  fontWeight: 400,
                  lineHeight: 1.8,
                  letterSpacing: "0.01em",
                }}
              >
                <li>Residential and hospitality projects published in Enchant Magazine.</li>
                <li>A project featured in the Times of India Home column.</li>
                <li>
                  The office interior project for Mr. Prashant Karnavat was shortlisted and reached the finals of the IID MK Awards 2004, held in Hyderabad.
                </li>
              </ul>
            </motion.div>

            {/* Final Paragraph */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-[#2B2B2B]"
              style={{
                fontSize: "1rem",
                fontWeight: 400,
                lineHeight: 2,
                letterSpacing: "0.01em",
              }}
            >
              Beyond professional practice, both founders are actively involved in academics and contribute as visiting faculty at various architectural schools.
            </motion.p>

          </motion.div>

          {/* Right: Image */}
          <motion.div
            className="relative h-[560px] md:h-[660px] lg:h-[720px]"
            initial={{ opacity: 0, scale: 1.1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <img
              src={new URL("../../assets/Office Space.jpeg", import.meta.url).href}
              alt="Interior design"
              className="w-full h-full object-cover grayscale"
            />
            <div className="absolute -bottom-6 -right-6 w-48 h-48 border border-[#f3e218]/30 hidden lg:block"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}