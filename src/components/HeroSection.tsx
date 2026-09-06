import React from 'react';
import { ArrowRight, Phone, MessageCircle, Sparkles, MapPin, Calendar, Flame, Coffee, Heart, CheckCircle2, Star, Utensils } from 'lucide-react';
import { FrothLogo } from './FrothLogo';
import { MenuItem } from '../types';
import { PHONE_NUMBER, WHATSAPP_LINK } from '../data/cafeData';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onOpenReserve: () => void;
  onSelectItem: (item: MenuItem) => void;
  featuredItems: MenuItem[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreMenu,
  onOpenReserve,
  onSelectItem,
  featuredItems,
}) => {
  // Select top favorite items to highlight
  const spotlightItems = featuredItems.filter(
    (item) => item.id === 'c-6' || item.id === 's-3' || item.id === 'nv-1' || item.id === 'm-4'
  );

  return (
    <section className="relative overflow-hidden pt-4 pb-12 lg:py-16 border-b border-[#E8E8DC]">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4E72B]/15 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#FFE74C]/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Ticker Bar */}
        <div className="mb-6 flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF0C2] border border-[#D4E72B]/60 text-xs font-brand font-bold text-[#141512]">
            <span className="w-2 h-2 rounded-full bg-[#B9CE14] animate-ping" />
            <span>Vijayawada's #1 Social Café & Bistro</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#DFE0D2] text-xs text-stone-600 font-medium shadow-2xs">
            <MapPin className="w-3.5 h-3.5 text-[#B9CE14]" />
            <span>Ramavarappadu (Near Fun Times Club) • Benz Circle</span>
          </div>
        </div>

        {/* Hero Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Energetic Headline & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FrothLogo variant="badge" />
                <span className="text-xs uppercase tracking-[0.2em] font-extrabold text-[#707560]">
                  Specialty Coffee & Kitchen
                </span>
              </div>

              <h1 className="font-brand text-4xl sm:text-5xl lg:text-6xl text-[#141512] font-black leading-[1.08] tracking-tight">
                Where Great <span className="bg-[#D4E72B] px-2 py-0.5 rounded-xl border border-[#141512] shadow-[3px_3px_0px_#141512]">Froth</span> Meets Your Best <span className="underline decoration-[#D4E72B] decoration-wavy decoration-3 underline-offset-4">Friends.</span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-[#3E4034] leading-relaxed max-w-2xl font-normal">
              From our famous <strong>₹89 single-origin espressos</strong> and <strong>silky cappuccinos</strong> to <strong>monster Oreo shakes</strong>, <strong>loaded cheesy kheema fries</strong>, and sizzling pizzas. The warmest vibe in Vijayawada for conversations, birthdays, study dates, and unforgettable hangouts.
            </p>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onExploreMenu}
                id="hero-order-menu-btn"
                className="px-6 py-3.5 rounded-full bg-[#141512] text-[#F3F4ED] text-sm font-brand font-bold hover:bg-[#2B2C24] transition-all flex items-center gap-2.5 shadow-md group border border-[#141512]"
              >
                <span>Explore Menu & Order</span>
                <ArrowRight className="w-4 h-4 text-[#D4E72B] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenReserve}
                id="hero-reserve-table-btn"
                className="px-6 py-3.5 rounded-full bg-[#D4E72B] text-[#141512] text-sm font-brand font-black hover:bg-[#C2D622] transition-colors flex items-center gap-2 border border-[#141512] shadow-[2px_2px_0px_#141512]"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Table</span>
              </button>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3.5 rounded-full bg-white text-[#141512] border border-[#DFE0D2] text-sm font-medium hover:border-[#25D366] hover:text-[#25D366] transition-colors flex items-center gap-2 shadow-2xs"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                <span className="font-mono text-xs font-semibold">+91 97059 81111</span>
              </a>
            </div>

            {/* Key Features Badges */}
            <div className="pt-4 border-t border-[#E8E8DC] grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="space-y-0.5">
                <span className="text-base sm:text-lg font-brand font-black text-[#141512] block">
                  ₹89 to ₹289
                </span>
                <span className="text-[11px] text-[#6E735F] uppercase font-bold tracking-wider">
                  Pocket Friendly
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="text-base sm:text-lg font-brand font-black text-[#141512] flex items-center gap-1">
                  <span>4.7</span>
                  <span className="text-amber-400">★</span>
                </span>
                <span className="text-[11px] text-[#6E735F] uppercase font-bold tracking-wider">
                  1,200+ Reviews
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="text-base sm:text-lg font-brand font-black text-[#141512] block">
                  10:30A – 11P
                </span>
                <span className="text-[11px] text-[#6E735F] uppercase font-bold tracking-wider">
                  Open Everyday
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="text-base sm:text-lg font-brand font-black text-[#141512] block">
                  Pet Friendly
                </span>
                <span className="text-[11px] text-[#6E735F] uppercase font-bold tracking-wider">
                  & Free High-Speed WiFi
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Signature Froth & Friends Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-white rounded-3xl p-5 sm:p-6 border-2 border-[#141512] shadow-[6px_6px_0px_#141512]">
              
              {/* Floating Badge */}
              <div className="absolute -top-3.5 -right-3.5 bg-[#D4E72B] text-[#141512] px-3.5 py-1 rounded-full text-xs font-brand font-black border-2 border-[#141512] shadow-xs flex items-center gap-1.5 z-20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Vijayawada's #1 Social Café</span>
              </div>

              {/* Cafe Photography Showcase */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-radial from-[#FBFDF5] to-[#E9EED0] border border-[#DFE0D2] shadow-inner group">
                <img
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
                  alt="Froth & Friends Signature Rosetta Latte Art and Specialty Coffee"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141512]/90 via-[#141512]/20 to-transparent" />

                {/* Overlaid Brand Tag & Rating */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <div className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-stone-200 shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#D4E72B] ring-2 ring-[#8C9C00]/40 animate-pulse" />
                    <span className="text-[11px] font-brand font-extrabold text-[#141512]">Araku Single-Origin</span>
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <div>
                    <span className="text-xs font-brand font-black block text-[#D4E72B]">
                      Hand-Poured Rosetta Latte
                    </span>
                    <span className="text-[11px] text-stone-200 font-medium">
                      Freshly roasted & steamed micro-foam
                    </span>
                  </div>

                  <div className="bg-[#141512]/80 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/20 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-[#D4E72B] text-[#D4E72B]" />
                    <span className="text-xs font-brand font-bold">4.9</span>
                  </div>
                </div>
              </div>

              {/* Quick Best Sellers Mini Strip */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-brand font-extrabold text-[#757A66] uppercase tracking-wider block">
                    Spotlight Favorites:
                  </span>
                  <button
                    onClick={onExploreMenu}
                    className="text-[11px] font-brand font-bold text-[#8A9C00] hover:underline"
                  >
                    View All →
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {spotlightItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onSelectItem(item)}
                      className="p-2 rounded-xl bg-[#FBFBF6] border border-[#DFE0D2] hover:border-[#D4E72B] hover:bg-[#F3F6D8] transition-all flex items-center gap-2 text-left group"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-xs font-brand font-bold text-[#141512] truncate block group-hover:text-black">
                          {item.name}
                        </span>
                        <span className="text-xs font-mono font-black text-[#141512]">
                          ₹{item.price}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct Call / Contact Banner inside card */}
              <div className="mt-4 pt-3 border-t border-[#E8E8DC] flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-stone-600">
                  <Phone className="w-3.5 h-3.5 text-[#B9CE14]" />
                  <span>Call to Order:</span>
                </div>
                <a
                  href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`}
                  className="font-mono font-bold text-[#141512] hover:underline"
                >
                  {PHONE_NUMBER}
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
