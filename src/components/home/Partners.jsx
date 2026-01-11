'use client';

import { motion } from 'framer-motion';
import { urlFor } from '@/lib/sanity'; 

export default function Partners({ team = [] }) {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          {/* REMOVED 'The Partners' HEADER if you want (based on previous requests), 
              but keeping it here as per current file structure. 
              You can remove this block if you want it cleaner. */}
          <h2 className="text-4xl font-serif text-brand-900">The Partners</h2>
          <div className="h-1 w-16 bg-brand-gold mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {team.map((partner, idx) => {
            const isShyam = partner.name.toLowerCase().includes('shyam');
            
            return (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="flex flex-col items-center text-center group"
              >
                {/* IMAGE CONTAINER */}
                <div className="relative w-64 h-64 mb-8 mx-auto flex-shrink-0">
                  <div className="absolute inset-0 rounded-full border border-brand-gold/30 group-hover:scale-110 transition-transform duration-500" />
                  
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl bg-slate-100">
                     {partner.image && (
                       <img 
                         src={urlFor(partner.image).width(600).url()} 
                         alt={partner.name}
                         className={`w-full h-full object-cover ${
                           isShyam ? 'object-top' : 'object-top'
                         }`}
                       />
                     )}
                  </div>
                </div>

                <h3 className="text-2xl font-serif text-brand-900 mb-2">{partner.name}</h3>
                
                <p className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-4">
                  {partner.designation}
                </p>
                
                {/* --- FIX START --- */}
                {/* Added 'whitespace-pre-line' so it respects Enter keys from Sanity */}
                <div className="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto">
                  <p className="whitespace-pre-line">{partner.bio}</p>
                </div>
                {/* --- FIX END --- */}

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}