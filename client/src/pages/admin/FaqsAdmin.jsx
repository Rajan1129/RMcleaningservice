import { useEffect, useState } from 'react';
import { Trash2, Plus, Edit2, X, HelpCircle, Search, RefreshCw, CheckCircle2, ArrowUpDown } from 'lucide-react';
import apiClient from '../../services/api';

const emptyForm = { question: '', answer: '', order: 0 };

const FaqsAdmin = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [msg, setMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/faqs');
      setFaqs(res.data?.data || []);
    } catch (err) {
      console.error('Failed to load FAQs:', err);
      setMsg('Error loading FAQs. Check network connection.');
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
    setForm((f) => ({
      ...f,
      [name]: name === 'order' ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingId) {
        await apiClient.put(`/faqs/${editingId}`, form);
        showNotification('FAQ updated successfully!');
      } else {
        await apiClient.post('/faqs', form);
        showNotification('New FAQ added successfully!');
      }
      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
      await load();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving FAQ');
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (faq) => {
    setForm({
      question: faq.question || '',
      answer: faq.answer || '',
      order: faq.order ?? 0,
    });
    setEditingId(faq._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const remove = async (id) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      await apiClient.delete(`/faqs/${id}`);
      showNotification('FAQ deleted successfully.');
      await load();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete FAQ');
    }
  };

  const filteredFaqs = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-900 flex items-center gap-2">
            <HelpCircle size={26} className="text-skyline-600" />
            Website FAQs Management
          </h1>
          <p className="text-sm text-navy-800/60 mt-0.5">
            Add, update, or remove questions that appear on the homepage and customer FAQ sections.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={load}
            className="p-2.5 rounded-xl border border-skyline-200 text-navy-700 hover:bg-skyline-50 transition-colors"
            title="Reload FAQs"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingId(null);
              setForm({ ...emptyForm, order: faqs.length + 1 });
            }}
            className="btn-primary !py-2.5 text-sm"
          >
            <Plus size={16} /> Add FAQ
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
              {editingId ? 'Edit FAQ Item' : 'Create New FAQ Item'}
            </h3>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="p-1.5 rounded-lg text-navy-800/60 hover:bg-slate-100 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">
                Question <span className="text-red-500">*</span>
              </label>
              <input
                name="question"
                placeholder="e.g. Do your staff bring their own machines and supplies?"
                value={form.question}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-skyline-200 px-4 py-2.5 text-sm focus:outline-skyline-500 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">
                Answer <span className="text-red-500">*</span>
              </label>
              <textarea
                name="answer"
                placeholder="e.g. Yes, our team arrives fully equipped with single-disc floor scrubbers, vacuum machines, and eco-friendly cleaning agents."
                value={form.answer}
                onChange={handleChange}
                required
                rows={4}
                className="w-full rounded-xl border border-skyline-200 px-4 py-2.5 text-sm focus:outline-skyline-500 bg-white"
              />
            </div>

            <div className="w-48">
              <label className="block text-xs font-bold text-navy-900 mb-1 flex items-center gap-1">
                <ArrowUpDown size={13} /> Display Order
              </label>
              <input
                type="number"
                name="order"
                value={form.order}
                onChange={handleChange}
                className="w-full rounded-xl border border-skyline-200 px-4 py-2 text-sm focus:outline-skyline-500 bg-white"
              />
              <p className="text-[11px] text-navy-800/50 mt-0.5">Lower numbers display first (1, 2, 3...)</p>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-skyline-100">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-xl border border-skyline-200 text-sm font-semibold text-navy-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button type="submit" disabled={submitting} className="btn-primary !py-2 text-sm">
                {submitting ? 'Saving...' : editingId ? 'Update FAQ' : 'Save FAQ'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search Bar */}
      <div className="flex items-center gap-3 mb-6 bg-white p-3 rounded-xl border border-skyline-100 shadow-xs max-w-md">
        <Search size={16} className="text-navy-800/40 shrink-0" />
        <input
          type="text"
          placeholder="Search FAQs by question or answer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-sm outline-none bg-transparent text-navy-900 placeholder:text-navy-800/40"
        />
        {search && (
          <button onClick={() => setSearch('')} className="text-xs text-navy-800/50 hover:text-navy-900">
            Clear
          </button>
        )}
      </div>

      {/* FAQs List */}
      {loading ? (
        <div className="glass-card bg-white p-12 text-center text-navy-800/60">
          <RefreshCw size={24} className="animate-spin mx-auto text-skyline-600 mb-2" />
          <p className="text-sm font-medium">Loading FAQs from database...</p>
        </div>
      ) : filteredFaqs.length === 0 ? (
        <div className="glass-card bg-white p-12 text-center border border-skyline-100">
          <HelpCircle size={36} className="mx-auto text-skyline-300 mb-3" />
          <h3 className="font-bold text-navy-900 text-base">No FAQs found</h3>
          <p className="text-xs text-navy-800/60 mt-1 max-w-sm mx-auto">
            {search ? 'Try clearing your search query.' : 'Click "+ Add FAQ" above to create your first question and answer.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredFaqs.map((f, idx) => (
            <div
              key={f._id || idx}
              className="glass-card bg-white p-5 flex flex-col sm:flex-row items-start justify-between gap-4 border border-skyline-100 hover:border-skyline-300 transition-all shadow-xs"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-bold bg-skyline-50 text-skyline-700 px-2 py-0.5 rounded-md border border-skyline-200">
                    Order: {f.order ?? idx + 1}
                  </span>
                  <h4 className="font-bold text-navy-950 text-sm sm:text-base">{f.question}</h4>
                </div>
                <p className="text-xs sm:text-sm text-navy-800/75 leading-relaxed pl-1">{f.answer}</p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0 pt-2 sm:pt-0">
                <button
                  onClick={() => startEdit(f)}
                  className="p-2 text-skyline-600 hover:bg-skyline-50 rounded-lg transition-colors border border-skyline-100"
                  title="Edit FAQ"
                >
                  <Edit2 size={15} />
                </button>
                <button
                  onClick={() => remove(f._id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-red-100"
                  title="Delete FAQ"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FaqsAdmin;
