import { LogOut, Menu, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const AdminNavbar = ({ onToggleMobile }) => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-white border-b border-skyline-100 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobile}
          type="button"
          className="md:hidden p-2 rounded-xl text-navy-800 hover:bg-skyline-50 border border-skyline-200"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <p className="text-xs sm:text-sm text-navy-800/70">
          Signed in as <span className="font-bold text-navy-950">{admin?.name || 'Rahul'}</span>
          <span className="hidden sm:inline text-xs text-skyline-600 bg-skyline-50 px-2 py-0.5 rounded-full ml-2 font-medium">
            Superadmin
          </span>
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-navy-700 hover:text-skyline-600 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-skyline-50"
        >
          <span>View Live Site</span>
          <ExternalLink size={13} />
        </Link>
        <button
          onClick={() => {
            logout();
            navigate('/admin/login');
          }}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100/70 px-3 py-1.5 rounded-xl transition-colors"
        >
          <LogOut size={15} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;
