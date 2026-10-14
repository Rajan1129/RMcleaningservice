import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/Logo';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleAutoFill = () => {
    setEmail('rahul@cleaning.com');
    setPassword('rahul@2000');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      console.error('Login error details:', err);
      if (!err.response) {
        setError('Cannot connect to backend server. Please verify your connection.');
      } else {
        setError(err.response?.data?.message || 'Invalid email or password. Please verify credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-950 px-5 py-10 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-skyline-500 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
      </div>

      <div className="glass-card bg-white w-full max-w-md p-8 sm:p-10 rounded-3xl shadow-2xl relative z-10 border border-white/20">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-extrabold text-navy-950">Admin Sign In</h1>
          <p className="text-xs text-navy-800/60 mt-1">
            Access lead management, services, SEO pages &amp; photo gallery
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs font-semibold flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1.5 flex items-center gap-1.5">
              <Mail size={13} className="text-skyline-600" />
              <span>Admin Email</span>
            </label>
            <input
              type="email"
              placeholder="rahul@cleaning.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
              className="w-full rounded-xl border border-skyline-200 bg-slate-50/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-skyline-500 text-navy-950 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1.5 flex items-center gap-1.5">
              <Lock size={13} className="text-skyline-600" />
              <span>Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full rounded-xl border border-skyline-200 bg-slate-50/50 px-4 py-3 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-skyline-500 text-navy-950 font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-800/40 hover:text-navy-900 p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full !py-3 text-sm font-bold shadow-md shadow-skyline-600/30"
          >
            {loading ? 'Authenticating...' : 'Sign In to Admin Portal'}
          </button>
        </form>

        {/* 1-Click Auto Fill Assistant */}
        <div className="mt-6 pt-5 border-t border-skyline-100/80">
          <div className="p-3 bg-skyline-50/70 rounded-2xl border border-skyline-200/70 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-navy-950 flex items-center gap-1">
                <Sparkles size={13} className="text-skyline-600" /> Authorized Credentials
              </span>
              <button
                type="button"
                onClick={handleAutoFill}
                className="text-[11px] font-bold text-skyline-700 hover:text-skyline-800 bg-white px-2.5 py-1 rounded-lg border border-skyline-200 shadow-2xs hover:bg-skyline-50 transition-colors"
              >
                1-Click Auto Fill
              </button>
            </div>
            <p className="text-[11px] text-navy-800/70 font-mono">
              Email: <span className="font-bold text-navy-950">rahul@cleaning.com</span>
            </p>
            <p className="text-[11px] text-navy-800/70 font-mono">
              Pass: <span className="font-bold text-navy-950">rahul@2000</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
