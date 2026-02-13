'use client';

import { motion } from 'framer-motion';
import { 
  FaLandmark, 
  FaGavel, 
  FaBuildingColumns, 
  FaHandshake, 
  FaScaleBalanced, 
  FaUserShield, 
  FaChartSimple, 
  FaHouseChimney 
} from "react-icons/fa6";

const forums = [
  { title: "Supreme Court of India", icon: <FaLandmark /> },
  { title: "Delhi High Court", icon: <FaGavel /> },
  { title: "Company Law Tribunals", icon: <FaBuildingColumns /> },
  { title: "Arbitral Tribunals", icon: <FaHandshake /> },
  { title: "District Courts", icon: <FaScaleBalanced /> },
  { title: "Consumer Fora", icon: <FaUserShield /> },
  { title: "Competition Commission", icon: <FaChartSimple /> },
  { title: "Real Estate Tribunals", icon: <FaHouseChimney /> },
];

export default function ForumsOfPractice() {
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
  };

  return (
    // UPDATED: Changed bg-brand-900 to bg-white to contrast with the dark hero banner
    <section className="py-24 bg-white relative overflow-hidden">
      
      {/* Decorative Background Pattern (Subtle Grey for depth) */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
         <div className="absolute right-0 top-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
         <div className="absolute left-0 bottom-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            // UPDATED: Changed text color to brand-900 (Dark Blue) for visibility on white
            className="text-4xl md:text-5xl font-serif text-brand-900 mb-6"
          >
            Forums of Practice
          </motion.h2>
          
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-1 bg-brand-gold mx-auto mb-8"
          />

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            // UPDATED: Changed text color to brand-700 (Grey/Blue)
            className="text-brand-700 text-lg font-sans font-light leading-relaxed"
          >
            We are experienced in providing diligent representation and advice to our clients 
            in disputes before the following Courts and Tribunals.
          </motion.p>
        </div>

        {/* The Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {forums.map((forum, index) => (
            <motion.div 
              key={index} 
              variants={item}
              className="group relative"
            >
              {/* Card Container - Kept Dark for Premium Look */}
              <div className="h-full p-8 bg-brand-900 border border-brand-900 hover:border-brand-gold/50 rounded-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-brand-900/20 flex flex-col items-center text-center">
                
                {/* Icon Circle */}
                <div className="w-16 h-16 rounded-full bg-brand-800 border border-brand-gold/20 flex items-center justify-center text-2xl text-brand-gold mb-6 group-hover:scale-110 group-hover:bg-brand-gold group-hover:text-brand-900 transition-all duration-300 shadow-lg">
                  {forum.icon}
                </div>
                
                {/* Title - Kept light since card is dark */}
                <h3 className="text-lg font-sans font-medium tracking-wide text-brand-cream group-hover:text-white transition-colors">
                  {forum.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}