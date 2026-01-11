'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PracticeAreas({ practices = [] }) {
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="practice-areas" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-slate-100 pb-6"
        >
          <h2 className="text-4xl font-serif text-brand-900">Practice Areas</h2>
          <span className="text-slate-400 text-sm tracking-widest uppercase mt-4 md:mt-0">Comprehensive Legal Solutions</span>
        </motion.div>

        {/* Grid of Links */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {practices.map((area, index) => (
            <motion.div 
              key={area.slug?.current || index} 
              variants={item}
            >
              <Link 
                href={area.slug?.current ? `/practice/${area.slug.current}` : '#'}
                className="group block p-8 bg-brand-cream border border-transparent hover:bg-white hover:shadow-xl hover:border-brand-gold/20 transition-all duration-300 rounded-sm h-full"
              >
                <div className="h-1 w-8 bg-brand-gold mb-4 group-hover:w-16 transition-all duration-300" />
                
                <h3 className="text-xl font-serif text-brand-900 group-hover:text-brand-gold transition-colors flex items-center justify-between mb-4">
                  {area.title}
                  <span className="opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    →
                  </span>
                </h3>

                {/* NEW: Lorem Ipsum Sub-text */}
                {/* <p className="text-slate-500 text-sm leading-relaxed font-sans line-clamp-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
                </p> */}

              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}