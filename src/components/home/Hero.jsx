'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax: Background moves slower than text
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-900">
      
      {/* 1. ANIMATED BACKGROUND */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <Image 
             src="/sabanner.avif" 
             alt="S&A Law Chambers"
             fill
             className="object-cover opacity-60"
             priority
          />
          {/* Gradient Overlay: Matches the deep blue of your banner */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/40 to-transparent" />
        </motion.div>
      </motion.div>

      {/* 2. TEXT CONTENT */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
        }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        
        {/* TAGLINE: Changed from Gold to White to match your banner image */}
        <motion.div 
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="mb-8"
        >
          <span className="inline-block border-y border-white/20 py-3 px-6">
            <span className="text-white text-sm md:text-base font-serif font-bold tracking-[0.3em] uppercase">
              Ethics &bull; Excellence &bull; Experience
            </span>
          </span>
        </motion.div>

        {/* MAIN HEADLINE */}
        <motion.h1 
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
          className="text-5xl md:text-8xl font-serif font-bold tracking-tight text-white mb-8 drop-shadow-2xl"
        >
          S&A Law Chambers
        </motion.h1>

        {/* SUBTEXT */}
        {/* <motion.p 
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          className="text-lg md:text-2xl font-light text-brand-cream/90 font-sans max-w-3xl mx-auto leading-relaxed"
        >
          Specialized Litigation Chamber practicing at the <br className="hidden md:block"/>
          <span className="text-white font-medium border-b border-white/30 pb-1">Supreme Court of India</span>
        </motion.p> */}

        {/* REMOVED BUTTON AS REQUESTED IN MOM */}

      </motion.div>
      
      {/* SCROLL INDICATOR (Subtle White) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50 animate-bounce"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7-7-7" /></svg>
      </motion.div>

    </section>
  );
}