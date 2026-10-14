import { useEffect, useState } from 'react';
import {
  Trash2,
  Plus,
  Edit2,
  X,
  Image as ImageIcon,
  RefreshCw,
  Search,
  CheckCircle2,
  Check,
  Eye,
  Filter,
} from 'lucide-react';
import apiClient from '../../services/api';
import ImageUploader from '../../components/admin/ImageUploader';

const categories = [
  'Full Home Cleaning',
  'Kitchen Cleaning',
  'Bathroom Cleaning',
  'Sofa & Carpet',
  'Floor Polishing',
  'Glass & Window Cleaning',
  'Water Tank Cleaning',
  'Commercial Cleaning',
];

const presetPhotos = [
  { label: 'Living Room', url: '/images/living-room-cleaning.jpg', cat: 'Full Home Cleaning' },
  { label: 'Kitchen Deep', url: '/images/kitchen-cleaning.jpg', cat: 'Kitchen Cleaning' },
  { label: 'Kitchen Before', url: '/images/kitchen-before.jpg', cat: 'Kitchen Cleaning' },
  { label: 'Kitchen After', url: '/images/kitchen-after.jpg', cat: 'Kitchen Cleaning' },
  { label: 'Bathroom Cleaning', url: '/images/bathroom-cleaning.jpg', cat: 'Bathroom Cleaning' },
  { label: 'Bathroom Before', url: '/images/bathroom-before.jpg', cat: 'Bathroom Cleaning' },
  { label: 'Bathroom After', url: '/images/bathroom-after.jpg', cat: 'Bathroom Cleaning' },
  { label: 'Sofa Shampooing', url: '/images/sofa-cleaning.jpg', cat: 'Sofa & Carpet' },
  { label: 'Floor Scrubbing', url: '/images/floor-scrubbing.jpg', cat: 'Floor Polishing' },
  { label: 'Window Glass', url: '/images/window-glass-cleaning.jpg', cat: 'Glass & Window Cleaning' },
  { label: 'Balcony Washing', url: '/images/balcony-cleaning.jpg', cat: 'Full Home Cleaning' },
  { label: 'Water Tank', url: '/images/water-tank-cleaning.jpg', cat: 'Water Tank Cleaning' },
  { label: 'Move-in Detailing', url: '/images/move-in-cleaning.jpg', cat: 'Full Home Cleaning' },
  { label: 'Office Deep Clean', url: '/images/office-cleaning.jpg', cat: 'Commercial Cleaning' },
];

const emptyForm = {
  title: '',
  category: categories[0],
  imageUrl: '',
  beforeImageUrl: '',
  afterImageUrl: '',
};

