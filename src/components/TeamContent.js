// src/components/TeamContent.js
'use client';

import { motion } from 'framer-motion';
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';

export default function TeamContent({ team }) {
  
  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <main className="bg-brand-cream min-h-screen overflow-hidden">

     {/* 1. ANIMATED HERO SECTION */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-brand-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="/sachambers_hero2.jpg" 
            alt="S&A Law Chambers Partners"
            fill
            className="object-cover object-center"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white tracking-wide mb-6 drop-shadow-xl">
              The Partners
            </h1>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "80px" }}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-1 bg-brand-gold mx-auto mb-8 shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* 2. CORE VALUES */}
      <section className="bg-white py-24 border-b border-brand-gold/20">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-serif text-brand-900 mb-8">
              Our Core Values
            </h2>
            <div className="text-xl md:text-2xl text-brand-700 font-light leading-relaxed font-sans max-w-3xl mx-auto">
              <p>
                We uphold <span className="text-brand-gold font-normal">honesty and integrity</span> while providing solution-based approaches.
                Our advice is based on thorough legal research, experience, and specialised knowledge.
                Most importantly, we believe in an unwavering dedication to the legal system to serve the ends of justice.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. PARTNER PROFILES */}
      <section className="py-24 container mx-auto px-6 max-w-6xl">
        <div className="space-y-32"> 

          {team.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              variants={staggerContainer}
              className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 lg:gap-20 items-start`}
            >

              {/* IMAGE COLUMN */}
              <motion.div 
                variants={fadeInUp}
                className="w-full md:w-[40%] flex-shrink-0"
              >
                <div className="aspect-[3/4] w-full relative shadow-xl bg-white p-2 border border-brand-gold/10">
                    {partner.image ? (
                      <img
                        src={urlFor(partner.image).url()}
                        alt={partner.name}
                        // UPDATED: Removed 'grayscale hover:grayscale-0 transition-all duration-700'
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                        No Image
                      </div>
                    )}
                </div>
              </motion.div>

              {/* TEXT COLUMN */}
              <div className="w-full md:w-[60%] pt-2">

                {/* Name */}
                <motion.h2 
                  variants={fadeInUp}
                  className="text-3xl md:text-3xl font-serif text-brand-900 uppercase tracking-wide mb-2"
                >
                  {partner.name}
                </motion.h2>

                {/* Designation */}
                <motion.div variants={fadeInUp}>
                  <p className="text-brand-gold font-sans font-semibold uppercase tracking-[0.15em] text-sm mb-8">
                    {partner.designation}
                  </p>
                </motion.div>

                {/* Education */}
                <motion.div variants={fadeInUp} className="mb-6">
                  <h4 className="text-sm font-bold text-brand-900 uppercase tracking-widest mb-2 font-sans">
                    Education
                  </h4>
                  <p className="text-lg text-brand-700 font-sans leading-relaxed whitespace-pre-line">
                    {partner.education}
                  </p>
                </motion.div>

                {/* Previous Work */}
                {partner.previousWork && (
                  <motion.div variants={fadeInUp} className="mb-8">
                    <h4 className="text-sm font-bold text-brand-900 uppercase tracking-widest mb-2 font-sans">
                      Previous Experience
                    </h4>
                    <p className="text-lg text-brand-700 font-sans leading-relaxed">
                      {partner.previousWork}
                    </p>
                  </motion.div>
                )}

                {/* Profile Summary */}
                {partner.profileDescription && (
                  <motion.div variants={fadeInUp}>
                    <div className="text-brand-700 font-sans leading-relaxed text-lg whitespace-pre-wrap text-justify border-t border-brand-gold/20 pt-8 mt-8">
                      {partner.profileDescription}
                    </div>
                  </motion.div>
                )}

              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}