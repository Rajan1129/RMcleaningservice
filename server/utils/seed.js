// Seeds an initial admin account, starter services, FAQs, business info, reviews, gallery items, and SEO location pages for R M Home Cleaning.
// Run with: node utils/seed.js  (from the /server directory)
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Admin = require('../models/Admin');
const Service = require('../models/Service');
const Faq = require('../models/Faq');
const BusinessInfo = require('../models/BusinessInfo');
const Review = require('../models/Review');
const LocationPage = require('../models/LocationPage');
const Gallery = require('../models/Gallery');

const services = [
  {
    title: 'Full Home Deep Cleaning',
    slug: 'full-home-deep-cleaning',
    shortDescription: 'Comprehensive top-to-bottom deep sanitization and detailing for flats, kothis and villas.',
    description:
      'Thorough deep cleaning of all rooms including bedrooms, living room, dining space, balcony, fans, switchboards, doors, and cobweb removal using industrial scrubbing equipment and eco-friendly disinfectants.',
    benefits: ['100% dust & allergen removal', 'Complete home sanitization', 'Corners & hard-to-reach areas cleaned', 'Trained & polite staff'],
    suitableFor: ['1/2/3/4 BHK Flats', 'Kothis & Independent Houses', 'Villas', 'Rental Turnarounds'],
    process: ['Call or WhatsApp us', 'Requirement & property size check', 'Instant quote & slot confirmation', 'On-time deep cleaning completed at your doorstep'],
    icon: 'Sparkles',
    image: '/images/living-room-cleaning.jpg',
    order: 1,
  },
  {
    title: 'Kitchen Deep Cleaning',
    slug: 'kitchen-deep-cleaning',
    shortDescription: 'Heavy degreasing, oil stain removal, exhaust, tile scrubbing and appliance wipe-down.',
    description:
      'Intensive cleaning for domestic and modular kitchens. We target grease build-up, stove oil marks, chimney/exhaust grime, kitchen slabs, cabinets inside-out, sink descaling, and wall tiles.',
    benefits: ['Tough grease & burnt oil removal', 'Cabinet & rack detailing', 'Sink & tile descaling', 'Hygienic cooking environment'],
    suitableFor: ['Modular Kitchens', 'Home Kitchens', 'Pantry Spaces'],
    process: ['Contact us', 'Discuss kitchen condition', 'Get a transparent estimate', 'Sparkling clean kitchen handover'],
    icon: 'Sparkles',
    image: '/images/kitchen-cleaning.jpg',
    order: 2,
  },
  {
    title: 'Bathroom Deep Cleaning',
    slug: 'bathroom-deep-cleaning',
    shortDescription: 'Hard water stain removal, anti-fungal descaling, tile scrubbing and sanitization.',
    description:
      'Specialized bathroom sanitization tackling stubborn hard water scale, yellow floor stains, toilet commode descaling, tap/shower head buffing, mirror polishing, and drain disinfection.',
    benefits: ['Removes hard water scale & limescale', 'Germ-free antibacterial treatment', 'Chrome fixtures shine restored', 'Fresh scent & clean grout'],
    suitableFor: ['Attached Bathrooms', 'Common Washrooms', 'Master En-suites'],
    process: ['Contact us', 'Confirm number of bathrooms', 'Get immediate quote', 'Service completed on-site'],
    icon: 'Droplet',
    image: '/images/bathroom-cleaning.jpg',
    order: 3,
  },
  {
    title: 'Sofa & Carpet Cleaning',
    slug: 'sofa-carpet-cleaning',
    shortDescription: 'Deep fabric and leather shampooing, stain extraction and dry vacuuming.',
    description:
      'High-grade injection-extraction cleaning and shampooing for sofa sets, recliners, cushions, rugs, and heavy carpets to remove deep-seated dirt, odors, and food spills.',
    benefits: ['Deep fiber dirt extraction', 'Eliminates dust mites & odors', 'Revitalizes fabric color', 'Safe for kids & pets'],
    suitableFor: ['Fabric & Leather Sofas', 'Carpets & Area Rugs', 'Dining Chairs', 'Mattresses'],
    process: ['Call or WhatsApp 096460 78122', 'Share photos/number of seats', 'Receive quote', 'Shampooing & extraction done'],
    icon: 'Home',
    image: '/images/sofa-cleaning.jpg',
    order: 4,
  },
  {
    title: 'Floor Scrubbing & Polishing',
    slug: 'floor-scrubbing-polishing',
    shortDescription: 'Single-disc machine scrubbing, grout stain removal and floor gloss enhancement.',
    description:
      'Heavy-duty floor cleaning and machine buffing for marble, vitrified tiles, mosaic, and granite flooring to eliminate years of accumulated stains and restore natural brightness.',
    benefits: ['Cleans darkened tile grouts', 'Uniform floor buffing', 'Removes post-construction paint spots'],
    suitableFor: ['Living rooms', 'Terraces', 'Lobbies', 'Commercial halls'],
    process: ['Contact us', 'Discuss square footage/floor type', 'Get quote', 'Machine scrubbing performed'],
    icon: 'Hammer',
    image: '/images/floor-scrubbing.jpg',
    order: 5,
  },
  {
    title: 'Glass & Window Cleaning',
    slug: 'glass-window-cleaning',
    shortDescription: 'Streak-free cleaning for balcony glasses, exterior windows, and partitions.',
    description:
      'Crystal-clear cleaning using squeegees, microfiber applicators, and scratch-free solutions for high glass windows, sliding balcony doors, glass balustrades, and shower cubicles.',
    benefits: ['Spotless streak-free finish', 'Enhanced natural daylight', 'Safe cleaning for high panels'],
    suitableFor: ['Balcony Sliders', 'Large Glass Windows', 'Glass Partitions', 'Showroom Fronts'],
    process: ['Contact us', 'Specify window count', 'Get instant quote', 'Completed with care'],
    icon: 'PanelTop',
    image: '/images/window-glass-cleaning.jpg',
    order: 6,
  },
  {
    title: 'Move-in / Move-out Cleaning',
    slug: 'move-in-move-out-cleaning',
    shortDescription: 'Thorough sanitization before shifting into a new house or handing over a rental flat.',
    description:
      'Specialized turn-around cleaning ensuring every wardrobe, drawer, balcony, kitchen cabinet, and washroom is sanitized so you can move your family into a fresh, spotless home.',
    benefits: ['Hassle-free relocation', 'Complete interior disinfection', 'Checklist-driven inspection'],
    suitableFor: ['New Tenants', 'Home Owners Shifting', 'Property Landlords'],
    process: ['Contact us', 'Set moving date', 'Get quotation', 'Turnkey cleaning done'],
    icon: 'Home',
    image: '/images/move-in-cleaning.jpg',
    order: 7,
  },
  {
    title: 'Water Tank Cleaning',
    slug: 'water-tank-cleaning',
    shortDescription: 'Sludge removal, high pressure rotary cleaning and antibacterial tank disinfection.',
    description:
      'Hygienic cleaning of underground and overhead residential/commercial water tanks to protect your family from sediment, algae, bacteria, and contaminated water supply.',
    benefits: ['Safe & clear domestic water', 'Removes algae and sediment', 'Chemical-free antibacterial treatment'],
    suitableFor: ['Overhead Sintex Tanks', 'Underground Concrete Sumps', 'Societies & Kothis'],
    process: ['Call or WhatsApp us', 'Specify tank capacity', 'Get a quote', 'Service completed at your premises'],
    icon: 'Waves',
    image: '/images/water-tank-cleaning.jpg',
    order: 8,
  },
  {
    title: 'Commercial & Office Cleaning',
    slug: 'commercial-office-cleaning',
    shortDescription: 'Flexible after-hours and weekend cleaning for offices, clinics, showrooms and retail shops.',
    description:
      'Reliable cleaning solutions designed for businesses in Chandigarh and Tricity. Includes desk sanitization, workstation dusting, floor buffing, pantry cleaning, and glass frontage.',
    benefits: ['Maintains corporate hygiene', 'Flexible 24/7 scheduling', 'Discreet & experienced team'],
    suitableFor: ['Corporate Offices', 'Clinics & Salons', 'Retail Showrooms', 'Institutions'],
    process: ['Contact team', 'Site review / requirement discussion', 'Custom package quote', 'Service executed efficiently'],
    icon: 'Building2',
    image: '/images/office-cleaning.jpg',
    order: 9,
  },
  {
    title: '24/7 Emergency Cleaning',
    slug: 'emergency-cleaning',
    shortDescription: 'Round-the-clock rapid response cleaning for urgent situations, parties and spills.',
    description:
      'Need an urgent cleanup before guests arrive or right after an event? R M Home Cleaning is open 24 hours to handle prompt, short-notice requests across Chandigarh and Tricity.',
    benefits: ['Open 24 Hours', 'Quick dispatch', 'Direct phone/WhatsApp hotline 096460 78122'],
    suitableFor: ['Pre/Post Event', 'Accidental Spills & Water Logging', 'Short-Notice Inspections'],
    process: ['Call 096460 78122 directly', 'Describe urgency', 'Fast dispatch confirmation', 'Prompt arrival & cleaning'],
    icon: 'AlertTriangle',
    image: '/images/emergency-cleaning.jpg',
    order: 10,
  },
];

