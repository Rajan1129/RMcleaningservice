import ServiceCard from '../components/ServiceCard';
import CTASection from '../components/CTASection';
import SEO from '../components/SEO';
import { useServices } from '../hooks/useServices';

const Services = () => {
  const { services } = useServices();
  return (
    <div>
      <SEO
        title="House & Deep Cleaning Services in Chandigarh Tricity"
        description="Explore top-rated house cleaning services in Chandigarh, Mohali, Panchkula & Zirakpur. Full flat deep cleaning, kitchen degreasing, bathroom descaling, sofa shampooing & water tank cleaning. Open 24/7."
        canonical="/services"
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Services', item: '/services' },
        ]}
      />
      <section className="relative overflow-hidden py-16 bg-grid-fade border-b border-skyline-100">
        {/* Ambient Background Picture */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <img
            src="/images/living-room-cleaning.jpg"
            alt="Home cleaning service backdrop"
            className="h-full w-full object-cover opacity-[0.24] scale-105 filter contrast-105 saturate-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/90" />
        </div>
        <div className="container-x text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-skyline-700 bg-skyline-50 border border-skyline-200 px-3 py-1 rounded-full mb-3">
            Our Offerings
          </div>
          <h1 className="text-4xl font-extrabold text-navy-950 mb-4">House &amp; Deep Cleaning Services</h1>
          <p className="text-navy-800/70 text-base">
            Complete deep cleaning solutions for flats, kothis, villas, and commercial spaces across Sector 50, Chandigarh, Mohali, Panchkula, and Tricity. Open 24 Hours.
          </p>
        </div>
      </section>

      <section className="relative py-16 bg-white overflow-hidden">
        {/* Ambient background for service cards grid */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <img
            src="/images/kitchen-cleaning.jpg"
            alt="Kitchen backdrop"
            className="h-full w-full object-cover opacity-[0.20] scale-105 filter contrast-105 saturate-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/65 to-white/90" />
        </div>
        <div className="container-x grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>

      <CTASection
        title="Need a Customized Cleaning Package?"
        subtitle="Call 096460 78122 or message us on WhatsApp for a custom quotation."
      />
    </div>
  );
};

export default Services;
