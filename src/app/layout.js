import './globals.css';
import { Playfair_Display, Lato , Cinzel} from 'next/font/google';
import NavbarLoader from '@/components/common/NavbarLoader';
import Footer from '@/components/common/Footer';
import DisclaimerModal from '@/components/common/DisclaimerModal'; // <--- IMPORT THIS

// 2. Configure Cinzel (The new Serif)
const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
  // Cinzel works best with specific weights, usually 400-900
  weight: ['400', '500', '600', '700', '800', '900'],
});

// 1. Configure Playfair Display (Serif)
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

// 2. Configure Lato (Sans) - We keep it for small UI text if needed
const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
  display: 'swap',
});

export const metadata = {
  title: 'S&A Law Chambers',
  description: 'Specialized litigation chamber based in New Delhi.',
};

export default function RootLayout({ children }) {
  return (
    // Pass both variables to HTML so Tailwind can see them
    <html lang="en" className={`${playfair.variable} ${lato.variable} ${cinzel.variable}`}>
      {/* CHANGE: switched from 'font-sans' to 'font-serif' */}
      <body className="font-serif text-slate-800 antialiased bg-brand-cream selection:bg-brand-gold selection:text-white">
        <DisclaimerModal />
        <NavbarLoader />
        {children}
        <Footer />
      </body>
    </html>
  );
}