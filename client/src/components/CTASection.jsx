import CallButton from './CallButton';
import WhatsAppButton from './WhatsAppButton';

const CTASection = ({
  title = 'Need Trusted House Cleaning in Chandigarh?',
  subtitle = 'Call us on 096460 78122 or send a WhatsApp message. We are open 24 hours.',
}) => (
  <section className="relative py-20 overflow-hidden bg-navy-950">
    {/* Background Picture with Luxury Dark Gradient Overlay */}
    <div className="absolute inset-0 pointer-events-none">
      <img
        src="/images/living-room-cleaning.jpg"
        alt="Clean home background"
        className="h-full w-full object-cover opacity-35 scale-105 filter contrast-110 saturate-125"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/75 to-navy-950/90" />
    </div>

    <div className="relative container-x text-center z-10">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3 tracking-tight">{title}</h2>
      <p className="text-white/75 max-w-xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">{subtitle}</p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <CallButton />
        <WhatsAppButton />
      </div>
    </div>
  </section>
);

export default CTASection;
