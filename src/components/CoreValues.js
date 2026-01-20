'use client';

import { motion } from 'framer-motion';

export default function CoreValues() {
  return (
    <section className="bg-brand-cream py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          
          {/* 1. Title Section (Animated Fade In) */}
          <div className="md:col-span-4 lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-6xl font-serif text-brand-900 leading-tight">
                Our Core <br />
                <span className="text-brand-gold italic">Values</span>
              </h2>
              <div className="h-1 w-24 bg-brand-900 mt-6 rounded-full" />
            </motion.div>
          </div>

          {/* 2. Paragraph Section (Interactive Card) */}
          <div className="md:col-span-8 lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.02, x: 10 }} // Subtle interaction on hover
              className="group relative p-10 md:p-12 bg-white shadow-sm border-l-4 border-brand-900 cursor-default transition-colors duration-500 hover:border-brand-gold"
            >
              {/* Decorative Quote Icon (Background) */}
              <div className="absolute top-4 right-6 text-9xl font-serif text-brand-cream opacity-50 select-none pointer-events-none">
                &rdquo;
              </div>

              {/* The Paragraph */}
              <p className="font-sans text-xl md:text-2xl lg:text-3xl text-brand-900 font-light leading-relaxed relative z-10 text-justify">
                We uphold <span className="font-medium text-brand-gold">honesty and integrity</span> while providing solution-based approaches. 
                Our advice is based on thorough legal research, experience, and specialised 
                knowledge. Most importantly, we believe in an <span className="font-medium text-brand-gold">unwavering dedication</span> to the 
                legal system to serve the ends of justice.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}