import { CheckCircle2, Star, Clock, Heart, ShieldCheck, ThumbsUp } from 'lucide-react';
import CTASection from '../components/CTASection';
import SEO from '../components/SEO';

const items = [
  {
    icon: Star,
    title: '4.9★ Google Business Rating',
    desc: 'Rated 4.9/5 by 18 satisfied clients across Chandigarh for exceptional deep cleaning, attention to detail, and integrity.',
  },
  {
    icon: Clock,
    title: 'Open 24 Hours',
    desc: 'Flexible 24/7 availability for booking, evening slots, early morning cleanups, and short-notice emergency requirements.',
  },
  {
    icon: ThumbsUp,
    title: 'Polite Staff & Punctual Arrival',
    desc: 'Our staff is calm, cooperative, and well-behaved. We value your time and arrive strictly when scheduled.',
  },
  {
    icon: Heart,
    title: 'LGBTQ+ Friendly',
    desc: 'We foster a welcoming, respectful, and safe service atmosphere for every individual, household, and community.',
  },
  {
    icon: ShieldCheck,
    title: 'Trained & Polite Staff',
    desc: 'Committed to high quality standards, polite behaviour, punctuality, and trustworthy domestic service.',
  },
  {
    icon: CheckCircle2,
    title: 'Sector 50, Chandigarh Local',
    desc: 'Centrally located at Progressive Society, Sector 50, providing swift coverage throughout Chandigarh, Mohali, and Panchkula.',
  },
];

const WhyChooseUs = () => (
  <div>
    <SEO
      title="Why Choose Us | 4.9★ Rated Cleaning in Chandigarh & Tricity"
      description="Why R M Home Cleaning is Chandigarh's #1 rated house cleaning service. 4.9★ rating (18 reviews), open 24 hours, polite trained staff, LGBTQ+ friendly & transparent quotes."
      canonical="/why-choose-us"
      breadcrumbs={[
        { name: 'Home', item: '/' },
        { name: 'Why Choose Us', item: '/why-choose-us' },
      ]}
    />
    <section className="relative py-16 bg-grid-fade overflow-hidden">
      {/* Ambient Background Picture */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <img
          src="/images/balcony-cleaning.jpg"
          alt="Why choose us backdrop"
          className="h-full w-full object-cover opacity-[0.24] scale-105 filter contrast-105 saturate-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/90" />
      </div>

      <div className="container-x text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-skyline-700 bg-skyline-50 border border-skyline-200 px-3 py-1 rounded-full mb-3">
          Our Value Proposition
        </div>
        <h1 className="text-4xl font-extrabold text-navy-950 mb-4">Why Choose R M Home Cleaning</h1>
        <p className="text-navy-800/70 text-base sm:text-lg">
          What makes us Chandigarh’s preferred house and deep cleaning team.
        </p>
      </div>
    </section>

    <section className="relative py-16 bg-white overflow-hidden">
      {/* Grid ambient backdrop */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <img
          src="/images/move-in-cleaning.jpg"
          alt="Benefits backdrop"
          className="h-full w-full object-cover opacity-[0.20] scale-105 filter contrast-105 saturate-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/65 to-white/90" />
      </div>

      <div className="container-x grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="glass-card p-8 hover:shadow-glass-lg hover:-translate-y-1 transition-all bg-white border border-skyline-100">
              <div className="h-12 w-12 rounded-2xl bg-skyline-50 text-skyline-600 flex items-center justify-center mb-5">
                <Icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-navy-950 mb-2">{item.title}</h3>
              <p className="text-sm text-navy-800/70 leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </section>

    <CTASection
      title="Ready to Experience the R M Home Cleaning Difference?"
      subtitle="Call 096460 78122 or send us a WhatsApp message today."
    />
  </div>
);

export default WhyChooseUs;
