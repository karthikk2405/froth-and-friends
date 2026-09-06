import React from 'react';
import { Sparkles, Calendar, MapPin, Users, Heart, Award, ArrowRight, Instagram, ExternalLink, Camera, Coffee, Flame } from 'lucide-react';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/cafeData';

interface VillaExperienceSectionProps {
  onOpenReserve: () => void;
  onOpenLocations: () => void;
}

export const VillaExperienceSection: React.FC<VillaExperienceSectionProps> = ({
  onOpenReserve,
  onOpenLocations,
}) => {
  return (
    <section id="villa-experience" className="py-16 sm:py-24 bg-white relative overflow-hidden border-b border-[#E8E8DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF0C2] border border-[#D4E72B]/60 text-xs font-brand font-bold text-[#141512]">
            <Sparkles className="w-3.5 h-3.5 text-[#889B00]" />
            <span>The Duplex Villa Lifestyle & Ambiance</span>
          </div>

          <h2 className="font-brand text-3xl sm:text-4xl lg:text-5xl font-black text-[#141512] tracking-tight">
            Step Inside Vijayawada's Most <br />
            <span className="bg-[#D4E72B] px-3 py-0.5 rounded-2xl border-2 border-[#141512] shadow-[4px_4px_0px_#141512] inline-block mt-1">
              Aesthetic Villa Café
            </span>
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Converted from a two-story residential duplex villa into a multi-zoned social sanctuary. Experience hand-painted botanical murals, plush ribbed velvet booths, sunlit floral corners, and celebratory suites.
          </p>
        </div>

        {/* 3 Ambiance Signature Spaces */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Space 1: The Emerald Lotus Lounge & Ribbed Velvet Booths */}
          <div className="bg-[#FBFBF6] rounded-3xl border-2 border-[#141512] shadow-[5px_5px_0px_#141512] overflow-hidden flex flex-col group hover:-translate-y-1 transition-all duration-300">
            <div className="relative aspect-[16/11] overflow-hidden bg-[#E2EBE5]">
              <img
                src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80"
                alt="Emerald Lotus Lounge with hand painted murals and plush velvet booths"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#141512] text-[#D4E72B] text-[11px] font-brand font-black px-3 py-1 rounded-full border border-[#D4E72B] shadow-xs">
                🌿 Ground Floor Sanctuary
              </div>
              <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-[#141512] text-[10px] font-bold px-2.5 py-1 rounded-lg border border-stone-200">
                Lotus Arches & Velvet
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2E7D32]"></span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#2E7D32]">Signature Architecture</span>
                </div>
                <h3 className="font-brand font-black text-xl text-[#141512]">
                  The Emerald Lotus Lounge
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Arched pale-mint wall niches adorned with hand-painted lotus ponds and egret murals, framed with plush, ribbed emerald green velvet banquettes and marble dining tables. Designed for laptop work, intimate reading, and deep conversations.
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-stone-200">
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#E8F5E9] text-[#1B5E20] border border-[#C8E6C9]">
                    Lotus Pond Murals
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#E8F5E9] text-[#1B5E20] border border-[#C8E6C9]">
                    Ribbed Velvet Booths
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#F0F0EA] text-[#141512] border border-stone-300">
                    Power Plugs Every Seat
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-stone-500 font-medium pt-1">
                  <span>Free 200 Mbps Wi-Fi</span>
                  <span className="font-bold text-[#141512]">Laptop Friendly AC</span>
                </div>
              </div>
            </div>
          </div>

          {/* Space 2: The Pastel Blush Floral Nook */}
          <div className="bg-[#FBFBF6] rounded-3xl border-2 border-[#141512] shadow-[5px_5px_0px_#141512] overflow-hidden flex flex-col group hover:-translate-y-1 transition-all duration-300">
            <div className="relative aspect-[16/11] overflow-hidden bg-[#FBECEB]">
              <img
                src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80"
                alt="Pastel Blush Floral Nook with rose garland and Mediterranean street mural"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#D4E72B] text-[#141512] text-[11px] font-brand font-black px-3 py-1 rounded-full border border-[#141512] shadow-xs">
                🌸 Date & Photo Spot
              </div>
              <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-[#E1306C] text-[10px] font-bold px-2.5 py-1 rounded-lg border border-pink-200">
                #1 Instagrammed Nook
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E1306C]"></span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#C2185B]">Aesthetic Cozy Wing</span>
                </div>
                <h3 className="font-brand font-black text-xl text-[#141512]">
                  The Pastel Blush Floral Nook
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Vijayawada's favorite romantic corner featuring classic blush-pink wainscoting, delicate draped rose garlands, a hand-painted Mediterranean alleyway watercolor mural, and dusty-rose velvet tub armchairs.
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-stone-200">
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#FCE4EC] text-[#880E4F] border border-[#F8BBD0]">
                    Hanging Rose Garland
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#FCE4EC] text-[#880E4F] border border-[#F8BBD0]">
                    Dusty Rose Velvet
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#F0F0EA] text-[#141512] border border-stone-300">
                    European Street Mural
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-stone-500 font-medium pt-1">
                  <span>Warm Golden Lighting</span>
                  <span className="font-bold text-[#E1306C]">Perfect for Reels</span>
                </div>
              </div>
            </div>
          </div>

          {/* Space 3: Private Celebration Suite */}
          <div className="bg-[#FBFBF6] rounded-3xl border-2 border-[#141512] shadow-[5px_5px_0px_#141512] overflow-hidden flex flex-col group hover:-translate-y-1 transition-all duration-300">
            <div className="relative aspect-[16/11] overflow-hidden bg-[#EBF0C2]">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                alt="Private Celebration Suite for Birthday and Friends Dinner"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#141512] text-[#D4E72B] text-[11px] font-brand font-black px-3 py-1 rounded-full border border-[#D4E72B] shadow-xs">
                ✨ First Floor Loft
              </div>
              <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-[#141512] text-[10px] font-bold px-2.5 py-1 rounded-lg border border-stone-200">
                Seats 8–25 Guests
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#889B00]"></span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#889B00]">Private Events</span>
                </div>
                <h3 className="font-brand font-black text-xl text-[#141512]">
                  Private Celebration Suite
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Celebrate birthdays, farewells, reunions, and anniversary dinners in our dedicated sound-insulated upstairs room with custom decor, warm fairy lights, personal bluetooth music control, and special chef's platters.
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-stone-200">
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#FFF9C4] text-[#F57F17] border border-[#FFF59D]">
                    Birthday Decor Ready
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#FFF9C4] text-[#F57F17] border border-[#FFF59D]">
                    Cake Prep & Table Setup
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#F0F0EA] text-[#141512] border border-stone-300">
                    Pre-Book Available
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-stone-500 font-medium pt-1">
                  <span>Zero Room Charge</span>
                  <span className="font-bold text-[#889B00]">Custom Celebration Menu</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Instagram Live Community & Reels Showcase */}
        <div className="mt-16 sm:mt-20 p-6 sm:p-10 rounded-3xl bg-[#141512] text-white border-2 border-[#141512] shadow-[6px_6px_0px_#D4E72B] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4E72B]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-[#2A2D22]">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-white text-xs font-brand font-black">
                <Instagram className="w-3.5 h-3.5" />
                <span>{INSTAGRAM_HANDLE}</span>
              </div>
              <h3 className="font-brand text-2xl sm:text-3xl font-black text-white tracking-tight">
                Captured at the Villa: Real Moments & Good Froth
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
                Tag <span className="text-[#D4E72B] font-bold">{INSTAGRAM_HANDLE}</span> in your Instagram stories, birthday posts, and reels at our Lotus Lounge or Blush Pink Nook to get featured on our live cafe screen!
              </p>
            </div>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] hover:opacity-95 text-white font-brand font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all shrink-0 self-start lg:self-center"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow {INSTAGRAM_HANDLE} on Instagram</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>
          </div>

          {/* 4 Community Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8">
            <div className="bg-[#20221B] rounded-2xl p-3 border border-[#35382D] space-y-2 hover:border-[#D4E72B]/60 transition-colors">
              <div className="aspect-square rounded-xl overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=400&q=80"
                  alt="Lotus Lounge customer photo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-xs text-[10px] font-bold text-white px-2 py-0.5 rounded-md">
                  🌿 Lotus Lounge
                </span>
              </div>
              <p className="text-[11px] text-stone-300 leading-snug">
                "The hand-painted lotus mural is stunning in person. Perfect study spot!"
              </p>
              <span className="text-[10px] font-mono text-[#D4E72B] block">@sneha_vja • Reels</span>
            </div>

            <div className="bg-[#20221B] rounded-2xl p-3 border border-[#35382D] space-y-2 hover:border-[#D4E72B]/60 transition-colors">
              <div className="aspect-square rounded-xl overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=400&q=80"
                  alt="Pastel Blush Floral Nook photo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-xs text-[10px] font-bold text-[#FCB045] px-2 py-0.5 rounded-md">
                  🌸 Floral Nook
                </span>
              </div>
              <p className="text-[11px] text-stone-300 leading-snug">
                "Obsessed with the pink wainscoting and roses. 10/10 date cafe vibes."
              </p>
              <span className="text-[10px] font-mono text-[#D4E72B] block">@ananya.b • Story</span>
            </div>

            <div className="bg-[#20221B] rounded-2xl p-3 border border-[#35382D] space-y-2 hover:border-[#D4E72B]/60 transition-colors">
              <div className="aspect-square rounded-xl overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=400&q=80"
                  alt="Barista Latte Art Pour"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-xs text-[10px] font-bold text-white px-2 py-0.5 rounded-md">
                  ☕ Silky Rosetta
                </span>
              </div>
              <p className="text-[11px] text-stone-300 leading-snug">
                "Fresh Araku beans and microfoam latte art that lasts till the final sip."
              </p>
              <span className="text-[10px] font-mono text-[#D4E72B] block">@karthik_coffee • Post</span>
            </div>

            <div className="bg-[#20221B] rounded-2xl p-3 border border-[#35382D] space-y-2 hover:border-[#D4E72B]/60 transition-colors">
              <div className="aspect-square rounded-xl overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80"
                  alt="Birthday Celebration upstairs"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-xs text-[10px] font-bold text-[#D4E72B] px-2 py-0.5 rounded-md">
                  🎂 Birthday Suite
                </span>
              </div>
              <p className="text-[11px] text-stone-300 leading-snug">
                "Celebrated Priya’s 22nd upstairs! Staff gave us custom fairy lights."
              </p>
              <span className="text-[10px] font-mono text-[#D4E72B] block">@vijayawada_crew • Post</span>
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenReserve}
            id="villa-reserve-btn"
            className="px-6 py-3.5 rounded-full bg-[#141512] text-white text-xs sm:text-sm font-brand font-bold hover:bg-[#282922] transition-colors flex items-center gap-2 border-2 border-[#141512] shadow-[4px_4px_0px_#D4E72B]"
          >
            <Calendar className="w-4 h-4 text-[#D4E72B]" />
            <span>Book Your Spot in the Villa</span>
          </button>

          <button
            onClick={onOpenLocations}
            id="villa-outlets-btn"
            className="px-6 py-3.5 rounded-full bg-white text-[#141512] text-xs sm:text-sm font-brand font-black hover:bg-[#F2F3E2] transition-colors flex items-center gap-2 border-2 border-[#141512] shadow-[4px_4px_0px_#141512]"
          >
            <MapPin className="w-4 h-4 text-[#8C9C00]" />
            <span>Directions to Ramavarappadu & Benz Circle</span>
          </button>
        </div>

      </div>
    </section>
  );
};
