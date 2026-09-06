import React, { useState } from 'react';
import { X, Check, Coffee, Sparkles, Plus, Minus, Flame } from 'lucide-react';
import { MenuItem, CustomizationOptions } from '../types';

interface ItemCustomizeModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, customization: CustomizationOptions, quantity: number, unitPrice: number) => void;
}

export const ItemCustomizeModal: React.FC<ItemCustomizeModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const isBeverage = item.category === 'coffee' || item.category === 'shakes' || item.category === 'mocktails';
  const isAppetizerOrFood = item.category === 'appetizers' || item.category === 'pizzas_pastas';

  const [size, setSize] = useState<CustomizationOptions['size']>('Regular');
  const [temperature, setTemperature] = useState<CustomizationOptions['temperature']>(
    item.category === 'shakes' ? 'Blended Frappé' : 'Hot'
  );
  const [milk, setMilk] = useState<CustomizationOptions['milk']>('Standard Milk');
  const [sweetness, setSweetness] = useState<CustomizationOptions['sweetness']>('Standard (50%)');
  const [extraShot, setExtraShot] = useState<boolean>(false);
  const [flavorVariant, setFlavorVariant] = useState<string>(
    item.options && item.options.length > 0 ? item.options[0] : ''
  );
  const [mealAddOn, setMealAddOn] = useState<CustomizationOptions['mealAddOn']>('None');
  const [drinkAddOn, setDrinkAddOn] = useState<CustomizationOptions['drinkAddOn']>('None');
  const [specialNote, setSpecialNote] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  // Dynamic Price calculation in INR (₹)
  let unitPrice = item.price;

  if (isBeverage) {
    if (size === 'Large') unitPrice += 30;
    if (size === 'Monster / Jar') unitPrice += 50;
    if (milk !== 'Standard Milk' && milk !== 'No Milk') unitPrice += 40;
    if (extraShot) unitPrice += 40;
  }

  if (mealAddOn && mealAddOn !== 'None') {
    unitPrice += 79;
  }
  if (drinkAddOn && drinkAddOn !== 'None') {
    unitPrice += 69;
  }

  const handleAdd = () => {
    const customization: CustomizationOptions = {
      size,
      temperature,
      milk: isBeverage ? milk : 'No Milk',
      sweetness,
      extraShot,
      flavorVariant: flavorVariant || undefined,
      mealAddOn,
      drinkAddOn,
      specialNote: specialNote.trim() ? specialNote.trim() : undefined,
    };
    onAddToCart(item, customization, quantity, unitPrice);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div 
        className="relative bg-[#FBFBF6] rounded-3xl max-w-lg w-full border-2 border-[#141512] shadow-[8px_8px_0px_#141512] overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          id="close-customize-modal"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white hover:bg-[#D4E72B] text-[#141512] shadow-md border-2 border-[#141512] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-5">
          
          {/* Header Image & Title */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-stone-100 border-2 border-[#141512]">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              
              <div className="absolute bottom-3 left-3 bg-[#141512]/90 backdrop-blur-xs px-3 py-1 rounded-full text-[#D4E72B] text-xs font-brand font-black flex items-center gap-1.5 border border-[#D4E72B]/30">
                <Coffee className="w-3.5 h-3.5" />
                <span>{item.category.toUpperCase()}</span>
              </div>

              <div className="absolute top-3 left-3 bg-white px-2.5 py-1 rounded-lg border border-stone-300 text-xs font-bold flex items-center gap-1">
                <span className={`w-2.5 h-2.5 border-2 ${item.isVeg ? 'border-emerald-600' : 'border-rose-600'} rounded-xs flex items-center justify-center`}>
                  <span className={`w-1 h-1 ${item.isVeg ? 'bg-emerald-600 rounded-full' : 'bg-rose-600 rounded-xs'}`}></span>
                </span>
                <span>{item.isVeg ? 'Veg' : 'Non-Veg'}</span>
              </div>
            </div>

            <div>
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="font-brand text-2xl font-black text-[#141512]">
                  {item.name}
                </h2>
                <span className="font-mono text-2xl font-black text-[#141512]">
                  ₹{item.price}
                </span>
              </div>
              <p className="text-xs text-[#525644] mt-1 font-medium">
                {item.description}
              </p>
            </div>
          </div>

          {/* If the item has flavor options (e.g. Mojito / Iced Tea / Cold Coffee) */}
          {item.options && item.options.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-[#DFE0D2]">
              <label className="text-xs font-brand font-black uppercase text-[#141512] tracking-wider block">
                Select Your Flavor Variant:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {item.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setFlavorVariant(opt)}
                    className={`px-3 py-2 rounded-xl text-xs font-brand font-bold border text-left transition-all ${
                      flavorVariant === opt
                        ? 'bg-[#141512] text-[#D4E72B] border-[#141512] shadow-xs'
                        : 'bg-white text-stone-700 border-[#DFE0D2] hover:bg-[#F2F4E6]'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Beverage Customizations */}
          {isBeverage && (
            <div className="space-y-4 pt-2 border-t border-[#DFE0D2]">
              {/* Cup Size */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-brand font-black uppercase text-[#141512]">
                  <span>Cup Size</span>
                  <span className="text-stone-500 font-mono">Large +₹30 | Monster +₹50</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(['Regular', 'Large', 'Monster / Jar'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`py-2 rounded-xl text-xs font-brand font-bold border transition-all ${
                        size === s
                          ? 'bg-[#141512] text-[#D4E72B] border-[#141512]'
                          : 'bg-white text-stone-700 border-[#DFE0D2] hover:bg-[#F2F4E6]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Temperature */}
              <div className="space-y-1.5">
                <label className="text-xs font-brand font-black uppercase text-[#141512] block">
                  Temperature / Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Hot', 'Iced', 'Blended Frappé'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTemperature(t)}
                      className={`py-2 rounded-xl text-xs font-brand font-bold border transition-all ${
                        temperature === t
                          ? 'bg-[#141512] text-[#D4E72B] border-[#141512]'
                          : 'bg-white text-stone-700 border-[#DFE0D2] hover:bg-[#F2F4E6]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sweetness */}
              <div className="space-y-1.5">
                <label className="text-xs font-brand font-black uppercase text-[#141512] block">
                  Sweetness Level
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {(['No Sugar (0%)', 'Less Sweet (25%)', 'Standard (50%)', 'Sweet (100%)'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setSweetness(lvl)}
                      className={`py-1.5 px-2 rounded-xl text-[11px] font-brand font-bold border transition-all ${
                        sweetness === lvl
                          ? 'bg-[#141512] text-[#D4E72B] border-[#141512]'
                          : 'bg-white text-stone-700 border-[#DFE0D2] hover:bg-[#F2F4E6]'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Milk Option */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-brand font-black uppercase text-[#141512]">
                  <span>Milk Selection</span>
                  <span className="text-stone-500 font-mono">Vegan Milk +₹40</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {([
                    'Standard Milk',
                    'Oat Milk (+₹40)',
                    'Almond Milk (+₹40)',
                    'Coconut Milk (+₹40)',
                    'No Milk',
                  ] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMilk(m)}
                      className={`py-2 px-2 rounded-xl text-[11px] font-brand font-bold border text-center transition-all ${
                        milk === m
                          ? 'bg-[#141512] text-[#D4E72B] border-[#141512]'
                          : 'bg-white text-stone-700 border-[#DFE0D2] hover:bg-[#F2F4E6]'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Extra Espresso Shot */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#EFF2D8] border border-[#D4E72B]">
                <div>
                  <span className="text-xs font-brand font-black text-[#141512] block">
                    Add Extra Espresso Shot (+₹40)
                  </span>
                  <span className="text-[11px] text-stone-600">
                    Boost your caffeine intensity with a fresh Arabica shot
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={extraShot}
                  onChange={(e) => setExtraShot(e.target.checked)}
                  className="w-5 h-5 accent-[#141512] cursor-pointer rounded"
                />
              </div>
            </div>
          )}

          {/* Make It A Meal Addon (Especially for appetizers & food) */}
          <div className="space-y-3 pt-2 border-t border-[#DFE0D2]">
            <div className="p-3.5 rounded-2xl bg-[#FFF9D6] border-2 border-[#141512] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-brand font-black text-[#141512] uppercase tracking-wider flex items-center gap-1.5">
                  🍱 Make It a Meal (+₹79)
                </span>
                <span className="text-xs font-mono font-bold text-[#141512]">+₹79</span>
              </div>
              <p className="text-[11px] text-stone-600">
                Pair with steaming hot wok-tossed fried rice:
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {(['None', 'Szechwan Fried Rice (+₹79)', 'Chilli Garlic Fried Rice (+₹79)', 'Hakka Fried Rice (+₹79)'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setMealAddOn(r)}
                    className={`py-1.5 px-2 rounded-xl text-[11px] font-brand font-bold border transition-all text-left truncate ${
                      mealAddOn === r
                        ? 'bg-[#141512] text-[#D4E72B] border-[#141512]'
                        : 'bg-white text-stone-700 border-[#DFE0D2] hover:bg-[#F2F4E6]'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Drink Companion Addon */}
            <div className="p-3.5 rounded-2xl bg-[#EBF4FF] border-2 border-[#141512] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-brand font-black text-[#141512] uppercase tracking-wider flex items-center gap-1.5">
                  🍹 Add Drink Companion (+₹69)
                </span>
                <span className="text-xs font-mono font-bold text-[#141512]">+₹69</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {(['None', 'Watermelon Slush (+₹69)', 'Fresh Lime (+₹69)', 'Mango Tango (+₹69)'] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDrinkAddOn(d)}
                    className={`py-1.5 px-2 rounded-xl text-[11px] font-brand font-bold border transition-all text-left truncate ${
                      drinkAddOn === d
                        ? 'bg-[#141512] text-[#D4E72B] border-[#141512]'
                        : 'bg-white text-stone-700 border-[#DFE0D2] hover:bg-[#F2F4E6]'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Kitchen / Barista Special Request */}
          <div className="space-y-1.5 pt-2 border-t border-[#DFE0D2]">
            <label className="text-xs font-brand font-black uppercase text-[#141512] block">
              Special Instructions for the Kitchen:
            </label>
            <input
              type="text"
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              placeholder="e.g. Extra spicy, less ice, crispy fries, pack separately..."
              className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#DFE0D2] focus:outline-none focus:border-[#141512]"
            />
          </div>

        </div>

        {/* Modal Bottom Footer with Quantity & Add Button */}
        <div className="p-4 bg-white border-t-2 border-[#141512] flex items-center justify-between gap-4">
          {/* Quantity selector */}
          <div className="flex items-center gap-2 border-2 border-[#141512] rounded-2xl p-1 bg-[#FBFBF6]">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1.5 rounded-xl hover:bg-stone-200 text-[#141512] transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-mono text-sm font-black w-6 text-center text-[#141512]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1.5 rounded-xl hover:bg-stone-200 text-[#141512] transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Bag CTA */}
          <button
            onClick={handleAdd}
            id="add-customized-item-btn"
            className="flex-1 py-3 px-5 rounded-2xl bg-[#D4E72B] hover:bg-[#C2D622] text-[#141512] font-brand font-black text-sm border-2 border-[#141512] shadow-[3px_3px_0px_#141512] transition-all flex items-center justify-between"
          >
            <span>Add to Order</span>
            <span className="font-mono text-base font-black">
              ₹{unitPrice * quantity}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};
