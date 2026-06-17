export const PRODUCTS = [
  // Electronics
  { id: 1,  name: "Sony WH-1000XM5 Headphones",   price: 29999, category: "Electronics", emoji: "🎧", rating: 4.8, reviews: 2341, badge: "Bestseller" },
  { id: 2,  name: "Keychron Q3 Mechanical Keyboard", price: 12499, category: "Electronics", emoji: "⌨️", rating: 4.7, reviews: 876 },
  { id: 3,  name: "LG 27\" 4K Monitor",             price: 54999, category: "Electronics", emoji: "🖥️", rating: 4.6, reviews: 512, badge: "New" },
  { id: 4,  name: "Logitech MX Master 3 Mouse",     price: 9499,  category: "Electronics", emoji: "🖱️", rating: 4.9, reviews: 3120, badge: "Top Rated" },
  { id: 5,  name: "iPad Air 11\" (M2)",             price: 74999, category: "Electronics", emoji: "📱", rating: 4.8, reviews: 1890 },
  { id: 6,  name: "10-Port USB-C Hub",              price: 4999,  category: "Electronics", emoji: "🔌", rating: 4.5, reviews: 643 },
  { id: 7,  name: "Anker 65W GaN Charger",          price: 3499,  category: "Electronics", emoji: "⚡", rating: 4.7, reviews: 2100 },
  { id: 8,  name: "Kindle Paperwhite",              price: 14999, category: "Electronics", emoji: "📖", rating: 4.6, reviews: 987 },

  // Home & Office
  { id: 9,  name: "Ergonomic Office Chair",         price: 34999, category: "Home",        emoji: "🪑", rating: 4.5, reviews: 754, badge: "Bestseller" },
  { id: 10, name: "Minimalist Desk Lamp",           price: 3999,  category: "Home",        emoji: "💡", rating: 4.4, reviews: 320 },
  { id: 11, name: "Standing Desk Converter",        price: 12999, category: "Home",        emoji: "🪜", rating: 4.3, reviews: 215 },
  { id: 12, name: "Indoor Plant Set (3 pcs)",       price: 2499,  category: "Home",        emoji: "🪴", rating: 4.6, reviews: 430 },
  { id: 13, name: "Aroma Diffuser",                 price: 2799,  category: "Home",        emoji: "🌸", rating: 4.5, reviews: 680 },
  { id: 14, name: "Wall Clock — Walnut Wood",       price: 3299,  category: "Home",        emoji: "🕐", rating: 4.4, reviews: 190 },

  // Kitchen
  { id: 15, name: "Breville Espresso Machine",      price: 49999, category: "Kitchen",     emoji: "☕", rating: 4.8, reviews: 1230, badge: "Premium" },
  { id: 16, name: "Ceramic Coffee Mug Set (4)",     price: 1499,  category: "Kitchen",     emoji: "🍵", rating: 4.6, reviews: 870 },
  { id: 17, name: "Stainless Steel Water Bottle",   price: 2299,  category: "Kitchen",     emoji: "🫙", rating: 4.7, reviews: 1540 },
  { id: 18, name: "Bamboo Cutting Board Set",       price: 1999,  category: "Kitchen",     emoji: "🔪", rating: 4.5, reviews: 560 },
  { id: 19, name: "Air Fryer 5.5L",                 price: 8999,  category: "Kitchen",     emoji: "🥘", rating: 4.6, reviews: 2310, badge: "Trending" },
  { id: 20, name: "Electric Kettle 1.7L",           price: 2799,  category: "Kitchen",     emoji: "🫖", rating: 4.5, reviews: 1100 },

  // Stationery & Books
  { id: 21, name: "Leuchtturm1917 Notebook A5",     price: 1799,  category: "Stationery",  emoji: "📓", rating: 4.8, reviews: 3400 },
  { id: 22, name: "Lamy Safari Fountain Pen",       price: 3499,  category: "Stationery",  emoji: "🖊️", rating: 4.7, reviews: 1200 },
  { id: 23, name: "Desk Organizer Set",             price: 2199,  category: "Stationery",  emoji: "🗂️", rating: 4.4, reviews: 430 },
  { id: 24, name: "Sticky Note Variety Pack",       price: 499,   category: "Stationery",  emoji: "📌", rating: 4.3, reviews: 890 },

  // Fitness
  { id: 25, name: "Yoga Mat (6mm TPE)",             price: 3499,  category: "Fitness",     emoji: "🧘", rating: 4.6, reviews: 980 },
  { id: 26, name: "Resistance Bands Set (5)",       price: 1799,  category: "Fitness",     emoji: "💪", rating: 4.5, reviews: 2100, badge: "Trending" },
  { id: 27, name: "Adjustable Dumbbells 20kg",      price: 12999, category: "Fitness",     emoji: "🏋️", rating: 4.7, reviews: 643 },
  { id: 28, name: "Fitness Tracker Band",           price: 5999,  category: "Fitness",     emoji: "⌚", rating: 4.4, reviews: 1870 },
];

export const CATEGORIES = ["All", ...new Set(PRODUCTS.map(p => p.category))];

export const DISCOUNT_CODES = {
  SAVE10:  { type: "percent", value: 10,    label: "10% off" },
  SAVE20:  { type: "percent", value: 20,    label: "20% off" },
  FLAT100: { type: "flat",    value: 10000, label: "₹100 off" },
  FLAT500: { type: "flat",    value: 50000, label: "₹500 off" },
  HALFOFF: { type: "percent", value: 50,    label: "50% off" },
  WELCOME: { type: "percent", value: 15,    label: "15% off" },
};
