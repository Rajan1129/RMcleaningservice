import { useEffect, useState } from 'react';
import {
  MessageSquare,
  Phone,
  MessageCircle,
  Calendar,
  MapPin,
  Trash2,
  RefreshCw,
  Search,
  CheckCircle2,
  Clock,
  Filter,
} from 'lucide-react';
import apiClient from '../../services/api';

const statuses = ['Pending', 'Contacted', 'Confirmed', 'Completed', 'Cancelled'];

const statusStyles = {
  Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  Contacted: 'bg-skyline-50 text-skyline-700 border-skyline-200',
  Confirmed: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
};

const EnquiriesAdmin = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [msg, setMsg] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const params = filter ? { status: filter } : {};
      const res = await apiClient.get('/enquiries', { params });
      setEnquiries(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (err) {
      console.error('Failed to load enquiries:', err);
      setMsg('Error loading enquiries. Please check connection.');
      setEnquiries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [filter]);

  const showNotification = (text) => {
    setMsg(text);
    setTimeout(() => setMsg(''), 4000);
  };

  const updateStatus = async (id, status) => {
    try {
      await apiClient.patch(`/enquiries/${id}`, { status });
      setEnquiries((prev) =>
        prev.map((e) => (e._id === id ? { ...e, status } : e))
      );
      showNotification(`Enquiry marked as "${status}"`);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      await apiClient.delete(`/enquiries/${id}`);
      setEnquiries((prev) => prev.filter((e) => e._id !== id));
      showNotification('Enquiry deleted successfully.');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete enquiry');
    }
  };

  const filteredEnquiries = enquiries.filter((e) => {
    const q = search.toLowerCase();
    const nameMatch = (e.name || '').toLowerCase().includes(q);
    const phoneMatch = (e.phone || '').includes(q);
    const serviceMatch = (e.service || '').toLowerCase().includes(q);
    const locMatch = (e.location || '').toLowerCase().includes(q);
    const msgMatch = (e.message || '').toLowerCase().includes(q);
    return nameMatch || phoneMatch || serviceMatch || locMatch || msgMatch;
  });

  const getCleanPhone = (phone) => {
    const digits = String(phone || '').replace(/\D/g, '');
    return digits.length === 10 ? `91${digits}` : digits;
  };

  const formatDate = (isoStr) => {
    if (!isoStr) return '—';
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoStr;
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-900 flex items-center gap-2">
            <MessageSquare size={26} className="text-skyline-600" />
            Customer Enquiries &amp; Leads
          </h1>
          <p className="text-sm text-navy-800/60 mt-0.5">
            Manage incoming cleaning requests submitted via website contact forms and landing pages.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={load}
            className="p-2.5 rounded-xl border border-skyline-200 text-navy-700 hover:bg-skyline-50 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title="Refresh Enquiries"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Notification Banner */}
      {msg && (
        <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-xs">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          <span>{msg}</span>
        </div>
      )}

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6 bg-white p-3.5 rounded-2xl border border-skyline-100 shadow-xs">
        {/* Status Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setFilter('')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filter === ''
                ? 'bg-navy-950 text-white shadow-xs'
                : 'text-navy-800/70 hover:bg-skyline-50 border border-skyline-100'
            }`}
          >
            All Leads ({enquiries.length})
          </button>
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filter === s
                  ? 'bg-skyline-600 text-white shadow-xs'
                  : 'text-navy-800/70 hover:bg-skyline-50 border border-skyline-100'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-slate-50 border border-skyline-200 px-3 py-1.5 rounded-xl max-w-xs w-full">
          <Search size={15} className="text-navy-800/40 shrink-0" />
          <input
            type="text"
            placeholder="Search name, phone, service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs outline-none bg-transparent text-navy-900 placeholder:text-navy-800/40"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-[11px] text-navy-800/50 hover:text-navy-900">
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Enquiries Content */}
      {loading ? (
        <div className="glass-card bg-white p-12 text-center text-navy-800/60">
          <RefreshCw size={24} className="animate-spin mx-auto text-skyline-600 mb-2" />
          <p className="text-sm font-medium">Loading enquiries...</p>
        </div>
      ) : filteredEnquiries.length === 0 ? (
        <div className="glass-card bg-white p-12 text-center border border-skyline-100 rounded-2xl">
          <MessageSquare size={36} className="mx-auto text-skyline-300 mb-3" />
          <h3 className="font-bold text-navy-900 text-base">No enquiries found</h3>
          <p className="text-xs text-navy-800/60 mt-1 max-w-sm mx-auto">
            {search || filter
              ? 'No leads match your current filter. Try selecting "All Leads" or clearing search.'
              : 'Enquiries submitted via the website contact forms will appear here in real-time.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEnquiries.map((e) => (
            <div
              key={e._id}
              className="glass-card bg-white p-5 rounded-2xl border border-skyline-100 hover:border-skyline-300 transition-all shadow-xs"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                {/* Left: Customer Info */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="font-bold text-navy-950 text-base">{e.name}</h3>
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                        statusStyles[e.status] || 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {e.status}
                    </span>
                    <span className="text-[11px] text-navy-800/50 flex items-center gap-1">
                      <Clock size={11} /> {formatDate(e.createdAt)}
                    </span>
                  </div>

                  {/* Service & Location Badges */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-semibold text-skyline-700 bg-skyline-50 px-2.5 py-1 rounded-lg border border-skyline-200/60">
                      Service: {e.service}
                    </span>
                    {e.location && (
                      <span className="text-navy-800/70 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 flex items-center gap-1">
                        <MapPin size={12} className="text-rose-500" /> {e.location}
                      </span>
                    )}
                    {e.preferredDate && (
                      <span className="text-navy-800/70 bg-amber-50/60 px-2.5 py-1 rounded-lg border border-amber-200 flex items-center gap-1">
                        <Calendar size={12} className="text-amber-600" /> Preferred: {e.preferredDate}
                      </span>
                    )}
                  </div>

                  {/* Customer Message / Requirement */}
                  {e.message && (
                    <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100 text-xs text-navy-800/80 leading-relaxed">
                      <span className="font-bold text-navy-900 block mb-0.5">Customer Message / Note:</span>
                      &ldquo;{e.message}&rdquo;
                    </div>
                  )}
                </div>

                {/* Right: Actions */}
                <div className="flex flex-wrap items-center lg:flex-col lg:items-end gap-2.5 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  {/* Call & WhatsApp Quick Buttons */}
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${e.phone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-navy-800 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200"
                      title="Call Customer"
                    >
                      <Phone size={13} className="text-skyline-600" />
                      <span>{e.phone}</span>
                    </a>
                    <a
                      href={`https://wa.me/${getCleanPhone(e.phone)}?text=${encodeURIComponent(
                        `Hello ${e.name}, greetings from R M Home Cleaning! We received your enquiry for ${e.service}. How can we assist you today?`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors border border-emerald-200"
                      title="Chat on WhatsApp"
                    >
                      <MessageCircle size={13} className="text-emerald-600" />
                      <span>WhatsApp</span>
                    </a>
                  </div>

                  {/* Status Dropdown & Delete Button */}
                  <div className="flex items-center gap-2">
                    <select
                      value={e.status}
                      onChange={(ev) => updateStatus(e._id, ev.target.value)}
                      className="rounded-xl border border-skyline-200 px-3 py-1.5 text-xs font-semibold bg-white text-navy-900 shadow-2xs focus:outline-skyline-500 cursor-pointer"
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          Status: {s}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => remove(e._id)}
                      className="p-1.5 rounded-xl text-red-500 hover:bg-red-50 transition-colors border border-red-100"
                      title="Delete enquiry"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnquiriesAdmin;
