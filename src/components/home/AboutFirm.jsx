'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutFirm() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      
      {/* --- MOVING ELEMENT 1: Rotating Geometric Seal --- */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -right-20 w-[600px] h-[600px] opacity-[0.03] pointer-events-none"
      >
        {/* Simple SVG decorative pattern */}
        <svg viewBox="0 0 100 100" className="w-full h-full text-brand-900 fill-current">
          <path d="M50 0 L100 50 L50 100 L0 50 Z" /> {/* Large Diamond Shape */}
        </svg>
      </motion.div>

      {/* --- MOVING ELEMENT 2: Floating Particles --- */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-10 w-4 h-4 bg-brand-gold rounded-full opacity-20"
      />
      <motion.div 
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-brand-900 rounded-full opacity-10"
      />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {/* Section Label */}
          {/* <span className="text-xs font-bold tracking-[0.2em] text-brand-gold uppercase block mb-6">
            The Firm
          </span> */}

          {/* Main Text */}
          <p className="text-xl md:text-3xl font-sans leading-relaxed text-brand-900 mb-10">
            {/* <span className="text-7xl float-left mr-4 mt-[-15px] font-bold text-brand-gold">S</span> */}
            S&A Law Chambers is a specialized litigation chamber based in Neeti Bagh, New Delhi. Founded by distinguished Advocates from prestigious firms, we are built on an unwavering dedication to the legal system.
          </p>

          {/* Quote Box */}
          {/* <motion.div 
            whileHover={{ scale: 1.02 }} // Interactive movement on hover
            className="border-l-4 border-brand-gold pl-8 py-6 bg-brand-cream/50 shadow-sm rounded-r-lg mb-12 transition-transform duration-300"
          >
            <p className="text-lg font-serif italic text-brand-800">
              "We uphold honesty and integrity while providing solution-based approaches."
            </p>
          </motion.div> */}

          <Link href="/about" className="group inline-flex items-center text-sm font-bold text-brand-900 uppercase tracking-widest hover:text-brand-gold transition-colors">
            Read Full Profile
            {/* Arrow moves on hover */}
            <span className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}