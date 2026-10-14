import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getIcon } from '../utils/iconMap';
import WhatsAppButton from './WhatsAppButton';
import { serviceWhatsappMessage } from '../utils/business';

const ServiceCard = ({ service }) => {
  const Icon = getIcon(service.icon);
  const imageUrl = service.image || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop';

  return (
    <div className="group glass-card overflow-hidden flex flex-col hover:shadow-glass-lg hover:-translate-y-1.5 transition-all duration-300 bg-white border border-skyline-100">
      {/* Service Image Header */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-skyline-50">
        <img
          src={imageUrl}
          alt={service.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        {/* Floating Icon Badge */}
        <div className="absolute bottom-3 left-3 h-10 w-10 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center text-skyline-600 shadow-glass">
          <Icon size={20} />
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-navy-950 mb-2 group-hover:text-skyline-600 transition-colors">
          {service.title}
        </h3>
        <p className="text-sm text-navy-800/70 leading-relaxed mb-6 flex-1">
          {service.shortDescription}
        </p>

        <div className="pt-4 border-t border-skyline-50 flex items-center justify-between gap-3">
          <Link
            to={`/services/${service.slug}`}
            className="inline-flex items-center gap-1.5 text-skyline-600 font-bold text-sm hover:text-skyline-700 transition-colors"
          >
            Learn More <ArrowRight size={15} />
          </Link>
          <WhatsAppButton
            message={serviceWhatsappMessage(service.title)}
            label="Get Quote"
            className="!px-3.5 !py-2 text-xs !rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
