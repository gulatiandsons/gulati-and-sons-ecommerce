'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, Clock, MessageSquare } from 'lucide-react';
import { useCommerce } from '@/lib/store/commerceStore';
import { BUSINESS_CONFIG } from '@/lib/config/business';

export default function ContactPage() {
  const { settings } = useCommerce();
  const [submitted, setSubmitted] = useState(false);

  const contactEmail = settings.contactEmail || BUSINESS_CONFIG.email;
  const contactPhone = settings.contactPhone || BUSINESS_CONFIG.phone;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full pt-28 pb-32 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto space-y-16">
      <div className="max-w-3xl space-y-4 border-b border-[#CCC5B9]/80 pb-8">
        <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
          CONCIERGE ASSISTANCE
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#252522] font-normal">
          We&rsquo;re Here to Help.
        </h1>
        <p className="font-sans text-sm sm:text-base text-[#252522]/80 leading-relaxed font-light">
          Whether you seek guidance on fragrance notes, watchcase dimensions, or tailored gifting, our concierge team is at your disposal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Contact Info (5 cols) */}
        <div className="lg:col-span-5 space-y-8 bg-[#E2D9C8]/40 border border-[#CCC5B9] p-8">
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#51292D]">
              Direct Inquiries
            </span>
            <h3 className="font-serif text-2xl text-[#252522]">The Concierge Desk</h3>
          </div>

          <div className="space-y-5 text-xs font-sans text-[#252522]/85">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#51292D] shrink-0 mt-0.5" />
              <div>
                <span className="font-mono text-[#252522]/60 block uppercase">Electronic Correspondence</span>
                <a href={`mailto:${contactEmail}`} className="font-medium hover:underline text-[#252522]">
                  {contactEmail}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#51292D] shrink-0 mt-0.5" />
              <div>
                <span className="font-mono text-[#252522]/60 block uppercase">Telephone Concierge</span>
                <a href={`tel:${contactPhone.replace(/\s+/g, '')}`} className="font-medium hover:underline text-[#252522]">
                  {contactPhone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MessageSquare className="w-4 h-4 text-[#51292D] shrink-0 mt-0.5" />
              <div>
                <span className="font-mono text-[#252522]/60 block uppercase">WhatsApp Direct</span>
                <a
                  href={BUSINESS_CONFIG.whatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:underline text-[#34483D]"
                >
                  Message Concierge Desk &rarr;
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#51292D] shrink-0 mt-0.5" />
              <div>
                <span className="font-mono text-[#252522]/60 block uppercase">Concierge Hours</span>
                <p>{BUSINESS_CONFIG.hours}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#51292D] shrink-0 mt-0.5" />
              <div>
                <span className="font-mono text-[#252522]/60 block uppercase">Registered Atelier & Office</span>
                <p>The Gulati Residence, Amrita Shergill Marg, New Delhi 110003, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form (7 cols) */}
        <div className="lg:col-span-7 bg-[#F3EFE6] border border-[#CCC5B9] p-8 sm:p-10 shadow-sm space-y-6">
          <h2 className="font-serif text-2xl text-[#252522]">Transmit An Inquiry</h2>

          {submitted ? (
            <div className="p-8 bg-[#E2D9C8]/50 border border-[#34483D] text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 text-[#34483D] mx-auto" />
              <h3 className="font-serif text-2xl text-[#252522]">Inquiry Received</h3>
              <p className="text-xs text-[#252522]/80 font-sans max-w-md mx-auto">
                Thank you for your message. A dedicated concierge will review your notes and respond within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#252522]/70 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3.5 py-2.5 bg-[#E2D9C8]/30 border border-[#CCC5B9] text-xs font-sans outline-none focus:border-[#51292D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#252522]/70 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full px-3.5 py-2.5 bg-[#E2D9C8]/30 border border-[#CCC5B9] text-xs font-sans outline-none focus:border-[#51292D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#252522]/70 mb-1">Inquiry Nature</label>
                <select className="w-full px-3.5 py-2.5 bg-[#E2D9C8]/30 border border-[#CCC5B9] text-xs font-sans outline-none focus:border-[#51292D]">
                  <option>Product Inquiries & Olfactory Sillage</option>
                  <option>Horological Case Specifications</option>
                  <option>Bespoke Gifting & Corporate Honors</option>
                  <option>Order Tracking & Dispatch Clarification</option>
                  <option>Returns & Exchange Inquiries</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#252522]/70 mb-1">Your Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Kindly detail your inquiry..."
                  className="w-full p-3.5 bg-[#E2D9C8]/30 border border-[#CCC5B9] text-xs font-sans outline-none focus:border-[#51292D]"
                />
              </div>

              <button
                type="submit"
                className="px-8 py-3.5 bg-[#51292D] text-[#F3EFE6] text-xs font-sans uppercase tracking-[0.2em] hover:bg-[#3C2921] transition-colors"
              >
                Transmit to Concierge
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
