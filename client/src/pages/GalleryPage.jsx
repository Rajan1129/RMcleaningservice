import Gallery from '../components/Gallery';
import CTASection from '../components/CTASection';
import SEO from '../components/SEO';

const GalleryPage = () => (
  <div>
    <SEO
      title="Photo Gallery | Authentic House Cleaning Projects in Chandigarh"
      description="View real photos of our house deep cleaning, kitchen degreasing, bathroom descaling, sofa shampooing, and floor machine scrubbing projects across Tricity."
      canonical="/gallery"
      breadcrumbs={[
        { name: 'Home', item: '/' },
        { name: 'Photo Gallery', item: '/gallery' },
      ]}
    />
    <section className="relative py-16 bg-grid-fade border-b border-skyline-100 overflow-hidden">
      {/* Ambient Backdrop */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <img
          src="/images/window-glass-cleaning.jpg"
          alt="Gallery backdrop"
          className="h-full w-full object-cover opacity-[0.24] scale-105 filter contrast-105 saturate-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/90" />
      </div>

      <div className="container-x text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-skyline-700 bg-skyline-50 border border-skyline-200 px-3 py-1 rounded-full mb-3">
          Completed Jobs
        </div>
        <h1 className="text-4xl font-extrabold text-navy-950 mb-4">Our Cleaning Gallery</h1>
        <p className="text-navy-800/70 text-base">
          A glimpse into our deep cleaning, kitchen degreasing, bathroom descaling, sofa shampooing, and water tank cleaning projects across Chandigarh.
        </p>
      </div>
    </section>

    <section className="relative py-16 bg-white overflow-hidden">
      {/* Subtle backdrop */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <img
          src="/images/floor-scrubbing.jpg"
          alt="Gallery content backdrop"
          className="h-full w-full object-cover opacity-[0.20] scale-105 filter contrast-105 saturate-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/65 to-white/90" />
      </div>

      <div className="container-x">
        <Gallery />
      </div>
    </section>

    <CTASection
      title="Want Your Home to Look Like This?"
      subtitle="Call 096460 78122 or send us a WhatsApp message to book a slot."
    />
  </div>
);

export default GalleryPage;
