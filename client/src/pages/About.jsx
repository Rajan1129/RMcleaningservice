import { MapPin, Phone, Star, Clock, Heart, ShieldCheck, CheckCircle2 } from 'lucide-react';
import CTASection from '../components/CTASection';
import SEO from '../components/SEO';
import { BUSINESS } from '../utils/business';

const points = [
  { icon: MapPin, label: 'Sector 50, Chandigarh' },
  { icon: Phone, label: BUSINESS.phoneDisplay },
  { icon: Star, label: '4.9★ Google Rating (18 Reviews)' },
  { icon: Clock, label: 'Open 24 Hours' },
  { icon: Heart, label: 'LGBTQ+ Friendly' },
  { icon: ShieldCheck, label: '100% Satisfaction Guarantee' },
];

const About = () => (
  <div>
    <SEO
      title="About Us | 4.9★ House Cleaning Service Chandigarh"
      description="Learn about R M Home Cleaning — Sector 50, Chandigarh based house cleaning service with 4.9★ rating on Google. Open 24 Hours across Chandigarh, Mohali & Panchkula."
      canonical="/about"
      breadcrumbs={[
        { name: 'Home', item: '/' },
        { name: 'About Us', item: '/about' },
      ]}
    />
    <section className="relative py-20 bg-grid-fade overflow-hidden">
      {/* Ambient Indian home cleaning background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <img
          src="/images/living-room-cleaning.jpg"
          alt="About backdrop"
          className="h-full w-full object-cover opacity-[0.22] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/90" />
      </div>

      <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-skyline-700 bg-skyline-50 border border-skyline-200 px-3 py-1 rounded-full mb-4">
            About Our Company
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy-950 mb-5 leading-tight">
            About R M Home Cleaning Service
          </h1>
          <p className="text-navy-800/80 leading-relaxed mb-5 text-base sm:text-lg">
            <strong>R M Home Cleaning</strong> is a premier house cleaning and deep cleaning service located at
            <strong> Progressive Society, Sector 50, Chandigarh (160047)</strong>. We proudly serve homeowners, tenants, and
            businesses across Sector 50, Chandigarh, Mohali, Panchkula, and the wider Tricity area.
          </p>
          <p className="text-navy-800/75 leading-relaxed mb-6">
            We are proud to hold a verified <strong>4.9 rating with 18 Google Reviews</strong>. As an <strong>LGBTQ+ friendly</strong> service, our emphasis is on creating a respectful,
            safe, and welcoming experience for every customer. Our cleaning staff is widely recognized for polite
            behavior, punctuality, and thorough work.
          </p>
          <p className="text-navy-800/75 leading-relaxed mb-8">
            Operating <strong>24 hours a day</strong>, we provide complete flexibility for working families and residents —
            from early morning schedules to urgent deep cleaning turnarounds.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {points.map(({ icon: Icon, label }) => (
              <div key={label} className="glass-card bg-white p-3 flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-navy-900 shadow-sm border border-skyline-100">
                <Icon size={18} className="text-skyline-600 shrink-0" /> {label}
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-glass-lg aspect-[4/3] border-4 border-white">
            <img
              src="/images/living-room-cleaning.jpg"
              alt="R M Home Cleaning team deep cleaning in Chandigarh"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 glass-card bg-white p-5 rounded-2xl shadow-glass-lg max-w-xs hidden sm:block border border-skyline-100">
            <p className="text-xs font-bold text-skyline-700 uppercase tracking-wider mb-1">Our Core Commitment</p>
            <p className="text-xs text-navy-800/80 leading-relaxed">
              "Team ne bahut mehnat aur safai se kaam kiya... kitchen, bathroom aur floors bilkul chamak uthe."
            </p>
          </div>
        </div>
      </div>
    </section>

    <CTASection
      title="Book a Reliable Home Clean with R M Home Cleaning"
      subtitle="Call 096460 78122 or send us a WhatsApp message. We are open 24 hours."
    />
  </div>
);

export default About;
