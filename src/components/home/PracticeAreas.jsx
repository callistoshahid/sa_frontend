'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

// 1. Import specific icons from React Icons
import { 
  FaHandshake,        
  FaBuilding,         
  FaChartLine,        
  FaLandmark,         
  FaUserShield,       
  FaFilePen,          
  FaFileSignature,    
  FaBriefcase,        
  FaShieldHalved,     
  FaScaleBalanced,    
  FaMoneyBillTrendUp, 
  FaLightbulb,        
  FaHouse,            
  FaScroll,           
  FaUserTie,          
  FaGavel,            
  FaArrowRight 
} from "react-icons/fa6";

// 2. Map schema values to Icons
const iconMap = {
  arbitration: <FaHandshake />,
  company: <FaBuilding />,
  competition: <FaChartLine />,
  constitution: <FaLandmark />,
  consumer: <FaUserShield />,
  drafting: <FaFilePen />,
  contract: <FaFileSignature />,
  corporate: <FaBriefcase />,
  privacy: <FaShieldHalved />,
  civil: <FaScaleBalanced />,
  insolvency: <FaMoneyBillTrendUp />,
  ip: <FaLightbulb />,
  realestate: <FaHouse />,
  succession: <FaScroll />,
  whitecollar: <FaUserTie />,
  default: <FaGavel />
};

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

  // Fallback Lorem Ipsum text as requested
  const defaultText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

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

        {/* Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {practices.map((area, index) => {
            const IconComponent = iconMap[area.iconName] || iconMap.default;

            return (
              <motion.div 
                key={area.slug?.current || index} 
                variants={item}
              >
                <Link 
                  href={area.slug?.current ? `/practice/${area.slug.current}` : '#'}
                  className="group block p-6 bg-brand-cream border border-transparent hover:bg-white hover:shadow-xl hover:border-brand-gold/20 transition-all duration-300 rounded-sm h-full"
                >
                  <div className="flex items-start gap-4">
                    
                    {/* Icon Section */}
                    <div className="shrink-0 mt-1 text-3xl text-brand-gold/80 group-hover:text-brand-gold group-hover:scale-110 transition-all duration-300">
                      {IconComponent}
                    </div>
                    
                    {/* Text Section */}
                    <div className="flex-1">
                      {/* Decorative Dash */}
                      <div className="h-0.5 w-6 bg-brand-gold mb-3 group-hover:w-12 transition-all duration-300" />
                      
                      {/* Title */}
                      <h3 className="text-lg font-serif text-brand-900 uppercase tracking-wide group-hover:text-brand-gold transition-colors flex items-center justify-between mb-2">
                        {area.title}
                        <span className="opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-sm">
                          <FaArrowRight />
                        </span>
                      </h3>

                      {/* NEW: SEO Description (2 Lines Max) */}
                      <p className="text-sm text-slate-600 font-sans leading-relaxed line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        {/* Uses real data if available, otherwise uses Lorem Ipsum */}
                        {area.description ? area.description : defaultText}
                      </p>
                    </div>

                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}