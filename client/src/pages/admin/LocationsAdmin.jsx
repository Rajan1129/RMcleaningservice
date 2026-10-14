import { useEffect, useState } from 'react';
import { Plus, Trash2, Edit2, X, MapPin, Search } from 'lucide-react';
import apiClient from '../../services/api';
import ImageUploader from '../../components/admin/ImageUploader';

const emptyForm = {
  city: '',
  slug: '',
  metaTitle: '',
  metaDescription: '',
  heroTitle: '',
  heroSubtitle: '',
  description: '',
  heroImage: '/images/hero-man-cleaning-window.jpg',
  localitiesText: '',
  priceTiers: [
    { label: '1 BHK Deep Clean', price: 'Free Custom Quote', note: 'Full rooms, kitchen & washroom' },
    { label: '2 BHK Deep Clean', price: 'Free Custom Quote', note: 'Complete flat scrubbing & balcony' },
    { label: '3 BHK Deep Clean', price: 'Free Custom Quote', note: 'Top-to-bottom detailing & fans' },
  ],
  customFaqs: [
    { question: 'Do you provide same day deep cleaning here?', answer: 'Yes, we are open 24 hours. Call 096460 78122 directly for immediate slots.' },
  ],
  isActive: true,
};

const LocationsAdmin = () => {
  const [locations, setLocations] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const load = () => {
    setLoading(true);
    apiClient
      .get('/locations/admin/all')
      .then((res) => setLocations(res.data.data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handlePriceTierChange = (index, field, value) => {
    setForm((f) => {
      const updated = [...f.priceTiers];
      updated[index][field] = value;
      return { ...f, priceTiers: updated };
    });
  };

  const addPriceTier = () => {
    setForm((f) => ({
      ...f,
      priceTiers: [...f.priceTiers, { label: '', price: '', note: '' }],
    }));
  };

  const removePriceTier = (index) => {
    setForm((f) => ({
      ...f,
      priceTiers: f.priceTiers.filter((_, i) => i !== index),
    }));
  };

  const handleFaqChange = (index, field, value) => {
    setForm((f) => {
      const updated = [...f.customFaqs];
      updated[index][field] = value;
      return { ...f, customFaqs: updated };
    });
  };

  const addFaq = () => {
    setForm((f) => ({
      ...f,
      customFaqs: [...f.customFaqs, { question: '', answer: '' }],
    }));
  };

  const removeFaq = (index) => {
    setForm((f) => ({
      ...f,
      customFaqs: f.customFaqs.filter((_, i) => i !== index),
    }));
  };

  const startEdit = (loc) => {
    setEditingId(loc._id);
    setForm({
      city: loc.city || '',
      slug: loc.slug || '',
      metaTitle: loc.metaTitle || '',
      metaDescription: loc.metaDescription || '',
      heroTitle: loc.heroTitle || '',
      heroSubtitle: loc.heroSubtitle || '',
      description: loc.description || '',
      heroImage: loc.heroImage || '/images/hero-man-cleaning-window.jpg',
      localitiesText: (loc.localities || []).join(', '),
      priceTiers: loc.priceTiers && loc.priceTiers.length > 0 ? loc.priceTiers : [
        { label: '1 BHK Deep Clean', price: 'Free Custom Quote', note: '' },
      ],
      customFaqs: loc.customFaqs && loc.customFaqs.length > 0 ? loc.customFaqs : [
        { question: '', answer: '' },
      ],
      isActive: loc.isActive !== false,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        localities: form.localitiesText
          ? form.localitiesText.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
      };

      if (editingId) {
        await apiClient.put(`/locations/${editingId}`, payload);
        setMsg('Location page updated successfully!');
      } else {
        await apiClient.post('/locations', payload);
        setMsg('New location page created!');
      }

      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
      load();
      setTimeout(() => setMsg(''), 4000);
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving location');
    }
  };

  const remove = async (id) => {
    if (!confirm('Are you sure you want to delete this location page?')) return;
    try {
      await apiClient.delete(`/locations/${id}`);
      load();
    } catch (err) {
      alert('Failed to delete');
    }
  };

  const filteredLocations = locations.filter(
    (l) =>
      l.city.toLowerCase().includes(search.toLowerCase()) ||
      l.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">SEO Location Pages</h1>
          <p className="text-sm text-navy-800/60 mt-0.5">
            Manage high-ranking landing pages for Mohali, Zirakpur, Tricity, Chandigarh, etc.
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setForm(emptyForm);
          }}
          className="btn-primary !py-2.5 text-sm"
        >
          <Plus size={16} /> Add Location Page
        </button>
      </div>

      {msg && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-medium">
          {msg}
        </div>
      )}

      {/* Add / Edit Form Modal / Card */}
      {showForm && (
        <div className="glass-card bg-white p-6 mb-8 border border-skyline-200 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-skyline-100 mb-6">
            <h2 className="text-lg font-bold text-navy-950">
              {editingId ? 'Edit SEO Location Page' : 'Create New Location Landing Page'}
            </h2>
            <button
              onClick={() => setShowForm(false)}
              className="p-1.5 rounded-lg text-navy-800/60 hover:bg-skyline-50"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">City / Region Name *</label>
                <input
                  name="city"
                  placeholder="e.g. Mohali, Zirakpur, Tricity, Kharar"
                  value={form.city}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-skyline-200 px-4 py-2.5 text-sm focus:outline-skyline-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">URL Slug * (without leading slash)</label>
                <input
                  name="slug"
                  placeholder="e.g. cleaning-service-in-mohali"
                  value={form.slug}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-skyline-200 px-4 py-2.5 text-sm focus:outline-skyline-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">SEO Meta Title *</label>
              <input
                name="metaTitle"
                placeholder="e.g. Home Cleaning Service in Mohali | 4.9★ Deep Cleaning"
                value={form.metaTitle}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-skyline-200 px-4 py-2.5 text-sm focus:outline-skyline-500"
              />
            </div>

            {/* Location Hero Backdrop Image Uploader */}
            <ImageUploader
              label="Location Hero Banner / Background Photo"
              value={form.heroImage}
              onChange={(url) => setForm((f) => ({ ...f, heroImage: url }))}
              helperText="Drag & drop hero photo or choose from real Indian cleaning presets."
              aspectRatio="aspect-[16/9]"
            />

            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">SEO Meta Description *</label>
              <textarea
                name="metaDescription"
                placeholder="Meta description for Google search snippet (approx 150-160 characters)"
                value={form.metaDescription}
                onChange={handleChange}
                rows={2}
                required
                className="w-full rounded-xl border border-skyline-200 px-4 py-2.5 text-sm focus:outline-skyline-500"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">Hero H1 Heading *</label>
                <input
                  name="heroTitle"
                  placeholder="e.g. Top-Rated Home Cleaning Services in Mohali"
                  value={form.heroTitle}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-skyline-200 px-4 py-2.5 text-sm focus:outline-skyline-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">Hero Subtitle *</label>
                <input
                  name="heroSubtitle"
                  placeholder="e.g. 4.9★ Rated Deep Cleaning Across Phase 1–11 & Aerocity"
                  value={form.heroSubtitle}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-skyline-200 px-4 py-2.5 text-sm focus:outline-skyline-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">Local Narrative / Description *</label>
              <textarea
                name="description"
                placeholder="In-depth description detailing services, local problem-solving, team equipment..."
                value={form.description}
                onChange={handleChange}
                rows={3}
                required
                className="w-full rounded-xl border border-skyline-200 px-4 py-2.5 text-sm focus:outline-skyline-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">
                Localities / Sectors Served (comma separated)
              </label>
              <textarea
                name="localitiesText"
                placeholder="Phase 1, Phase 2, Phase 3B2, Sector 70, Sector 71, Aerocity..."
                value={form.localitiesText}
                onChange={handleChange}
                rows={2}
                className="w-full rounded-xl border border-skyline-200 px-4 py-2.5 text-sm focus:outline-skyline-500"
              />
            </div>

            {/* Service Packages Manager */}
            <div className="pt-2 border-t border-skyline-100">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-900">
                  Service Packages / Tiers for this Location
                </label>
                <button
                  type="button"
                  onClick={addPriceTier}
                  className="text-xs font-bold text-skyline-600 hover:text-skyline-700 flex items-center gap-1"
                >
                  <Plus size={13} /> Add Package Tier
                </button>
              </div>

              <div className="space-y-2.5">
                {form.priceTiers.map((tier, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 items-center bg-skyline-50/50 p-2.5 rounded-xl border border-skyline-100">
                    <input
                      placeholder="Package Name (e.g. 1 BHK Deep Clean)"
                      value={tier.label}
                      onChange={(e) => handlePriceTierChange(index, 'label', e.target.value)}
                      className="col-span-4 rounded-lg border border-skyline-200 px-3 py-1.5 text-xs bg-white"
                    />
                    <input
                      placeholder="Badge (e.g. Free Custom Quote)"
                      value={tier.price}
                      onChange={(e) => handlePriceTierChange(index, 'price', e.target.value)}
                      className="col-span-3 rounded-lg border border-skyline-200 px-3 py-1.5 text-xs bg-white font-semibold"
                    />
                    <input
                      placeholder="Scope / Note (e.g. Full flat detailing)"
                      value={tier.note}
                      onChange={(e) => handlePriceTierChange(index, 'note', e.target.value)}
                      className="col-span-4 rounded-lg border border-skyline-200 px-3 py-1.5 text-xs bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => removePriceTier(index)}
                      className="col-span-1 text-red-500 hover:text-red-700 flex justify-center"
                      title="Delete tier"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Location FAQs Manager */}
            <div className="pt-2 border-t border-skyline-100">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-900">
                  Location Specific FAQs
                </label>
                <button
                  type="button"
                  onClick={addFaq}
                  className="text-xs font-bold text-skyline-600 hover:text-skyline-700 flex items-center gap-1"
                >
                  <Plus size={13} /> Add FAQ
                </button>
              </div>

              <div className="space-y-3">
                {form.customFaqs.map((faq, index) => (
                  <div key={index} className="bg-skyline-50/50 p-3 rounded-xl border border-skyline-100 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <input
                        placeholder="Question"
                        value={faq.question}
                        onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                        className="flex-1 rounded-lg border border-skyline-200 px-3 py-1.5 text-xs bg-white font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => removeFaq(index)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete FAQ"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <textarea
                      placeholder="Answer"
                      value={faq.answer}
                      onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                      rows={2}
                      className="w-full rounded-lg border border-skyline-200 px-3 py-1.5 text-xs bg-white"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-skyline-100">
              <label className="flex items-center gap-2 text-sm text-navy-900 cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleChange}
                  className="rounded text-skyline-600"
                />
                Active (Indexed & Accessible to Users)
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2.5 rounded-xl border border-skyline-200 text-sm font-semibold text-navy-800"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary !py-2.5 text-sm">
                {editingId ? 'Save Changes' : 'Publish Location Page'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex items-center gap-3 mb-6 bg-white p-3 rounded-xl border border-skyline-100 shadow-xs max-w-md">
        <Search size={16} className="text-navy-800/40" />
        <input
          type="text"
          placeholder="Search by city or slug..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 text-sm bg-transparent outline-none text-navy-950 placeholder:text-navy-800/40"
        />
      </div>

      {/* Location Pages List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredLocations.map((loc) => (
          <div
            key={loc._id || loc.slug}
            className="glass-card bg-white p-5 border border-skyline-100 flex flex-col justify-between hover:shadow-lg transition-all"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1 text-xs font-bold bg-skyline-50 text-skyline-800 px-2.5 py-1 rounded-lg">
                  <MapPin size={12} /> {loc.city}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    loc.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {loc.isActive ? 'Active' : 'Disabled'}
                </span>
              </div>

              <h3 className="font-bold text-navy-950 text-base leading-snug mb-1">
                /{loc.slug}
              </h3>
              <p className="text-xs text-navy-800/70 line-clamp-2 mb-3">
                {loc.heroSubtitle || loc.description}
              </p>

              <div className="text-[11px] text-navy-800/50 mb-4 space-y-1">
                <p>• {loc.localities ? `${loc.localities.length} Localities mapped` : 'No localities'}</p>
                <p>• {loc.priceTiers ? `${loc.priceTiers.length} Service packages` : 'No packages'}</p>
                <p>• {loc.customFaqs ? `${loc.customFaqs.length} Custom FAQs` : 'No FAQs'}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-skyline-100 flex items-center justify-between text-xs font-semibold">
              <a
                href={`/${loc.slug}`}
                target="_blank"
                rel="noreferrer"
                className="text-navy-800/70 hover:text-skyline-600"
              >
                View Page ↗
              </a>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => startEdit(loc)}
                  className="flex items-center gap-1 text-skyline-600 hover:text-skyline-700"
                >
                  <Edit2 size={13} /> Edit
                </button>
                <button
                  onClick={() => remove(loc._id)}
                  className="flex items-center gap-1 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationsAdmin;
