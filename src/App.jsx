import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import OrdersPage from "./pages/OrdersPage";

function Router() {
  const [page, setPage] = useState("home");

  const pages = {
    home: <HomePage setPage={setPage} />,
    cart: <CartPage setPage={setPage} />,
    wishlist: <WishlistPage setPage={setPage} />,
    orders: <OrdersPage setPage={setPage} />,
  };

  return (
    <div className="app">
      <Navbar page={page} setPage={setPage} />
      <Notification />
      <main className="main-content">
        {pages[page] || pages.home}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Router />
    </CartProvider>
  );
}
