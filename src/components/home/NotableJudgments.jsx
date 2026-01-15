'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotableJudgments({ judgments = [] }) {
  
  return (
    <section className="py-24 bg-brand-900 text-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header */}
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="text-center mb-16"
        >
          <span className="text-brand-gold text-xs font-bold tracking-[0.2em] uppercase">Precedents</span>
          <h2 className="text-4xl font-serif text-white mt-3">Reported Judgments</h2>
        </motion.div>

        {/* List of Judgments */}
        <div className="space-y-10">
          {judgments.map((item, idx) => (
            <motion.div 
              key={item._id || idx}
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group flex flex-col md:flex-row gap-6 border-l-2 border-brand-gold/30 pl-8 hover:border-brand-gold transition-colors duration-300"
            >
              <div className="md:w-1/4 shrink-0">
                 <span className="block font-bold text-brand-gold text-lg group-hover:translate-x-2 transition-transform duration-300">
                   {item.citation}
                 </span>
                 <span className="text-xs text-brand-cream/50 uppercase tracking-wider mt-1 block">
                   {item.court}
                 </span>
              </div>
              <div className="md:w-3/4">
                 <h3 className="text-xl font-serif font-medium text-white mb-2 group-hover:text-brand-gold transition-colors">
                   {item.title}
                 </h3>
                 <p className="text-brand-cream/70 text-sm leading-relaxed">
                   {item.summary}
                 </p>
              </div>
            </motion.div>
          ))}
          
          {/* Fallback if empty */}
          {judgments.length === 0 && (
             <div className="text-center text-brand-cream/50 italic">Loading precedents...</div>
          )}
        </div>

        {/* NEW: Read More Button */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-20 flex justify-center"
        >
          <Link 
            href="#practice-areas" /* <--- CHANGE THIS to your actual link (e.g., /judgments or /practice-areas) */
            className="group relative inline-flex items-center gap-3 px-8 py-4 border border-brand-gold text-brand-gold font-bold uppercase tracking-widest text-xs hover:bg-brand-gold hover:text-brand-900 transition-all duration-300"
          >
            <span>Read More Judgments</span>
            {/* Animated Arrow Icon */}
            <svg 
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}