const faqs = [
  {
    question: 'What areas in Chandigarh do you provide home cleaning services in?',
    answer: 'We are based at Progressive Society, Sector 50, Chandigarh and actively serve Sector 50, all sectors across Chandigarh, Mohali, Panchkula, Zirakpur, Kharar, and the entire Tricity region.',
    order: 1,
  },
  {
    question: 'Are your cleaning services really open 24 hours?',
    answer: 'Yes! R M Home Cleaning operates round the clock, 24 hours a day, 7 days a week. Call or WhatsApp 096460 78122 anytime for night shifts, early mornings, or same-day emergency deep cleaning.',
    order: 2,
  },
  {
    question: 'What is included in Full Home Deep Cleaning?',
    answer: 'Full home deep cleaning covers all rooms: fan dusting, cobweb removal, modular kitchen degreasing, bathroom descaling & tile buffing, window glass cleaning, and machine floor scrubbing.',
    order: 3,
  },
  {
    question: 'Do your technicians bring their own cleaning machines and chemicals?',
    answer: 'Yes. Our trained team brings high-grade floor scrubbers, vacuum cleaners, specialized degreasers, descalers, and microfiber tools with them.',
    order: 4,
  },
  {
    question: 'How do I get an instant quotation?',
    answer: 'Simply call us at 096460 78122 or message on WhatsApp at 919646078122. Share your BHK size or specific requirements, and we provide a clear, upfront estimate with no hidden costs.',
    order: 5,
  },
  {
    question: 'What makes R M Home Cleaning trusted in Chandigarh?',
    answer: 'We have a verified 4.9★ Google rating from 18 reviews, polite punctual boys, and are LGBTQ+ friendly.',
    order: 6,
  },
];

