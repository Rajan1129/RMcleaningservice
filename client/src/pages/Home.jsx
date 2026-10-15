import { Link } from 'react-router-dom';
import { MapPin, CheckCircle2, Sparkles, Droplet, Home as HomeIcon, Clock, Star, Heart, ShieldCheck, ArrowRight, MessageCircle } from 'lucide-react';
import CallButton from '../components/CallButton';
import WhatsAppButton from '../components/WhatsAppButton';
import ServiceCard from '../components/ServiceCard';
import CTASection from '../components/CTASection';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import FAQ from '../components/FAQ';
import { useServices } from '../hooks/useServices';
import { BUSINESS, whatsappLink } from '../utils/business';
import { verifiedReviews } from '../data/reviewsData';
import { faqsData } from '../data/servicesData';
import SEO from '../components/SEO';

const trustItems = [
  '4.9★ Rated on Google (18 Reviews)',
  'Open 24 Hours Service',
  'Sector 50, Chandigarh Based',
  'LGBTQ+ Friendly',
  'Eco-Friendly Chemicals',
  'Polite & Punctual Staff',
];

const steps = [
  { n: '01', title: 'Call or WhatsApp', desc: 'Reach us 24/7 on 096460 78122 or send a WhatsApp message.' },
  { n: '02', title: 'Share Your Requirements', desc: 'Tell us about your home size (1/2/3/4 BHK) or specific cleaning needs.' },
  { n: '03', title: 'Get Transparent Estimate', desc: 'We provide fair, upfront estimates with no hidden charges.' },
  { n: '04', title: 'Spotless Cleaning Done', desc: 'Our polite, trained team arrives on time and makes your space shine.' },
];

const whyChooseUs = [
  { title: '4.9★ Google Rating', desc: '18 verified reviews praising our attention to detail, punctuality, and staff behaviour.' },
  { title: 'Open 24 Hours', desc: 'Round-the-clock booking and emergency cleaning across Chandigarh and Tricity.' },
  { title: 'Deep & Methodical Cleaning', desc: 'Kitchen, bathroom, floors, and corners cleaned thoroughly — not just surface wipe-down.' },
  { title: 'Inclusive & Respectful', desc: 'LGBTQ+ friendly and welcoming environment with courteous, polite cleaning staff.' },
  { title: 'Punctual & Reliable', desc: 'Our team shows up strictly on time as scheduled and completes the job with care.' },
  { title: 'Local Chandigarh Presence', desc: 'Based in Progressive Society, Sector 50, serving Chandigarh, Mohali, and Panchkula.' },
];

