import { createContext, useContext, useState, useMemo } from "react";
import { DISCOUNT_CODES, PRODUCTS } from "../data/products";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState({});
  const [wishlist, setWishlist] = useState(new Set());
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [appliedCode, setAppliedCode] = useState("");
  const [orders, setOrders] = useState([]);
  const [notification, setNotification] = useState(null);

  function showNotification(msg, type = "success") {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 2500);
  }

  function addToCart(product) {
    setCart(c => ({ ...c, [product.id]: (c[product.id] || 0) + 1 }));
    showNotification(`${product.name} added to cart`);
  }

  function updateQty(id, delta) {
    setCart(c => {
      const next = (c[id] || 0) + delta;
      if (next <= 0) { const { [id]: _, ...rest } = c; return rest; }
      return { ...c, [id]: next };
    });
  }

  function removeFromCart(id) {
    setCart(c => { const { [id]: _, ...rest } = c; return rest; });
  }

  function clearCart() {
    setCart({});
    setAppliedDiscount(null);
    setAppliedCode("");
  }

  function toggleWishlist(product) {
    setWishlist(w => {
      const next = new Set(w);
      if (next.has(product.id)) { next.delete(product.id); showNotification(`Removed from wishlist`, "info"); }
      else { next.add(product.id); showNotification(`${product.name} wishlisted ❤️`); }
      return next;
    });
  }

  function applyDiscount(code) {
    const c = code.trim().toUpperCase();
    if (!c) return { error: "Please enter a discount code." };
    if (Object.keys(cart).length === 0) return { error: "Add items to cart first." };
    const discount = DISCOUNT_CODES[c];
    if (!discount) return { error: "Invalid code. Try SAVE10, SAVE20, FLAT100, FLAT500, HALFOFF or WELCOME." };
    setAppliedDiscount(discount);
    setAppliedCode(c);
    showNotification(`Code "${c}" applied — ${discount.label}!`);
    return { success: true };
  }

  function removeDiscount() {
    setAppliedDiscount(null);
    setAppliedCode("");
  }

  function placeOrder({ subtotal, discountAmount, shipping, total }) {
    const enrichedItems = Object.entries(cart)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => {
        const p = PRODUCTS.find(x => x.id === Number(id));
        return { name: p.name, emoji: p.emoji, qty, price: p.price };
      });

    const newOrder = {
      id: "ORD-" + Date.now(),
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      status: "Processing",
      items: enrichedItems,
      subtotal,
      discountAmount,
      discountLabel: appliedDiscount ? `${appliedCode} — ${appliedDiscount.label}` : null,
      shipping,
      total,
    };

    setOrders(prev => [newOrder, ...prev]);
    setCart({});
    setAppliedDiscount(null);
    setAppliedCode("");
  }

  const cartItems = useMemo(() =>
    Object.entries(cart)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => ({ id: Number(id), qty })),
    [cart]
  );

  const itemCount = useMemo(() => cartItems.reduce((a, b) => a + b.qty, 0), [cartItems]);

  return (
    <CartContext.Provider value={{
      cart, cartItems, itemCount,
      wishlist,
      appliedDiscount, appliedCode,
      notification,
      addToCart, updateQty, removeFromCart, clearCart,
      toggleWishlist,
      applyDiscount, removeDiscount,
      orders, placeOrder,
      showNotification,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
