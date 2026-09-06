import React, { useState, useMemo, useEffect } from 'react';
import { Search, Sparkles, Plus, Flame, Utensils, Coffee, Check, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { MenuItem, Category } from '../types';

interface MenuSectionProps {
  items: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem, e: React.MouseEvent) => void;
  initialCategory?: Category;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  onSelectItem,
  onQuickAdd,
  initialCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryType, setDietaryType] = useState<'all' | 'veg' | 'non-veg'>('all');

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const categories: { id: Category; label: string; count: number; icon: string }[] = [
    { id: 'all', label: 'All Items', count: items.length, icon: '✨' },
    { id: 'combos', label: '🍱 Meal Combos & Add-ons', count: items.filter(i => i.category === 'combos').length, icon: '🍱' },
    { id: 'coffee', label: 'Coffee & Brews', count: items.filter(i => i.category === 'coffee').length, icon: '☕' },
    { id: 'shakes', label: 'Thick Shakes', count: items.filter(i => i.category === 'shakes').length, icon: '🥤' },
    { id: 'mocktails', label: 'Mocktails & Coolers', count: items.filter(i => i.category === 'mocktails').length, icon: '🍹' },
    { id: 'appetizers', label: 'Appetizers & Fries', count: items.filter(i => i.category === 'appetizers').length, icon: '🍟' },
    { id: 'pizzas_pastas', label: 'Pizzas & Pastas', count: items.filter(i => i.category === 'pizzas_pastas').length, icon: '🍕' },
  ];

  const handleViewMealCombos = () => {
    setSelectedCategory('combos');
    setDietaryType('all');
    setSearchQuery('');
    setTimeout(() => {
      const grid = document.getElementById('menu-items-grid');
      if (grid) {
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tastingNotes && item.tastingNotes.some(n => n.toLowerCase().includes(searchQuery.toLowerCase()))) ||
        (item.options && item.options.some(o => o.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesDietary =
        dietaryType === 'all' ||
        (dietaryType === 'veg' && item.isVeg) ||
        (dietaryType === 'non-veg' && !item.isVeg);

      return matchesCategory && matchesSearch && matchesDietary;
    });
  }, [items, selectedCategory, searchQuery, dietaryType]);

  return (
    <section id="menu-section" className="py-12 lg:py-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF0C2] text-xs font-brand font-black text-[#141512]">
          <span>Vijayawada Cafe Menu • Open 10:30A – 11P</span>
        </div>
        <h2 className="font-brand text-3xl sm:text-4xl lg:text-5xl text-[#141512] font-black tracking-tight">
          Sip, Crunch & Hang Out
        </h2>
        <p className="text-sm sm:text-base text-[#4F5342]">
          Authentic espresso extractions, handcrafted thick monster shakes, sizzling cheesy appetizers, stone-baked pizzas, and value meal combos.
        </p>
      </div>

      {/* Combo Banner Callout (Make it a meal) */}
      <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#D4E72B]/30 via-[#FFE74C]/25 to-[#D4E72B]/30 border-2 border-[#141512] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[4px_4px_0px_#141512]">
        <div className="flex items-center gap-3 text-left">
          <div className="w-12 h-12 rounded-xl bg-[#141512] text-[#D4E72B] flex items-center justify-center text-2xl shrink-0 shadow-xs">
            🍱
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-brand font-black text-sm sm:text-base text-[#141512]">
                Hungry? Make Any Appetizer a Full Meal!
              </h3>
              <span className="bg-[#141512] text-[#D4E72B] text-[10px] font-brand font-black px-2 py-0.5 rounded-full">
                BEST VALUE
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#3E4233]">
              Add Szechwan / Chilli Garlic / Hakka Fried Rice for <strong>+₹79</strong> or Slush / Mango Tango Drink for <strong>+₹69</strong>. Full meal platters available!
            </p>
          </div>
        </div>

        <button
          onClick={handleViewMealCombos}
          id="view-meal-combos-btn"
          className="shrink-0 px-5 py-2.5 bg-[#141512] text-white text-xs sm:text-sm font-brand font-extrabold rounded-xl hover:bg-black hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-[2px_2px_0px_#D4E72B] cursor-pointer"
        >
          <span>View Meal Combos</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#D4E72B]" />
        </button>
      </div>

      {/* When Combos is active, show helper banner */}
      {selectedCategory === 'combos' && (
        <div className="mb-6 p-4 rounded-2xl bg-[#F6F8E2] border-2 border-[#D4E72B] flex items-center justify-between gap-4 shadow-sm animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🍱</span>
            <div>
              <h4 className="font-brand font-bold text-sm text-[#141512]">
                Showing Value Meal Combos & Feast Boxes
              </h4>
              <p className="text-xs text-stone-600">
                Pair your favorite bites with hot wok rice (+₹79), refreshing fruit coolers (+₹69), or choose complete platter feasts.
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedCategory('all')}
            className="text-xs font-brand font-bold text-[#141512] underline hover:text-black shrink-0"
          >
            Show All Items
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="space-y-4 mb-8">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="menu-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search espresso, oreo shake, loaded fries, pasta..."
              className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white border border-[#DFE0D2] text-sm text-[#141512] placeholder:text-stone-400 focus:outline-none focus:border-[#141512] focus:ring-2 focus:ring-[#D4E72B]/50 transition-all font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 font-medium"
              >
                Clear
              </button>
            )}
          </div>

          {/* Veg / Non-Veg Toggles */}
          <div className="flex items-center gap-1.5 p-1 bg-[#EFF0E1] rounded-2xl border border-[#DFE0D2]">
            <button
              onClick={() => setDietaryType('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-brand font-bold transition-all ${
                dietaryType === 'all'
                  ? 'bg-[#141512] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Items
            </button>

            <button
              onClick={() => setDietaryType('veg')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-brand font-bold transition-all ${
                dietaryType === 'veg'
                  ? 'bg-[#15803D] text-white shadow-xs'
                  : 'text-emerald-800 hover:bg-emerald-100/60'
              }`}
            >
              <span className="w-2.5 h-2.5 border-2 border-current rounded-xs flex items-center justify-center p-0.5">
                <span className="w-1 h-1 bg-current rounded-full"></span>
              </span>
              Pure Veg
            </button>

            <button
              onClick={() => setDietaryType('non-veg')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-brand font-bold transition-all ${
                dietaryType === 'non-veg'
                  ? 'bg-[#B91C1C] text-white shadow-xs'
                  : 'text-rose-800 hover:bg-rose-100/60'
              }`}
            >
              <span className="w-2.5 h-2.5 border-2 border-current rounded-xs flex items-center justify-center p-0.5">
                <span className="w-1.5 h-1.5 bg-current rounded-xs"></span>
              </span>
              Non-Veg
            </button>
          </div>
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-btn-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-brand font-extrabold flex items-center gap-2 whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-[#141512] text-[#D4E72B] border-[#141512] shadow-[2px_2px_0px_#141512]'
                    : 'bg-white text-[#3E4233] border-[#DFE0D2] hover:border-[#B5C712] hover:bg-[#F7F9E8]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                  isActive ? 'bg-[#D4E72B] text-[#141512]' : 'bg-[#EFF0E1] text-stone-600'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Menu Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#DFE0D2] space-y-3">
          <p className="text-3xl">☕</p>
          <h3 className="font-brand font-black text-lg text-[#141512]">No dishes or drinks found</h3>
          <p className="text-sm text-stone-500 max-w-sm mx-auto">
            Try adjusting your search or filtering by Pure Veg / All Items to see more Froth & Friends favorites.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setDietaryType('all'); }}
            className="mt-2 px-4 py-2 bg-[#D4E72B] text-[#141512] text-xs font-brand font-black rounded-xl border border-[#141512]"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div id="menu-items-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              id={`menu-card-${item.id}`}
              className="bg-white rounded-3xl border-2 border-[#141512] overflow-hidden flex flex-col justify-between group hover:-translate-y-1 transition-all duration-200 shadow-[4px_4px_0px_#141512]"
            >
              {/* Card Image Banner */}
              <div 
                className="relative aspect-[16/10] overflow-hidden bg-stone-100 cursor-pointer"
                onClick={() => onSelectItem(item)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Dietary Veg / Non-Veg Indicator Badge */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs p-1.5 rounded-lg border border-stone-200 shadow-xs flex items-center gap-1.5">
                  <span className={`w-3.5 h-3.5 border-2 ${item.isVeg ? 'border-emerald-600' : 'border-rose-600'} rounded-xs flex items-center justify-center p-0.5`}>
                    <span className={`w-1.5 h-1.5 ${item.isVeg ? 'bg-emerald-600 rounded-full' : 'bg-rose-600 rounded-xs'}`}></span>
                  </span>
                  <span className="text-[10px] font-brand font-bold text-[#141512]">
                    {item.isVeg ? 'Veg' : 'Non-Veg'}
                  </span>
                </div>

                {/* Popular / Chef Special Badges */}
                <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
                  {item.isPopular && (
                    <span className="bg-[#D4E72B] text-[#141512] text-[10px] font-brand font-black px-2 py-0.5 rounded-md border border-[#141512] shadow-2xs">
                      POPULAR
                    </span>
                  )}
                  {item.isChefSpecial && (
                    <span className="bg-[#141512] text-[#D4E72B] text-[10px] font-brand font-bold px-2 py-0.5 rounded-md shadow-2xs">
                      CHEF'S PICK
                    </span>
                  )}
                </div>

                {/* Spicy Level Badge */}
                {item.spicyLevel && item.spicyLevel > 0 && (
                  <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-xs text-amber-300 px-2 py-0.5 rounded-md text-[10px] font-mono flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{'🌶️'.repeat(item.spicyLevel)}</span>
                  </div>
                )}
              </div>

              {/* Card Content Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 
                      onClick={() => onSelectItem(item)}
                      className="font-brand font-black text-base sm:text-lg text-[#141512] hover:text-[#556306] cursor-pointer leading-snug"
                    >
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-xs text-[#525644] line-clamp-2 leading-relaxed font-medium">
                    {item.description}
                  </p>

                  {/* Flavor / Options / Notes Tags */}
                  {item.options && item.options.length > 0 && (
                    <div className="pt-1 flex flex-wrap gap-1">
                      {item.options.slice(0, 3).map((opt) => (
                        <span key={opt} className="text-[10px] bg-[#F2F4E6] text-[#424634] px-2 py-0.5 rounded-md font-medium border border-[#DFE2CA]">
                          {opt}
                        </span>
                      ))}
                      {item.options.length > 3 && (
                        <span className="text-[10px] text-stone-500 font-mono self-center">
                          +{item.options.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Price & Action Button Footer */}
                <div className="pt-3 border-t border-[#ECEEE0] flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-stone-400">Price</span>
                    <span className="font-mono text-lg sm:text-xl font-black text-[#141512]">
                      ₹{item.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.customizable ? (
                      <button
                        onClick={() => onSelectItem(item)}
                        className="px-3 py-2 rounded-xl bg-[#EFF2D8] hover:bg-[#D4E72B] text-[#141512] text-xs font-brand font-extrabold border border-[#141512]/30 transition-colors"
                      >
                        Customize
                      </button>
                    ) : null}

                    <button
                      onClick={(e) => onQuickAdd(item, e)}
                      id={`quick-add-${item.id}`}
                      className="p-2.5 rounded-xl bg-[#141512] hover:bg-[#2F3127] text-white transition-all shadow-xs"
                      title={`Add ${item.name} to order`}
                    >
                      <Plus className="w-4 h-4 text-[#D4E72B]" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>
      )}

    </section>
  );
};
