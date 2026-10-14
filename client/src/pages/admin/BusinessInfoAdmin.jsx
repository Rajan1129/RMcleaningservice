import { useEffect, useState } from 'react';
import apiClient from '../../services/api';

const BusinessInfoAdmin = () => {
  const [form, setForm] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    apiClient.get('/business-info').then((res) => setForm(res.data.data));
  }, []);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await apiClient.put('/business-info', form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (!form) return <p className="text-navy-800/50">Loading...</p>;

  const fields = [
    { name: 'businessName', label: 'Business Name' },
    { name: 'phone', label: 'Phone Number (e.g. 9646078122)' },
    { name: 'whatsapp', label: 'WhatsApp Number (with country code, no +, e.g. 919646078122)' },
    { name: 'address', label: 'Address' },
    { name: 'plusCode', label: 'Plus Code (e.g. MPXX+HW Chandigarh)' },
    { name: 'hours', label: 'Operating Hours (e.g. Open 24 Hours)' },
    { name: 'serviceArea', label: 'Service Area' },
    { name: 'mapEmbedUrl', label: 'Google Maps Embed URL' },
    { name: 'googleMapsUrl', label: 'Google Maps Directions URL' },
    { name: 'googleReviewsUrl', label: 'Google Reviews URL' },
    { name: 'website', label: 'Associated Website URL' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-900 mb-6">Business Information</h1>
      <form onSubmit={handleSubmit} className="glass-card bg-white p-6 max-w-2xl space-y-4">
        {fields.map((f) => (
          <div key={f.name}>
            <label className="block text-sm font-semibold text-navy-900 mb-1.5">{f.label}</label>
            <input
              name={f.name}
              value={form[f.name] || ''}
              onChange={handleChange}
              className="w-full rounded-xl border border-skyline-100 px-4 py-2.5 text-sm"
            />
          </div>
        ))}
        <button type="submit" className="btn-primary !py-2.5 text-sm">Save Changes</button>
        {saved && <p className="text-sm text-emerald-600 font-medium">Saved successfully.</p>}
      </form>
    </div>
  );
};

export default BusinessInfoAdmin;
