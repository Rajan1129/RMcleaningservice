import { useEffect, useState } from 'react';
import { Star, ExternalLink, CheckCircle2, MessageCircle, MapPin, Navigation, Heart, ShieldCheck } from 'lucide-react';
import apiClient from '../services/api';
import CTASection from '../components/CTASection';
import SEO from '../components/SEO';
import { BUSINESS, whatsappLink, DEFAULT_WHATSAPP_MESSAGE } from '../utils/business';
import { reviewsSummary, verifiedReviews } from '../data/reviewsData';

const Reviews = () => {
  const [businessInfo, setBusinessInfo] = useState(null);

  useEffect(() => {
    apiClient
      .get('/business-info')
      .then((res) => setBusinessInfo(res.data.data))
      .catch(() => {});
  }, []);

  const googleMapsUrl = businessInfo?.googleMapsUrl || BUSINESS.googleMapsUrl;

  return (
    <div>
      <SEO
        title="Google Reviews | 4.9★ Customer Ratings (18 Reviews)"
        description="Read 18 verified 4.9★ Google reviews for R M Home Cleaning in Sector 50, Chandigarh. Real customer feedback on deep cleaning, polite staff, and punctuality."
        canonical="/reviews"
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Google Reviews', item: '/reviews' },
        ]}
      />
      {/* 1. HEADER SECTION WITH BACKGROUND PHOTO */}
      <section className="relative py-16 bg-grid-fade border-b border-skyline-100 overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <img
            src="/images/living-room-cleaning.jpg"
            alt="Customer reviews backdrop"
            className="h-full w-full object-cover opacity-[0.24] scale-105 filter contrast-105 saturate-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/90" />
        </div>

        <div className="container-x text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4">
            <Star size={14} className="fill-amber-400 text-amber-500" />
            Verified Google Business Rating: 4.9 / 5.0 (18 Reviews)
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-navy-950 mb-4">
            Customer Reviews &amp; Ratings
          </h1>
          <p className="text-lg text-navy-800/70 mb-8 max-w-xl mx-auto">
            Real feedback from homeowners and clients across Chandigarh, Sector 50, Mohali and Tricity.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <span>View on Google Maps</span> <ExternalLink size={16} />
            </a>
            <a
              href={whatsappLink('Hello, I saw your 4.9-star reviews on Google and would like to get a quote.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <MessageCircle size={16} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* 2. SUMMARY SCORECARD WITH BACKGROUND PHOTO */}
      <section className="relative py-12 bg-white overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <img
            src="/images/sofa-cleaning.jpg"
            alt="Feedback backdrop"
            className="h-full w-full object-cover opacity-[0.20] scale-105 filter contrast-105 saturate-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/65 to-white/90" />
        </div>

        <div className="container-x">
          <div className="grid lg:grid-cols-3 gap-8 items-center bg-skyline-50/70 rounded-3xl p-8 border border-skyline-100 shadow-glass">
            {/* Score */}
            <div className="text-center lg:text-left lg:border-r border-skyline-200 lg:pr-8">
              <div className="text-6xl font-black text-navy-950 leading-none mb-3">4.9</div>
              <div className="flex justify-center lg:justify-start gap-1 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={22} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm font-semibold text-navy-900">Based on 18 Google Reviews</p>
              <p className="text-xs text-navy-800/60 mt-1">Progressive Society, Sector 50, Chandigarh</p>
            </div>

            {/* Highlights */}
            <div className="lg:col-span-2 space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-skyline-700 mb-2">Review Highlights</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {reviewsSummary.highlights.map((h, i) => (
                  <div key={i} className="glass-card bg-white p-3.5 flex items-start gap-2.5 text-xs text-navy-800/90 font-medium border border-skyline-100">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>"{h}"</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <ShieldCheck size={13} /> Open 24 Hours
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  <Heart size={13} /> LGBTQ+ Friendly
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-skyline-50 text-skyline-700 border border-skyline-200">
                  <CheckCircle2 size={13} /> Polite & Punctual Staff
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CUSTOMER REVIEWS LIST WITH BACKGROUND PHOTO */}
      <section className="relative py-12 bg-white overflow-hidden border-t border-skyline-100">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <img
            src="/images/kitchen-cleaning.jpg"
            alt="Customer reviews backdrop"
            className="h-full w-full object-cover opacity-[0.20] scale-105 filter contrast-105 saturate-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/65 to-white/90" />
        </div>

        <div className="container-x max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-navy-950">Detailed Customer Reviews</h2>
              <p className="text-sm text-navy-800/60">Verified clients who booked our cleaning services</p>
            </div>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-skyline-600 hover:underline flex items-center gap-1"
            >
              Write a review on Google <ExternalLink size={13} />
            </a>
          </div>

          <div className="space-y-6">
            {verifiedReviews.map((rev) => (
              <div key={rev.id} className="glass-card bg-white p-6 sm:p-7 space-y-4 border border-skyline-100 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="h-11 w-11 rounded-full bg-gradient-to-tr from-skyline-600 to-skyline-400 text-white font-bold flex items-center justify-center text-sm shadow-glass">
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-950 text-base">{rev.author}</h4>
                      <p className="text-xs text-navy-800/50">{rev.details} • {rev.timeAgo}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-navy-800/80 text-sm sm:text-[15px] leading-relaxed">
                  {rev.text}
                </p>

                {rev.ownerResponse && (
                  <div className="bg-skyline-50/70 border-l-4 border-skyline-500 rounded-r-xl p-3.5 text-xs text-navy-900 mt-3 space-y-1">
                    <p className="font-bold text-navy-900 flex items-center gap-1.5">
                      Response from the owner <span className="font-normal text-navy-800/50">• {rev.ownerResponseTime}</span>
                    </p>
                    <p className="text-navy-800/80">{rev.ownerResponse}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Location info box */}
          <div className="mt-12 glass-card bg-skyline-50/70 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-skyline-100">
            <div className="flex items-center gap-3">
              <MapPin size={24} className="text-skyline-600 shrink-0" />
              <div>
                <p className="font-bold text-navy-950 text-sm">R M Home Cleaning</p>
                <p className="text-xs text-navy-800/70">{BUSINESS.address} ({BUSINESS.plusCode})</p>
              </div>
            </div>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary !py-2 !px-4 text-xs shrink-0"
            >
              <Navigation size={14} /> Get Directions
            </a>
          </div>
        </div>
      </section>

      <CTASection
        title="Experience 4.9★ Rated Home Cleaning"
        subtitle="Call 096460 78122 or message us on WhatsApp to book an appointment."
      />
    </div>
  );
};

export default Reviews;
