// Fallback service content shown if the API is unreachable, and used to
// map slugs to icons on the frontend. The source of truth is MongoDB via
// GET /api/services once the backend is running and seeded.
export const servicesData = [
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
  },
];

export const faqsData = [
  {
    question: 'What areas in Chandigarh do you provide home cleaning services in?',
    answer: 'We are based at Progressive Society, Sector 50, Chandigarh and actively serve Sector 50, all sectors across Chandigarh, Mohali, Panchkula, and the surrounding Tricity region.',
  },
  {
    question: 'Are your services really open 24 hours?',
    answer: 'Yes! R M Home Cleaning operates 24 hours a day. You can call or WhatsApp us at 096460 78122 anytime for bookings, flexible night/early morning slots, or urgent cleaning needs.',
  },
  {
    question: 'What does Full Home Deep Cleaning include?',
    answer: 'Our full home deep cleaning covers every room: dust and cobweb removal, ceiling fans, switchboards, modular kitchen degreasing, bathroom descaling and tile scrubbing, window glass cleaning, and floor scrubbing.',
  },
  {
    question: 'Do you bring your own cleaning equipment and chemicals?',
    answer: 'Yes, our experienced team comes fully equipped with specialized single-disc machines, industrial vacuum cleaners, microfiber cloths, and high-grade safe cleaning materials.',
  },
  {
    question: 'How do I request a quotation or make a booking?',
    answer: 'You can call us directly on 096460 78122, send a WhatsApp message to 919646078122, or submit your details via our website form. We provide quick and transparent estimates.',
  },
  {
    question: 'What makes R M Home Cleaning unique in Chandigarh?',
    answer: 'We have a verified 4.9-star rating on Google from satisfied customers, provide 24-hour service availability, and are LGBTQ+ friendly. Our staff is known for polite behaviour and punctuality.',
  },
  {
    question: 'Can I book separate kitchen, bathroom, or sofa cleaning?',
    answer: 'Absolutely! We offer specialized standalone packages for Kitchen Deep Cleaning, Bathroom Descaling, and Sofa & Carpet Shampooing depending on your exact requirements.',
  },
  {
    question: 'Do you clean water tanks in residential societies and kothis?',
    answer: 'Yes, we provide thorough residential and commercial water tank cleaning including sludge suction, high-pressure washing, and antibacterial treatment.',
  },
];
