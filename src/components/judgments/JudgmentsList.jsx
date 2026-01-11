'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function JudgmentsList({ data = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCourt, setFilterCourt] = useState('All');

  // unique list of courts for the filter dropdown
  const courts = ['All', ...new Set(data.map(item => item.court))];

  // Filter Logic
  const filteredJudgments = data.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.citation?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourt = filterCourt === 'All' || item.court === filterCourt;
    
    return matchesSearch && matchesCourt;
  });

  return (
    <section className="py-20 container mx-auto px-6 max-w-6xl">
      
      {/* 1. SEARCH & FILTER BAR */}
      <div className="flex flex-col md:flex-row gap-6 mb-16 justify-between items-center bg-brand-cream p-6 rounded-sm border border-brand-gold/20">
        
        {/* Search Input */}
        <div className="relative w-full md:w-1/2">
          <svg className="absolute left-4 top-3.5 w-5 h-5 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input 
            type="text"
            placeholder="Search by Title or Citation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 focus:border-brand-gold focus:outline-none transition-colors text-brand-900 placeholder-slate-400"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <span className="text-sm font-bold text-brand-900 uppercase tracking-widest whitespace-nowrap">Filter By:</span>
          <select 
            value={filterCourt}
            onChange={(e) => setFilterCourt(e.target.value)}
            className="w-full md:w-64 px-4 py-3 bg-brand-900 text-white border-none focus:ring-2 focus:ring-brand-gold cursor-pointer"
          >
            {courts.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 2. RESULTS GRID */}
      <motion.div layout className="grid grid-cols-1 gap-8">
        <AnimatePresence>
          {filteredJudgments.map((item, idx) => (
            <motion.div
              layout
              key={item._id || idx} // Use a unique ID if available
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="group bg-white border border-slate-200 p-8 hover:shadow-xl hover:border-brand-gold/30 transition-all duration-300 relative overflow-hidden"
            >
              {/* Decorative Side Line */}
              <div className="absolute top-0 bottom-0 left-0 w-1 bg-brand-900 group-hover:bg-brand-gold transition-colors duration-300" />

              <div className="flex flex-col md:flex-row gap-8 justify-between items-start">
                
                {/* Content */}
                <div className="md:w-3/4">
                  <div className="flex flex-wrap gap-3 mb-3 items-center">
                    <span className="bg-brand-cream text-brand-900 text-xs font-bold px-3 py-1 uppercase tracking-widest">
                      {item.court}
                    </span>
                    {item.citation && (
                      <span className="text-brand-gold font-serif italic text-lg">
                        {item.citation}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-serif text-brand-900 mb-4 group-hover:text-brand-gold transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-brand-700 leading-relaxed font-sans text-sm md:text-base">
                    {item.summary}
                  </p>
                </div>

                {/* Link Button */}
                {item.link && (
                  <div className="md:w-1/4 flex justify-start md:justify-end pt-2">
                    <a 
                      href={item.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 border border-brand-900 text-brand-900 text-xs font-bold uppercase tracking-widest hover:bg-brand-900 hover:text-white transition-all duration-300"
                    >
                      Read Judgment
                      <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State */}
        {filteredJudgments.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">No judgments found matching your criteria.</p>
            <button 
              onClick={() => {setSearchQuery(''); setFilterCourt('All');}}
              className="mt-4 text-brand-gold underline"
            >
              Clear Filters
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
}