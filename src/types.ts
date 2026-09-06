export type Category = 
  | 'all' 
  | 'coffee' 
  | 'shakes' 
  | 'mocktails' 
  | 'appetizers' 
  | 'pizzas_pastas' 
  | 'combos';

export interface MenuItem {
  id: string;
  name: string;
  category: Category;
  description: string;
  price: number; // in INR (₹)
  image: string;
  isVeg: boolean;
  isPopular?: boolean;
  isChefSpecial?: boolean;
  spicyLevel?: number; // 0: mild, 1: medium, 2: spicy, 3: extra hot
  calories?: number;
  preparationTime?: string;
  tastingNotes?: string[];
  customizable: boolean;
  options?: string[]; // e.g. ["Mint", "Raspberry", "Cucumber", "Lavender", "Ginger"]
}

export interface CustomizationOptions {
  size: 'Regular' | 'Large' | 'Monster / Jar';
  temperature: 'Hot' | 'Iced' | 'Blended Frappé';
  milk: 'Standard Milk' | 'Oat Milk (+₹40)' | 'Almond Milk (+₹40)' | 'Coconut Milk (+₹40)' | 'No Milk';
  sweetness: 'No Sugar (0%)' | 'Less Sweet (25%)' | 'Standard (50%)' | 'Sweet (100%)';
  flavorVariant?: string; // e.g. for Mojito / Iced Tea / Shake flavor
  extraShot: boolean; // +₹40
  extraSauceOrSyrup?: string;
  mealAddOn?: 'None' | 'Szechwan Fried Rice (+₹79)' | 'Chilli Garlic Fried Rice (+₹79)' | 'Hakka Fried Rice (+₹79)';
  drinkAddOn?: 'None' | 'Watermelon Slush (+₹69)' | 'Fresh Lime (+₹69)' | 'Mango Tango (+₹69)';
  specialNote?: string;
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  customization: CustomizationOptions;
  quantity: number;
  unitPrice: number;
}

export interface Reservation {
  id: string;
  guestName: string;
  phone: string;
  email?: string;
  date: string;
  timeSlot: string;
  guests: number;
  seatingArea: 'Indoor AC Lounge' | 'Alfresco Friends Patio' | 'Youth Community Table' | 'Private Birthday Corner';
  occasion?: 'Casual Hangout' | 'Birthday Celebration' | 'Work / Study Date' | 'Group Gathering';
  specialRequest?: string;
  createdAt: string;
}

export interface FavoriteItem {
  id: string;
  rank: number;
  name: string;
  categoryLabel: string;
  category: Category;
  priceDisplay: string;
  basePrice: number;
  culinaryProfile: string;
  whyItSells: string;
  picturePromptRef: string;
  image: string;
  isVeg: boolean;
  spicyLevel?: number;
  tags: string[];
  options?: string[];
}

export interface BrewStep {
  stepNumber: number;
  instruction: string;
  targetSeconds: number;
  waterAddedGrams: number;
  tip?: string;
}

export interface BrewMethod {
  id: string;
  name: string;
  tagline: string;
  grindSize: string;
  recommendedRatio: number; // e.g. 15 for 1:15
  defaultCoffeeGrams: number;
  waterTempC: number;
  totalTimeSeconds: number;
  steps: BrewStep[];
}

export interface CafeLocation {
  id: string;
  name: string;
  address: string;
  area: string;
  city: string;
  landmark: string;
  phone: string;
  whatsapp: string;
  timings: string;
  status: 'Open Now' | 'Closes at 11 PM';
  vibe: string;
  features: string[];
  googleMapsUrl: string;
  coordinates: { lat: number; lng: number };
}
