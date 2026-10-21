import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Phone,
  MessageCircle,
  Star,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MapPin,
  ChevronDown,
  ArrowRight,
  Home,
  Check,
} from 'lucide-react';
import apiClient from '../services/api';
import { locationsData } from '../data/locationsData';
import { verifiedReviews } from '../data/reviewsData';
import { BUSINESS, whatsappLink } from '../utils/business';
import ContactForm from '../components/ContactForm';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import CTASection from '../components/CTASection';
import SEO from '../components/SEO';

const nearbyLocations = [
  { city: 'Mohali', slug: '/cleaning-service-in-mohali', desc: 'Phase 1-11, Aerocity & Sector 70-82' },
  { city: 'Zirakpur', slug: '/cleaning-service-in-zirakpur', desc: 'VIP Road, Dhakoli, Baltana & High-Rises' },
  { city: 'Panchkula', slug: '/cleaning-service-in-panchkula', desc: 'Sectors 1-28, MDC, Pinjore & Kalka' },
  { city: 'Chandigarh', slug: '/cleaning-service-in-chandigarh', desc: 'Sector 50 & Sectors 1 to 60' },
  { city: 'Tricity Hub', slug: '/cleaning-service-in-tricity', desc: 'All Tri-City Towns with 24/7 Dispatch' },
  { city: 'Kharar', slug: '/cleaning-service-in-kharar', desc: 'Sunny Enclave, Gillco Valley & Landran' },
  { city: 'SAS Nagar', slug: '/cleaning-service-in-sas-nagar', desc: 'Industrial Area & Corporate Hubs' },
  { city: 'Near Me', slug: '/cleaning-service-near-me', desc: '45-60 Minute Doorstep Cleaner Arrival' },
];

