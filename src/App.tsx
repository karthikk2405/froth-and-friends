import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FavoritesSection } from './components/FavoritesSection';
import { VillaExperienceSection } from './components/VillaExperienceSection';
import { MenuSection } from './components/MenuSection';
import { ReservationSection } from './components/ReservationSection';
import { LocationsSection } from './components/LocationsSection';
import { StorySection } from './components/StorySection';
import { ItemCustomizeModal } from './components/ItemCustomizeModal';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { MENU_ITEMS } from './data/cafeData';
import { TOP_FAVORITES, favoriteToMenuItem } from './data/favoritesData';
import { MenuItem, CartItem, CustomizationOptions, Category } from './types';
import { Check, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Smooth scroll reveal container for homepage sections
interface ScrollRevealSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  id?: string;
}

const ScrollRevealSection: React.FC<ScrollRevealSectionProps> = ({
  children,
  delay = 0,
  className = '',
  id,
}) => {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedItemForCustomize, setSelectedItemForCustomize] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [menuInitialCategory, setMenuInitialCategory] = useState<Category>('all');

  // Open menu with a specific category (e.g. combos, coffees, etc.)
  const handleOpenMenuWithCategory = (category: Category = 'all') => {
    setMenuInitialCategory(category);
    setActiveTab('menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Full catalog combining top bestsellers + standard cafe menu
  const allMenuItems: MenuItem[] = [
    ...TOP_FAVORITES.map(favoriteToMenuItem),
    ...MENU_ITEMS,
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Add to cart with customization
  const handleAddToCart = (
    item: MenuItem,
    customization: CustomizationOptions,
    quantity: number,
    unitPrice: number
  ) => {
    const cartItemId = `${item.id}-${Date.now()}`;
    const newCartItem: CartItem = {
      cartItemId,
      menuItem: item,
      customization,
      quantity,
      unitPrice,
    };

    setCartItems((prev) => [...prev, newCartItem]);
    showToast(`Added ${quantity}x ${item.name} to your order bag`);
  };

  // Quick add with default settings
  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultCustomization: CustomizationOptions = {
      size: 'Regular',
      temperature: item.category === 'shakes' || item.category === 'mocktails' ? 'Iced' : 'Hot',
      milk: 'Standard Milk',
      sweetness: 'Standard (50%)',
      extraShot: false,
    };

    handleAddToCart(item, defaultCustomization, 1, item.price);
  };

  // Update item quantity
  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  // Remove item
  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  // Clear cart
  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FBFBF6] text-[#141512] flex flex-col selection:bg-[#D4E72B] selection:text-[#141512]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-[#141512] text-white px-4 py-3 rounded-2xl shadow-[4px_4px_0px_#D4E72B] border-2 border-[#141512] flex items-center gap-2.5 text-xs font-brand font-bold animate-fadeIn">
          <div className="w-5 h-5 rounded-full bg-[#D4E72B] text-[#141512] flex items-center justify-center shrink-0 font-black">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span>{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 text-[11px] text-[#D4E72B] font-black hover:underline flex items-center gap-1"
          >
            <ShoppingBag className="w-3 h-3" /> View Bag
          </button>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReserve={() => {
          setActiveTab('reserve');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Pages with Motion Transitions */}
      <main className="flex-1 overflow-x-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero Section */}
              <HeroSection
                onExploreMenu={() => handleOpenMenuWithCategory('all')}
                onOpenReserve={() => {
                  setActiveTab('reserve');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onSelectItem={(item) => setSelectedItemForCustomize(item)}
                featuredItems={allMenuItems}
              />

              {/* The 10 Most Ordered Favorites / Bestsellers with reveal & animated scrolling */}
              <ScrollRevealSection id="section-favorites" delay={0.06}>
                <FavoritesSection
                  onSelectItem={(item) => setSelectedItemForCustomize(item)}
                  onQuickAdd={handleQuickAdd}
                  onExploreFullMenu={() => handleOpenMenuWithCategory('all')}
                  onViewCombos={() => handleOpenMenuWithCategory('combos')}
                />
              </ScrollRevealSection>

              {/* Converted Duplex Villa Ambiance, Lotus Lounge & Instagram Showcase */}
              <ScrollRevealSection id="section-villa" delay={0.06}>
                <VillaExperienceSection
                  onOpenReserve={() => {
                    setActiveTab('reserve');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onOpenLocations={() => {
                    setActiveTab('locations');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </ScrollRevealSection>
            </motion.div>
          )}

          {activeTab === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="pt-2"
            >
              <MenuSection
                items={allMenuItems}
                onSelectItem={(item) => setSelectedItemForCustomize(item)}
                onQuickAdd={handleQuickAdd}
                initialCategory={menuInitialCategory}
              />
            </motion.div>
          )}

          {activeTab === 'reserve' && (
            <motion.div
              key="reserve"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="pt-2"
            >
              <ReservationSection />
            </motion.div>
          )}

          {activeTab === 'locations' && (
            <motion.div
              key="locations"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="pt-2"
            >
              <LocationsSection />
            </motion.div>
          )}

          {activeTab === 'story' && (
            <motion.div
              key="story"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="pt-2"
            >
              <StorySection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Item Customizer Modal */}
      <ItemCustomizeModal
        item={selectedItemForCustomize}
        onClose={() => setSelectedItemForCustomize(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Shopping Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Footer */}
      <Footer onNavigate={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

    </div>
  );
}
