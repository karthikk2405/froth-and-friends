import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, Heart, Plus, ArrowRight, Flame, Check, Star, 
  ChevronLeft, ChevronRight, Play, Pause, LayoutGrid, 
  Utensils, Clock, Award, ShieldCheck, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TOP_FAVORITES, favoriteToMenuItem } from '../data/favoritesData';
import { FavoriteItem, MenuItem } from '../types';

interface FavoritesSectionProps {
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem, e: React.MouseEvent) => void;
  onExploreFullMenu: () => void;
  onViewCombos?: () => void;
}

export const FavoritesSection: React.FC<FavoritesSectionProps> = ({
  onSelectItem,
  onQuickAdd,
  onExploreFullMenu,
  onViewCombos,
}) => {
  const [filter, setFilter] = useState<'all' | 'veg' | 'nonveg' | 'starters' | 'mains' | 'drinks'>('all');
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoPlayTimerRef = useRef<any>(null);

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleQuickAddFeedback = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(item, e);
    setJustAddedId(item.id);
    setTimeout(() => {
      setJustAddedId((curr) => (curr === item.id ? null : curr));
    }, 1200);
  };

  const filteredFavorites = TOP_FAVORITES.filter((item) => {
    if (filter === 'veg') return item.isVeg;
    if (filter === 'nonveg') return !item.isVeg;
    if (filter === 'starters') return item.category === 'appetizers';
    if (filter === 'mains') return item.category === 'pizzas_pastas' || item.category === 'combos';
    if (filter === 'drinks') return item.category === 'shakes' || item.category === 'mocktails';
    return true;
  });

  // Check scroll position to enable/disable arrows & update active index indicator
  const updateScrollState = () => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Approximate card width + gap (approx 360px)
    const cardWidth = 360;
    const index = Math.round(scrollLeft / cardWidth);
    setCurrentIndex(Math.min(Math.max(0, index), filteredFavorites.length - 1));
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', updateScrollState, { passive: true });
      updateScrollState();
      return () => el.removeEventListener('scroll', updateScrollState);
    }
  }, [filteredFavorites.length, viewMode]);

  // Smooth scroll left
  const handleScrollLeft = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = Math.max(el.clientWidth * 0.75, 340);
    el.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  };

  // Smooth scroll right
  const handleScrollRight = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = Math.max(el.clientWidth * 0.75, 340);
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // Auto-advance carousel when active and not hovered
  useEffect(() => {
    if (viewMode !== 'carousel' || !isAutoPlay || isHovered || filteredFavorites.length <= 1) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      const el = scrollContainerRef.current;
      if (!el) return;

      const { scrollLeft, scrollWidth, clientWidth } = el;
      if (scrollLeft >= scrollWidth - clientWidth - 20) {
        // Loop back to start smoothly
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const cardWidth = 360;
        el.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 3800);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [viewMode, isAutoPlay, isHovered, filteredFavorites.length]);

  return (
    <section 
      id="favorites-section" 
      className="py-16 sm:py-20 bg-[#FBFBF6] relative overflow-hidden border-b border-[#E8E8DC]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Ambient Accents */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#D4E72B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#FFE74C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141512] text-white text-xs font-brand font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#D4E72B]" />
                <span className="text-[#D4E72B]">Vijayawada's Verified Hall of Fame</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF0C2] text-xs font-brand font-bold text-[#141512] border border-[#D4E72B]">
                <Clock className="w-3 h-3 text-[#B9CE14]" />
                <span>Open 10:30A – 11P Daily</span>
              </div>
            </div>

            <h2 className="font-brand text-3xl sm:text-4xl lg:text-5xl font-black text-[#141512] tracking-tight leading-tight">
              The 10 Most Ordered <br className="hidden sm:inline" />
              <span className="bg-[#D4E72B] px-3 py-1 rounded-2xl border-2 border-[#141512] shadow-[4px_4px_0px_#141512] inline-block mt-1">
                Fan Favorites
              </span>
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Curated from real Swiggy order records, Google Maps 5-star reviews, and dining buzz across Benz Circle and Ramavarappadu. Use the animated scroll controls or swipe to browse our top 10 bestsellers!
            </p>
          </div>

          {/* Controls & Quick CTAs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            {onViewCombos && (
              <button
                onClick={onViewCombos}
                id="favorites-view-combos-btn"
                className="px-4 py-2.5 rounded-full bg-[#EFF2D8] text-[#141512] border-2 border-[#141512] text-xs font-brand font-extrabold hover:bg-[#D4E72B] transition-all flex items-center gap-1.5 shadow-[2px_2px_0px_#141512] cursor-pointer"
              >
                <span>🍱 View Meal Combos</span>
                <span className="bg-[#141512] text-[#D4E72B] text-[10px] px-1.5 py-0.5 rounded-md font-mono">
                  +₹79
                </span>
              </button>
            )}

            <button
              onClick={onExploreFullMenu}
              id="favorites-see-all-btn"
              className="px-5 py-2.5 rounded-full bg-white text-[#141512] border-2 border-[#141512] text-xs sm:text-sm font-brand font-black hover:bg-[#D4E72B] transition-all flex items-center gap-2 shadow-[3px_3px_0px_#141512] group cursor-pointer"
            >
              <span>Full Menu (40+ Items)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Filter Tabs & Scrolling Navigation Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-2 border-b border-[#E8E8DC]">
          
          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            {[
              { id: 'all', label: 'All 10 Bestsellers' },
              { id: 'nonveg', label: '🍗 Non-Veg Hits' },
              { id: 'veg', label: '🌱 Pure Veg' },
              { id: 'mains', label: '🍕 Mains & Bowls' },
              { id: 'starters', label: '🍟 Starters' },
              { id: 'drinks', label: '🥤 Shakes & Mojitos' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-brand font-bold transition-all whitespace-nowrap border cursor-pointer ${
                  filter === tab.id
                    ? 'bg-[#141512] text-white border-[#141512] shadow-[2px_2px_0px_#D4E72B]'
                    : 'bg-white text-stone-600 border-[#DFE0D2] hover:border-[#141512] hover:text-[#141512]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Carousel Mode Controls (Play/Pause, Left/Right, View Switcher) */}
          <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
            
            {/* View Mode Switcher */}
            <div className="flex items-center bg-[#EFEFE6] p-1 rounded-xl border border-[#DFE0D2]">
              <button
                onClick={() => setViewMode('carousel')}
                className={`px-2.5 py-1 rounded-lg text-xs font-brand font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'carousel' 
                    ? 'bg-white text-[#141512] shadow-xs' 
                    : 'text-stone-500 hover:text-[#141512]'
                }`}
                title="Animated Scrolling Carousel"
              >
                <Zap className="w-3 h-3 text-[#B9CE14]" />
                <span>Carousel Scroll</span>
              </button>

              <button
                onClick={() => setViewMode('grid')}
                className={`px-2.5 py-1 rounded-lg text-xs font-brand font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'grid' 
                    ? 'bg-white text-[#141512] shadow-xs' 
                    : 'text-stone-500 hover:text-[#141512]'
                }`}
                title="Expanded Grid View"
              >
                <LayoutGrid className="w-3 h-3 text-stone-600" />
                <span>Grid View</span>
              </button>
            </div>

            {/* Navigation Buttons for Carousel Mode */}
            {viewMode === 'carousel' && (
              <div className="flex items-center gap-2">
                {/* Auto Play / Pause Toggle */}
                <button
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className={`p-2 rounded-xl border-2 border-[#141512] text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                    isAutoPlay 
                      ? 'bg-[#D4E72B] text-[#141512] shadow-[2px_2px_0px_#141512]' 
                      : 'bg-white text-stone-500 hover:text-[#141512]'
                  }`}
                  title={isAutoPlay ? 'Pause Auto-Scroll' : 'Resume Auto-Scroll'}
                >
                  {isAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>

                {/* Left Arrow Button */}
                <button
                  onClick={handleScrollLeft}
                  disabled={!canScrollLeft}
                  id="fav-scroll-left-btn"
                  className={`p-2 rounded-xl border-2 border-[#141512] transition-all cursor-pointer ${
                    canScrollLeft 
                      ? 'bg-white hover:bg-[#D4E72B] text-[#141512] shadow-[2px_2px_0px_#141512] active:translate-y-0.5' 
                      : 'bg-stone-100 text-stone-300 border-stone-200 cursor-not-allowed'
                  }`}
                  title="Previous favorite"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Right Arrow Button */}
                <button
                  onClick={handleScrollRight}
                  disabled={!canScrollRight}
                  id="fav-scroll-right-btn"
                  className={`p-2 rounded-xl border-2 border-[#141512] transition-all cursor-pointer ${
                    canScrollRight 
                      ? 'bg-white hover:bg-[#D4E72B] text-[#141512] shadow-[2px_2px_0px_#141512] active:translate-y-0.5' 
                      : 'bg-stone-100 text-stone-300 border-stone-200 cursor-not-allowed'
                  }`}
                  title="Next favorite"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

        </div>

        {/* Carousel State Banner (Indicator & Auto-scroll status) */}
        {viewMode === 'carousel' && (
          <div className="flex items-center justify-between text-xs text-stone-500 mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="font-brand font-bold text-[#141512]">
                Showing item #{filteredFavorites[currentIndex]?.rank || 1} of {filteredFavorites.length}
              </span>
              {isAutoPlay && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold flex items-center gap-1 ${
                  isHovered ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isHovered ? 'bg-amber-500' : 'bg-emerald-500 animate-ping'}`} />
                  {isHovered ? 'Paused on hover' : 'Auto-gliding'}
                </span>
              )}
            </div>

            <div className="text-[11px] font-mono text-stone-400 hidden sm:block">
              Tip: Drag or swipe horizontally to explore all 10 favorites
            </div>
          </div>
        )}

        {/* CAROUSEL VIEW / GRID VIEW CONTAINER */}
        {viewMode === 'carousel' ? (
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-6 pt-2 px-1 snap-x snap-mandatory scroll-smooth focus:outline-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredFavorites.map((fav, idx) => {
              const menuItem = favoriteToMenuItem(fav);
              const isLiked = likedItems[fav.id];
              const isJustAdded = justAddedId === menuItem.id;

              return (
                <motion.div
                  key={fav.id}
                  id={`favorite-card-${fav.id}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  onClick={() => onSelectItem(menuItem)}
                  className="shrink-0 w-[310px] sm:w-[350px] bg-white rounded-3xl border-2 border-[#141512] overflow-hidden flex flex-col justify-between group shadow-[5px_5px_0px_#141512] cursor-pointer snap-start relative"
                >
                  {/* Card Image Banner */}
                  <div className="relative aspect-[16/11] overflow-hidden bg-stone-100">
                    <img
                      src={fav.image}
                      alt={fav.name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />

                    {/* Gradient Overlay for Top Legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                    {/* Rank Badge #01 to #10 */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <div className={`px-2.5 py-1 rounded-xl font-brand font-black text-xs sm:text-sm border-2 border-[#141512] shadow-xs flex items-center gap-1 ${
                        fav.rank === 1 
                          ? 'bg-[#FFE74C] text-[#141512] ring-2 ring-[#141512]' 
                          : fav.rank <= 3
                          ? 'bg-[#D4E72B] text-[#141512]'
                          : 'bg-white text-[#141512]'
                      }`}>
                        {fav.rank === 1 && <span>👑</span>}
                        <span>#{fav.rank.toString().padStart(2, '0')}</span>
                      </div>

                      {/* Bestseller Badge */}
                      <span className="bg-[#141512]/90 backdrop-blur-xs text-[#D4E72B] text-[10px] font-mono px-2 py-0.5 rounded-lg border border-[#D4E72B]/40">
                        {fav.tags[0] || 'Top Bestseller'}
                      </span>
                    </div>

                    {/* Like Heart Button */}
                    <button
                      onClick={(e) => toggleLike(fav.id, e)}
                      id={`like-btn-${fav.id}`}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-stone-400 hover:text-rose-500 border border-stone-200 transition-colors shadow-xs z-10 cursor-pointer"
                      title="Save to favorites"
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>

                    {/* Bottom Floating Bar on Image */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                      {/* Dietary Veg / Non-Veg Indicator */}
                      <div className="flex items-center gap-1.5 bg-black/75 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/20">
                        <span className={`w-3 h-3 border-2 ${fav.isVeg ? 'border-emerald-400' : 'border-rose-400'} rounded-xs flex items-center justify-center p-0.5`}>
                          <span className={`w-1 h-1 ${fav.isVeg ? 'bg-emerald-400 rounded-full' : 'bg-rose-400 rounded-xs'}`}></span>
                        </span>
                        <span className="text-[10px] font-brand font-bold tracking-wider uppercase">
                          {fav.isVeg ? 'Veg' : 'Non-Veg'}
                        </span>
                      </div>

                      {/* Rating & Spicy Indicator */}
                      <div className="flex items-center gap-2">
                        {fav.spicyLevel && fav.spicyLevel > 0 && (
                          <div className="bg-black/75 backdrop-blur-xs px-2 py-0.5 rounded-lg text-[10px] flex items-center gap-1 font-mono text-amber-300 border border-amber-400/30">
                            <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
                            <span>{'🌶️'.repeat(fav.spicyLevel)}</span>
                          </div>
                        )}
                        <div className="bg-black/75 backdrop-blur-xs px-2 py-0.5 rounded-lg text-[11px] font-bold flex items-center gap-1 text-amber-300 border border-amber-400/30">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>4.9</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-brand font-bold uppercase text-[#797F68] tracking-wider block">
                          {fav.categoryLabel}
                        </span>
                        <h3 className="font-brand font-black text-lg sm:text-xl text-[#141512] group-hover:text-[#4F590F] transition-colors leading-tight line-clamp-1">
                          {fav.name}
                        </h3>
                      </div>

                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed font-medium">
                        {fav.culinaryProfile}
                      </p>

                      {/* Why it sells badge */}
                      <div className="bg-[#F8FAF0] p-2.5 rounded-xl border border-[#DFE2CA] text-[11px] text-[#2F3224] space-y-0.5">
                        <div className="flex items-center gap-1 text-[#5E6814] font-bold">
                          <Award className="w-3 h-3 text-[#B9CE14]" />
                          <span>Why Vijayawada Loves It:</span>
                        </div>
                        <p className="italic text-stone-600 line-clamp-2 font-medium">
                          "{fav.whyItSells}"
                        </p>
                      </div>

                      {/* Flavor Tags */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {fav.tags.slice(0, 3).map((note, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-[#EFF2D8] text-[#333626] font-medium border border-[#DFE2CA]"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price and CTA Actions */}
                    <div className="pt-3 border-t border-[#ECEEE0] flex items-center justify-between gap-3">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-stone-400">Price</span>
                        <span className="font-mono text-xl sm:text-2xl font-black text-[#141512]">
                          {fav.priceDisplay || `₹${fav.basePrice}`}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleQuickAddFeedback(menuItem, e)}
                          id={`quick-add-fav-${fav.id}`}
                          className={`px-3.5 py-2 rounded-xl text-xs font-brand font-black transition-all flex items-center gap-1.5 shadow-xs cursor-pointer ${
                            isJustAdded
                              ? 'bg-emerald-600 text-white scale-105'
                              : 'bg-[#141512] hover:bg-[#2F3127] text-white'
                          }`}
                          title={`Add ${fav.name} to order`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                              <span>Added!</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5 text-[#D4E72B]" />
                              <span>Add</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => onSelectItem(menuItem)}
                          className="px-3 py-2 rounded-xl bg-[#EFF2D8] hover:bg-[#D4E72B] text-[#141512] text-xs font-brand font-extrabold border border-[#141512]/30 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span>Options</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* EXPANDED GRID VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredFavorites.map((fav) => {
              const menuItem = favoriteToMenuItem(fav);
              const isLiked = likedItems[fav.id];
              const isJustAdded = justAddedId === menuItem.id;

              return (
                <div
                  key={fav.id}
                  id={`favorite-grid-${fav.id}`}
                  onClick={() => onSelectItem(menuItem)}
                  className="bg-white rounded-3xl border-2 border-[#141512] overflow-hidden flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300 shadow-[5px_5px_0px_#141512] cursor-pointer"
                >
                  {/* Card Image Banner */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                    <img
                      src={fav.image}
                      alt={fav.name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                    {/* Rank Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <div className={`px-2.5 py-1 rounded-xl font-brand font-black text-xs sm:text-sm border-2 border-[#141512] shadow-xs flex items-center gap-1 ${
                        fav.rank === 1 
                          ? 'bg-[#FFE74C] text-[#141512]' 
                          : fav.rank <= 3
                          ? 'bg-[#D4E72B] text-[#141512]'
                          : 'bg-white text-[#141512]'
                      }`}>
                        {fav.rank === 1 && <span>👑</span>}
                        <span>#{fav.rank.toString().padStart(2, '0')}</span>
                      </div>

                      <span className="bg-[#141512]/90 backdrop-blur-xs text-[#D4E72B] text-[10px] font-mono px-2 py-0.5 rounded-lg border border-[#D4E72B]/40">
                        {fav.tags[0] || 'Top Bestseller'}
                      </span>
                    </div>

                    <button
                      onClick={(e) => toggleLike(fav.id, e)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-stone-400 hover:text-rose-500 border border-stone-200 transition-colors shadow-xs z-10 cursor-pointer"
                      title="Save to favorites"
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                      <div className="flex items-center gap-1.5 bg-black/75 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/20">
                        <span className={`w-3 h-3 border-2 ${fav.isVeg ? 'border-emerald-400' : 'border-rose-400'} rounded-xs flex items-center justify-center p-0.5`}>
                          <span className={`w-1 h-1 ${fav.isVeg ? 'bg-emerald-400 rounded-full' : 'bg-rose-400 rounded-xs'}`}></span>
                        </span>
                        <span className="text-[10px] font-brand font-bold uppercase">
                          {fav.isVeg ? 'Veg' : 'Non-Veg'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {fav.spicyLevel && fav.spicyLevel > 0 && (
                          <div className="bg-black/75 backdrop-blur-xs px-2 py-0.5 rounded-lg text-[10px] flex items-center gap-1 font-mono text-amber-300">
                            <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
                            <span>{'🌶️'.repeat(fav.spicyLevel)}</span>
                          </div>
                        )}
                        <div className="bg-black/75 backdrop-blur-xs px-2 py-0.5 rounded-lg text-[11px] font-bold flex items-center gap-1 text-amber-300">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>4.9</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <span className="text-[10px] font-brand font-bold uppercase text-[#797F68] tracking-wider block">
                        {fav.categoryLabel}
                      </span>
                      <h3 className="font-brand font-black text-lg sm:text-xl text-[#141512] group-hover:text-[#4F590F] transition-colors leading-tight">
                        {fav.name}
                      </h3>
                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {fav.culinaryProfile}
                      </p>

                      <div className="bg-[#F8FAF0] p-2.5 rounded-xl border border-[#DFE2CA] text-[11px] text-[#2F3224] space-y-0.5">
                        <span className="font-bold text-[#5E6814] block">Why Vijayawada Loves It:</span>
                        <p className="italic text-stone-600 line-clamp-2">
                          "{fav.whyItSells}"
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#ECEEE0] flex items-center justify-between gap-2">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-stone-400">Price</span>
                        <span className="font-mono text-xl font-black text-[#141512]">
                          {fav.priceDisplay || `₹${fav.basePrice}`}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleQuickAddFeedback(menuItem, e)}
                          className={`px-3 py-2 rounded-xl text-xs font-brand font-black transition-all flex items-center gap-1 cursor-pointer ${
                            isJustAdded
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[#141512] hover:bg-[#2F3127] text-white'
                          }`}
                        >
                          {isJustAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5 text-[#D4E72B]" />}
                          <span>{isJustAdded ? 'Added' : 'Add'}</span>
                        </button>

                        <button
                          onClick={() => onSelectItem(menuItem)}
                          className="px-3 py-2 rounded-xl bg-[#EFF2D8] hover:bg-[#D4E72B] text-[#141512] text-xs font-brand font-bold border border-[#141512]/30 cursor-pointer"
                        >
                          Options
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Banner linking to Combos & Full Menu */}
        <div className="mt-12 bg-radial from-[#1A1A17] to-[#141512] rounded-3xl p-6 sm:p-8 border-2 border-[#141512] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[6px_6px_0px_#D4E72B]">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-brand font-semibold text-[#D4E72B]">
              <Utensils className="w-3.5 h-3.5" />
              <span>Full Kitchen & Value Meal Combos</span>
            </div>
            <h3 className="font-brand text-2xl sm:text-3xl font-black">
              Craving more than just our Top 10?
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm max-w-xl">
              Turn any appetizer into a complete meal with tossed Fried Rice (+₹79) or fruit slush (+₹69), or discover 40+ handcrafted items across Vijayawada. Open daily 10:30 AM to 11:00 PM.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            {onViewCombos && (
              <button
                onClick={onViewCombos}
                className="w-full sm:w-auto px-5 py-3 rounded-full bg-white text-[#141512] font-brand font-black text-xs sm:text-sm hover:bg-[#D4E72B] transition-colors border-2 border-white shadow-[2px_2px_0px_#D4E72B] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>🍱 View Meal Combos</span>
              </button>
            )}

            <button
              onClick={onExploreFullMenu}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#D4E72B] text-[#141512] font-brand font-black text-sm hover:bg-[#C2D622] transition-colors border-2 border-[#141512] shadow-[3px_3px_0px_white] flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Open Dedicated Menu</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
