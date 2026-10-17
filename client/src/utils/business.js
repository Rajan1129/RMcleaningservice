// Central place for business constants used across the site.
export const BUSINESS = {
  name: 'R M Home Cleaning',
  tagline: 'House Cleaning & Deep Cleaning Service',
  phone: '9646078122',
  phoneDisplay: '096460 78122',
  phoneInternational: '+91 96460 78122',
  phoneHref: 'tel:+919646078122',
  whatsappNumber: '919646078122',
  address: 'Progressive Society, Sector 50, Chandigarh, 160047',
  city: 'Chandigarh',
  sector: 'Sector 50',
  plusCode: 'MPXX+HW Chandigarh',
  hours: 'Open 24 hours',
  rating: 4.9,
  reviewsCount: 18,
  serviceArea: 'Sector 50 Chandigarh, Mohali, Panchkula & Tricity',
  website: 'https://rmcleaningservice.in',
  googleMapsUrl: 'https://maps.google.com/?q=Progressive+Society,+Sector+50,+Chandigarh+160047',
  mapEmbedUrl: 'https://www.google.com/maps?q=Progressive+Society,+Sector+50,+Chandigarh+160047&output=embed',
  badges: [
    '4.9★ Google Rated (18 Reviews)',
    'Open 24 Hours',
    'LGBTQ+ Friendly',
    'Trained & Polite Staff',
    'Sector 50, Chandigarh',
  ],
};

export const whatsappLink = (message) =>
  `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const DEFAULT_WHATSAPP_MESSAGE =
  'Hello, I found R M Home Cleaning online. I would like to enquire about your home cleaning service.';

export const serviceWhatsappMessage = (serviceName) =>
  `Hello, I need ${serviceName} in Chandigarh. Please share the details and quotation.`;
