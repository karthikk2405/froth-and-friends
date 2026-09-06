import React, { useState } from 'react';
import { Coffee, ArrowRight, Instagram, MapPin, Clock, Heart, Check, Phone, MessageCircle } from 'lucide-react';
import { FrothLogo } from './FrothLogo';
import { PHONE_NUMBER, WHATSAPP_LINK, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/cafeData';

interface FooterProps {
  onNavigate?: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#141512] text-[#F3F4ED] border-t-2 border-[#141512] pt-14 pb-24 md:pb-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-10 border-b border-[#2A2B24]">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <FrothLogo size="lg" variant="light" />

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Vijayawada's favorite social café & bistro. Handcrafted estate coffees from ₹89, thick monster shakes, loaded cheesy fries, sizzling pizzas, and unforgettable times with your favorite friends.
            </p>

            <div className="pt-2 text-xs text-stone-300 space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4E72B] shrink-0 mt-0.5" />
                <span>
                  <strong>Ramavarappadu Flagship:</strong> Near Fun Times Club, Maruti Cooperative Colony, Vijayawada 521108
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4E72B] shrink-0 mt-0.5" />
                <span>
                  <strong>Benz Circle Hub:</strong> Vasavi Nagar Road, Patamata, Vijayawada 520010
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D4E72B] shrink-0" />
                <span>Open Everyday: 10:30 AM – 11:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4E72B] shrink-0" />
                <a href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`} className="font-mono font-bold text-white hover:text-[#D4E72B]">
                  {PHONE_NUMBER}
                </a>
              </div>
            </div>
          </div>

          {/* Froth Club Newsletter & Offers */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs uppercase tracking-wider text-[#D4E72B] font-brand font-black block">
              The Froth Club
            </span>
            <h4 className="font-brand text-xl font-bold text-white">
              Get 10% Off Your First Visit & Birthday Treats
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed font-normal">
              Sign up for student discount codes, weekend game night invites, and exclusive new shake drops.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md pt-1">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your phone or email"
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#20221B] border border-[#35382D] text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-[#D4E72B]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-[#D4E72B] hover:bg-[#C2D622] text-[#141512] text-xs font-brand font-black transition-colors flex items-center gap-1 shrink-0"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Joined</span>
                  </>
                ) : (
                  <>
                    <span>Join Club</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick Connect & WhatsApp */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs uppercase tracking-wider text-[#D4E72B] font-brand font-black block">
              Quick Connect
            </span>

            <div className="flex flex-col gap-2">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-white text-xs font-brand font-bold flex items-center justify-between hover:opacity-95 transition-opacity shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-white" />
                  <span>Instagram {INSTAGRAM_HANDLE}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-90" />
              </a>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#25D366] text-white text-xs font-brand font-bold flex items-center gap-2 hover:brightness-105 transition-all shadow-xs"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`}
                className="p-2.5 rounded-xl bg-[#20221B] border border-[#35382D] text-white text-xs font-brand font-bold flex items-center gap-2 hover:bg-[#2A2D22] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#D4E72B]" />
                <span>Direct Call: {PHONE_NUMBER}</span>
              </a>

              <div className="pt-2 text-[11px] text-stone-400 space-y-1">
                <span className="block font-semibold text-stone-300">Food Partners:</span>
                <span>Order on Swiggy & Zomato Vijayawada</span>
              </div>
            </div>
          </div>

        </div>

        {/* Quick Page Links */}
        {onNavigate && (
          <div className="py-4 border-b border-[#2A2B24] flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-brand font-semibold text-stone-300">
            {[
              { id: 'home', label: 'Home & Top 10 Bestsellers' },
              { id: 'menu', label: 'Full Menu & Prices' },
              { id: 'reserve', label: 'Book Table' },
              { id: 'locations', label: 'Outlets & Directions' },
              { id: 'story', label: 'Duplex Villa Story' },
            ].map((page) => (
              <button
                key={page.id}
                onClick={() => {
                  onNavigate(page.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-[#D4E72B] transition-colors"
              >
                {page.label}
              </button>
            ))}
          </div>
        )}

        {/* Subfooter */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
          <div>
            © {new Date().getFullYear()} Froth & Friends Vijayawada. All rights reserved.
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <span>Ramavarappadu</span>
            <span>•</span>
            <span>Benz Circle</span>
            <span>•</span>
            <span className="text-[#D4E72B] font-mono font-bold">+91 97059 81111</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
