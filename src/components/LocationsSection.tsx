import React, { useState } from 'react';
import { MapPin, Clock, Phone, Sparkles, Check, ExternalLink, MessageCircle, Navigation, Wifi, Award } from 'lucide-react';
import { CAFE_LOCATIONS, PHONE_NUMBER, WHATSAPP_LINK } from '../data/cafeData';
import { CafeLocation } from '../types';

export const LocationsSection: React.FC = () => {
  const [selectedLoc, setSelectedLoc] = useState<CafeLocation>(CAFE_LOCATIONS[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyAddress = (loc: CafeLocation) => {
    try {
      if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(`${loc.name}, ${loc.address}, ${loc.city}`).catch(() => {});
      }
    } catch {
      // Ignore clipboard permission restrictions
    }
    setCopiedId(loc.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="locations-section" className="py-12 lg:py-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#E8E8DC]">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF0C2] text-xs font-brand font-black text-[#141512]">
          <span>Vijayawada Outlets</span>
        </div>
        <h2 className="font-brand text-3xl sm:text-4xl lg:text-5xl text-[#141512] font-black tracking-tight">
          Drop By & Hang Out
        </h2>
        <p className="text-sm sm:text-base text-[#4F5342]">
          Whether you're chilling near Ramavarappadu's Fun Times Club or catching up near Benz Circle, Froth & Friends is your welcoming neighborhood cafe.
        </p>
      </div>

      {/* Location Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {CAFE_LOCATIONS.map((loc) => {
          const isSelected = selectedLoc.id === loc.id;
          return (
            <div
              key={loc.id}
              onClick={() => setSelectedLoc(loc)}
              className={`cursor-pointer rounded-3xl overflow-hidden border-2 transition-all duration-300 flex flex-col justify-between bg-white ${
                isSelected
                  ? 'border-[#141512] shadow-[6px_6px_0px_#141512] ring-2 ring-[#D4E72B]'
                  : 'border-[#DFE0D2] hover:border-[#141512] shadow-xs'
              }`}
            >
              {/* Header Banner */}
              <div className="p-5 bg-[#FBFBF6] border-b border-[#DFE0D2] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-brand font-black uppercase text-[#797F68] tracking-wider block">
                    {loc.area}
                  </span>
                  <h3 className="font-brand font-black text-xl text-[#141512]">
                    {loc.name}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF0C2] text-[#141512] text-xs font-brand font-bold border border-[#D4E72B]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{loc.status}</span>
                </div>
              </div>

              {/* Location Body */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2.5 text-xs text-[#3E4233] leading-relaxed">
                    <MapPin className="w-4 h-4 text-[#B9CE14] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#141512] block">{loc.address}</span>
                      <span className="text-stone-500">{loc.landmark}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs text-[#3E4233]">
                    <Clock className="w-4 h-4 text-stone-500 shrink-0" />
                    <span className="font-medium">{loc.timings}</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs text-[#3E4233]">
                    <Phone className="w-4 h-4 text-stone-500 shrink-0" />
                    <a href={`tel:${loc.phone.replace(/\s+/g, '')}`} className="font-mono font-bold hover:underline">
                      {loc.phone}
                    </a>
                  </div>

                  <p className="text-xs text-stone-600 italic bg-[#F8FAF0] p-2.5 rounded-xl border border-[#DFE2CA]">
                    "{loc.vibe}"
                  </p>
                </div>

                {/* Features Badges */}
                <div className="pt-3 border-t border-[#DFE0D2] space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {loc.features.map((feat, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-[#EFF2D8] text-[#2F3224] font-brand font-bold border border-[#DFE2CA]"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>

                  {/* Actions (Call, WhatsApp, Maps) */}
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <a
                      href={`tel:${loc.phone.replace(/\s+/g, '')}`}
                      onClick={(e) => e.stopPropagation()}
                      className="py-2 px-2.5 rounded-xl bg-white border border-[#DFE0D2] text-[#141512] hover:bg-[#F8FAF0] text-xs font-brand font-bold flex items-center justify-center gap-1 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#B9CE14]" />
                      <span>Call</span>
                    </a>

                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="py-2 px-2.5 rounded-xl bg-[#25D366] text-white text-xs font-brand font-bold flex items-center justify-center gap-1 shadow-2xs hover:brightness-105 transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      <span>WhatsApp</span>
                    </a>

                    <a
                      href={loc.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="py-2 px-2.5 rounded-xl bg-[#141512] text-[#D4E72B] text-xs font-brand font-bold flex items-center justify-center gap-1 transition-colors hover:bg-black"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Directions</span>
                    </a>
                  </div>
                </div>

              </div>

            </div>
          );
        })}
      </div>

      {/* Neighborhood Hangout Vibe Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#141512] text-white flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-[#141512] shadow-[6px_6px_0px_#D4E72B]">
        <div className="space-y-2 text-left">
          <div className="inline-flex items-center gap-2 text-xs font-brand font-bold text-[#D4E72B] uppercase tracking-wider">
            <Wifi className="w-3.5 h-3.5" />
            <span>Co-Working & Study Friendly</span>
          </div>
          <h3 className="font-brand font-black text-2xl sm:text-3xl text-white">
            Looking for a space to work, study, or host a party?
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl font-normal">
            Both our Ramavarappadu and Benz Circle outlets offer high-speed WiFi, quiet morning corners, comfortable AC booths, and full support for birthday celebrations.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <a
            href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-[#D4E72B] hover:bg-[#C2D622] text-[#141512] font-brand font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs"
          >
            <Phone className="w-4 h-4" />
            <span>Call {PHONE_NUMBER}</span>
          </a>

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-brand font-bold text-xs sm:text-sm border border-white/20 flex items-center justify-center gap-2 transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>

    </section>
  );
};
