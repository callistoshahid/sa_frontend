'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted in this session
    const hasAccepted = sessionStorage.getItem('hasAcceptedDisclaimer');
    if (!hasAccepted) {
      setIsOpen(true);
      // Disable scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const handleAgree = () => {
    sessionStorage.setItem('hasAcceptedDisclaimer', 'true');
    setIsOpen(false);
    // Re-enable scrolling
    document.body.style.overflow = 'unset';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white p-8 md:p-12 max-w-2xl w-full shadow-2xl rounded-sm text-center border-t-4 border-brand-gold relative"
          >
            <div className="space-y-6 font-sans text-brand-900 leading-relaxed text-sm md:text-base">
              
              <p>
                This website contains information about our Chambers. It should not be construed as, and is not meant to be solicitation or an advertisement of our services. The contents of this website do not constitute legal advice.
              </p>
              
              <p>
                By visiting the website, the visitor confirms that they wish to access this website and have not been solicited by our Chambers to do so. The information provided on this website is true and correct.
              </p>

              <div className="pt-6">
                <button
                  onClick={handleAgree}
                  className="bg-black text-white px-8 py-3 text-sm font-medium uppercase tracking-widest hover:bg-brand-gold hover:text-brand-900 transition-colors duration-300"
                >
                  Agree & Continue
                </button>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}