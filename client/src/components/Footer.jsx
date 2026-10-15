import { Link } from 'react-router-dom';
import { Phone, MapPin, MessageCircle, Star, Clock, Heart, ShieldCheck } from 'lucide-react';
import Logo from './Logo';
import { BUSINESS, whatsappLink, DEFAULT_WHATSAPP_MESSAGE } from '../utils/business';

const serviceLinks = [
  { to: '/services/full-home-deep-cleaning', label: 'Full Home Deep Cleaning' },
  { to: '/services/kitchen-deep-cleaning', label: 'Kitchen Deep Cleaning' },
  { to: '/services/bathroom-deep-cleaning', label: 'Bathroom Deep Cleaning' },
  { to: '/services/sofa-carpet-cleaning', label: 'Sofa & Carpet Cleaning' },
  { to: '/services/floor-scrubbing-polishing', label: 'Floor Scrubbing' },
  { to: '/services/water-tank-cleaning', label: 'Water Tank Cleaning' },
];

const seoLocations = [
  { to: '/cleaning-service-in-mohali', label: 'Cleaning Service in Mohali' },
  { to: '/cleaning-service-in-zirakpur', label: 'Cleaning Service in Zirakpur' },
  { to: '/cleaning-service-in-panchkula', label: 'Cleaning Service in Panchkula' },
  { to: '/cleaning-service-in-chandigarh', label: 'Cleaning Service in Chandigarh' },
  { to: '/cleaning-service-in-tricity', label: 'Cleaning Service in Tricity' },
  { to: '/cleaning-service-near-me', label: 'Cleaning Service Near Me' },
  { to: '/cleaning-service-in-kharar', label: 'Cleaning Service in Kharar' },
  { to: '/cleaning-service-in-sas-nagar', label: 'Cleaning Service in SAS Nagar' },
];

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About Us' },
  { to: '/gallery', label: 'Photo Gallery' },
  { to: '/reviews', label: 'Google Reviews (4.9★)' },
  { to: '/contact', label: 'Contact Us' },
];

const Footer = () => (
  <footer className="bg-navy-950 text-white/80">
    <div className="container-x py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
      {/* Brand & Credentials */}
      <div>
        <Logo dark />
        <p className="mt-4 text-sm leading-relaxed text-white/60 max-w-xs">
          House cleaning and deep cleaning services based in Progressive Society, Sector 50, Chandigarh. Open 24 Hours across Tricity.
        </p>
        <div className="mt-4 flex flex-col gap-1.5 text-xs text-white/60">
          <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
            <Star size={13} className="fill-amber-300 text-amber-300" /> 4.9 Rating (18 Google Reviews)
          </span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <Clock size={13} /> Open 24 Hours
          </span>
          <span className="flex items-center gap-1.5 text-rose-300">
            <Heart size={13} /> LGBTQ+ Friendly & Welcoming
          </span>
        </div>
      </div>

      {/* Services */}
      <div>
        <h4 className="text-white font-bold mb-4 tracking-wide text-sm uppercase">Our Services</h4>
        <ul className="space-y-2.5 text-sm">
          {serviceLinks.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="hover:text-skyline-300 transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* SEO Popular Locations */}
      <div>
        <h4 className="text-white font-bold mb-4 tracking-wide text-sm uppercase">Service Areas (SEO)</h4>
        <ul className="space-y-2.5 text-sm">
          {seoLocations.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="hover:text-skyline-300 transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-skyline-400" />
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Details */}
      <div>
        <h4 className="text-white font-bold mb-4 tracking-wide text-sm uppercase">Contact Details</h4>
        <ul className="space-y-3 text-sm">
          <li className="flex items-center gap-2.5">
            <Phone size={16} className="text-skyline-400 shrink-0" />
            <a href={BUSINESS.phoneHref} className="hover:text-skyline-300 font-semibold">
              {BUSINESS.phoneDisplay}
            </a>
          </li>
          <li className="flex items-start gap-2.5">
            <MapPin size={16} className="text-skyline-400 shrink-0 mt-0.5" />
            <div>
              <p>{BUSINESS.address}</p>
              <p className="text-xs text-white/40 mt-0.5">Plus Code: {BUSINESS.plusCode}</p>
            </div>
          </li>
          <li className="flex items-center gap-2.5">
            <MessageCircle size={16} className="text-skyline-400 shrink-0" />
            <a
              href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-skyline-300 font-medium"
            >
              WhatsApp: +91 {BUSINESS.phone}
            </a>
          </li>
        </ul>

        <div className="mt-6 pt-4 border-t border-white/10">
          <Link to="/admin" className="text-[11px] text-white/40 hover:text-white/70">
            Admin Portal
          </Link>
        </div>
      </div>
    </div>

    <div className="border-t border-white/10">
      <div className="container-x py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
        <p>© 2026 R M Home Cleaning. All Rights Reserved.</p>
        <p>Progressive Society, Sector 50, Chandigarh · Open 24 Hours</p>
      </div>
    </div>
  </footer>
);

export default Footer;
