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
