'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar({ practiceAreas = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [practiceDropdown, setPracticeDropdown] = useState(false);
  
  const pathname = usePathname();

  const dynamicPracticeLinks = practiceAreas
    .filter(item => item.slug?.current)
    .map(item => ({
      name: item.title,
      href: `/practice/${item.slug.current}`
    }));

  const menuItems = [
    ...dynamicPracticeLinks.slice(0, 8), 
    { name: 'View All Practices', href: '/#practice-areas', highlight: true }
  ];

  return (
    // CHANGE 1: Increased Navbar height from h-20 (80px) to h-24 (96px)
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm font-sans">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-24">
          
          {/* --- LOGO IMAGE --- */}
          {/* CHANGE 2: Increased container dimensions significantly */}
          {/* h-16 -> h-20 (Height) | w-52 -> w-64 (Mobile Width) | md:w-64 -> md:w-96 (Desktop Width) */}
          <Link href="/" className="relative h-20 w-64 md:w-96 flex-shrink-0">
            <Image
              src="/brandlogo.png"
              alt="S&A Law Chambers"
              fill
              className="object-contain object-left" // Keeps aspect ratio correct, aligned to left
              priority
              sizes="(max-width: 768px) 250px, 400px" // Optimization hint
            />
          </Link>

          {/* --- DESKTOP MENU --- */}
          <div className="hidden md:flex space-x-8 items-center">
            
            <Link href="/" className={`text-sm font-medium hover:text-brand-gold transition-colors ${pathname === '/' ? 'text-brand-900 font-bold' : 'text-slate-600'}`}>
              Home
            </Link>

            <Link href="/about" className={`text-sm font-medium hover:text-brand-gold transition-colors ${pathname === '/about' ? 'text-brand-900 font-bold' : 'text-slate-600'}`}>
              About Us
            </Link>

            <Link href="/team" className={`text-sm font-medium hover:text-brand-gold transition-colors ${pathname === '/team' ? 'text-brand-900 font-bold' : 'text-slate-600'}`}>
              Team
            </Link>

            {/* PRACTICE AREAS DROPDOWN */}
            <div 
              className="relative group h-24 flex items-center" // Updated height to match navbar
              onMouseEnter={() => setPracticeDropdown(true)}
              onMouseLeave={() => setPracticeDropdown(false)}
            >
              <button className={`text-sm font-medium flex items-center hover:text-brand-gold transition-colors ${pathname.includes('/practice') ? 'text-brand-900 font-bold' : 'text-slate-600'}`}>
                Practice Areas
                <svg className="w-4 h-4 ml-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </button>

              <div className={`absolute top-24 left-0 w-64 bg-white border-t-2 border-brand-gold shadow-xl transition-all duration-200 ${practiceDropdown ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                {menuItems.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    className={`block px-6 py-3 text-sm border-b border-slate-50 last:border-0 hover:bg-slate-50 ${
                      link.highlight ? 'text-brand-900 font-semibold bg-blue-50/50' : 'text-slate-600 hover:text-brand-900'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* <Link href="/judgments" className={`text-sm font-medium hover:text-brand-gold transition-colors ${pathname === '/judgments' ? 'text-brand-900 font-bold' : 'text-slate-600'}`}>
              Judgments
            </Link> */}

            <Link href="/insights" className={`text-sm font-medium hover:text-brand-gold transition-colors ${pathname === '/insights' ? 'text-brand-900 font-bold' : 'text-slate-600'}`}>
              Insights
            </Link>

            <Link href="/contact" className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white bg-brand-900 hover:bg-brand-gold transition-colors duration-300">
              Contact
            </Link>
          </div>

          {/* --- MOBILE HAMBURGER --- */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-800">
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE MENU --- */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 h-screen overflow-y-auto pb-20">
          <div className="flex flex-col p-6 space-y-6">
            <Link href="/" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-900 border-b border-slate-100 pb-2">Home</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-900 border-b border-slate-100 pb-2">About Us</Link>
            <Link href="/team" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-900 border-b border-slate-100 pb-2">Team</Link>
            
            <div>
              <span className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-3 block">Practice Areas</span>
              <div className="flex flex-col space-y-3 pl-4 border-l-2 border-slate-100">
                {menuItems.map(link => (
                  <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="text-slate-600">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/judgments" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-900 border-b border-slate-100 pb-2">Judgments</Link>
            <Link href="/insights" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-900 border-b border-slate-100 pb-2">Insights</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="text-lg font-medium text-brand-900 font-bold">Contact Us</Link>
          </div>
        </div>
      )}
    </nav>
  );
}