const reviews = [
  {
    author: 'Gourav Verma',
    rating: 5,
    details: '1 review · 1 photo',
    timeAgo: '2 months ago',
    text: 'Maine pehli baar is home cleaning service ka use kiya aur experience bahut hi achha raha. Team ne bahut mehnat aur safai se kaam kiya. Kitchen, bathroom aur floors sab bilkul chamak uthe. Staff ka behavior friendly tha aur unhone poora kaam bohot dhyan se kiya.',
    ownerResponse: 'Good 👍😊',
    isApproved: true,
    order: 1,
  },
  {
    author: 'Suraj Verma',
    rating: 5,
    details: '2 reviews · 5 photos',
    timeAgo: '2 months ago',
    text: 'Very nice service as per our expectations. On time, calm and co-operative. Very polite the boys were and they did their work very well. Will definitely recommend!',
    ownerResponse: 'Thank you sir 😊',
    isApproved: true,
    order: 2,
  },
  {
    author: 'Anshit Varma',
    rating: 5,
    details: '4 reviews · 4 photos',
    timeAgo: '3 months ago',
    text: 'Deep Clean की सर्विस बहुत अच्छी लगी। स्टाफ समय पर आया, व्यवहार विनम्र था और पूरे घर की सफाई बहुत अच्छे से की। हर कोने की बारीकी से सफाई की गई, जिससे घर बिल्कुल नया जैसा लगने लगा। काम प्रोफेशनल तरीके से और तय समय में पूरा किया गया।',
    ownerResponse: 'Thank you so much for your kind words! 🙏',
    isApproved: true,
    order: 3,
  },
];

