import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Inbox,
  Clock,
  CheckCircle2,
  Wrench,
  Image as GalleryIcon,
  MapPin,
  HelpCircle,
  ArrowRight,
  Star,
  Settings,
} from 'lucide-react';
import apiClient from '../../services/api';

const StatCard = ({ icon: Icon, label, value, to, badge }) => (
  <Link
    to={to}
    className="glass-card bg-white p-5 flex items-center justify-between rounded-2xl border border-skyline-100 hover:border-skyline-400 hover:shadow-md transition-all group"
  >
    <div className="flex items-center gap-3.5">
      <div className="h-11 w-11 rounded-xl bg-skyline-50 flex items-center justify-center text-skyline-600 group-hover:bg-skyline-600 group-hover:text-white transition-colors">
        <Icon size={22} />
      </div>
      <div>
        <p className="text-2xl font-bold text-navy-950">{value ?? '—'}</p>
        <p className="text-xs text-navy-800/60 font-medium">{label}</p>
      </div>
    </div>
    <div className="flex flex-col items-end gap-1">
      {badge && (
        <span className="text-[10px] font-bold text-skyline-700 bg-skyline-50 px-2 py-0.5 rounded-full border border-skyline-200">
          {badge}
        </span>
      )}
      <ArrowRight size={15} className="text-navy-800/30 group-hover:text-skyline-600 group-hover:translate-x-0.5 transition-all" />
    </div>
  </Link>
);

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 });
  const [servicesCount, setServicesCount] = useState(0);
  const [galleryCount, setGalleryCount] = useState(0);

  useEffect(() => {
    apiClient
      .get('/enquiries/stats/summary')
      .then((res) => setStats(res.data.data || { total: 0, pending: 0, completed: 0 }))
      .catch(() => {});
    apiClient
      .get('/services/admin/all')
      .then((res) => setServicesCount(res.data.count || 0))
      .catch(() => {});
    apiClient
      .get('/gallery')
      .then((res) => setGalleryCount(res.data.count || 0))
      .catch(() => {});
  }, []);

  const shortcuts = [
    {
      to: '/admin/gallery',
      title: 'Photo Gallery & Before-After',
      desc: 'Upload real on-site photos and before/after comparisons.',
      icon: GalleryIcon,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      to: '/admin/enquiries',
      title: 'Customer Enquiries & Leads',
      desc: 'View quote requests and connect directly on WhatsApp or Call.',
      icon: Inbox,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      to: '/admin/services',
      title: 'Cleaning Services',
      desc: 'Edit service descriptions, benefits, and images.',
      icon: Wrench,
      color: 'bg-skyline-50 text-skyline-700 border-skyline-200',
    },
    {
      to: '/admin/locations',
      title: 'SEO Location Pages',
      desc: 'Rank on Google for Mohali, Zirakpur, Chandigarh & Tricity.',
      icon: MapPin,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    },
    {
      to: '/admin/faqs',
      title: 'Website FAQs',
      desc: 'Add and organize customer questions and answers.',
      icon: HelpCircle,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
      to: '/admin/business-info',
      title: 'Business Profile',
      desc: 'Update phone numbers, address, and Google ratings.',
      icon: Settings,
      color: 'bg-slate-50 text-slate-700 border-slate-200',
    },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-950">Admin Overview</h1>
          <p className="text-xs sm:text-sm text-navy-800/60 mt-0.5">
            Quick statistics and management shortcuts for R M Home Cleaning.
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard icon={Inbox} label="Total Enquiries" value={stats.total} to="/admin/enquiries" />
        <StatCard icon={Clock} label="Pending Enquiries" value={stats.pending} to="/admin/enquiries" badge="Action" />
        <StatCard icon={CheckCircle2} label="Completed Enquiries" value={stats.completed} to="/admin/enquiries" />
        <StatCard icon={Wrench} label="Services" value={servicesCount} to="/admin/services" />
        <StatCard icon={GalleryIcon} label="Gallery Photos" value={galleryCount} to="/admin/gallery" />
      </div>

      {/* Quick Access Grid */}
      <h2 className="text-base font-bold text-navy-950 mb-3">Quick Management Shortcuts</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {shortcuts.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.to}
              to={s.to}
              className="glass-card bg-white p-5 rounded-2xl border border-skyline-100 hover:border-skyline-400 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl border ${s.color}`}>
                    <Icon size={20} />
                  </div>
                  <ArrowRight size={16} className="text-navy-800/30 group-hover:text-skyline-600 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-bold text-sm text-navy-950 group-hover:text-skyline-600 transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs text-navy-800/60 mt-1 leading-relaxed">{s.desc}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
