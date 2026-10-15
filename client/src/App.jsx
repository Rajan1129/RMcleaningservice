import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import About from './pages/About';
import WhyChooseUs from './pages/WhyChooseUs';
import GalleryPage from './pages/GalleryPage';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import LocationLandingPage from './pages/LocationLandingPage';

import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ServicesAdmin from './pages/admin/ServicesAdmin';
import LocationsAdmin from './pages/admin/LocationsAdmin';
import ReviewsAdmin from './pages/admin/ReviewsAdmin';
import EnquiriesAdmin from './pages/admin/EnquiriesAdmin';
import GalleryAdmin from './pages/admin/GalleryAdmin';
import FaqsAdmin from './pages/admin/FaqsAdmin';
import BusinessInfoAdmin from './pages/admin/BusinessInfoAdmin';

function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/why-choose-us" element={<WhyChooseUs />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/contact" element={<Contact />} />

        {/* Dedicated High-Value SEO Ranking Landing Pages */}
        <Route
          path="/cleaning-service-in-mohali"
          element={<LocationLandingPage key="mohali" defaultSlug="cleaning-service-in-mohali" />}
        />
        <Route
          path="/cleaning-service-in-zirakpur"
          element={<LocationLandingPage key="zirakpur" defaultSlug="cleaning-service-in-zirakpur" />}
        />
        <Route
          path="/cleaning-service-in-tricity"
          element={<LocationLandingPage key="tricity" defaultSlug="cleaning-service-in-tricity" />}
        />
        <Route
          path="/cleaning-service-near-me"
          element={<LocationLandingPage key="near-me" defaultSlug="cleaning-service-near-me" />}
        />
        <Route
          path="/cleaning-service-in-chandigarh"
          element={<LocationLandingPage key="chandigarh" defaultSlug="cleaning-service-in-chandigarh" />}
        />
        <Route
          path="/cleaning-service-in-kharar"
          element={<LocationLandingPage key="kharar" defaultSlug="cleaning-service-in-kharar" />}
        />
        <Route
          path="/cleaning-service-in-panchkula"
          element={<LocationLandingPage key="panchkula" defaultSlug="cleaning-service-in-panchkula" />}
        />
        <Route
          path="/cleaning-service-in-panchkulla"
          element={<LocationLandingPage key="panchkulla" defaultSlug="cleaning-service-in-panchkula" />}
        />
        <Route
          path="/cleaning-service-in-sas-nagar"
          element={<LocationLandingPage key="sas-nagar" defaultSlug="cleaning-service-in-sas-nagar" />}
        />

        {/* Photo Gallery Public Aliases */}
        <Route path="/photo-gallery" element={<GalleryPage />} />

        {/* Dynamic Route for Any New Custom Admin-Created Location Pages */}
        <Route path="/location/:locationSlug" element={<LocationLandingPage />} />

        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin Panel */}
      <Route path="/admin/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="services" element={<ServicesAdmin />} />
        <Route path="locations" element={<LocationsAdmin />} />
        <Route path="reviews" element={<ReviewsAdmin />} />
        <Route path="enquiries" element={<EnquiriesAdmin />} />
        <Route path="gallery" element={<GalleryAdmin />} />
        <Route path="photo-gallery" element={<GalleryAdmin />} />
        <Route path="photos" element={<GalleryAdmin />} />
        <Route path="faqs" element={<FaqsAdmin />} />
        <Route path="business-info" element={<BusinessInfoAdmin />} />
      </Route>
    </Routes>
  );
}

export default App;
