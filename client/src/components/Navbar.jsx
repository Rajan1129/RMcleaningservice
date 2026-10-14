import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import { BUSINESS, whatsappLink, DEFAULT_WHATSAPP_MESSAGE } from '../utils/business';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

const locationDropdown = [
  { to: '/cleaning-service-in-mohali', label: 'Mohali' },
  { to: '/cleaning-service-in-zirakpur', label: 'Zirakpur' },
  { to: '/cleaning-service-in-tricity', label: 'Tricity' },
  { to: '/cleaning-service-near-me', label: 'Near Me' },
  { to: '/cleaning-service-in-chandigarh', label: 'Chandigarh' },
  { to: '/cleaning-service-in-kharar', label: 'Kharar' },
  { to: '/cleaning-service-in-sas-nagar', label: 'SAS Nagar' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [locOpen, setLocOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setLocOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled ? 'bg-white/95 backdrop-blur-xl shadow-glass' : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      <nav className="container-x flex h-20 items-center justify-between">
        <Link to="/">
          <Logo />
        </Link>

        <ul className="hidden lg:flex items-center gap-6 xl:gap-7">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `text-[15px] font-medium transition-colors ${
                    isActive ? 'text-skyline-600 font-semibold' : 'text-navy-800/80 hover:text-skyline-600'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}

          {/* Locations Dropdown for Desktop */}
          <li className="relative group">
            <button className="flex items-center gap-1 text-[15px] font-medium text-navy-800/80 hover:text-skyline-600 transition-colors py-2">
              <span>Locations</span>
              <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute top-full left-0 pt-2 hidden group-hover:block w-52 z-50">
              <div className="bg-white rounded-xl shadow-xl border border-skyline-100 p-2 space-y-0.5">
                {locationDropdown.map((loc) => (
                  <NavLink
                    key={loc.to}
                    to={loc.to}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        isActive ? 'bg-skyline-50 text-skyline-600 font-bold' : 'text-navy-800/80 hover:bg-skyline-50/60'
                      }`
                    }
                  >
                    Cleaning in {loc.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </li>
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <a href={BUSINESS.phoneHref} className="btn-secondary !px-4 !py-2.5 text-sm">
            <Phone size={16} /> Call {BUSINESS.phoneDisplay}
          </a>
          <a
            href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp !px-4 !py-2.5 text-sm"
          >
            <MessageCircle size={16} /> WhatsApp
          </a>
        </div>

        <button
          className="lg:hidden text-navy-900 p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-skyline-100 bg-white shadow-xl max-h-[85vh] overflow-y-auto">
          <ul className="container-x py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block py-2.5 text-[15px] font-medium ${
                      isActive ? 'text-skyline-600 font-semibold' : 'text-navy-800/80'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}

            {/* Mobile Locations Accordion */}
            <li className="pt-1">
              <button
                onClick={() => setLocOpen(!locOpen)}
                className="w-full flex items-center justify-between py-2 text-[15px] font-medium text-navy-800/80"
              >
                <span>Service Locations</span>
                <ChevronDown size={16} className={`transition-transform ${locOpen ? 'rotate-180' : ''}`} />
              </button>
              {locOpen && (
                <div className="pl-3 py-1 space-y-1 bg-skyline-50/50 rounded-lg">
                  {locationDropdown.map((loc) => (
                    <NavLink
                      key={loc.to}
                      to={loc.to}
                      onClick={() => setOpen(false)}
                      className="block py-1.5 text-xs text-navy-800/70 hover:text-skyline-600 font-medium"
                    >
                      • Cleaning in {loc.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </li>

            <li className="flex gap-3 pt-3">
              <a href={BUSINESS.phoneHref} className="btn-secondary flex-1 !py-2.5 text-sm text-center">
                <Phone size={16} /> Call
              </a>
              <a
                href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp flex-1 !py-2.5 text-sm text-center"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
