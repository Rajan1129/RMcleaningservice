import { useEffect, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import apiClient from '../services/api';
import { BUSINESS } from '../utils/business';

const MapSection = () => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    apiClient
      .get('/business-info')
      .then((res) => setInfo(res.data.data))
      .catch(() => setInfo(null));
  }, []);

  const mapEmbedUrl = info?.mapEmbedUrl || BUSINESS.mapEmbedUrl;
  const directionsUrl = info?.googleMapsUrl || BUSINESS.googleMapsUrl;

  return (
    <div className="glass-card bg-white overflow-hidden border border-skyline-100 shadow-glass">
      {mapEmbedUrl ? (
        <iframe
          title="R M Home Cleaning Location"
          src={mapEmbedUrl}
          width="100%"
          height="320"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="h-64 flex flex-col items-center justify-center bg-skyline-50 text-navy-800/60 text-sm text-center px-6">
          <MapPin size={28} className="text-skyline-500 mb-2" />
          Map will appear here once the verified Google Maps location is added in the admin panel.
        </div>
      )}
      <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white">
        <div className="flex items-start gap-2.5">
          <MapPin size={18} className="text-skyline-600 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-navy-950">{info?.businessName || BUSINESS.name}</p>
            <p className="text-xs text-navy-800/80">{info?.address || BUSINESS.address}</p>
            <p className="text-[11px] text-navy-800/50 mt-0.5">Plus Code: {BUSINESS.plusCode} • Open 24 Hours</p>
          </div>
        </div>
        {directionsUrl && (
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary !py-2.5 !px-4 text-xs shrink-0"
          >
            <Navigation size={15} /> Get Directions
          </a>
        )}
      </div>
    </div>
  );
};

export default MapSection;
