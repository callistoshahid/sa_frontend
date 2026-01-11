'use client';

import { motion } from 'framer-motion';

export default function CourtsTicker() {
  const courts = [
    "Supreme Court of India",
    "Delhi High Court",
    "National Company Law Tribunal (NCLT)",
    "NCLAT",
    "Arbitral Tribunals",
    "Competition Commission of India",
    "NCDRC",
    "White Collar Crime Defense" // Added for impact
  ];

  // Duplicate the list 4 times to ensure seamless infinite scrolling
  const tickerItems = [...courts, ...courts, ...courts, ...courts];

  return (
    <div className="bg-brand-gold py-4 overflow-hidden border-y border-brand-900 relative z-20">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }} // Move left
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30, // Adjust speed (higher = slower)
        }}
      >
        {tickerItems.map((item, index) => (
          <div key={index} className="flex items-center mx-8">
            <span className="text-brand-900 font-serif font-bold text-lg uppercase tracking-wider">
              {item}
            </span>
            {/* Separator Dot */}
            <div className="w-2 h-2 bg-brand-900 rounded-full ml-8" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}