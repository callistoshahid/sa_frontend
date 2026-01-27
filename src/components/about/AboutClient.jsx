'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutClient() {
  const ref = useRef(null);

  // Parallax Header Logic
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Stagger Animation for List
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div ref={ref} className="bg-white">

      <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">

        {/* --- NEW APPROACH: BACKGROUND IMAGE --- */}
        {/* We use the Next.js Image component to fill the container */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/sachambers_hero2.jpg" // Ensure file is in 'public' folder
            alt="S&A Law Chambers"
            fill // This makes it stretch to cover the parent div
            className="object-cover object-center" // Keeps it proportional
            priority // Loads it immediately (no blur/grey flash)
            quality={100}
          />
          {/* Dark Overlay (Adjust opacity here: 0.3 = 30% darkness) */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* --- CONTENT (Text) --- */}
        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-serif font-bold text-white tracking-wide mb-6 drop-shadow-xl"
          >
            About Us
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-brand-gold mx-auto shadow-lg"
          />
        </div>
      </section>
      {/* 2. MAIN CONTENT */}
      <section className="py-24 container mx-auto px-6 max-w-5xl">

        {/* Intro Text - Fades Up */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 space-y-8 text-lg md:text-xl text-brand-700 leading-relaxed font-sans text-justify"
        >
          <p>
            <span className="font-bold text-brand-900">S&A Law Chambers</span> is a specialized litigation chamber based in Neeti Bagh, New Delhi, offering expert legal representation and advisory services across multiple practice areas.
          </p>
          <p>
            The Chambers was founded by distinguished Advocates who have worked with prestigious law firms and chambers of Senior Advocates. Our practice is built on diligent advice and representation of our clients, and an unwavering dedication to the legal system to serve the ends of justice.
          </p>
        </motion.div>

        {/* 3. CORE VALUES - Slide In Effect */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-brand-900 text-white p-10 md:p-14 rounded-sm shadow-2xl border-l-8 border-brand-gold mb-20 relative overflow-hidden group"
        >
          {/* Moving Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>

          <div className="absolute top-[-20px] right-[-20px] text-9xl text-white opacity-5 font-serif select-none">”</div>

          <h3 className="text-xl font-serif font-bold text-brand-gold mb-6 uppercase tracking-widest">
            Core Values
          </h3>
          <p className="text-2xl md:text-3xl font-light italic leading-relaxed z-10 relative font-sans">
            "At the Chambers, we uphold honesty and integrity while providing solution-based approaches."
          </p>
        </motion.div>

        {/* 4. FORUMS OF PRACTICE - Staggered Grid */}
        <div className="bg-brand-cream p-10 md:p-14 border border-slate-200 mb-20 relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-serif text-brand-900 mb-8 border-b border-brand-gold/30 pb-4 inline-block">
              Forums of Practice
            </h3>
            <p className="mb-8 text-brand-700 font-sans">
              We are experienced in advising and representing clients in cases before:
            </p>
          </motion.div>

          <motion.ul
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 font-sans"
          >
            {[
              "Supreme Court of India",
              "Delhi High Court",
              "District Courts",
              "National Company Law Tribunal (NCLT)",
              "National Company Law Appellate Tribunal (NCLAT)",
              "National Consumer Disputes Redressal Commission (NCDRC)",
              "The Competition Commission of India (CCI)",
              "Arbitral Tribunals"
            ].map((court, index) => (
              <motion.li
                key={index}
                variants={item}
                className="flex items-center text-brand-800 font-medium text-lg hover:text-brand-900 transition-colors"
              >
                {/* Animated Checkmark */}
                <span className="w-6 h-6 mr-4 flex items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                {court}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* 5. CALL TO ACTION - Scale Up */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h4 className="text-brand-900 font-serif text-2xl mb-8">Learn more about our leadership</h4>
          <Link
            href="/team"
            className="group relative inline-block px-12 py-4 bg-brand-900 text-white font-bold uppercase tracking-widest overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <span className="relative z-10 group-hover:text-brand-gold transition-colors font-sans">Meet The Partners</span>
            <div className="absolute inset-0 bg-black/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </Link>
        </motion.div>

      </section>
    </div>
  );
}