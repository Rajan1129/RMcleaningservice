import { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, MessageCircle, Phone } from 'lucide-react';
import apiClient from '../services/api';
import { servicesData } from '../data/servicesData';
import { BUSINESS } from '../utils/business';

const initialState = {
  name: '',
  phone: '',
  service: '',
  location: '',
  preferredDate: '',
  message: '',
};

const ContactForm = ({ defaultService = '', defaultLocation = '' }) => {
  const [form, setForm] = useState({ ...initialState, service: defaultService, location: defaultLocation });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [lastSubmitted, setLastSubmitted] = useState(null);

  useEffect(() => {
    setForm((f) => ({
      ...f,
      service: defaultService || f.service,
      location: defaultLocation || f.location,
    }));
  }, [defaultService, defaultLocation]);

  const cleanPhone = (p) =>
    p.replace(/[\s\-\(\)\.]/g, '').replace(/^\+91/, '').replace(/^91(?=\d{10}$)/, '').replace(/^0(?=\d{10}$)/, '');

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Please enter your name.';
    const cleaned = cleanPhone(form.phone);
    if (!/^[6-9]\d{9}$/.test(cleaned)) errs.phone = 'Enter a valid 10-digit Indian phone number.';
    if (!form.service) errs.service = 'Please select a service.';
    if (form.message && form.message.length > 1000) errs.message = 'Message is too long.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('submitting');
    try {
      const cleaned = cleanPhone(form.phone);
      const payload = { ...form, phone: cleaned };

      // 1. Send details to Admin Portal / Database (MongoDB Atlas)
      await apiClient.post('/enquiries', payload);

      // 2. Format details for WhatsApp
      const waText = [
        `🧹 *New Cleaning Request - R M Home Cleaning*`,
        `👤 *Name:* ${form.name}`,
        `📞 *Phone:* ${cleaned}`,
        `✨ *Service:* ${form.service}`,
        form.location ? `📍 *Location:* ${form.location}` : null,
        form.preferredDate ? `📅 *Preferred Date:* ${form.preferredDate}` : null,
        form.message ? `💬 *Message:* ${form.message}` : null,
      ]
        .filter(Boolean)
        .join('\n');

      const waUrl = `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(waText)}`;
      setLastSubmitted({ ...payload, waUrl });
      setStatus('success');
      setForm(initialState);

      // 3. Auto-open WhatsApp in a new tab
      try {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      } catch (openErr) {
        console.warn('Popup blocked, user can click WhatsApp button:', openErr);
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-7 sm:p-8 space-y-5" noValidate>
      <div>
        <label className="block text-sm font-semibold text-navy-900 mb-1.5">Full Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full rounded-xl border border-skyline-100 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-skyline-400"
          placeholder="Your name"
        />
        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy-900 mb-1.5">Phone Number</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full rounded-xl border border-skyline-100 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-skyline-400"
          placeholder="98765 43210"
          inputMode="numeric"
        />
        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy-900 mb-1.5">Service Required</label>
        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          className="w-full rounded-xl border border-skyline-100 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-skyline-400"
        >
          <option value="">Select a service</option>
          {servicesData.map((s) => (
            <option key={s.slug} value={s.title}>{s.title}</option>
          ))}
        </select>
        {errors.service && <p className="text-xs text-red-500 mt-1">{errors.service}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-navy-900 mb-1.5">Location</label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full rounded-xl border border-skyline-100 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-skyline-400"
            placeholder="Sector 50 Chandigarh, Mohali, Panchkula..."
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-navy-900 mb-1.5">Preferred Date</label>
          <input
            type="date"
            name="preferredDate"
            value={form.preferredDate}
            onChange={handleChange}
            className="w-full rounded-xl border border-skyline-100 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-skyline-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy-900 mb-1.5">Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-xl border border-skyline-100 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-skyline-400"
          placeholder="Tell us more about what you need..."
        />
        {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
      </div>

      <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full">
        <Send size={17} />
        {status === 'submitting' ? 'Sending...' : 'Request a Quote'}
      </button>

      {status === 'success' && (
        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-800">
            <CheckCircle2 size={19} className="text-emerald-600 shrink-0" />
            <span>Enquiry Received &amp; Sent to Admin Portal!</span>
          </div>
          <p className="text-xs text-emerald-900/80 leading-relaxed">
            Your details have been saved to our admin portal. For instant confirmation, you can also connect directly with us on WhatsApp:
          </p>
          {lastSubmitted?.waUrl && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <a
                href={lastSubmitted.waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp !py-2.5 !px-4 text-xs font-bold shadow-xs inline-flex items-center gap-1.5"
              >
                <MessageCircle size={16} />
                <span>Chat on WhatsApp Now</span>
              </a>
              <a
                href={BUSINESS.phoneHref}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-navy-800 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <Phone size={13} className="text-skyline-600" />
                <span>Call {BUSINESS.phoneDisplay}</span>
              </a>
            </div>
          )}
        </div>
      )}
      {status === 'error' && (
        <p className="flex items-center gap-2 text-sm text-red-500 font-medium">
          <AlertCircle size={17} /> Something went wrong. Please call or WhatsApp us directly.
        </p>
      )}
    </form>
  );
};

export default ContactForm;