const LocationLandingPage = ({ defaultSlug }) => {
  const { locationSlug } = useParams();
  const activeSlug = locationSlug || defaultSlug;

  // Find initial data immediately from locationsData
  const getInitial = (slug) => {
    return locationsData.find((l) => l.slug === slug) || locationsData[0];
  };

  const [location, setLocation] = useState(() => getInitial(activeSlug));
  const [openFaq, setOpenFaq] = useState(null);

  // Sync state whenever activeSlug changes
  useEffect(() => {
    const fallback = getInitial(activeSlug);
    setLocation(fallback);

    // Fetch from backend API to get any fresh modifications made in Admin Panel
    apiClient
      .get(`/locations/${activeSlug}`)
      .then((res) => {
        if (res.data?.data) {
          setLocation(res.data.data);
        }
      })
      .catch(() => {
        // Fallback already set
      });
  }, [activeSlug]);

  if (!location) {
    return (
      <div className="container-x py-20 text-center">
        <h1 className="text-2xl font-bold text-navy-950">Location Not Found</h1>
        <p className="mt-2 text-navy-800/70">Check out our general deep cleaning services.</p>
        <Link to="/services" className="btn-primary mt-6 inline-flex">
          View All Services
        </Link>
      </div>
    );
  }

  const whatsappMsg = `Hello R M Home Cleaning! I need deep cleaning service in ${location.city}. Please share available slots and free estimate.`;

  return (
    <div>
      <SEO
        title={location.metaTitle || `Home Cleaning Service in ${location.city}`}
        description={location.metaDescription}
        canonical={location.slug ? `/${location.slug}` : `/${activeSlug}`}
        image={location.heroImage}
        city={location.city}
        localities={location.localities}
        faqs={location.customFaqs || []}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: `${location.city} Cleaning`, item: `/${location.slug || activeSlug}` },
        ]}
      />

      {/* 1. HERO SECTION WITH AMBIENT BACKGROUND PHOTO */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-24 border-b border-skyline-100">
        {/* Real Indian Home Cleaning Backdrop with Soft Gradient Overlay */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <img
            src="/images/living-room-cleaning.jpg"
            alt={`${location.city} house cleaning backdrop`}
            className="h-full w-full object-cover opacity-[0.28] scale-105 filter saturate-150 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/55 to-white/90" />
        </div>
        
        <div className="container-x relative">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-xs text-navy-800/60 font-medium">
            <Link to="/" className="hover:text-skyline-600 flex items-center gap-1">
              <Home size={13} /> Home
            </Link>
            <span>/</span>
            <span className="text-skyline-600 font-semibold">{location.city} Cleaning Service</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-skyline-100/90 px-3.5 py-1 text-xs font-semibold text-skyline-900 mb-4 border border-skyline-200">
                <MapPin size={13} className="text-skyline-600" />
                Doorstep Service in {location.city} · 24/7 Available
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-navy-950 tracking-tight leading-[1.15]">
                {location.heroTitle}
              </h1>

              <p className="mt-4 text-base sm:text-lg text-navy-800/75 leading-relaxed">
                {location.heroSubtitle}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-navy-800/80">
                <span className="inline-flex items-center gap-1.5 font-semibold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
                  <Star size={15} className="fill-amber-400 text-amber-500" /> 4.9 Rating (18 Google Reviews)
                </span>
                <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <Clock size={15} /> 24 Hours Open
                </span>
                <span className="inline-flex items-center gap-1.5 font-semibold text-skyline-700 bg-skyline-50 px-3 py-1.5 rounded-lg border border-skyline-200">
                  <ShieldCheck size={15} /> Verified Indian Staff
                </span>
              </div>

              {/* Action Buttons */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a href={BUSINESS.phoneHref} className="btn-primary !px-6 !py-3.5 text-base shadow-lg shadow-skyline-500/20">
                  <Phone size={18} /> Call {BUSINESS.phoneDisplay}
                </a>
                <a
                  href={whatsappLink(whatsappMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp !px-6 !py-3.5 text-base shadow-lg shadow-emerald-500/20"
                >
                  <MessageCircle size={18} /> WhatsApp Estimate
                </a>
              </div>

              {/* Localities covered ticker */}
              {location.localities && location.localities.length > 0 && (
                <div className="mt-8 pt-6 border-t border-skyline-100">
                  <p className="text-xs font-bold uppercase tracking-wider text-navy-800/60 mb-2.5">
                    Key Areas & Sectors Served in {location.city}:
                  </p>
                  <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                    {location.localities.map((loc) => (
                      <span
                        key={loc}
                        className="inline-flex items-center gap-1 text-[11px] font-medium bg-white px-2.5 py-1 rounded-md border border-slate-200 text-navy-800/80 shadow-xs"
                      >
                        <Check size={11} className="text-emerald-500" /> {loc}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Booking Card */}
            <div className="lg:col-span-5">
              <div className="glass-card bg-white p-6 sm:p-7 shadow-glass relative border border-skyline-100">
                <div className="mb-4">
                  <span className="text-xs uppercase font-bold tracking-wider text-skyline-600">Quick Instant Booking</span>
                  <h3 className="text-xl font-bold text-navy-950 mt-1">Book Cleaning in {location.city}</h3>
                  <p className="text-xs text-navy-800/60 mt-0.5">Response within 15 minutes · Polite & verified staff</p>
                </div>
                <ContactForm defaultLocation={location.city} defaultService="Full Home Deep Cleaning" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AEO & GEO DIRECT ANSWER KNOWLEDGE BLOCK */}
      <section className="py-10 bg-white border-b border-skyline-100">
        <div className="container-x">
          <div className="rounded-2xl bg-gradient-to-br from-skyline-50/70 via-white to-skyline-50/40 p-6 sm:p-8 border border-skyline-200/80 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-skyline-600 text-white shadow-xs">
                    <Sparkles size={12} /> AEO Verified Direct Answer
                  </span>
                  <span className="text-xs text-navy-800/60 font-semibold">Tricity Geographic Anchor (GEO)</span>
                </div>
                
                <h3 className="text-lg sm:text-xl font-extrabold text-navy-950 mb-3">
                  House &amp; Deep Cleaning Services in {location.city} — Quick Facts
                </h3>

                <p id="aeo-direct-answer" className="text-sm sm:text-base text-navy-800/85 leading-relaxed font-normal aeo-answer">
                  <strong>R M Home Cleaning</strong> is the top-rated <strong>4.9★ house and deep cleaning service</strong> actively operating across <strong>{location.city}</strong>. Centrally dispatched from Progressive Society, Sector 50, Chandigarh (Plus Code: MPXX+HW, Lat: 30.7046, Lng: 76.7179), our trained cleaning staff arrives at your doorstep in {location.city} within <strong>45 to 60 minutes</strong>. We provide comprehensive full flat deep cleaning, modular kitchen degreasing, bathroom descaling, and sofa shampooing with commercial scrubbers and safe eco-friendly chemicals. Open 24 Hours / 7 Days.
                </p>

                {/* GEO Landmark and Geographic Radius Tag */}
                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-navy-800/70">
                  <span className="font-semibold text-navy-950">Geographic Coverage:</span>
                  <span className="bg-white px-2.5 py-1 rounded-md border border-skyline-200 text-skyline-800 font-medium">
                    📍 25 km Radius from Sector 50 HQ
                  </span>
                  <span className="bg-white px-2.5 py-1 rounded-md border border-skyline-200 text-navy-800 font-medium">
                    ⏱️ 45–60 Min Rapid Arrival
                  </span>
                  <span className="bg-white px-2.5 py-1 rounded-md border border-skyline-200 text-emerald-700 font-semibold">
                    ⭐ 4.9/5 Rating (18 Google Reviews)
                  </span>
                  <span className="bg-white px-2.5 py-1 rounded-md border border-skyline-200 text-indigo-700 font-semibold">
                    🕒 Open 24/7
                  </span>
                </div>
              </div>

              {/* Right Quick Action Card */}
              <div id="aeo-quick-facts" className="w-full md:w-72 bg-white rounded-xl p-4 sm:p-5 border border-skyline-100 shadow-sm shrink-0">
                <span className="text-[11px] font-bold text-skyline-600 uppercase tracking-wider block mb-1">
                  Instant Verification
                </span>
                <p className="text-xs font-semibold text-navy-950 mb-3">
                  Need Cleaning in {location.city} Today?
                </p>
                <div className="space-y-2 text-xs text-navy-800/75">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                    <span>Free Upfront Estimate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                    <span>Single-Disc Scrubbers Included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                    <span>LGBTQ+ Friendly &amp; Respectful</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                    <span>Zero Hidden Travel Fees</span>
                  </div>
                </div>
                <a
                  href={`tel:+91${BUSINESS.phone}`}
                  className="mt-4 w-full inline-flex items-center justify-center gap-1.5 bg-navy-950 hover:bg-navy-900 text-white text-xs font-bold py-2.5 px-4 rounded-lg transition-colors"
                >
                  <Phone size={13} /> Call 096460 78122
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. POPULAR SERVICE PACKAGES SECTION WITH BACKGROUND PHOTO */}
      {location.priceTiers && location.priceTiers.length > 0 && (
        <section className="relative py-20 bg-slate-50/50 border-b border-skyline-100 overflow-hidden">
          {/* Subtle Ambient Background */}
          <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
            <img
              src="/images/kitchen-cleaning.jpg"
              alt="Background pattern"
              className="h-full w-full object-cover opacity-[0.22] scale-105 filter contrast-105 saturate-125"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-slate-50/60 to-white/90" />
          </div>

          <div className="container-x">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-skyline-600 font-bold uppercase tracking-wider text-xs">Customized Packages</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-950 mt-1 mb-3">
                Popular Cleaning Packages for {location.city}
              </h2>
              <p className="text-navy-800/70 text-sm">
                Every home is unique. We provide free doorstep estimates tailored to your BHK layout, square footage, and specific cleaning requirements with no hidden charges.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {location.priceTiers.map((tier, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-skyline-100 bg-white p-6 transition-all hover:shadow-lg hover:border-skyline-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-navy-950 text-base group-hover:text-skyline-600 transition-colors">{tier.label}</h4>
                      <Sparkles size={16} className="text-skyline-500 shrink-0" />
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-skyline-50 text-skyline-700 font-semibold text-xs mb-3 border border-skyline-200/60">
                      <Check size={12} className="text-emerald-500" />
                      {tier.price && !tier.price.includes('₹') && !/\d/.test(tier.price) ? tier.price : 'Custom Free Quote'}
                    </div>
                    <p className="text-xs text-navy-800/70 leading-relaxed">{tier.note}</p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-skyline-100/60">
                    <a
                      href={whatsappLink(`Hi R M Cleaning! Interested in ${tier.label} package for ${location.city}. Please share details and free quote.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-skyline-600 hover:text-skyline-700 group-hover:translate-x-0.5 transition-transform"
                    >
                      Request Free Quote <ArrowRight size={13} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. WHY TRUSTED & BEFORE/AFTER WITH BACKGROUND PHOTO */}
      <section className="relative py-20 bg-white border-b border-skyline-100 overflow-hidden">
        {/* Subtle Ambient Background */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <img
            src="/images/floor-scrubbing.jpg"
            alt="Floor cleaning backdrop"
            className="h-full w-full object-cover opacity-[0.20] scale-105 filter contrast-105 saturate-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/65 to-white/90" />
        </div>

        <div className="container-x">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-skyline-600 font-bold uppercase tracking-wider text-xs">Local Expertise</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-950 mt-1 mb-4">
                Why Residents Across {location.city} Trust R M Home Cleaning
              </h2>
              <p className="text-sm sm:text-base text-navy-800/75 leading-relaxed mb-6">
                {location.description}
              </p>

              <div className="space-y-3.5 mb-8">
                {[
                  'Polite, respectful, and police-verified Indian cleaning staff',
                  'High-powered single disc floor scrubbing & industrial wet/dry vacuums',
                  'Non-hazardous, pet-safe, and marble-safe cleaning chemicals',
                  '24-Hour availability for working families & emergency turnarounds',
                  'Detailed inspection before hand-over to ensure 100% satisfaction',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 size={13} />
                    </div>
                    <span className="text-sm font-medium text-navy-900">{item}</span>
                  </div>
                ))}
              </div>

              <div>
                <a href={BUSINESS.phoneHref} className="btn-primary !px-5 !py-3 text-sm">
                  <Phone size={16} /> Call for Immediate Slot
                </a>
              </div>
            </div>

            {/* Before After Demonstration */}
            <div>
              <div className="mb-3 text-center sm:text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-navy-800/60">
                  Real Work Results · Slide to Inspect
                </span>
              </div>
              <BeforeAfterSlider
                beforeSrc="/images/kitchen-before.jpg"
                afterSrc="/images/kitchen-after.jpg"
                beforeLabel="Before Degrease"
                afterLabel="After Deep Clean"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3.5 SPECIALIZED CLEANING SERVICES & REGIONAL COVERAGE */}
      <section className="py-20 bg-slate-50 border-b border-skyline-100">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-skyline-600 font-bold uppercase tracking-wider text-xs">
              Thorough &amp; Methodical Care
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-950 mt-1 mb-3">
              Comprehensive Deep Cleaning Services in {location.city}
            </h2>
            <p className="text-sm sm:text-base text-navy-800/70">
              From compact high-rise apartments to multi-story kothis and villas, our team utilizes commercial machinery and eco-friendly chemicals to ensure every surface is sanitized.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-skyline-100 shadow-xs hover:border-skyline-300 transition-all">
              <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <Sparkles size={20} />
              </div>
              <h3 className="font-bold text-navy-950 text-lg mb-2">Modular Kitchen Degreasing</h3>
              <p className="text-xs sm:text-sm text-navy-800/75 leading-relaxed">
                Tough grease and oil stains accumulate quickly on kitchen chimneys, exhaust fans, tiled backsplashes, and granite countertops. We use non-abrasive food-safe degreasers to restore sparkle inside and out.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-skyline-100 shadow-xs hover:border-skyline-300 transition-all">
              <div className="h-10 w-10 rounded-xl bg-skyline-50 text-skyline-600 flex items-center justify-center mb-4">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-bold text-navy-950 text-lg mb-2">Bathroom Descaling &amp; Sanitization</h3>
              <p className="text-xs sm:text-sm text-navy-800/75 leading-relaxed">
                Tricity water hard water leaves stubborn limescale on glass partitions, tiles, and chrome fixtures. Our acid-free descaling techniques safely eliminate scale, mold, and bacteria without damaging grout or fittings.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-skyline-100 shadow-xs hover:border-skyline-300 transition-all">
              <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <Sparkles size={20} />
              </div>
              <h3 className="font-bold text-navy-950 text-lg mb-2">Sofa &amp; Mattress Shampooing</h3>
              <p className="text-xs sm:text-sm text-navy-800/75 leading-relaxed">
                Deep injection-extraction shampooing pulls out embedded dust mites, allergens, food stains, and pet dander from fabric, velvet, and leather upholstery, leaving your living room hygienic and refreshed.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-skyline-100 shadow-xs hover:border-skyline-300 transition-all">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <CheckCircle2 size={20} />
              </div>
              <h3 className="font-bold text-navy-950 text-lg mb-2">Single-Disc Floor Buffing</h3>
              <p className="text-xs sm:text-sm text-navy-800/75 leading-relaxed">
                Mopping alone leaves porous grout dark and tiles dull. Our heavy single-disc rotary scrubbers lift ground-in dirt from Italian marble, terrazzo, granite, and vitrified tiles to revive shine and cleanliness.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-skyline-100 shadow-xs hover:border-skyline-300 transition-all">
              <div className="h-10 w-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
                <Home size={20} />
              </div>
              <h3 className="font-bold text-navy-950 text-lg mb-2">Move-in / Move-out Turnover</h3>
              <p className="text-xs sm:text-sm text-navy-800/75 leading-relaxed">
                Handing over keys to a landlord or moving into a newly painted home? We clear paint splatters, sanitize inside wardrobes and kitchen racks, and scrub balconies for a fresh, turn-key handover.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-skyline-100 shadow-xs hover:border-skyline-300 transition-all">
              <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <Clock size={20} />
              </div>
              <h3 className="font-bold text-navy-950 text-lg mb-2">Water Tank Sanitization</h3>
              <p className="text-xs sm:text-sm text-navy-800/75 leading-relaxed">
                Overhead Sintex and underground water tanks harbor silt, algae, and bacteria. We de-water, vacuum out sludge, and disinfect tank walls using antibacterial solution to keep your family drinking water clean.
              </p>
            </div>
          </div>

          {/* Special Sector Hubs highlight for Chandigarh */}
          {location.city === 'Chandigarh' && (
            <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-white border border-skyline-200/90 shadow-xs">
              <h3 className="text-xl font-bold text-navy-950 mb-3 flex items-center gap-2">
                <MapPin size={20} className="text-skyline-600" />
                Sector-by-Sector Service Hubs Across Chandigarh
              </h3>
              <p className="text-xs sm:text-sm text-navy-800/75 mb-6 leading-relaxed">
                Operating out of our central office at Progressive Society, Sector 50, Chandigarh, our teams are stationed to ensure fast 45 to 60 minute doorstep arrival across all major Chandigarh sectors:
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <p className="font-bold text-navy-950 mb-1">South Chandigarh Hub</p>
                  <p className="text-navy-800/70 leading-relaxed">
                    Sector 50 (HQ), Sector 48, 49, 51, 63, 61, 46, 47 society apartments &amp; builder floors.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <p className="font-bold text-navy-950 mb-1">Central Hub &amp; Markets</p>
                  <p className="text-navy-800/70 leading-relaxed">
                    Sector 34, 35, 43 (ISBT), 44, 22, 17 Plaza, Sector 36, 37, 38, 40, 41, 42.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <p className="font-bold text-navy-950 mb-1">North VIP Kothi Belt</p>
                  <p className="text-navy-800/70 leading-relaxed">
                    Sector 2, 3, 4, 5, 7, 8, 9, 10, 11 kothis, villas &amp; residences near Sukhna Lake.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <p className="font-bold text-navy-950 mb-1">East &amp; IT Belt</p>
                  <p className="text-navy-800/70 leading-relaxed">
                    Sector 20, 26, 28, Manimajra MHC, Modern Housing Complex, Rajiv Gandhi IT Park.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. REVIEWS SECTION WITH BACKGROUND PHOTO */}
      <section className="relative py-20 bg-skyline-50/40 border-b border-skyline-100 overflow-hidden">
        {/* Subtle Ambient Background */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <img
            src="/images/sofa-cleaning.jpg"
            alt="Sofa shampooing backdrop"
            className="h-full w-full object-cover opacity-[0.22] scale-105 filter contrast-105 saturate-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-skyline-50/50 to-white/90" />
        </div>

        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-skyline-600 font-bold uppercase tracking-wider text-xs">Real Customer Feedback</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-950 mt-1 mb-2">
              Verified Google Reviews (4.9★)
            </h2>
            <p className="text-sm text-navy-800/70">
              Read what Tricity families and tenants say about our polite staff and thorough work.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {verifiedReviews.map((rev) => (
              <div
                key={rev.id}
                className="glass-card bg-white p-6 flex flex-col justify-between border border-skyline-100"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-navy-800/80 italic leading-relaxed">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-skyline-100/60 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-navy-950">{rev.author}</p>
                    <p className="text-navy-800/50">{rev.timeAgo}</p>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">
                    Google Review
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CUSTOM LOCATION FAQS WITH BACKGROUND PHOTO */}
      {location.customFaqs && location.customFaqs.length > 0 && (
        <section className="relative py-20 bg-white border-b border-skyline-100 overflow-hidden">
          {/* Subtle Ambient Background */}
          <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
            <img
              src="/images/bathroom-cleaning.jpg"
              alt="Washroom cleaning backdrop"
              className="h-full w-full object-cover opacity-[0.20] scale-105 filter contrast-105 saturate-125"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/65 to-white/90" />
          </div>

          <div className="container-x max-w-3xl">
            <div className="text-center mb-12">
              <span className="text-skyline-600 font-bold uppercase tracking-wider text-xs">Common Questions</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-950 mt-1">
                Frequently Asked Questions in {location.city}
              </h2>
            </div>

            <div className="space-y-3">
              {location.customFaqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-skyline-100 bg-white overflow-hidden transition-all shadow-xs"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-semibold text-navy-950"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        size={18}
                        className={`text-skyline-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-navy-800/75 leading-relaxed border-t border-skyline-50 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 6. NEARBY TRICITY SERVICE LOCATIONS (SEO INTERNAL LINKING) */}
      <section className="py-16 bg-slate-50/70 border-b border-skyline-100">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-skyline-600 font-bold uppercase tracking-wider text-xs">Full Tricity Network</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-950 mt-1 mb-2">
              Deep Cleaning Services Across Chandigarh Tricity
            </h2>
            <p className="text-sm text-navy-800/70">
              Serving every corner of Tricity with dedicated mobile teams and 24/7 doorstep dispatch.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {nearbyLocations.map((item) => (
              <Link
                key={item.slug}
                to={item.slug}
                className={`p-4 rounded-xl border transition-all text-left group ${
                  item.city.toLowerCase() === location.city.toLowerCase()
                    ? 'bg-skyline-50 border-skyline-300 ring-2 ring-skyline-400/20'
                    : 'bg-white border-skyline-100 hover:border-skyline-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-sm text-navy-950 group-hover:text-skyline-600 transition-colors">
                    {item.city}
                  </span>
                  <ArrowRight size={14} className="text-skyline-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-[11px] text-navy-800/60 leading-relaxed line-clamp-2">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION SECTION */}
      <CTASection
        title={`Ready to Book Your Deep Cleaning in ${location.city}?`}
        subtitle={`Open 24 Hours · Rapid Doorstep Arrival in ${location.city} · Call or WhatsApp Anytime`}
      />
    </div>
  );
};

export default LocationLandingPage;
