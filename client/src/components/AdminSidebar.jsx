import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Wrench,
  MapPin,
  Star,
  Image as GalleryIcon,
  HelpCircle,
  MessageSquare,
  Settings,
  X,
} from 'lucide-react';

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/services', label: 'Services', icon: Wrench },
  { to: '/admin/locations', label: 'SEO Location Pages', icon: MapPin },
  { to: '/admin/reviews', label: 'Reviews & Ratings', icon: Star },
  { to: '/admin/enquiries', label: 'Enquiries / Leads', icon: MessageSquare },
  { to: '/admin/gallery', label: 'Photo Gallery', icon: GalleryIcon },
  { to: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
  { to: '/admin/business-info', label: 'Business Profile', icon: Settings },
];

const AdminSidebar = ({ mobileOpen, onClose }) => {
  const sidebarContent = (
    <div className="flex flex-col h-full bg-navy-950 text-white/80">
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 rounded-lg overflow-hidden bg-white p-0.5 border border-white/20">
            <img src="/rm-logo.jpg" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="font-display font-bold text-white text-base leading-tight">Admin Control</div>
            <p className="text-[10px] text-white/50">R M Home Cleaning</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                isActive
                  ? 'bg-skyline-600 text-white shadow-md shadow-skyline-600/30'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="w-64 shrink-0 bg-navy-950 text-white/80 min-h-screen hidden md:block border-r border-white/10">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-navy-950/70 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />
          <aside className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;