const GalleryAdmin = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [msg, setMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/gallery');
      const list = Array.isArray(res.data?.data) ? res.data.data : [];
      setItems(list);
    } catch (err) {
      console.error('Failed to load gallery items:', err);
      setMsg('Error loading gallery items from database.');
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const showNotification = (text) => {
    setMsg(text);
    setTimeout(() => setMsg(''), 4000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.imageUrl.trim()) {
      alert('Please provide or pick a primary image.');
      return;
    }
    setSubmitting(true);
    try {
      if (editingId) {
        await apiClient.put(`/gallery/${editingId}`, form);
        showNotification('Gallery photo updated successfully!');
      } else {
        await apiClient.post('/gallery', form);
        showNotification('New gallery photo added successfully!');
      }
      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
      await load();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving gallery item');
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (item) => {
    setForm({
      title: item.title || '',
      category: item.category || categories[0],
      imageUrl: item.imageUrl || '',
      beforeImageUrl: item.beforeImageUrl || '',
      afterImageUrl: item.afterImageUrl || '',
    });
    setEditingId(item._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const remove = async (id) => {
    if (!window.confirm('Are you sure you want to delete this gallery photo?')) return;
    try {
      await apiClient.delete(`/gallery/${id}`);
      showNotification('Gallery photo deleted successfully.');
      await load();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete item');
    }
  };

  const filteredItems = items.filter((item) => {
    const matchCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      (item.title || '').toLowerCase().includes(q) ||
      (item.category || '').toLowerCase().includes(q);
    return matchCategory && matchSearch;
  });

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-950 flex items-center gap-2">
            <ImageIcon size={26} className="text-skyline-600" />
            Photo Gallery &amp; Work Showcase
          </h1>
          <p className="text-xs sm:text-sm text-navy-800/60 mt-0.5">
            Manage real on-site cleaning photos, before/after transformations, and customer showcase images.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={load}
            className="p-2.5 rounded-xl border border-skyline-200 text-navy-700 hover:bg-skyline-50 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title="Reload gallery"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingId(null);
              setForm(emptyForm);
            }}
            className="btn-primary !py-2.5 text-xs sm:text-sm"
          >
            <Plus size={16} /> Add New Photo
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

      {/* Add / Edit Form Card */}
      {showForm && (
        <div className="glass-card bg-white p-6 mb-8 border border-skyline-200 shadow-xl rounded-2xl">
          <div className="flex justify-between items-center pb-3 border-b border-skyline-100 mb-5">
            <h3 className="font-bold text-navy-950 text-base flex items-center gap-2">
              {editingId ? <Edit2 size={17} className="text-skyline-600" /> : <Plus size={17} className="text-skyline-600" />}
              {editingId ? 'Edit Gallery Photo' : 'Add New Work Photo'}
            </h3>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="p-1.5 rounded-lg text-navy-800/60 hover:bg-slate-100 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">
                  Photo Title / Description
                </label>
                <input
                  name="title"
                  placeholder="e.g. Modular Kitchen Degreasing &amp; Slab Cleaning"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-skyline-200 px-4 py-2.5 text-sm focus:outline-skyline-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">
                  Service Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-skyline-200 px-4 py-2.5 text-sm bg-white focus:outline-skyline-500 font-medium"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Primary Image Uploader (Drag & Drop, File Browse, Presets) */}
            <ImageUploader
              label="Primary Work Showcase Photo"
              required
              value={form.imageUrl}
              onChange={(url) => setForm((f) => ({ ...f, imageUrl: url }))}
              helperText="Drag & drop any photo or click to browse. Real Indian cleaning photos only."
              aspectRatio="aspect-[16/10]"
            />

            {/* Optional Before & After Image Uploaders */}
            <div className="pt-3 border-t border-skyline-100 space-y-4">
              <div>
                <p className="text-xs font-bold text-navy-950">
                  Optional Before &amp; After Comparison Photos:
                </p>
                <p className="text-[11px] text-navy-800/50">
                  Add a before and after photo pair to showcase work transformation.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <ImageUploader
                  label="Before Image (Optional)"
                  value={form.beforeImageUrl}
                  onChange={(url) => setForm((f) => ({ ...f, beforeImageUrl: url }))}
                  helperText="Photo of area before cleaning."
                  aspectRatio="aspect-[4/3]"
                />
                <ImageUploader
                  label="After Image (Optional)"
                  value={form.afterImageUrl}
                  onChange={(url) => setForm((f) => ({ ...f, afterImageUrl: url }))}
                  helperText="Photo of sparkling result after cleaning."
                  aspectRatio="aspect-[4/3]"
                />
              </div>
            </div>

            {/* Submit & Cancel Buttons */}
            <div className="flex justify-end gap-3 pt-3 border-t border-skyline-100">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-xl border border-skyline-200 text-sm font-semibold text-navy-700 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button type="submit" disabled={submitting} className="btn-primary !py-2 text-sm">
                {submitting ? 'Saving...' : editingId ? 'Update Photo' : 'Save Photo'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6 bg-white p-3.5 rounded-2xl border border-skyline-100 shadow-xs">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === 'All'
                ? 'bg-navy-950 text-white shadow-xs'
                : 'text-navy-800/70 hover:bg-skyline-50 border border-skyline-100'
            }`}
          >
            All Categories ({items.length})
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === c
                  ? 'bg-skyline-600 text-white shadow-xs'
                  : 'text-navy-800/70 hover:bg-skyline-50 border border-skyline-100'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-slate-50 border border-skyline-200 px-3 py-1.5 rounded-xl max-w-xs w-full shrink-0">
          <Search size={15} className="text-navy-800/40 shrink-0" />
          <input
            type="text"
            placeholder="Search photos..."
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

      {/* Gallery Items Grid */}
      {loading ? (
        <div className="glass-card bg-white p-12 text-center text-navy-800/60 rounded-2xl border border-skyline-100">
          <RefreshCw size={24} className="animate-spin mx-auto text-skyline-600 mb-2" />
          <p className="text-sm font-medium">Loading gallery photos from database...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="glass-card bg-white p-12 text-center border border-skyline-100 rounded-2xl">
          <ImageIcon size={36} className="mx-auto text-skyline-300 mb-3" />
          <h3 className="font-bold text-navy-900 text-base">No gallery photos found</h3>
          <p className="text-xs text-navy-800/60 mt-1 max-w-sm mx-auto">
            {search || selectedCategory !== 'All'
              ? 'No photos match your current filter. Try selecting "All Categories" or clearing the search.'
              : 'Click "+ Add New Photo" above to showcase your first cleaning job.'}
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="glass-card bg-white overflow-hidden border border-skyline-100 hover:border-skyline-300 transition-all rounded-2xl shadow-xs flex flex-col justify-between group"
            >
              {/* Photo Display */}
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title || item.category}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = '/images/living-room-cleaning.jpg';
                  }}
                />
                <span className="absolute top-2.5 left-2.5 text-[10px] font-bold bg-navy-950/80 backdrop-blur-xs text-white px-2 py-0.5 rounded-md">
                  {item.category}
                </span>
                {item.beforeImageUrl && item.afterImageUrl && (
                  <span className="absolute bottom-2.5 left-2.5 text-[10px] font-bold bg-emerald-600/90 text-white px-2 py-0.5 rounded-md shadow-xs">
                    Before / After
                  </span>
                )}
              </div>

              {/* Title & Actions */}
              <div className="p-3.5 flex flex-col justify-between flex-1">
                <div>
                  <h4 className="font-bold text-xs text-navy-950 line-clamp-1 mb-1" title={item.title || item.category}>
                    {item.title || item.category}
                  </h4>
                  <p className="text-[11px] text-navy-800/50 font-mono truncate">{item.imageUrl}</p>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-skyline-100 text-xs font-semibold">
                  <button
                    onClick={() => startEdit(item)}
                    className="inline-flex items-center gap-1 text-skyline-600 hover:text-skyline-700 transition-colors p-1"
                    title="Edit item"
                  >
                    <Edit2 size={13} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => remove(item._id)}
                    className="inline-flex items-center gap-1 text-red-500 hover:text-red-700 transition-colors p-1"
                    title="Delete item"
                  >
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryAdmin;
