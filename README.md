# ShopCart — Cart & Discount System

A clean, fully functional shopping cart application with real-time total calculation and discount code support.

---

## Features

- Browse 28 products across multiple categories
- Add items to cart, adjust quantity, or remove them
- Apply discount codes (percent-off or flat-off)
- Auto-calculated subtotal, discount, shipping, and final total
- Free shipping threshold nudge (orders over ₹999)
- Wishlist to save favourite products
- Order history with auto-progressing status (Processing → Shipped → Delivered)

---

## Setup & Run Instructions

**Prerequisites:** Node.js ≥ 18.x

```bash
# 1. Clone the repository
git clone https://github.com/LIKITHgh/ShopCart.git
cd ShopCart

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

### Production Build

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build locally
```

---

## Technology Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | React 18 | Component model fits cart state well |
| Build tool | Vite 5 | Fast HMR, zero-config for React |
| Styling | Plain CSS (custom properties) | No extra dependencies, full control |
| State | React `useState` + `useMemo` + Context API | Lightweight; no need for Redux at this scale |
| Language | JSX / JavaScript | Keeps the stack minimal for a focused demo |

---

## Discount Codes

| Code | Effect |
|---|---|
| `SAVE10` | 10% off subtotal |
| `SAVE20` | 20% off subtotal |
| `FLAT100` | ₹100 flat discount |
| `FLAT500` | ₹500 flat discount |
| `HALFOFF` | 50% off subtotal |
| `WELCOME` | 15% off subtotal |

---

## Assumptions Made

1. **Currency**: Prices are stored internally in paise (smallest unit) to avoid floating-point rounding errors, then displayed as ₹ (INR) — appropriate for an Indian market context.
2. **Shipping**: Fixed ₹99 shipping fee; free for orders over ₹999 subtotal (before discounts).
3. **One discount at a time**: Only one code can be applied per order. Applying a new code replaces the old one.
4. **Flat discount cap**: Flat discounts are capped at the subtotal — they cannot produce a negative total.
5. **No backend / persistence**: Cart state is in-memory only; a refresh clears the cart. A real implementation would use a backend or localStorage.

---

## Project Structure

```
ShopCart/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx                  # React entry point
    ├── App.jsx                   # Root component and page router
    ├── index.css                 # Global styles
    ├── context/
    │   └── CartContext.jsx       # Global state — cart, wishlist, orders, discounts
    ├── data/
    │   └── products.js           # Product catalogue and discount code definitions
    ├── components/
    │   ├── Navbar.jsx            # Sticky navigation with cart badge
    │   └── Notification.jsx      # Toast notification component
    └── pages/
        ├── HomePage.jsx          # Shop page with search, filters, and product grid
        ├── CartPage.jsx          # Dedicated cart and order summary page
        ├── WishlistPage.jsx      # Saved / wishlisted products
        └── OrdersPage.jsx        # Order history with expandable details
```

---

## AI Development Note

During development, I used **Claude (Anthropic)** and **GitHub Copilot** as AI-assisted tools to speed up parts of the workflow. Copilot was helpful for boilerplate and repetitive code — things like mapping over product arrays, writing repetitive JSX structure, and quick CSS property completions. Claude was useful when I needed to think through a specific implementation, such as how to structure the cart context or handle the order status progression logic.

That said, the overall design decisions, component architecture, feature choices, and the iterative refinements throughout the project were driven by me. AI tools helped me move faster on the implementation side, but the problem-solving, debugging, and making sure everything fit together correctly was hands-on work. The experience reinforced that these tools are genuinely useful as a productivity aid, but they work best when you already have a clear idea of what you're building and why.
