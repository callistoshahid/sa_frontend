// src/components/TeamContent.js
'use client';

import { motion } from 'framer-motion';
import { urlFor } from '@/lib/sanity';

export default function TeamContent({ team }) {
  
  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
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
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-brand-900">
        {/* Animated Background Pattern */}
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"
        />
        
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white tracking-wide mb-6 drop-shadow-lg">
              The Partners
            </h1>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "80px" }}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-1 bg-brand-gold mx-auto mb-8"
            />
            {/* <p className="text-brand-cream/90 font-sans max-w-2xl mx-auto text-xl font-light leading-relaxed">
              Distinguished Advocates with expertise in Supreme Court litigation and commercial dispute resolution.
            </p> */}
          </motion.div>
        </div>
      </section>

      {/* 2. CORE VALUES (Fade In) */}
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

      {/* 3. PARTNER PROFILES (Scroll Reveal) */}
      <section className="py-24 container mx-auto px-6 max-w-6xl">
        <div className="space-y-40"> {/* Large spacing for dramatic effect */}

          {team.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }} // Triggers when 10% of element is visible
              variants={staggerContainer}
              className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 lg:gap-24 items-center`}
            >

              {/* IMAGE COLUMN */}
              <motion.div 
                variants={fadeInUp}
                className="w-full md:w-1/2 relative group"
              >
                {/* Image Frame with Gold tint background */}
                <div className="aspect-[4/5] w-full p-4 bg-brand-gold/10 rounded-sm relative">
                  {/* Decorative Border Lines */}
                  <div className="absolute top-0 left-0 w-full h-full border border-brand-gold/20 translate-x-2 translate-y-2 -z-10" />
                  
                  <div className="w-full h-full overflow-hidden relative shadow-lg">
                    {partner.image ? (
                      <motion.img
                        src={urlFor(partner.image).url()}
                        alt={partner.name}
                        whileHover={{ scale: 1.03 }} // Subtle zoom on hover
                        transition={{ duration: 0.7 }}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                        No Image
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* TEXT COLUMN */}
              <div className="w-full md:w-1/2">

                {/* Name */}
                <motion.h2 
                  variants={fadeInUp}
                  className="text-5xl md:text-6xl font-serif text-brand-900 uppercase tracking-wide mb-6"
                >
                  {partner.name}
                </motion.h2>

                {/* Designation Bar */}
                <motion.div variants={fadeInUp}>
                  <div className="inline-block bg-brand-900 text-brand-gold text-xs font-bold uppercase tracking-[0.25em] px-5 py-3 mb-10 shadow-md">
                    {partner.designation}
                  </div>
                </motion.div>

                {/* Education */}
                <motion.div variants={fadeInUp} className="mb-10 border-l-[3px] border-brand-gold pl-6 py-2">
                  <h4 className="text-xs font-bold text-brand-700/60 uppercase tracking-widest mb-3">Education</h4>
                  <p className="text-xl font-serif text-brand-900 italic opacity-90 whitespace-pre-line leading-relaxed">
                    {partner.education}
                  </p>
                </motion.div>

                {/* Previous Work */}
                {partner.previousWork && (
                  <motion.div variants={fadeInUp} className="mb-10 border-l-[3px] border-brand-900 pl-6 py-2">
                    <h4 className="text-xs font-bold text-brand-700/60 uppercase tracking-widest mb-3">Previous Experience</h4>
                    <p className="text-lg font-serif text-brand-700 opacity-90 leading-relaxed">
                      {partner.previousWork}
                    </p>
                  </motion.div>
                )}

                {/* Profile Summary */}
                {partner.profileDescription && (
                  <motion.div variants={fadeInUp}>
                    <div className="text-brand-700 font-sans leading-relaxed text-lg whitespace-pre-wrap text-justify border-t border-brand-gold/20 pt-8">
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