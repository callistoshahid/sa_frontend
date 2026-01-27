'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function LatestInsights({ posts = [] }) {
  const scrollRef = useRef(null);

  // Scroll Handler
  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 400; 
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="py-24 bg-brand-900 border-t border-brand-gold/20 relative">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-brand-gold/10 pb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif text-white mb-2">
              Latest <span className="text-brand-gold italic">Updates</span>
            </h2>
            <p className="text-brand-cream/60 font-sans font-light">
              Follow our latest legal insights and firm announcements.
            </p>
          </motion.div>

          {/* Nav Buttons */}
          <div className="flex items-center gap-4 mt-6 md:mt-0">
            <button 
              onClick={() => scroll('left')}
              className="p-3 rounded-full border border-brand-gold/30 text-brand-gold hover:bg-brand-gold hover:text-brand-900 transition-all active:scale-95"
              aria-label="Scroll Left"
            >
              <FaChevronLeft />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-3 rounded-full border border-brand-gold/30 text-brand-gold hover:bg-brand-gold hover:text-brand-900 transition-all active:scale-95"
              aria-label="Scroll Right"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} 
          >
            {posts.map((post, index) => (
              <motion.div
                key={post._id || index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                // UPDATED: Use max-w instead of fixed width so it can shrink on mobile
                className="flex-shrink-0 w-full md:max-w-[500px] snap-center flex justify-center"
              >
                {/* Embed Container */}
                <div 
                  className="bg-white rounded-sm overflow-hidden shadow-xl w-full linkedin-embed-container"
                  style={{ minHeight: '500px' }} 
                >
                  <div 
                    dangerouslySetInnerHTML={{ __html: post.embedCode }} 
                    className="w-full h-full"
                  />
                  
                  {/* --- MAGIC FIX: CSS to force iframe responsive --- */}
                  <style jsx global>{`
                    .linkedin-embed-container iframe {
                      width: 100% !important;
                      height: 100% !important;
                      min-height: 500px; /* Ensures vertical space for buttons */
                      border: none;
                    }
                  `}</style>
                </div>
              </motion.div>
            ))}

            {posts.length === 0 && (
              <div className="w-full text-center text-brand-cream/30 italic py-12">
                No posts available. Please add LinkedIn embed codes in Sanity.
              </div>
            )}
          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-8 text-center">
             <a 
              href="https://www.linkedin.com/company/sachambers/posts/?feedView=all" 
              target="_blank"
              className="inline-flex items-center gap-2 text-brand-gold text-xs font-bold uppercase tracking-widest hover:underline font-sans"
            >
              View all posts on LinkedIn <FaLinkedinIn />
            </a>
        </div>

      </div>
    </section>
  );
}