const Home = () => {
  const { services } = useServices();

  return (
    <div>
      <SEO
        title="#1 Cleaning Service in Chandigarh, Mohali, Zirakpur & Panchkula"
        description="R M Home Cleaning — 4.9★ rated House & Deep Cleaning Service in Sector 50, Chandigarh. Open 24 Hours. Deep cleaning, kitchen, bathroom, sofa & carpet cleaning across Chandigarh, Mohali, Zirakpur, Panchkula & Tricity. Call 096460 78122."
        canonical="/"
        faqs={faqsData}
        breadcrumbs={[{ name: 'Home', item: '/' }]}
      />

      {/* 1. HERO SECTION WITH AMBIENT BACKGROUND */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <img
            src="/images/living-room-cleaning.jpg"
            alt="Modern home interior background - R M Home Cleaning"
            className="h-full w-full object-cover opacity-[0.28] scale-105 filter saturate-150 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/55 to-white/90" />
        </div>

        <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
          <div className="fade-up">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                <Star size={13} className="fill-amber-400 text-amber-500" /> 4.9 (18 Google Reviews)
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                <Clock size={13} /> Open 24 Hours
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-skyline-700 bg-skyline-50 border border-skyline-200 px-3 py-1 rounded-full">
                <MapPin size={13} /> Sector 50, Chandigarh
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-navy-950 leading-[1.12] mb-5 tracking-tight">
              R M Home Cleaning — House Cleaning Services in Chandigarh
            </h1>
            <p className="text-lg text-navy-800/75 leading-relaxed mb-8 max-w-xl">
              From full home deep cleaning to specialized kitchen degreasing, bathroom descaling, sofa shampooing,
              and floor scrubbing. Punctual, polite, and trusted across Chandigarh and Tricity.
            </p>

            <div className="flex flex-wrap gap-4">
              <CallButton label={`Call Now — ${BUSINESS.phoneDisplay}`} />
              <Link to="/contact" className="btn-secondary">Get Free Estimate</Link>
              <WhatsAppButton />
            </div>

            <div className="mt-8 pt-6 border-t border-skyline-100 flex items-center gap-4 text-xs font-medium text-navy-800/60">
              <span className="flex items-center gap-1"><Heart size={14} className="text-rose-500" /> LGBTQ+ Friendly</span>
              <span>•</span>
              <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-indigo-500" /> Verified Doorstep Cleaners</span>
              <span>•</span>
              <span>Plus Code: {BUSINESS.plusCode}</span>
            </div>
          </div>

          <div className="relative fade-up">
            <div className="rounded-3xl overflow-hidden shadow-glass-lg aspect-[4/3] border-4 border-white">
              <img
                src="/hero-man-cleaning-window.jpg"
                alt="Man cleaning home window glass - R M Home Cleaning"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="hidden sm:grid grid-cols-2 gap-3 absolute -bottom-6 -left-6 w-72">
              {[
                { icon: Sparkles, label: 'Deep Cleaning' },
                { icon: Droplet, label: 'Kitchen & Washroom' },
                { icon: HomeIcon, label: 'Sofa & Floor Scrubbing' },
                { icon: Clock, label: '24/7 Available' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="glass-card px-3.5 py-2.5 flex items-center gap-2 text-xs font-semibold text-navy-900 bg-white/90">
                  <Icon size={16} className="text-skyline-600 shrink-0" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST STRIP */}
      <section className="border-y border-skyline-100 bg-white">
        <div className="container-x py-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {trustItems.map((item) => (
            <span key={item} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-navy-900/80">
              <CheckCircle2 size={16} className="text-emerald-500 shrink-0" /> {item}
            </span>
          ))}
        </div>
      </section>

      {/* 2.5 AEO & GEO DIRECT ANSWER KNOWLEDGE GRAPH */}
      <section className="py-8 bg-skyline-50/40 border-b border-skyline-100">
        <div className="container-x">
          <div className="rounded-2xl bg-white p-6 sm:p-7 border border-skyline-200/80 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-skyline-700 bg-skyline-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  <Sparkles size={11} /> AI Overview &amp; Local Geographic Anchor
                </span>
                <span className="text-xs text-navy-800/60 font-medium">Progressive Society Sector 50, Chandigarh</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-navy-950 mb-2">
                Top-Rated Cleaning Service in Chandigarh, Mohali, Zirakpur &amp; Panchkula
              </h2>
              <p id="aeo-direct-answer" className="text-sm text-navy-800/80 leading-relaxed max-w-3xl aeo-answer">
                <strong>R M Home Cleaning</strong> is a verified <strong>4.9★ rated home and deep cleaning service</strong> headquartered in Sector 50 Chandigarh. Operating <strong>24 Hours a day</strong>, our fully equipped mobile cleaning units arrive at any doorstep in <strong>Chandigarh, Mohali, Zirakpur, or Panchkula within 45 to 60 minutes</strong>. We specialize in full flat deep cleaning, modular kitchen degreasing, bathroom descaling, sofa shampooing, floor scrubbing, and water tank sanitization with commercial equipment and zero hidden fees.
              </p>
            </div>
            <div id="aeo-quick-facts" className="flex flex-wrap lg:flex-col gap-2 shrink-0 text-xs text-navy-900 font-semibold">
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
                <Star size={14} className="fill-amber-400 text-amber-500" />
                <span>4.9★ Rating (18 Google Reviews)</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
                <Clock size={14} className="text-emerald-600" />
                <span>Open 24 Hours / 7 Days</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
                <MapPin size={14} className="text-skyline-600" />
                <span>Sector 50 HQ · 25km Tricity Radius</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION WITH AMBIENT BACKGROUND */}
      <section id="services" className="relative py-20 bg-slate-50/50 overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <img
            src="/images/kitchen-cleaning.jpg"
            alt="Kitchen cleaning backdrop"
            className="h-full w-full object-cover opacity-[0.22] scale-105 filter contrast-105 saturate-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-slate-50/60 to-white/90" />
        </div>

        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-skyline-600 font-bold uppercase tracking-wider text-xs">Our Expertise</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-950 mt-1 mb-3">Our House Cleaning Services</h2>
            <p className="text-navy-800/70">
              Complete deep cleaning solutions designed for apartments, kothis, and offices in Sector 50, Chandigarh and Tricity.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. BEFORE / AFTER SECTION WITH AMBIENT BACKGROUND */}
      <section className="relative py-20 bg-white overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <img
            src="/images/floor-scrubbing.jpg"
            alt="Floor scrubbing transformation backdrop"
            className="h-full w-full object-cover opacity-[0.20] scale-105 filter contrast-105 saturate-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/65 to-white/90" />
        </div>

        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-skyline-600 font-bold uppercase tracking-wider text-xs">Real Results</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-950 mt-1 mb-3">See the Cleaning Transformation</h2>
            <p className="text-navy-800/70">Drag the slider horizontally to compare before and after deep cleaning.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <BeforeAfterSlider
              beforeSrc="/images/kitchen-before.jpg"
              afterSrc="/images/kitchen-after.jpg"
              beforeLabel="Greasy Kitchen"
              afterLabel="Deep Cleaned"
            />
            <BeforeAfterSlider
              beforeSrc="/images/bathroom-before.jpg"
              afterSrc="/images/bathroom-after.jpg"
              beforeLabel="Stained Bathroom"
              afterLabel="Descaled & Sanitized"
            />
            <BeforeAfterSlider
              beforeSrc="/images/balcony-cleaning.jpg"
              afterSrc="/images/window-glass-cleaning.jpg"
              beforeLabel="Balcony Mopping"
              afterLabel="Streak-Free Glass"
            />
          </div>
        </div>
      </section>

      {/* 5. GOOGLE REVIEWS SECTION WITH AMBIENT BACKGROUND */}
      <section className="relative py-20 bg-skyline-50/40 border-y border-skyline-100 overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <img
            src="/images/sofa-cleaning.jpg"
            alt="Sofa cleaning backdrop"
            className="h-full w-full object-cover opacity-[0.22] scale-105 filter contrast-105 saturate-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-skyline-50/50 to-white/90" />
        </div>

        <div className="container-x">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-amber-500 font-bold text-sm mb-1">
                <Star size={16} className="fill-amber-400" />
                <span>4.9 Star Google Rating (18 Reviews)</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-950">What Our Clients Say</h2>
              <p className="text-navy-800/70 text-sm mt-1">Real reviews from our Google Business profile in Chandigarh</p>
            </div>
            <Link to="/reviews" className="btn-secondary !py-2.5 text-sm shrink-0">
              View All 18 Reviews <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {verifiedReviews.map((rev) => (
              <div key={rev.id} className="glass-card bg-white p-6 flex flex-col justify-between border border-skyline-100">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-skyline-600 to-skyline-400 text-white font-bold flex items-center justify-center text-sm shadow-glass">
                        {rev.author.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-navy-950 text-sm">{rev.author}</h4>
                        <p className="text-[11px] text-navy-800/50">{rev.details} • {rev.timeAgo}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1 text-amber-400 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-navy-800/80 text-xs sm:text-sm leading-relaxed italic line-clamp-4">
                    "{rev.text}"
                  </p>
                </div>
                {rev.ownerResponse && (
                  <div className="mt-4 pt-3 border-t border-skyline-100 text-[11px] text-navy-800/70">
                    <span className="font-semibold text-navy-900">Owner reply:</span> {rev.ownerResponse}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS SECTION WITH AMBIENT BACKGROUND */}
      <section className="relative py-20 bg-white overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <img
            src="/images/move-in-cleaning.jpg"
            alt="Move in cleaning process backdrop"
            className="h-full w-full object-cover opacity-[0.20] scale-105 filter contrast-105 saturate-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/65 to-white/90" />
        </div>

        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-skyline-600 font-bold uppercase tracking-wider text-xs">Easy Process</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-950 mt-1 mb-3">How It Works</h2>
            <p className="text-navy-800/70">Simple four-step process for a sparkling clean home in Chandigarh.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.n} className="glass-card bg-white p-7 hover:border-skyline-300 transition-all border border-skyline-100">
                <span className="text-3xl font-extrabold text-skyline-300">{step.n}</span>
                <h3 className="text-lg font-bold text-navy-950 mt-3 mb-2">{step.title}</h3>
                <p className="text-sm text-navy-800/70 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE US SECTION WITH AMBIENT BACKGROUND */}
      <section className="relative py-20 bg-slate-50/60 overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <img
            src="/images/window-glass-cleaning.jpg"
            alt="Glass window cleaning backdrop"
            className="h-full w-full object-cover opacity-[0.22] scale-105 filter contrast-105 saturate-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-slate-50/60 to-white/90" />
        </div>

        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-skyline-600 font-bold uppercase tracking-wider text-xs">Why We Excel</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-950 mt-1 mb-3">Why Choose R M Home Cleaning</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="glass-card p-7 hover:shadow-glass-lg hover:-translate-y-1 transition-all bg-white border border-skyline-100">
                <CheckCircle2 size={24} className="text-emerald-500 mb-4" />
                <h3 className="font-bold text-navy-950 mb-2">{item.title}</h3>
                <p className="text-sm text-navy-800/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TRICITY COVERAGE AREAS (LOCAL SEO ENGINE) */}
      <section className="relative py-20 bg-white overflow-hidden border-t border-skyline-100">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-skyline-600 font-bold uppercase tracking-wider text-xs">Doorstep Coverage</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-950 mt-1 mb-3">
              Cleaning Service Across Chandigarh, Mohali, Zirakpur & Panchkula
            </h2>
            <p className="text-navy-800/70">
              Based at Progressive Society, Sector 50, Chandigarh — delivering on-time deep cleaning to every locality with 24/7 availability.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                city: 'Mohali',
                link: '/cleaning-service-in-mohali',
                headline: 'Phases 1–11, Aerocity & Sector 70-82',
                detail: 'Full flat deep clean, kitchen oil degreasing, and sofa shampooing across all Mohali sectors.',
              },
              {
                city: 'Zirakpur',
                link: '/cleaning-service-in-zirakpur',
                headline: 'VIP Road, Dhakoli & High-Rises',
                detail: 'Balcony glass buffing, society flat scrubbing, and post-construction cleaning.',
              },
              {
                city: 'Panchkula',
                link: '/cleaning-service-in-panchkula',
                headline: 'MDC, Sector 20, 4, 14, 21 & Urban Estate',
                detail: 'Kothi deep detailing, washroom descaling, and eco-friendly floor buffing.',
              },
              {
                city: 'Chandigarh',
                link: '/cleaning-service-in-chandigarh',
                headline: 'Sector 50 HQ & Sectors 1–60',
                detail: 'Local doorstep teams arriving within 45-60 mins for kothis, apartments and offices.',
              },
              {
                city: 'Tricity Hub',
                link: '/cleaning-service-in-tricity',
                headline: 'Entire Tri-City Metropolitan Area',
                detail: 'Unified 24-hour deep cleaning coverage with transparent estimates and zero hidden fees.',
              },
              {
                city: 'Near Me',
                link: '/cleaning-service-near-me',
                headline: 'Emergency & Same-Day Cleaners',
                detail: 'Immediate cleaner dispatch to your exact sector or society within 45 to 60 minutes.',
              },
              {
                city: 'Kharar',
                link: '/cleaning-service-in-kharar',
                headline: 'Sunny Enclave, Gillco & Landran',
                detail: 'Move-in & tenant handover deep cleaning for new flats and villas in Kharar.',
              },
              {
                city: 'SAS Nagar',
                link: '/cleaning-service-in-sas-nagar',
                headline: 'Industrial Hub & Corporate Tech Parks',
                detail: 'Flexible night and weekend office cleaning, marble floor scrubbing & glass care.',
              },
            ].map((loc) => (
              <Link
                key={loc.link}
                to={loc.link}
                className="group p-5 rounded-2xl border border-skyline-100 bg-slate-50/50 hover:bg-skyline-50/40 hover:border-skyline-300 transition-all shadow-xs hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-extrabold text-base text-navy-950 group-hover:text-skyline-600 transition-colors">
                      Cleaning in {loc.city}
                    </span>
                    <ArrowRight size={15} className="text-skyline-600 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </div>
                  <p className="text-xs font-semibold text-skyline-700 mb-1.5">{loc.headline}</p>
                  <p className="text-xs text-navy-800/70 leading-relaxed">{loc.detail}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-skyline-100/60 flex items-center justify-between text-[11px] font-medium text-navy-800/60">
                  <span>Open 24/7</span>
                  <span className="text-skyline-600 font-semibold group-hover:underline">Explore Locality →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ SECTION WITH AMBIENT BACKGROUND */}
      <section className="relative py-20 bg-slate-50/60 overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <img
            src="/images/bathroom-cleaning.jpg"
            alt="Bathroom cleaning backdrop"
            className="h-full w-full object-cover opacity-[0.20] scale-105 filter contrast-105 saturate-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/65 to-white/90" />
        </div>

        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-skyline-600 font-bold uppercase tracking-wider text-xs">Got Questions?</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-950 mt-1 mb-3">Frequently Asked Questions</h2>
          </div>
          <FAQ />
        </div>
      </section>

      {/* 9. BOTTOM CTA */}
      <CTASection
        title="Ready for a Spotless, Fresh Home?"
        subtitle="Call 096460 78122 or chat with us on WhatsApp. We are open 24 hours."
      />
    </div>
  );
};

export default Home;