const galleryItems = [
  {
    title: 'Living Room Deep Cleaning',
    category: 'Full Home Cleaning',
    imageUrl: '/images/living-room-cleaning.jpg',
  },
  {
    title: 'Modular Kitchen Degreasing & Slab Cleaning',
    category: 'Kitchen Cleaning',
    imageUrl: '/images/kitchen-cleaning.jpg',
    beforeImageUrl: '/images/kitchen-before.jpg',
    afterImageUrl: '/images/kitchen-after.jpg',
  },
  {
    title: 'Washroom Tile & Fixture Sanitization',
    category: 'Bathroom Cleaning',
    imageUrl: '/images/bathroom-cleaning.jpg',
    beforeImageUrl: '/images/bathroom-before.jpg',
    afterImageUrl: '/images/bathroom-after.jpg',
  },
  {
    title: 'Fabric Sofa Shampooing & Extraction',
    category: 'Sofa & Carpet',
    imageUrl: '/images/sofa-cleaning.jpg',
  },
  {
    title: 'Marble Floor Single Disc Scrubbing',
    category: 'Floor Polishing',
    imageUrl: '/images/floor-scrubbing.jpg',
  },
  {
    title: 'Streak-Free Balcony Window Cleaning',
    category: 'Glass & Window Cleaning',
    imageUrl: '/images/window-glass-cleaning.jpg',
  },
  {
    title: 'Balcony Washing & Scrubbing',
    category: 'Full Home Cleaning',
    imageUrl: '/images/balcony-cleaning.jpg',
  },
  {
    title: 'Ceiling Fan & Fixture Detailing',
    category: 'Full Home Cleaning',
    imageUrl: '/images/move-in-cleaning.jpg',
  },
];

