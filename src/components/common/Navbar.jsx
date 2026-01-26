'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
// - Imported necessary hooks and components

export default function Navbar({ practiceAreas = [] }) {
  const [isOpen, setIsOpen] = useState(false); // Mobile Menu State
  const [practiceDropdown, setPracticeDropdown] = useState(false); // Desktop Hover State
  const [mobilePracticeOpen, setMobilePracticeOpen] = useState(false); // NEW: Mobile Sub-menu Toggle State
  
  const pathname = usePathname();

  // Generate dynamic links from Sanity data
  const dynamicPracticeLinks = practiceAreas
    .filter(item => item.slug?.current)
    .map(item => ({
      name: item.title,
      href: `/practice/${item.slug.current}` // Ensure this matches your page route structure
    }));

  const menuItems = [
    ...dynamicPracticeLinks.slice(0, 8), 
    { name: 'View All Practices', href: '/#practice-areas', highlight: true }
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm font-sans">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-24">
          
          {/* --- LOGO IMAGE --- */}
          <Link href="/" className="relative h-40 w-64 md:w-96 flex-shrink-0">
            <Image
              src="/brandlogo2.png"
              alt="S&A Law Chambers"
              fill
              className="object-contain object-left" 
              priority
              sizes="(max-width: 768px) 250px, 400px" 
            />
          </Link>

          {/* --- DESKTOP MENU (Hidden on Mobile) --- */}
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

            <Link href="/clients" className={`text-sm font-medium hover:text-brand-gold transition-colors ${pathname === '/clients' ? 'text-brand-900 font-bold' : 'text-slate-600'}`}>
              Clientele
            </Link>

            {/* DESKTOP PRACTICE AREAS DROPDOWN */}
            <div 
              className="relative group h-24 flex items-center" 
              onMouseEnter={() => setPracticeDropdown(true)}
              onMouseLeave={() => setPracticeDropdown(false)}
            >
              <button className={`text-sm font-medium flex items-center hover:text-brand-gold transition-colors ${pathname.includes('/practice') ? 'text-brand-900 font-bold' : 'text-slate-600'}`}>
                Practice Areas
                <svg className="w-4 h-4 ml-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </button>

              {/* Dropdown Content */}
              <div className={`absolute top-24 left-0 w-64 bg-white border-t-2 border-brand-gold shadow-xl transition-all duration-200 ${practiceDropdown ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
                <div className="py-2">
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
            </div>

            <Link href="/insights" className={`text-sm font-medium hover:text-brand-gold transition-colors ${pathname === '/insights' ? 'text-brand-900 font-bold' : 'text-slate-600'}`}>
              Insights
            </Link>

            <Link href="/contact" className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white bg-brand-900 hover:bg-brand-gold transition-colors duration-300">
              Contact
            </Link>
          </div>

          {/* --- MOBILE HAMBURGER BUTTON --- */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-800 focus:outline-none">
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE MENU OVERLAY --- */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 h-[calc(100vh-6rem)] overflow-y-auto pb-20 animate-fade-in-down">
          <div className="flex flex-col p-6 space-y-6">
            
            <Link href="/" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-900 border-b border-slate-100 pb-2">Home</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-900 border-b border-slate-100 pb-2">About Us</Link>
            <Link href="/team" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-900 border-b border-slate-100 pb-2">Team</Link>
            <Link href="/clients" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-900 border-b border-slate-100 pb-2">Clientele</Link>

            {/* --- UPDATED: MOBILE COLLAPSIBLE PRACTICE AREAS --- */}
            <div className="border-b border-slate-100 pb-2">
              <button 
                onClick={() => setMobilePracticeOpen(!mobilePracticeOpen)}
                className="flex items-center justify-between w-full text-lg font-medium text-slate-900 focus:outline-none"
              >
                <span>Practice Areas</span>
                <span className={`transform transition-transform duration-300 ${mobilePracticeOpen ? 'rotate-180' : ''}`}>
                  <svg className="w-5 h-5 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </span>
              </button>

              {/* Collapsible List */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobilePracticeOpen ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                <div className="flex flex-col space-y-3 pl-4 border-l-2 border-slate-100 ml-1">
                  {menuItems.map(link => (
                    <Link 
                      key={link.href} 
                      href={link.href} 
                      onClick={() => setIsOpen(false)} 
                      className={`text-base ${link.highlight ? 'text-brand-gold font-semibold' : 'text-slate-600'}`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/insights" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-900 border-b border-slate-100 pb-2">Insights</Link>
            
            <Link href="/contact" onClick={() => setIsOpen(false)} className="text-lg font-medium text-white bg-brand-900 text-center py-3 rounded-sm font-bold tracking-wide">
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}