'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar({ practiceAreas = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [practiceDropdown, setPracticeDropdown] = useState(false);
  const [mobilePracticeOpen, setMobilePracticeOpen] = useState(false);
  
  const pathname = usePathname();

  // Generate dynamic links from Sanity data
  const dynamicPracticeLinks = practiceAreas
    .filter(item => item.slug?.current)
    .map(item => ({
      name: item.title,
      href: `/practice/${item.slug.current}`
    }));

  // UPDATED: Now uses ALL links, no slice, no "View All" button
  const menuItems = dynamicPracticeLinks;

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

            {/* <Link href="/clients" className={`text-sm font-medium hover:text-brand-gold transition-colors ${pathname === '/clients' ? 'text-brand-900 font-bold' : 'text-slate-600'}`}>
              Clientele
            </Link> */}

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
              {/* UPDATED: Added 'max-h-[70vh]' and 'overflow-y-auto' to handle long lists */}
              <div className={`absolute top-24 left-0 w-72 bg-white border-t-2 border-brand-gold shadow-xl transition-all duration-200 max-h-[70vh] overflow-y-auto ${practiceDropdown ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
                <div className="py-2">
                  {menuItems.map((link) => (
                    <Link 
                      key={link.href} 
                      href={link.href}
                      className="block px-6 py-3 text-sm text-slate-600 border-b border-slate-50 last:border-0 hover:bg-slate-50 hover:text-brand-900"
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

            {/* --- MOBILE COLLAPSIBLE PRACTICE AREAS --- */}
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
              {/* UPDATED: Increased max-height to 800px to accommodate full list on mobile */}
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${mobilePracticeOpen ? 'max-h-[800px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                <div className="flex flex-col space-y-3 pl-4 border-l-2 border-slate-100 ml-1">
                  {menuItems.map(link => (
                    <Link 
                      key={link.href} 
                      href={link.href} 
                      onClick={() => setIsOpen(false)} 
                      className="text-base text-slate-600 hover:text-brand-gold"
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