import React, { useState } from 'react';
import { ShoppingBag, Calendar, Phone, MessageCircle, Instagram, Menu, X, MapPin, Sparkles } from 'lucide-react';
import { FrothLogo } from './FrothLogo';
import { PHONE_NUMBER, WHATSAPP_LINK, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/cafeData';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenReserve: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  onOpenReserve,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu & Prices' },
    { id: 'reserve', label: 'Book Table' },
    { id: 'locations', label: 'Outlets' },
    { id: 'story', label: 'Our Story' },
  ];

  return (
    <>
      {/* Top Notification & Quick Contact Bar */}
      <div className="bg-[#141512] text-[#F3F4ED] text-[11px] sm:text-xs font-medium py-1.5 px-3 sm:px-6 flex items-center justify-between border-b border-[#292A24]">
        <div className="flex items-center gap-2 overflow-hidden truncate">
          <span className="inline-flex items-center gap-1.5 text-[#D4E72B] font-semibold shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#D4E72B] animate-ping"></span>
            Open Daily: 10:30 AM – 11:00 PM
          </span>
          <span className="hidden md:inline text-stone-500">•</span>
          <span className="hidden md:inline text-stone-300 truncate">
            📍 Ramavarappadu (Near Fun Times Club) & Benz Circle, Vijayawada
          </span>
        </div>

        {/* Quick Dial & WhatsApp Links */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <a
            href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`}
            className="flex items-center gap-1 text-stone-200 hover:text-[#D4E72B] transition-colors font-medium"
            title="Call Froth & Friends Vijayawada"
          >
            <Phone className="w-3 h-3 text-[#D4E72B]" />
            <span className="font-mono tracking-tight">{PHONE_NUMBER}</span>
          </a>

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-[#25D366] hover:brightness-110 transition-all font-semibold"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-[#25D366] text-transparent" />
            <span>WhatsApp</span>
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1 text-[#F3F4ED] hover:text-[#E1306C] transition-colors font-semibold"
            title="Follow Froth & Friends on Instagram"
          >
            <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
            <span className="font-mono text-[11px]">{INSTAGRAM_HANDLE}</span>
          </a>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#FBFBF6]/95 backdrop-blur-md border-b border-[#E8E8DC] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div 
            onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="cursor-pointer group flex items-center select-none"
            id="nav-brand-logo"
          >
            <FrothLogo size="md" />
            <div className="hidden lg:flex flex-col ml-3 pl-3 border-l border-[#DFE0D2] text-[10px] text-stone-500 uppercase tracking-widest font-semibold">
              <span>Specialty Café</span>
              <span className="text-[#141512] font-bold">Vijayawada</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => {
                    setActiveTab(link.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-3.5 py-2 text-sm font-brand font-semibold rounded-full transition-all relative ${
                    isActive 
                      ? 'text-[#141512] bg-[#E8EDB8] border border-[#D4E72B]/60 shadow-xs' 
                      : 'text-[#4A4B42] hover:text-[#141512] hover:bg-[#F2F3E7]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#141512]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Table Reserve CTA */}
            <button
              onClick={() => {
                setActiveTab('reserve');
                onOpenReserve();
              }}
              id="book-table-nav-btn"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-brand font-bold rounded-full bg-[#D4E72B] text-[#141512] hover:bg-[#C2D622] transition-colors border border-[#141512]/20 shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Table</span>
            </button>

            {/* Bag / Cart Button */}
            <button
              onClick={onOpenCart}
              id="open-cart-btn"
              className="relative p-2.5 rounded-full bg-[#141512] text-[#F3F4ED] hover:bg-[#2A2B24] transition-all flex items-center gap-2 shadow-sm"
              aria-label="View order bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#D4E72B]" />
              <span className="text-xs font-bold font-mono">
                {cartCount > 0 ? (
                  <span className="bg-[#D4E72B] text-[#141512] text-[11px] px-1.5 py-0.5 rounded-full font-black">
                    {cartCount}
                  </span>
                ) : (
                  <span className="hidden sm:inline text-xs text-stone-300">Order</span>
                )}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              className="md:hidden p-2.5 rounded-full text-[#141512] hover:bg-[#EEF0E0] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FBFBF6] border-b border-[#E2E3D4] px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-full text-left px-4 py-3 rounded-2xl text-base font-brand font-bold flex items-center justify-between ${
                  activeTab === link.id
                    ? 'bg-[#141512] text-[#D4E72B]'
                    : 'text-[#2D2E26] hover:bg-[#EFF1DF]'
                }`}
              >
                <span>{link.label}</span>
                <span className="text-xs opacity-70 font-mono">
                  0{navLinks.indexOf(link) + 1}
                </span>
              </button>
            ))}

            <div className="pt-3 border-t border-[#E2E3D4] grid grid-cols-3 gap-2">
              <a
                href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`}
                className="py-2.5 px-2 rounded-xl bg-white border border-[#DFE0D2] text-[11px] font-bold flex flex-col items-center justify-center gap-1 text-[#141512]"
              >
                <Phone className="w-3.5 h-3.5 text-[#889B00]" />
                Call Cafe
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-2 rounded-xl bg-[#25D366] text-white text-[11px] font-bold flex flex-col items-center justify-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                WhatsApp
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-2 rounded-xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white text-[11px] font-bold flex flex-col items-center justify-center gap-1"
              >
                <Instagram className="w-3.5 h-3.5 text-white" />
                Instagram
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Sticky Thumb Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FBFBF6]/95 backdrop-blur-md border-t border-[#E2E3D4] px-2 py-1.5 flex items-center justify-around shadow-lg">
        <button
          onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-brand font-bold transition-colors ${
            activeTab === 'home' ? 'text-[#141512]' : 'text-stone-500'
          }`}
        >
          <Sparkles className={`w-5 h-5 mb-0.5 ${activeTab === 'home' ? 'text-[#B8CC16]' : 'text-stone-400'}`} />
          Home
        </button>
        <button
          onClick={() => { setActiveTab('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-brand font-bold transition-colors ${
            activeTab === 'menu' ? 'text-[#141512]' : 'text-stone-500'
          }`}
        >
          <span className="text-sm leading-none mb-0.5">☕</span>
          Menu
        </button>
        <button
          onClick={() => { setActiveTab('reserve'); onOpenReserve(); }}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-brand font-bold transition-colors ${
            activeTab === 'reserve' ? 'text-[#141512]' : 'text-stone-500'
          }`}
        >
          <Calendar className={`w-5 h-5 mb-0.5 ${activeTab === 'reserve' ? 'text-[#B8CC16]' : 'text-stone-400'}`} />
          Book Table
        </button>
        <button
          onClick={() => setActiveTab('locations')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-brand font-bold transition-colors ${
            activeTab === 'locations' ? 'text-[#141512]' : 'text-stone-500'
          }`}
        >
          <MapPin className={`w-5 h-5 mb-0.5 ${activeTab === 'locations' ? 'text-[#B8CC16]' : 'text-stone-400'}`} />
          Outlets
        </button>
        <button
          onClick={onOpenCart}
          className="relative flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-brand font-bold text-[#141512]"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5 text-[#141512]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#D4E72B] text-[#141512] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-black border border-[#141512]">
                {cartCount}
              </span>
            )}
          </div>
          Order ({cartCount})
        </button>
      </div>
    </>
  );
};
