'use client';

import { motion } from 'framer-motion';
// Note: Since this is a Client Component now, we usually pass data as props 
// OR fetch inside a useEffect. For simplicity with Next.js App Router, 
// we keep the fetching in the parent (Page.js) and pass data here.
// BUT, if you want to keep fetching here, you can't use 'async component' with 'use client'.
// SOLUTION: We will convert this to a presentation component and fetch data in page.js 
// OR use a quick client-side fetch pattern. 
// Assuming you want to keep it simple, I'll simulate the data or you pass it from page.js.

// For now, let's assume data is passed or we fetch it client-side.
// Here is the pattern assuming you pass data <NotableJudgments data={judgments} />
// If you can't change page.js easily, remove 'use client' and keep it server, 
// but you lose the animation. 
// BEST APPROACH: Keep it Server Component, and wrap the list in a Client Animation Component.

// Let's create a Client Wrapper for the animation part.

/* Please UPDATE src/app/page.js to fetch data and pass it:
   const judgments = await client.fetch(...)
   <NotableJudgments judgments={judgments} />
*/

// Updated NotableJudgments.jsx (Client Component accepting props)
export default function NotableJudgments({ judgments = [] }) { 
  // If you didn't update page.js yet, this might break. 
  // Let's stick to the Server Component pattern but animate the children using a helper?
  // Actually, easiest fix for you: make it Client and fetch inside useEffect.
  // But for SEO, server fetch is better.
  
  // Let's assume you will update Page.js. If not, tell me and I'll give you a different code.
  
  return (
    <section className="py-24 bg-brand-900 text-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="text-center mb-16"
        >
          <span className="text-brand-gold text-xs font-bold tracking-[0.2em] uppercase">Precedents</span>
          <h2 className="text-4xl font-serif text-white mt-3">Reported Judgments</h2>
        </motion.div>

        <div className="space-y-8">
          {judgments.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group flex flex-col md:flex-row gap-6 border-l-2 border-brand-gold/30 pl-8 hover:border-brand-gold transition-colors duration-300"
            >
              <div className="md:w-1/4">
                 <span className="block font-bold text-brand-gold text-lg group-hover:translate-x-2 transition-transform">{item.citation}</span>
                 <span className="text-xs text-brand-cream/50 uppercase tracking-wider">{item.court}</span>
              </div>
              <div className="md:w-3/4">
                 <h3 className="text-xl font-serif font-medium text-white mb-2">{item.title}</h3>
                 <p className="text-brand-cream/70 text-sm leading-relaxed">{item.summary}</p>
              </div>
            </motion.div>
          ))}
          
          {/* Fallback if no data passed yet */}
          {judgments.length === 0 && (
             <div className="text-center text-brand-cream/50">Data loading or empty...</div>
          )}
        </div>
      </div>
    </section>
  );
}