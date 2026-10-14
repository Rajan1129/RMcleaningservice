import { useEffect, useState } from 'react';
import { Plus, Trash2, Edit2, X, Sparkles, Image as ImageIcon } from 'lucide-react';
import apiClient from '../../services/api';
import ImageUploader from '../../components/admin/ImageUploader';

const emptyForm = {
  title: '',
  slug: '',
  shortDescription: '',
  description: '',
  image: '/images/living-room-cleaning.jpg',
  icon: 'Sparkles',
  benefitsText: 'Trained & Police-Verified Staff, Industrial Equipment, Eco-Friendly Non-Toxic Chemicals',
  suitableForText: '1-4 BHK Flats, High-rise Societies, Independent Kothis, Tenancy Handover',
  processText: 'Inspection & Dry Dusting, Deep Chemical Degreasing/Descaling, Machine Scrubbing, Final Detailing',
  isActive: true,
};

const ServicesAdmin = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = () => {
    setLoading(true);
    apiClient
      .get('/services/admin/all')
      .then((res) => setServices(res.data.data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        benefits: form.benefitsText
          ? form.benefitsText.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
        suitableFor: form.suitableForText
          ? form.suitableForText.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
        process: form.processText
          ? form.processText.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
      };

      if (editingId) {
        await apiClient.put(`/services/${editingId}`, payload);
      } else {
        await apiClient.post('/services', payload);
      }

      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving service');
    }
  };

  const startEdit = (s) => {
    setForm({
      title: s.title || '',
      slug: s.slug || '',
      shortDescription: s.shortDescription || '',
      description: s.description || '',
      image: s.image || '',
      icon: s.icon || 'Sparkles',
      benefitsText: (s.benefits || []).join(', '),
      suitableForText: (s.suitableFor || []).join(', '),
      processText: (s.process || []).join(', '),
      isActive: s.isActive !== false,
    });
    setEditingId(s._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const remove = async (id) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      await apiClient.delete(`/services/${id}`);
      load();
    } catch (err) {
      alert('Failed to delete service');
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Services Management</h1>
          <p className="text-sm text-navy-800/60 mt-0.5">
            Add, update, or edit all cleaning services, photos, descriptions, and processes.
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setForm(emptyForm);
            setEditingId(null);
          }}
          className="btn-primary !py-2.5 text-sm"
        >
          <Plus size={16} /> Add New Service
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="glass-card bg-white p-6 mb-6 space-y-4 border border-skyline-200">
          <div className="flex justify-between items-center pb-2 border-b border-skyline-100">
            <h3 className="font-bold text-navy-950">
              {editingId ? 'Edit Cleaning Service' : 'Create New Cleaning Service'}
            </h3>
            <button type="button" onClick={() => setShowForm(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">Service Title *</label>
              <input
                name="title"
                placeholder="e.g. Modular Kitchen Deep Cleaning"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-skyline-200 px-4 py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">URL Slug *</label>
              <input
                name="slug"
                placeholder="e.g. modular-kitchen-deep-cleaning"
                value={form.slug}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-skyline-200 px-4 py-2.5 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1">Lucide Icon Name</label>
            <input
              name="icon"
              placeholder="e.g. Sparkles, Droplets, UtensilsCrossed, Sofa, Shield"
              value={form.icon}
              onChange={handleChange}
              className="w-full rounded-xl border border-skyline-200 px-4 py-2.5 text-sm"
            />
          </div>

          {/* Service Photo Drag & Drop Uploader */}
          <ImageUploader
            label="Service Cover Photo"
            required
            value={form.image}
            onChange={(url) => setForm((f) => ({ ...f, image: url }))}
            helperText="Drag & drop service photo, choose a preset, or browse from files."
            aspectRatio="aspect-[16/10]"
          />

          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1">Short Description (for cards) *</label>
            <input
              name="shortDescription"
              placeholder="e.g. Intensive degreasing for chimneys, cabinets, granite slabs & tile walls."
              value={form.shortDescription}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-skyline-200 px-4 py-2.5 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1">Detailed Description *</label>
            <textarea
              name="description"
              placeholder="Full details on what the service entails, how our boys work, chemical safety..."
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full rounded-xl border border-skyline-200 px-4 py-2.5 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1">Key Benefits (comma-separated)</label>
            <input
              name="benefitsText"
              placeholder="Trained Staff, Acid-free safe chemicals, 100% degreasing..."
              value={form.benefitsText}
              onChange={handleChange}
              className="w-full rounded-xl border border-skyline-200 px-4 py-2.5 text-sm"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">Suitable For (comma-separated)</label>
              <input
                name="suitableForText"
                placeholder="Flats, Kothis, Rental handovers, Post renovation..."
                value={form.suitableForText}
                onChange={handleChange}
                className="w-full rounded-xl border border-skyline-200 px-4 py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">Step-by-step Process (comma-separated)</label>
              <input
                name="processText"
                placeholder="Pre-inspection, Chemical application, Scrubbing, Sanitization..."
                value={form.processText}
                onChange={handleChange}
                className="w-full rounded-xl border border-skyline-200 px-4 py-2.5 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
              className="rounded text-skyline-600"
            />
            <label htmlFor="isActive" className="text-xs text-navy-900 font-medium cursor-pointer">
              Active & Published on Website
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-xl border border-skyline-200 text-sm font-semibold"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary !py-2 text-sm">
              {editingId ? 'Update Service' : 'Create Service'}
            </button>
          </div>
        </form>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((s) => (
          <div key={s._id} className="glass-card bg-white p-5 border border-skyline-100 flex flex-col justify-between">
            <div>
              {s.image && (
                <div className="h-36 w-full rounded-xl overflow-hidden mb-3 bg-slate-100">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-navy-950 text-base">{s.title}</h3>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    s.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {s.isActive ? 'Active' : 'Draft'}
                </span>
              </div>
              <p className="text-xs font-mono text-skyline-600 mb-2">/services/{s.slug}</p>
              <p className="text-xs text-navy-800/70 mb-4 line-clamp-2">{s.shortDescription}</p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-skyline-100">
              <a
                href={`/services/${s.slug}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-navy-800/60 hover:text-skyline-600"
              >
                View ↗
              </a>
              <div className="flex gap-3">
                <button
                  onClick={() => startEdit(s)}
                  className="flex items-center gap-1.5 text-skyline-600 text-xs font-semibold hover:text-skyline-700"
                >
                  <Edit2 size={13} /> Edit
                </button>
                <button
                  onClick={() => remove(s._id)}
                  className="flex items-center gap-1.5 text-red-500 text-xs font-semibold hover:text-red-700"
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

export default ServicesAdmin;
