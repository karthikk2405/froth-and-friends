import React from 'react';
import { Sparkles, Heart, Coffee, Users, Smile, Award, Instagram, ArrowRight } from 'lucide-react';
import { FrothLogo } from './FrothLogo';
import { PHONE_NUMBER, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/cafeData';

export const StorySection: React.FC = () => {
  return (
    <section id="story-section" className="py-12 lg:py-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#E8E8DC]">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Visual Atmosphere */}
        <div className="lg:col-span-5 relative">
          <div className="rounded-3xl overflow-hidden aspect-[4/5] border-2 border-[#141512] shadow-[6px_6px_0px_#141512] relative bg-[#EBF0C2]">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80"
              alt="Froth & Friends cafe ambiance and friends catching up"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
            
            <div className="absolute top-4 left-4">
              <FrothLogo variant="badge" />
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="text-[10px] tracking-widest uppercase font-brand font-black text-[#D4E72B]">
                Vijayawada's Hangout Hub
              </span>
              <p className="font-brand font-black text-xl leading-snug">
                "Where great froth meets your best friends."
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Story & Philosophy */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF0C2] text-xs font-brand font-black text-[#141512]">
              <span>The Froth & Friends Philosophy</span>
            </div>
            <h2 className="font-brand text-3xl sm:text-4xl lg:text-5xl text-[#141512] font-black leading-tight tracking-tight">
              More than a Café. <br />
              <span className="bg-[#D4E72B] px-2 py-0.5 rounded-xl border border-[#141512] shadow-[2px_2px_0px_#141512]">
                A Vijayawada Feeling.
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#3E4233] leading-relaxed font-normal">
            Froth & Friends was born out of a simple desire: to give Vijayawada a vibrant, modern cafe where great coffee doesn't cost an arm and a leg, where food is bold, comforting, and portioned for sharing, and where people of all ages can stay as long as they like.
          </p>

          <p className="text-sm sm:text-base text-[#3E4233] leading-relaxed font-normal">
            Whether you are catching up after college, celebrating a friend’s birthday, working on your laptop with our high-speed WiFi, or savoring an evening coffee with loaded kheema fries, our doors at Ramavarappadu and Benz Circle are always wide open with genuine smiles.
          </p>

          {/* 4 Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#DFE0D2]">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-brand font-black text-[#141512]">
                <Coffee className="w-4 h-4 text-[#B9CE14]" />
                <span>Single-Origin Indian Beans</span>
              </div>
              <p className="text-xs text-[#5D634E]">
                Sourced from high-altitude estates in Araku Valley and Chikmagalur, roasted fresh for authentic flavor.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-brand font-black text-[#141512]">
                <Sparkles className="w-4 h-4 text-[#B9CE14]" />
                <span>Crave-Worthy Comfort Food</span>
              </div>
              <p className="text-xs text-[#5D634E]">
                From sizzling Vijayawada Chicken 65 Pizza to gourmet cheese samosas and honey chili baby corn.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-brand font-black text-[#141512]">
                <Smile className="w-4 h-4 text-[#B9CE14]" />
                <span>Zero Pressure, Warm Vibes</span>
              </div>
              <p className="text-xs text-[#5D634E]">
                Play board games, listen to upbeat lo-fi playlists, or just chill for hours with a single espresso or shake.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-brand font-black text-[#141512]">
                <Heart className="w-4 h-4 text-[#B9CE14]" />
                <span>Community & Celebrations</span>
              </div>
              <p className="text-xs text-[#5D634E]">
                Dedicated birthday corners, group seating, and custom surprise arrangements whenever you call ahead.
              </p>
            </div>
          </div>

          {/* Instagram Community Banner */}
          <div className="pt-2">
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#FBFBF6] border-2 border-[#141512] shadow-[3px_3px_0px_#141512]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-white shrink-0 shadow-xs">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-brand font-black text-[#141512] block">Follow {INSTAGRAM_HANDLE}</span>
                  <span className="text-[11px] text-stone-600">Daily stories, lotus lounge reels & celebration photos in Vijayawada</span>
                </div>
              </div>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#141512] text-white hover:bg-[#2A2B22] text-xs font-brand font-bold flex items-center gap-1.5 transition-colors shrink-0"
              >
                <span>Visit Instagram</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4E72B]" />
              </a>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