const locationPages = [
  {
    city: 'Mohali',
    slug: 'cleaning-service-in-mohali',
    metaTitle: 'Home Cleaning Service in Mohali | 4.9★ Deep Cleaning | R M Home Cleaning',
    metaDescription: 'Best house cleaning service in Mohali (Phase 1 to 11, Aerocity, Sector 70–82). Kitchen, bathroom, sofa & full flat deep cleaning. Open 24/7. Call 096460 78122.',
    heroTitle: 'Top-Rated Home Cleaning Services in Mohali',
    heroSubtitle: '4.9★ Rated Deep Cleaning Across Phase 1–11, Aerocity, IT City & Sector 70 to 82',
    description: 'Looking for the most reliable house cleaning service in Mohali? R M Home Cleaning provides specialized deep cleaning for 1, 2, 3, 4 BHK flats, kothis, and independent floors in Mohali. Our polite, punctual staff arrives with industrial vacuum machines, eco-friendly degreasers, and single-disc scrubbers to make your home spotless.',
    heroImage: '/images/hero-man-cleaning-window.jpg',
    localities: [
      'Phase 1', 'Phase 2', 'Phase 3A', 'Phase 3B2', 'Phase 5', 'Phase 7', 'Phase 8',
      'Phase 9', 'Phase 10', 'Phase 11', 'Sector 68', 'Sector 69', 'Sector 70', 'Sector 71',
      'Sector 78', 'Sector 79', 'Sector 80', 'Sector 82 (JLPL)', 'Aerocity', 'IT City Mohali',
    ],
    priceTiers: [
      { label: '1 BHK Deep Clean', price: 'Free Custom Quote', note: 'Full rooms, kitchen & washroom' },
      { label: '2 BHK Deep Clean', price: 'Free Custom Quote', note: 'Complete flat scrubbing & balcony' },
      { label: '3 BHK Deep Clean', price: 'Free Custom Quote', note: 'Top-to-bottom detailing & fans' },
      { label: '4 BHK / Kothi', price: 'Free Custom Quote', note: 'Includes terrace & multiple baths' },
      { label: 'Kitchen Degreasing', price: 'Free Custom Quote', note: 'Chimney, tiles, cabinets & stove' },
      { label: 'Bathroom Descaling', price: 'Free Custom Quote', note: 'Hard water scale & glass partitions' },
    ],
    customFaqs: [
      {
        question: 'Do you cover all phases and sectors in Mohali?',
        answer: 'Yes! We actively serve Phase 1 through Phase 11, Aerocity, IT City, Sector 68 to 82, and all surrounding residential societies in Mohali with prompt doorstep arrival.',
      },
      {
        question: 'Can I book same-day deep cleaning in Mohali?',
        answer: 'Yes, we are open 24 hours. Call 096460 78122 directly for immediate same-day slots in Mohali.',
      },
    ],
    order: 1,
  },
  {
    city: 'Zirakpur',
    slug: 'cleaning-service-in-zirakpur',
    metaTitle: 'Home Cleaning Service in Zirakpur | VIP Road & Dhakoli | R M Home Cleaning',
    metaDescription: 'Top-rated deep cleaning for flats and high-rise societies in Zirakpur (VIP Road, Dhakoli, Baltana, Peermuchalla). 24/7 Available. Call 096460 78122.',
    heroTitle: 'Top-Quality Flat & House Cleaning Services in Zirakpur',
    heroSubtitle: 'Serving VIP Road, Dhakoli, Baltana, Peermuchalla & Ambala Highway Societies',
    description: 'High-rise apartment living in Zirakpur brings dust from nearby highways and construction. R M Home Cleaning offers intensive deep cleaning tailored for Zirakpur flats — balcony power washing, sliding glass door buffing, chimney degreasing, and floor scrubbing.',
    heroImage: '/images/hero-man-cleaning-window.jpg',
    localities: [
      'VIP Road', 'Dhakoli', 'Baltana', 'Peermuchalla', 'Highland Park', 'Maya Garden',
      'Patiala Road', 'Ambala Highway', 'Ghazipur', 'Nagla Road', 'Savitry Greens', 'Motia City',
      'Barnala Green Lotus', 'Trishla City', 'Escon Arena',
    ],
    priceTiers: [
      { label: '1 BHK Society Flat', price: 'Free Custom Quote', note: 'Living, bath & modular kitchen' },
      { label: '2 BHK Society Flat', price: 'Free Custom Quote', note: 'All rooms, balcony & floor buffing' },
      { label: '3 BHK High-Rise Flat', price: 'Free Custom Quote', note: 'Deep scrub, glass sliders & fans' },
      { label: 'Penthouse / Duplex', price: 'Free Custom Quote', note: 'Comprehensive multi-level clean' },
      { label: 'Balcony & Glass Buffing', price: 'Free Custom Quote', note: 'Streak-free high rail glass' },
      { label: 'Sofa Shampooing', price: 'Free Custom Quote', note: '5-seater fabric/leather deep shampoo' },
    ],
    customFaqs: [
      {
        question: 'How quickly can your cleaners reach societies on VIP Road or Dhakoli?',
        answer: 'Our mobile cleaning vans are stationed across the Tricity ring, enabling arrival in Zirakpur societies within 45 to 60 minutes.',
      },
      {
        question: 'Do you clean sliding balcony doors and high window panels?',
        answer: 'Yes, we specialize in high-floor balcony sliders and glass partitions using specialized squeegees and scratch-free solutions.',
      },
    ],
    order: 2,
  },
  {
    city: 'Tricity',
    slug: 'cleaning-service-in-tricity',
    metaTitle: '#1 Home Deep Cleaning Services in Tricity (Chandigarh, Mohali, Panchkula)',
    metaDescription: 'Premier 4.9★ house deep cleaning service across Chandigarh Tricity. Punctual staff, open 24 hours, affordable packages. Call 096460 78122.',
    heroTitle: '#1 House Deep Cleaning Services Across Chandigarh Tricity',
    heroSubtitle: 'Complete Coverage in Chandigarh, Mohali, Panchkula, Zirakpur & Kharar with 24/7 Rapid Dispatch',
    description: 'Whether you reside in a Chandigarh kothi, a Mohali apartment, a Panchkula villa, or a Zirakpur high-rise society, R M Home Cleaning delivers the Tricity benchmark in deep sanitation. Rated 4.9 stars on Google with 18 verified reviews.',
    heroImage: '/images/hero-man-cleaning-window.jpg',
    localities: [
      'Chandigarh (All Sectors 1–60)', 'Mohali (Phases 1–11 & Aerocity)', 'Panchkula (Sectors 1–28 & MDC)',
      'Zirakpur (VIP Road & Dhakoli)', 'Kharar (Sunny Enclave & Gillco)', 'New Chandigarh (Mullanpur)',
      'Derabassi', 'Pinjore & Kalka Belt',
    ],
    priceTiers: [
      { label: '1 BHK Complete Package', price: 'Free Custom Quote', note: 'Doorstep service across Tricity' },
      { label: '2 BHK Complete Package', price: 'Free Custom Quote', note: 'Full flat top-to-bottom scrub' },
      { label: '3 BHK Complete Package', price: 'Free Custom Quote', note: 'Includes all balconies & kitchen' },
      { label: 'Independent Kothi / Villa', price: 'Free Custom Quote', note: 'Customized area quotation' },
      { label: 'Water Tank Cleaning', price: 'Free Custom Quote', note: 'Underground & overhead Sintex' },
      { label: 'Commercial Office Clean', price: 'Free Custom Quote', note: 'Workstations, cabins & washrooms' },
    ],
    customFaqs: [
      {
        question: 'Are there any extra travel or conveyance charges across Tricity?',
        answer: 'No! Our estimates are completely transparent and flat across Chandigarh, Mohali, Panchkula, Zirakpur, and Kharar with zero hidden travel surcharges.',
      },
    ],
    order: 3,
  },
  {
    city: 'Near Me',
    slug: 'cleaning-service-near-me',
    metaTitle: 'House Deep Cleaning Service Near Me | Open 24 Hours | R M Home Cleaning',
    metaDescription: 'Searching for top-rated home cleaning service near you? R M Home Cleaning delivers 24/7 doorstep cleaners in 45-60 mins across Chandigarh & Tricity. Call 096460 78122.',
    heroTitle: 'Best House Deep Cleaning Service Near You',
    heroSubtitle: 'Verified Doorstep Cleaners Arriving in 45–60 Minutes Across Your Sector or Society',
    description: 'Need immediate deep cleaning near your location? Headquartered in Progressive Society, Sector 50, Chandigarh, R M Home Cleaning is centrally positioned to dispatch fully equipped cleaning crews to your home within minutes.',
    heroImage: '/images/hero-man-cleaning-window.jpg',
    localities: [
      'Sector 50 Chandigarh', 'South Chandigarh Hub', 'Mohali Phase 7 & 3B2 Corridor',
      'Panchkula Urban Estate', 'Zirakpur Express Way', 'Kharar Highway Area', 'Aerocity Ring',
    ],
    priceTiers: [
      { label: 'Express Kitchen Clean', price: 'Free Custom Quote', note: 'Dispatched in 60 mins' },
      { label: 'Bathroom Deep Clean', price: 'Free Custom Quote', note: 'Anti-fungal & hard water scale' },
      { label: 'Full Home Deep Clean', price: 'Free Custom Quote', note: 'Complete detailing package' },
      { label: 'Emergency 24/7 Slot', price: 'Custom Quote', note: 'Anytime day or night' },
    ],
    customFaqs: [
      {
        question: 'How fast can a team arrive near my location?',
        answer: 'We typically reach homes in Chandigarh and central Mohali within 45 to 60 minutes of booking confirmation.',
      },
    ],
    order: 4,
  },
  {
    city: 'Chandigarh',
    slug: 'cleaning-service-in-chandigarh',
    metaTitle: 'Top Home Cleaning Service in Chandigarh | Sector 50 | R M Home Cleaning',
    metaDescription: 'Premier 4.9★ house cleaning service in Chandigarh. Based in Sector 50, serving Sectors 1 to 60. Kitchen, washroom, sofa & kothi deep clean. Open 24 Hours. Call 096460 78122.',
    heroTitle: 'Premier House & Deep Cleaning Services in Chandigarh',
    heroSubtitle: 'Headquartered in Progressive Society, Sector 50 — Serving Sectors 1 to 60 with 4.9★ Rating',
    description: 'Chandigarh homes demand meticulous attention to detail — from wide terrace kothis to modern society apartments. R M Home Cleaning is proud to be an authentic local Chandigarh cleaning service based in Sector 50, trusted by hundreds of Tricity families.',
    heroImage: '/images/hero-man-cleaning-window.jpg',
    localities: [
      'Sector 50 (Progressive Society)', 'Sector 34', 'Sector 35', 'Sector 43', 'Sector 44',
      'Sector 45', 'Sector 46', 'Sector 47', 'Sector 48', 'Sector 49', 'Sector 22', 'Sector 17',
      'Sector 7', 'Sector 8', 'Sector 9', 'Sector 10', 'Sector 11', 'Sector 15', 'Sector 20', 'Sector 21',
    ],
    priceTiers: [
      { label: '1 BHK Apartment Clean', price: 'Free Custom Quote', note: 'Rooms, tiles & kitchen' },
      { label: '2 BHK Apartment Clean', price: 'Free Custom Quote', note: 'Complete sanitization' },
      { label: '3 BHK Apartment Clean', price: 'Free Custom Quote', note: 'Top-to-bottom scrub' },
      { label: 'Chandigarh Kothi / Villa', price: 'Free Custom Quote', note: 'Full floor & terrace buffing' },
      { label: 'Kitchen Degreasing', price: 'Free Custom Quote', note: 'Modular kitchen specialist' },
      { label: 'Washroom Sanitization', price: 'Free Custom Quote', note: 'Chrome & tile descaling' },
    ],
    customFaqs: [
      {
        question: 'Where is your physical office located in Chandigarh?',
        answer: 'We are located at Progressive Society, Sector 50, Chandigarh (PIN: 160047, Plus Code: MPXX+HW Chandigarh).',
      },
    ],
    order: 5,
  },
  {
    city: 'Kharar',
    slug: 'cleaning-service-in-kharar',
    metaTitle: 'Home Deep Cleaning Services in Kharar | Sunny Enclave & Gillco | R M Home Cleaning',
    metaDescription: 'Top-rated home cleaning service in Kharar (Sunny Enclave, Gillco Valley, Chajju Majra, Landran Road). Affordable flat deep cleaning. Open 24/7. Call 096460 78122.',
    heroTitle: 'Reliable Home & Flat Deep Cleaning in Kharar',
    heroSubtitle: 'Fast On-Site Cleaning for Sunny Enclave, Gillco Valley, Chajju Majra & Shivalik City',
    description: 'Moving into a new flat or need deep cleaning in Kharar? R M Home Cleaning offers complete turnkey cleaning for rental turnarounds, new flat possessions, and ongoing domestic maintenance in Kharar.',
    heroImage: '/images/hero-man-cleaning-window.jpg',
    localities: [
      'Sunny Enclave', 'Gillco Valley', 'Chajju Majra', 'Landran Road', 'Shivalik City',
      'Omega City', 'Model Town Kharar', 'Darpan City', 'Kurali Road', 'Nirwana Greens',
      'Aman City', 'Guru Nanak Enclave',
    ],
    priceTiers: [
      { label: '1 BHK Flat Possession', price: 'Free Custom Quote', note: 'Post-paint dust cleanup' },
      { label: '2 BHK Move-in Clean', price: 'Free Custom Quote', note: 'Wardrobes, kitchen & washrooms' },
      { label: '3 BHK Deep Clean', price: 'Free Custom Quote', note: 'Complete turnkey sanitization' },
      { label: 'Independent House Clean', price: 'Free Custom Quote', note: 'Includes gates & terrace' },
      { label: 'Kitchen Oil Degreasing', price: 'Free Custom Quote', note: 'Chimney, tiles & rack wash' },
      { label: 'Bathroom Acid-Free Scrub', price: 'Free Custom Quote', note: 'Safe anti-bacterial scrub' },
    ],
    customFaqs: [
      {
        question: 'Do you offer move-in / tenant handover cleaning in Sunny Enclave & Gillco Valley?',
        answer: 'Yes! Move-in and move-out cleaning is one of our most popular services in Kharar, covering paint spot removal, drawer sanitization, and washroom descaling.',
      },
    ],
    order: 6,
  },
  {
    city: 'SAS Nagar',
    slug: 'cleaning-service-in-sas-nagar',
    metaTitle: 'Deep Cleaning Service in SAS Nagar Mohali | R M Home Cleaning',
    metaDescription: 'Certified residential and commercial deep cleaning in SAS Nagar. Verified staff, single-disc machines, eco-friendly sanitization. Open 24 Hours. Call 096460 78122.',
    heroTitle: 'Complete House & Office Deep Cleaning in SAS Nagar',
    heroSubtitle: 'Eco-Friendly Sanitization, Sofa Shampooing & Floor Buffing for Homes & Commercial Spaces',
    description: 'SAS Nagar (Mohali) hosts both prominent corporate hubs and lush residential neighborhoods. R M Home Cleaning delivers specialized domestic deep cleaning and office sanitization throughout SAS Nagar.',
    heroImage: '/images/hero-man-cleaning-window.jpg',
    localities: [
      'SAS Nagar Industrial Area Phases 1–9', 'Phase 1 to 11', 'Sector 53 to 82', 'Kumbra',
      'Sohana', 'Aerocity SAS Nagar', 'CP67 Mall Vicinity', 'Mohali IT Hub',
    ],
    priceTiers: [
      { label: 'Residential Flat Deep Clean', price: 'Free Custom Quote', note: 'Complete room & washroom sanitization' },
      { label: 'Corporate Office Clean', price: 'Free Custom Quote', note: 'Desks, glass partitions & floors' },
      { label: 'Sofa & Upholstery Care', price: 'Free Custom Quote', note: 'Deep fiber stain extraction' },
      { label: 'Single-Disc Floor Buffing', price: 'Free Custom Quote', note: 'Marble & vitrified tile restoration' },
    ],
    customFaqs: [
      {
        question: 'Do you provide commercial cleaning for IT offices and clinics in SAS Nagar?',
        answer: 'Yes, we provide flexible night slots, weekend sanitization, and daily/weekly deep cleaning packages for offices in SAS Nagar.',
      },
    ],
    order: 7,
  },
];

