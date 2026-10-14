import { useEffect, useState } from 'react';
import apiClient from '../services/api';

const categories = [
  'All',
  'Full Home Cleaning',
  'Kitchen Cleaning',
  'Bathroom Cleaning',
  'Sofa & Carpet',
  'Floor Polishing',
  'Glass & Window Cleaning',
];

const fallbackGallery = [
  {
    _id: 'sample-1',
    category: 'Full Home Cleaning',
    title: 'Living Room Deep Cleaning',
    imageUrl: '/images/living-room-cleaning.jpg',
  },
  {
    _id: 'sample-2',
    category: 'Kitchen Cleaning',
    title: 'Modular Kitchen Degreasing',
    imageUrl: '/images/kitchen-cleaning.jpg',
  },
  {
    _id: 'sample-3',
    category: 'Bathroom Cleaning',
    title: 'Bathroom Descaling & Sanitizing',
    imageUrl: '/images/bathroom-cleaning.jpg',
  },
  {
    _id: 'sample-4',
    category: 'Sofa & Carpet',
    title: 'Fabric Sofa Detailing',
    imageUrl: '/images/sofa-cleaning.jpg',
  },
  {
    _id: 'sample-5',
    category: 'Floor Polishing',
    title: 'Marble Floor Single Disc Scrubbing',
    imageUrl: '/images/floor-scrubbing.jpg',
  },
  {
    _id: 'sample-6',
    category: 'Glass & Window Cleaning',
    title: 'Streak-Free Balcony Window Cleaning',
    imageUrl: '/images/window-glass-cleaning.jpg',
  },
  {
    _id: 'sample-7',
    category: 'Full Home Cleaning',
    title: 'Balcony Washing & Mopping',
    imageUrl: '/images/balcony-cleaning.jpg',
  },
  {
    _id: 'sample-8',
    category: 'Full Home Cleaning',
    title: 'Ceiling Fan & Fixtures Cleaning',
    imageUrl: '/images/move-in-cleaning.jpg',
  },
];

const Gallery = () => {
  const [active, setActive] = useState('All');
  const [items, setItems] = useState(fallbackGallery);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get('/gallery', { params: { category: active } })
      .then((res) => {
        if (res.data.data?.length) {
          setItems(res.data.data);
        } else {
          const filtered = active === 'All' ? fallbackGallery : fallbackGallery.filter((f) => f.category === active);
          setItems(filtered);
        }
      })
      .catch(() => {
        const filtered = active === 'All' ? fallbackGallery : fallbackGallery.filter((f) => f.category === active);
        setItems(filtered);
      })
      .finally(() => setLoading(false));
  }, [active]);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2.5 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
              active === cat ? 'bg-skyline-600 text-white shadow-sm' : 'bg-skyline-50 text-navy-800/70 hover:bg-skyline-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {items.map((item) => (
          <div key={item._id} className="break-inside-avoid rounded-2xl overflow-hidden shadow-glass bg-white border border-skyline-100 group">
            <div className="relative overflow-hidden aspect-[4/3]">
              <img
                src={item.imageUrl}
                alt={item.title || item.category}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-4 flex items-center justify-between bg-white">
              <span className="font-semibold text-sm text-navy-950">{item.title || item.category}</span>
              <span className="text-xs bg-skyline-50 text-skyline-700 px-2.5 py-1 rounded-full font-medium">
                {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
