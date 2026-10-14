import { Phone, MapPin, MessageCircle, Clock, Star, Heart, ShieldCheck } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import MapSection from '../components/MapSection';
import { BUSINESS, whatsappLink, DEFAULT_WHATSAPP_MESSAGE } from '../utils/business';

const Contact = () => (
  <div>
    <section className="relative py-16 bg-grid-fade border-b border-skyline-100 overflow-hidden">
      {/* Ambient Backdrop */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <img
          src="/images/living-room-cleaning.jpg"
          alt="Contact us backdrop"
          className="h-full w-full object-cover opacity-[0.24] scale-105 filter contrast-105 saturate-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/90" />
      </div>

      <div className="container-x text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full mb-3">
          <Star size={13} className="fill-amber-400 text-amber-500" /> 4.9★ Rated on Google (18 Reviews)
        </div>
        <h1 className="text-4xl font-extrabold text-navy-950 mb-4">Contact R M Home Cleaning</h1>
        <p className="text-navy-800/70 text-base">
          Get in touch for a quick quotation or to schedule your home cleaning appointment. We are open 24 hours!
        </p>
      </div>
    </section>

    <section className="relative py-16 bg-white overflow-hidden">
      {/* Subtle Ambient Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <img
          src="/images/kitchen-cleaning.jpg"
          alt="Contact form backdrop"
          className="h-full w-full object-cover opacity-[0.20] scale-105 filter contrast-105 saturate-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/65 to-white/90" />
      </div>

      <div className="container-x grid lg:grid-cols-2 gap-12">
        <div>
          <div className="glass-card bg-white p-7 mb-6 space-y-4 border border-skyline-100 shadow-sm">
            <h3 className="text-xl font-bold text-navy-950 mb-2">Business Details</h3>
            
            <a href={BUSINESS.phoneHref} className="flex items-center gap-3 text-navy-950 font-bold text-lg hover:text-skyline-600 transition-colors">
              <div className="h-10 w-10 rounded-xl bg-skyline-50 text-skyline-600 flex items-center justify-center shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-xs text-navy-800/50 font-normal">Call Us Directly (24/7)</p>
                <p>{BUSINESS.phoneDisplay} / {BUSINESS.phoneInternational}</p>
              </div>
            </a>

            <div className="flex items-start gap-3 text-navy-800/80">
              <div className="h-10 w-10 rounded-xl bg-skyline-50 text-skyline-600 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-xs text-navy-800/50 font-normal">Our Location</p>
                <p className="text-sm font-semibold text-navy-950">{BUSINESS.address}</p>
                <p className="text-xs text-navy-800/60 mt-0.5">Plus Code: {BUSINESS.plusCode}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-navy-800/80">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Clock size={18} />
              </div>
              <div>
                <p className="text-xs text-navy-800/50 font-normal">Operating Hours</p>
                <p className="text-sm font-bold text-emerald-700">{BUSINESS.hours}</p>
              </div>
            </div>

            <a
              href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-emerald-700 font-bold bg-emerald-50/70 p-3 rounded-xl hover:bg-emerald-100 transition-colors border border-emerald-100"
            >
              <MessageCircle size={22} className="text-emerald-600" />
              <div>
                <p className="text-xs font-normal text-emerald-800/70">Instant WhatsApp Support</p>
                <p className="text-sm">Click to Chat: +91 {BUSINESS.phone}</p>
              </div>
            </a>

            <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-semibold text-navy-800/70">
              <span className="bg-skyline-50 px-2.5 py-1 rounded-md text-skyline-700">LGBTQ+ Friendly</span>
              <span className="bg-skyline-50 px-2.5 py-1 rounded-md text-skyline-700">Open 24 Hours</span>
              <span className="bg-skyline-50 px-2.5 py-1 rounded-md text-skyline-700">Sector 50, Chandigarh</span>
            </div>
          </div>

          <MapSection />
        </div>

        <div>
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-navy-950">Request a Free Estimate</h2>
            <p className="text-sm text-navy-800/60">Fill in the details below and we will contact you right away.</p>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  </div>
);

export default Contact;
