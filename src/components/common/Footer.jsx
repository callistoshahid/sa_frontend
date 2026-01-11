'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'success'

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <footer className="bg-brand-900 text-brand-cream border-t border-brand-gold/20 font-sans">
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">
          
          {/* 1. BRAND COLUMN */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-serif font-bold text-white tracking-wide">
                S&A Law Chambers
              </h3>
              {/* <p className="text-[10px] text-brand-gold uppercase tracking-[0.2em] mt-1">
                Advocates & Solicitors
              </p> */}
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Ethics • Excellence • Experience
            </p>
          </div>

          {/* 2. QUICK LINKS */}
          <div>
            <h4 className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-6 font-serif">
              Quick Links
            </h4>
            <ul className="space-y-4 text-sm text-slate-300">
              <li><Link href="/about" className="hover:text-brand-gold transition-colors">The Firm Profile</Link></li>
              <li><Link href="/team" className="hover:text-brand-gold transition-colors">Our Team</Link></li>
              <li><Link href="/#practice-areas" className="hover:text-brand-gold transition-colors">Practice Areas</Link></li>
              <li><Link href="/judgments" className="hover:text-brand-gold transition-colors">Notable Judgments</Link></li>
              <li><Link href="/contact" className="hover:text-brand-gold transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* 3. CONTACT INFO */}
          <div>
            <h4 className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-6 font-serif">
              Contact
            </h4>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start">
                <span className="w-6 shrink-0 text-brand-gold">📍</span>
                <span>
                  A-25, Lower Ground Floor,<br/> 
                  Neeti Bagh, New Delhi - 110049
                </span>
              </li>
              <li className="flex items-center">
                <span className="w-6 shrink-0 text-brand-gold">📞</span>
                <a href="tel:01146052344" className="hover:text-white">011-46052344</a>
              </li>
              <li className="flex items-center">
                <span className="w-6 shrink-0 text-brand-gold">✉️</span>
                <a href="mailto:office@sachambers.in" className="hover:text-white">office@sachambers.in</a>
              </li>
            </ul>
          </div>

          {/* 4. NEWSLETTER SUBSCRIPTION (NEW) */}
          <div>
            <h4 className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-6 font-serif">
              Stay Informed
            </h4>
            <p className="text-slate-400 text-xs mb-4">
              Subscribe to receive legal insights and updates from the chambers.
            </p>
            
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-brand-gold/10 border border-brand-gold p-4 text-center rounded-sm"
              >
                <p className="text-brand-gold text-sm font-serif">✓ Subscribed</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <input 
                  type="email" 
                  placeholder="Email Address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-brand-800 border border-brand-700 text-brand-cream text-sm px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors placeholder-brand-700"
                />
                <button 
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-brand-gold text-brand-900 text-xs font-bold uppercase tracking-widest py-3 hover:bg-white transition-colors disabled:opacity-50"
                >
                  {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-brand-800 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} S&A Law Chambers. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-brand-gold">Privacy Policy</Link>
            <Link href="/disclaimer" className="hover:text-brand-gold">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}