import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react';
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
        const target = apiClient.defaults.baseURL || '/api';
        setError(`Cannot reach API server at "${target}". If this is a deployed site, please configure VITE_API_URL in your hosting dashboard with your deployed backend URL.`);
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
            Sign in to access R M Home Cleaning administrative control
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
              placeholder="name@domain.com"
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
                placeholder="••••••••"
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
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