const run = async () => {
  await connectDB();

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD in your .env before seeding.');
    process.exit(1);
  }

  const existingAdmin = await Admin.findOne({ email: adminEmail.toLowerCase() });
  if (!existingAdmin) {
    await Admin.create({ name: 'Admin', email: adminEmail, password: adminPassword, role: 'superadmin' });
    console.log('Admin account created.');
  } else {
    console.log('Admin account already exists, skipping.');
  }

  await Service.deleteMany({});
  await Service.insertMany(services);
  console.log(`Seeded ${services.length} services with images.`);

  await Faq.deleteMany({});
  await Faq.insertMany(faqs);
  console.log(`Seeded ${faqs.length} FAQs.`);

  await Review.deleteMany({});
  await Review.insertMany(reviews);
  console.log(`Seeded ${reviews.length} verified reviews.`);

  await Gallery.deleteMany({});
  await Gallery.insertMany(galleryItems);
  console.log(`Seeded ${galleryItems.length} gallery items.`);

  await LocationPage.deleteMany({});
  await LocationPage.insertMany(locationPages);
  console.log(`Seeded ${locationPages.length} SEO location pages.`);

  await BusinessInfo.deleteMany({});
  await BusinessInfo.create({
    businessName: 'R M Home Cleaning',
    tagline: 'House Cleaning & Deep Cleaning Service',
    phone: '9646078122',
    whatsapp: '919646078122',
    address: 'Progressive Society, Sector 50, Chandigarh, 160047',
    plusCode: 'MPXX+HW Chandigarh',
    hours: 'Open 24 Hours',
    rating: 4.9,
    reviewsCount: 18,
    serviceArea: 'Sector 50 Chandigarh, Mohali, Panchkula, Zirakpur, Kharar & Tricity',
    mapEmbedUrl: 'https://www.google.com/maps?q=Progressive+Society,+Sector+50,+Chandigarh+160047&output=embed',
    googleMapsUrl: 'https://maps.google.com/?q=Progressive+Society,+Sector+50,+Chandigarh+160047',
    googleReviewsUrl: 'https://maps.google.com/?q=Progressive+Society,+Sector+50,+Chandigarh+160047',
    website: 'https://sparkle-spark-homes.lovable.app/',
  });
  console.log('Seeded R M Home Cleaning business info.');

  console.log('Seeding complete.');
  await mongoose.connection.close();
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
