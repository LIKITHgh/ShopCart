# ShopCart — Cart & Discount System

A clean, fully functional shopping cart application with real-time total calculation and discount code support.

---

## Features

- Browse 8 products across multiple categories
- Add items to cart, adjust quantity, or remove them
- Apply discount codes (percent-off or flat-off)
- Auto-calculated subtotal, discount, shipping, and final total
- Free shipping threshold nudge (orders over ₹500)
- Fully responsive — works on mobile, tablet, and desktop

---

## Setup & Run Instructions

**Prerequisites:** Node.js ≥ 18.x

```bash
# 1. Clone the repository
git clone https://github.com/your-username/shopcart.git
cd shopcart

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
| State | React `useState` + `useMemo` | Lightweight; no need for Redux at this scale |
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

---

## Assumptions Made

1. **Currency**: Prices are stored internally in paise (smallest unit) to avoid floating-point rounding errors, then displayed as ₹ (INR) — appropriate for an Indian market context.
2. **Shipping**: Fixed ₹99 shipping fee; free for orders over ₹500 subtotal (before discounts).
3. **One discount at a time**: Only one code can be applied per order. Applying a new code replaces the old one.
4. **Flat discount cap**: Flat discounts are capped at the subtotal — they cannot produce a negative total.
5. **No backend / persistence**: Cart state is in-memory only; a refresh clears the cart. A real implementation would use a backend or localStorage.
6. **Checkout is a stub**: The "Proceed to Checkout" button is present for UX completeness but does not navigate anywhere.

---

## Project Structure

```
shopcart/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx       # React entry point
    ├── App.jsx        # All application logic and UI
    └── index.css      # All styles
```

The entire application is intentionally kept in a single component (`App.jsx`) for clarity and ease of review. In a production codebase this would be split into `ProductCard`, `CartItem`, `OrderSummary`, `DiscountInput`, etc.

---

## AI Development Note

This project was built with **Claude (Anthropic)** as the primary AI-assisted development tool. Claude was used to generate the full initial implementation — component structure, state logic, discount calculation, CSS layout, and responsive design — from a plain-English description of requirements. The AI proved particularly effective at:

- Translating business rules (e.g., "flat discount should never produce a negative total") directly into correct validation logic
- Suggesting storing prices in paise to eliminate floating-point issues — a subtle but important correctness decision
- Producing well-organized CSS with a consistent custom-property token system on the first pass

The main challenge was ensuring that the generated code reflected real-world edge cases (empty cart validation, removing items while a discount is applied, the free shipping threshold) rather than only the happy path. These edge cases required iterative prompting and review. The overall experience demonstrated that AI tools dramatically compress the time from spec to working UI, while human judgment remains essential for validating correctness and completeness.
