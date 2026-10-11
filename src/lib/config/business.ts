/**
 * Official Business Information & Concierge Directory
 * Single Source of Truth for Gulati & Sons (gulatiandsons.com)
 */

export const BUSINESS_CONFIG = {
  brandName: 'Gulati & Sons',
  legalName: 'Gulati and Sons Luxury House',
  domain: 'https://gulatiandsons.com',
  tagline: 'The Private House · Modern Luxury Lifestyle House',

  // Official Business Contacts (Strictly verified)
  phone: '+91 83750 44808',
  phoneFormatted: '+91 83750 44808',
  phoneTelLink: 'tel:+918375044808',

  email: 'gulatiandsons.info@gmail.com',
  emailMailtoLink: 'mailto:gulatiandsons.info@gmail.com',

  // WhatsApp (Official number, confirmed link)
  whatsAppLink: 'https://wa.me/918375044808?text=Hello%20Gulati%20%26%20Sons%20Concierge%2C%20I%20would%20like%20assistance%20with...',

  // Concierge Availability
  hours: 'Monday – Saturday: 10:00 AM – 7:00 PM IST',
  emergencyInquiries: 'Private correspondence via email addressed to concierge desk.',

  // Founder Information
  founder: {
    name: 'Varun Gulati',
    role: 'Founder',
    title: 'The Founder Behind Gulati and Sons',
    url: 'https://gulatiandsons.com/founder'
  },

  // Logistics & Pan-India Operations
  dispatchHubs: 'New Delhi (HQ) · Mumbai · Bengaluru · Pan-India Armed Transit',
  insuredDeliveryThreshold: 3000
} as const;
