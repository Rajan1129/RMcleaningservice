import { useEffect, useState } from 'react';
import { Plus, Trash2, Edit2, X, Star, MessageSquare } from 'lucide-react';
import apiClient from '../../services/api';

const emptyForm = {
  author: '',
  rating: 5,
  details: 'Local Resident · Verified Customer',
  timeAgo: 'Recently',
  text: '',
  ownerResponse: 'Thank you so much! 😊',
  isApproved: true,
};

const ReviewsAdmin = () => {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = () => {
    setLoading(true);
    apiClient
      .get('/reviews/admin/all')
      .then((res) => setReviews(res.data.data || []))
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
      if (editingId) {
        await apiClient.put(`/reviews/${editingId}`, form);
      } else {
        await apiClient.post('/reviews', form);
      }
      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving review');
    }
  };

  const startEdit = (review) => {
    setForm({
      author: review.author || '',
      rating: review.rating || 5,
      details: review.details || '',
      timeAgo: review.timeAgo || '',
      text: review.text || '',
      ownerResponse: review.ownerResponse || '',
      isApproved: review.isApproved !== false,
    });
    setEditingId(review._id);
    setShowForm(true);
  };

  const remove = async (id) => {
    if (!confirm('Delete this customer review?')) return;
    try {
      await apiClient.delete(`/reviews/${id}`);
      load();
    } catch (err) {
      alert('Failed to delete review');
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Google Reviews & Testimonials</h1>
          <p className="text-sm text-navy-800/60 mt-0.5">
            Manage reviews displayed on home, SEO location pages, and reviews section.
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
          <Plus size={16} /> Add Review
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="glass-card bg-white p-6 mb-6 space-y-4 border border-skyline-200">
          <div className="flex justify-between items-center pb-2 border-b border-skyline-100">
            <h3 className="font-bold text-navy-950">
              {editingId ? 'Edit Review & Response' : 'Add New Customer Review'}
            </h3>
            <button type="button" onClick={() => setShowForm(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">Customer Name *</label>
              <input
                name="author"
                placeholder="e.g. Gourav Verma"
                value={form.author}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-skyline-200 px-4 py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">Star Rating (1 to 5) *</label>
              <select
                name="rating"
                value={form.rating}
                onChange={handleChange}
                className="w-full rounded-xl border border-skyline-200 px-4 py-2.5 text-sm bg-white"
              >
                <option value={5}>5 Stars ★★★★★</option>
                <option value={4}>4 Stars ★★★★☆</option>
                <option value={3}>3 Stars ★★★☆☆</option>
                <option value={2}>2 Stars ★★☆☆☆</option>
                <option value={1}>1 Star ★☆☆☆☆</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">Details / Tag</label>
              <input
                name="details"
                placeholder="e.g. 1 review · 1 photo"
                value={form.details}
                onChange={handleChange}
                className="w-full rounded-xl border border-skyline-200 px-4 py-2.5 text-sm"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">Time Elapsed</label>
              <input
                name="timeAgo"
                placeholder="e.g. 2 months ago"
                value={form.timeAgo}
                onChange={handleChange}
                className="w-full rounded-xl border border-skyline-200 px-4 py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">Owner Response</label>
              <input
                name="ownerResponse"
                placeholder="e.g. Thank you so much for your appreciation! 😊"
                value={form.ownerResponse}
                onChange={handleChange}
                className="w-full rounded-xl border border-skyline-200 px-4 py-2.5 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1">Customer Review Text *</label>
            <textarea
              name="text"
              placeholder="What did the customer write?"
              value={form.text}
              onChange={handleChange}
              rows={3}
              required
              className="w-full rounded-xl border border-skyline-200 px-4 py-2.5 text-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isApproved"
              name="isApproved"
              checked={form.isApproved}
              onChange={handleChange}
              className="rounded text-skyline-600"
            />
            <label htmlFor="isApproved" className="text-xs text-navy-900 font-medium cursor-pointer">
              Approved (Show publicly on website)
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
              {editingId ? 'Update Review' : 'Save Review'}
            </button>
          </div>
        </form>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {reviews.map((rev) => (
          <div
            key={rev._id}
            className="glass-card bg-white p-5 border border-skyline-100 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating || 5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    rev.isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {rev.isApproved ? 'Visible' : 'Hidden'}
                </span>
              </div>

              <h4 className="font-bold text-navy-950 text-sm">{rev.author}</h4>
              <p className="text-[11px] text-navy-800/50 mb-2">
                {rev.details} · {rev.timeAgo}
              </p>
              <p className="text-xs text-navy-800/80 leading-relaxed mb-3">&ldquo;{rev.text}&rdquo;</p>

              {rev.ownerResponse && (
                <div className="bg-skyline-50/70 p-2.5 rounded-lg border border-skyline-100 mb-3 text-[11px] text-skyline-900">
                  <span className="font-bold block">Owner Response:</span>
                  {rev.ownerResponse}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-skyline-100">
              <button
                onClick={() => startEdit(rev)}
                className="flex items-center gap-1 text-skyline-600 text-xs font-semibold hover:text-skyline-700"
              >
                <Edit2 size={13} /> Edit
              </button>
              <button
                onClick={() => remove(rev._id)}
                className="flex items-center gap-1 text-red-500 text-xs font-semibold hover:text-red-700"
              >
                <Trash2 size={13} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsAdmin;
