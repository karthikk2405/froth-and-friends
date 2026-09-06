import React, { useState, useEffect } from 'react';
import { X, Trash2, Clock, MapPin, Sparkles, CheckCircle2, ArrowRight, UtensilsCrossed, Coffee, MessageCircle, Phone, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';
import { cafeSoundscape } from '../utils/audioSynth';
import { PHONE_NUMBER, WHATSAPP_NUMBER } from '../data/cafeData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [orderType, setOrderType] = useState<'dinein' | 'takeaway'>('dinein');
  const [outlet, setOutlet] = useState<string>('Ramavarappadu Flagship (Near Fun Times Club)');
  const [tableNumber, setTableNumber] = useState<string>('Table 4');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);
  const [orderStage, setOrderStage] = useState<number>(1);
  const [orderNumber, setOrderNumber] = useState<string>('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const gstTax = Math.round(subtotal * 0.05); // 5% Restaurant GST
  const total = subtotal + gstTax;

  // Simulate kitchen progress once ordered
  useEffect(() => {
    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;

    if (orderPlaced) {
      cafeSoundscape.playChime();
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4E72B', '#141512', '#FFE815', '#FF5F7E']
        });
      } catch {
        // Fallback
      }

      timer1 = setTimeout(() => {
        setOrderStage(2);
      }, 3500);

      timer2 = setTimeout(() => {
        setOrderStage(3);
        cafeSoundscape.playChime();
      }, 7500);
    } else {
      setOrderStage(1);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [orderPlaced]);

  if (!isOpen) return null;

  const handleCheckout = () => {
    const randomOrder = `FNF-${Math.floor(100 + Math.random() * 900)}`;
    setOrderNumber(randomOrder);
    setOrderPlaced(true);
  };

  const handleFinishOrder = () => {
    onClearCart();
    setOrderPlaced(false);
    onClose();
  };

  // Generate WhatsApp order message
  const handleSendViaWhatsApp = () => {
    let msg = `*NEW ORDER - FROTH & FRIENDS VIJAYAWADA*\n`;
    msg += `📍 *Outlet:* ${outlet}\n`;
    msg += `🍽️ *Type:* ${orderType === 'dinein' ? `Dine-In (${tableNumber})` : 'Takeaway / Delivery'}\n`;
    if (customerName) msg += `👤 *Name:* ${customerName}\n`;
    if (customerPhone) msg += `📞 *Phone:* ${customerPhone}\n`;
    msg += `\n*ITEMIZED ORDER:*\n`;

    cartItems.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.quantity}x ${item.menuItem.name} — ₹${item.unitPrice * item.quantity}\n`;
      if (item.customization.size) msg += `   • Size: ${item.customization.size}\n`;
      if (item.customization.flavorVariant) msg += `   • Flavor: ${item.customization.flavorVariant}\n`;
      if (item.customization.milk && item.customization.milk !== 'No Milk') msg += `   • Milk: ${item.customization.milk}\n`;
      if (item.customization.extraShot) msg += `   • Extra Espresso Shot (+₹40)\n`;
      if (item.customization.mealAddOn && item.customization.mealAddOn !== 'None') msg += `   • Meal Combo: ${item.customization.mealAddOn}\n`;
      if (item.customization.drinkAddOn && item.customization.drinkAddOn !== 'None') msg += `   • Drink: ${item.customization.drinkAddOn}\n`;
      if (item.customization.specialNote) msg += `   • Note: ${item.customization.specialNote}\n`;
    });

    msg += `\n*Subtotal:* ₹${subtotal}\n`;
    msg += `*GST (5%):* ₹${gstTax}\n`;
    msg += `*TOTAL PAYABLE:* ₹${total}\n`;

    const encoded = encodeURIComponent(msg);
    const link = document.createElement('a');
    link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    handleCheckout();
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-xs flex justify-end animate-fadeIn"
    >
      
      <div 
        className="w-full max-w-md bg-[#FBFBF6] h-full shadow-2xl flex flex-col border-l-2 border-[#141512] relative animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b-2 border-[#141512] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#D4E72B] border border-[#141512] flex items-center justify-center font-bold text-base">
              ☕
            </div>
            <div>
              <h2 className="font-brand text-lg font-black text-[#141512]">
                Your Order Bag
              </h2>
              <span className="text-[10px] text-stone-500 font-mono font-bold">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            id="close-cart-btn"
            className="p-2 rounded-xl text-stone-600 hover:text-black hover:bg-[#EFF1DF] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Confirmed Screen */}
        {orderPlaced ? (
          <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-[#D4E72B] border-2 border-[#141512] flex items-center justify-center shadow-[4px_4px_0px_#141512]">
              <Sparkles className="w-10 h-10 text-[#141512]" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-brand font-black uppercase tracking-wider text-stone-500">
                Froth & Friends Order Placed!
              </span>
              <h3 className="font-brand text-3xl font-black text-[#141512]">
                {orderNumber}
              </h3>
              <p className="text-xs text-stone-600 max-w-xs pt-1">
                {orderType === 'dinein' ? `Service to ${tableNumber} at ${outlet}` : `Preparing for takeaway at ${outlet}`}
              </p>
            </div>

            {/* Live Progress Stages */}
            <div className="w-full bg-white rounded-2xl border-2 border-[#141512] p-4 text-left space-y-3 shadow-[2px_2px_0px_#141512]">
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  orderStage >= 1 ? 'bg-[#D4E72B] text-[#141512] border border-[#141512]' : 'bg-stone-200 text-stone-500'
                }`}>
                  1
                </div>
                <div className="text-xs">
                  <span className="font-brand font-bold text-[#141512] block">Order Received</span>
                  <span className="text-[11px] text-stone-500">Sent to kitchen screen</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  orderStage >= 2 ? 'bg-[#D4E72B] text-[#141512] border border-[#141512]' : 'bg-stone-200 text-stone-500'
                }`}>
                  2
                </div>
                <div className="text-xs">
                  <span className="font-brand font-bold text-[#141512] block">Barista & Chef Preparing</span>
                  <span className="text-[11px] text-stone-500">Extracting espresso & tossing appetizers</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  orderStage >= 3 ? 'bg-[#15803D] text-white' : 'bg-stone-200 text-stone-500'
                }`}>
                  ✓
                </div>
                <div className="text-xs">
                  <span className="font-brand font-bold text-[#141512] block">
                    {orderStage >= 3 ? 'Ready to Serve!' : 'Nearly ready'}
                  </span>
                  <span className="text-[11px] text-stone-500">Enjoy with your friends!</span>
                </div>
              </div>
            </div>

            <div className="pt-2 w-full space-y-2">
              <a
                href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`}
                className="w-full py-2.5 px-4 bg-white border border-[#DFE0D2] rounded-xl text-xs font-brand font-bold flex items-center justify-center gap-2 text-[#141512]"
              >
                <Phone className="w-3.5 h-3.5 text-[#B9CE14]" />
                <span>Call Outlet: {PHONE_NUMBER}</span>
              </a>

              <button
                onClick={handleFinishOrder}
                className="w-full py-3 bg-[#141512] text-white rounded-2xl font-brand font-bold text-xs hover:bg-black transition-colors"
              >
                Start Another Order
              </button>
            </div>
          </div>
        ) : cartItems.length === 0 ? (
          /* Empty Bag */
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#EFF0DF] flex items-center justify-center text-2xl">
              🥤
            </div>
            <div className="space-y-1">
              <h3 className="font-brand text-lg font-bold text-[#141512]">
                Your Bag is Empty
              </h3>
              <p className="text-xs text-stone-500 max-w-xs">
                Explore our Vijayawada menu and add your favorite coffees, shakes, loaded fries, or pizzas!
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-[#D4E72B] text-[#141512] font-brand font-black text-xs border border-[#141512] shadow-xs hover:bg-[#C2D622]"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          /* Items List & Checkout */
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              
              {/* Order Type Selector: Dine-in vs Takeaway */}
              <div className="p-3 bg-white rounded-2xl border-2 border-[#141512] space-y-2.5 shadow-2xs">
                <div className="flex items-center justify-between text-xs font-brand font-bold">
                  <span className="text-[#141512]">Dining Preference:</span>
                  <div className="flex gap-1 p-1 bg-[#EFF0DF] rounded-xl">
                    <button
                      onClick={() => setOrderType('dinein')}
                      className={`px-3 py-1 rounded-lg text-xs font-brand font-bold transition-all ${
                        orderType === 'dinein' ? 'bg-[#141512] text-[#D4E72B]' : 'text-stone-600'
                      }`}
                    >
                      Dine-In
                    </button>
                    <button
                      onClick={() => setOrderType('takeaway')}
                      className={`px-3 py-1 rounded-lg text-xs font-brand font-bold transition-all ${
                        orderType === 'takeaway' ? 'bg-[#141512] text-[#D4E72B]' : 'text-stone-600'
                      }`}
                    >
                      Takeaway
                    </button>
                  </div>
                </div>

                {/* Outlet Selector */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-stone-500">Outlet Location</label>
                  <select
                    value={outlet}
                    onChange={(e) => setOutlet(e.target.value)}
                    className="w-full text-xs p-2 rounded-xl bg-[#FBFBF6] border border-[#DFE0D2] font-medium"
                  >
                    <option value="Ramavarappadu Flagship (Near Fun Times Club)">Ramavarappadu Flagship (Near Fun Times Club)</option>
                    <option value="Benz Circle / Vasavi Nagar Hub">Benz Circle / Vasavi Nagar Hub</option>
                  </select>
                </div>

                {orderType === 'dinein' && (
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-xs text-stone-600 font-medium">Seated At:</span>
                    <select
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="text-xs p-1.5 rounded-lg bg-[#FBFBF6] border border-[#DFE0D2] font-bold"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                        <option key={num} value={`Table ${num}`}>Table {num}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Cart Items List */}
              <div className="space-y-2.5">
                {cartItems.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="p-3 bg-white rounded-2xl border border-[#DFE0D2] flex gap-3 items-start justify-between"
                  >
                    <img
                      src={item.menuItem.image}
                      alt={item.menuItem.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />

                    <div className="flex-1 min-w-0 space-y-0.5">
                      <h4 className="font-brand font-bold text-sm text-[#141512] truncate">
                        {item.menuItem.name}
                      </h4>
                      <div className="text-[11px] text-stone-500 space-y-0.5 leading-tight">
                        {item.customization.flavorVariant && (
                          <span className="block text-[#141512] font-semibold">Flavor: {item.customization.flavorVariant}</span>
                        )}
                        {item.customization.size && (
                          <span>{item.customization.size} • </span>
                        )}
                        {item.customization.temperature && (
                          <span>{item.customization.temperature}</span>
                        )}
                        {item.customization.mealAddOn && item.customization.mealAddOn !== 'None' && (
                          <span className="block text-amber-800 font-bold">+ {item.customization.mealAddOn}</span>
                        )}
                        {item.customization.drinkAddOn && item.customization.drinkAddOn !== 'None' && (
                          <span className="block text-blue-800 font-bold">+ {item.customization.drinkAddOn}</span>
                        )}
                      </div>
                      <div className="font-mono text-xs font-black text-[#141512] pt-1">
                        ₹{item.unitPrice * item.quantity}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <button
                        onClick={() => onRemoveItem(item.cartItemId)}
                        className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-1.5 bg-[#EFF0DF] rounded-lg p-0.5 border border-[#DFE0D2]">
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-5 h-5 flex items-center justify-center text-xs font-bold text-[#141512]"
                        >
                          -
                        </button>
                        <span className="text-xs font-mono font-bold w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-5 h-5 flex items-center justify-center text-xs font-bold text-[#141512]"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bill Breakdown */}
              <div className="p-3.5 bg-white rounded-2xl border border-[#DFE0D2] space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-mono font-bold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>GST (5% Restaurant)</span>
                  <span className="font-mono font-bold">₹{gstTax}</span>
                </div>
                <div className="pt-2 border-t border-stone-100 flex justify-between font-brand font-black text-sm text-[#141512]">
                  <span>Total Amount</span>
                  <span className="font-mono text-base text-[#141512]">₹{total}</span>
                </div>
              </div>

            </div>

            {/* Bottom Checkout Actions */}
            <div className="p-4 bg-white border-t-2 border-[#141512] space-y-2">
              
              {/* WhatsApp Checkout Button */}
              <button
                onClick={handleSendViaWhatsApp}
                id="whatsapp-checkout-btn"
                className="w-full py-3 px-4 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-brand font-bold text-xs sm:text-sm flex items-center justify-between shadow-xs transition-all"
              >
                <span className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send Order to WhatsApp (+91 97059 81111)</span>
                </span>
                <span className="font-mono font-black text-sm">₹{total}</span>
              </button>

              {/* Direct Kitchen Order Button */}
              <button
                onClick={handleCheckout}
                id="direct-checkout-btn"
                className="w-full py-3 px-4 rounded-2xl bg-[#D4E72B] hover:bg-[#C2D622] text-[#141512] font-brand font-black text-xs sm:text-sm border-2 border-[#141512] shadow-[3px_3px_0px_#141512] flex items-center justify-between transition-all"
              >
                <span>Instant Café Kitchen Order</span>
                <span className="font-mono font-black text-sm">₹{total}</span>
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
