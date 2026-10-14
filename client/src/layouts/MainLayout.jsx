import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { WhatsAppFloatingButton } from '../components/WhatsAppButton';

const MainLayout = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
    <WhatsAppFloatingButton />
  </div>
);

export default MainLayout;
