'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

// Reusable Field Component (Now supports prefixes & custom change handlers)
const FormField = ({ 
  label, 
  type = "text", 
  id, 
  placeholder, 
  isTextArea = false, 
  focusedField, 
  setFocusedField,
  prefix,      // NEW: Accepts "+91"
  value,       // NEW: Controlled value
  onChange,    // NEW: Controlled handler
  maxLength    // NEW: Max chars
}) => (
  <div className="relative mb-8">
    <label 
      htmlFor={id} 
      className={`absolute left-0 transition-all duration-300 font-sans z-10 ${
        focusedField === id || (value && value.length > 0) // Keep label up if field has value
          ? '-top-6 text-xs text-brand-gold font-bold' 
          : '-top-6 text-xs text-slate-400 font-medium'
      } uppercase tracking-widest`}
    >
      {label}
    </label>
    
    <div className="relative flex items-center border-b border-slate-300 focus-within:border-brand-gold transition-colors">
      
      {/* PREFIX (+91) */}
      {prefix && (
        <span className="text-brand-900 font-sans font-bold mr-2 select-none">
          {prefix}
        </span>
      )}

      {isTextArea ? (
        <textarea
          id={id}
          rows="4"
          className="w-full bg-transparent py-3 text-brand-900 font-sans focus:outline-none resize-none placeholder-slate-300"
          placeholder={placeholder}
          onFocus={() => setFocusedField(id)}
          onBlur={() => setFocusedField(null)}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          type={type}
          id={id}
          maxLength={maxLength}
          className="w-full bg-transparent py-3 text-brand-900 font-sans focus:outline-none placeholder-slate-300"
          placeholder={placeholder}
          onFocus={() => setFocusedField(id)}
          onBlur={() => setFocusedField(null)}
          value={value}     // Controlled Input
          onChange={onChange} // Custom Handler
        />
      )}
    </div>
  </div>
);

export default function ContactForm() {
  const [focusedField, setFocusedField] = useState(null);
  const [formState, setFormState] = useState('idle');
  
  // FORM STATE
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    purpose: 'Legal Consultation',
    message: ''
  });

  // 1. Generic Change Handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // 2. Strict Phone Validation Handler
  const handlePhoneChange = (e) => {
    const input = e.target.value;
    // Regex: Only allow numbers (0-9)
    const numericValue = input.replace(/[^0-9]/g, '');
    
    setFormData({ ...formData, phone: numericValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Final Validation before submit
    if (formData.phone.length !== 10) {
      alert("Please enter a valid 10-digit Indian phone number.");
      return;
    }

    setFormState('submitting');
    setTimeout(() => setFormState('success'), 2000);
  };

  if (formState === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-brand-900 text-white p-12 text-center rounded-sm shadow-xl h-full flex flex-col justify-center items-center"
      >
        <div className="text-6xl text-brand-gold mb-6">✓</div>
        <h3 className="text-3xl font-serif mb-4">Inquiry Received</h3>
        <p className="text-brand-cream/80 font-sans mb-8">Our legal team will review your matter and respond shortly.</p>
        <button 
          onClick={() => {
            setFormState('idle'); 
            setFormData({ name: '', email: '', phone: '', purpose: 'Legal Consultation', message: '' });
          }}
          className="text-xs font-bold uppercase tracking-widest text-brand-gold hover:text-white transition-colors"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="bg-white p-8 md:p-12 shadow-2xl border-t-4 border-brand-gold"
    >
      <h3 className="text-2xl font-serif text-brand-900 mb-10">Request Consultation</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FormField 
          id="name" 
          label="Full Name" 
          placeholder="e.g. John Doe" 
          focusedField={focusedField} 
          setFocusedField={setFocusedField}
          value={formData.name}
          onChange={handleChange}
        />
        <FormField 
          id="email" 
          type="email" 
          label="Email Address" 
          placeholder="john@company.com" 
          focusedField={focusedField} 
          setFocusedField={setFocusedField} 
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* PHONE FIELD WITH VALIDATION */}
        <FormField 
          id="phone" 
          type="tel" 
          label="Phone Number" 
          placeholder="9876543210" 
          prefix="+91"   // Shows +91 visually
          maxLength={10} // Limits typing to 10 chars
          focusedField={focusedField} 
          setFocusedField={setFocusedField} 
          value={formData.phone}
          onChange={handlePhoneChange} // strict number-only logic
        />
        
        <div className="relative mb-8">
          <label className="absolute -top-6 left-0 text-xs text-brand-gold uppercase tracking-widest font-bold font-sans">
            Subject Matter
          </label>
          <select 
            id="purpose"
            value={formData.purpose}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-slate-300 py-3 text-brand-900 font-sans focus:outline-none focus:border-brand-gold appearance-none cursor-pointer"
            onFocus={() => setFocusedField('purpose')}
            onBlur={() => setFocusedField(null)}
          >
            <option>Legal Consultation</option>
            <option>Arbitration Inquiry</option>
            <option>Supreme Court Litigation</option>
            <option>Corporate Advisory</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <FormField 
        id="message" 
        isTextArea 
        label="Brief Details" 
        placeholder="Please describe your legal requirements..." 
        focusedField={focusedField} 
        setFocusedField={setFocusedField} 
        value={formData.message}
        onChange={handleChange}
      />

      <button 
        type="submit"
        disabled={formState === 'submitting'}
        className="w-full bg-brand-900 text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-gold hover:text-brand-900 transition-all duration-300 mt-4"
      >
        {formState === 'submitting' ? 'Processing...' : 'Submit Inquiry'}
      </button>

      <p className="text-[10px] text-slate-400 mt-6 text-center font-sans">
        * All communications are strictly privileged and confidential.
      </p>
    </motion.form>
  );
}