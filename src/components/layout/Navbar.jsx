import { Link, NavLink } from "react-router-dom";
import { Menu, ShoppingCart, Store, X } from "lucide-react";
import { useState } from "react";
import Button from "../ui/Button";
import { APP_NAME } from "../../lib/constants";
import { useCart } from "../../context/CartContext";
import CartDrawer from "../cart/CartDrawer";

const links = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Retailer", path: "/retailer/dashboard" },
  { label: "Supplier", path: "/supplier/dashboard" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { cart, cartCount } = useCart();

  const totalItems =
    cartCount || cart.reduce((total, item) => total + item.quantity, 0);

  const navClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      isActive
        ? "bg-emerald-50 text-emerald-700"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
    }`;

  const openCart = () => {
    setMenuOpen(false);
    setCartOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/25">
              <Store size={22} />
            </div>

            <div>
              <p className="text-lg font-black tracking-tight text-slate-950">
                {APP_NAME}
              </p>
              <p className="-mt-1 text-xs font-semibold text-slate-500">
                B2B Wholesale Market
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            {links.map((link) => (
              <NavLink key={link.path} to={link.path} className={navClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={openCart}
              className="relative inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
            >
              <ShoppingCart size={18} />
              Cart
              {totalItems > 0 && (
                <span className="ml-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-emerald-600 px-2 text-xs font-black text-white">
                  {totalItems}
                </span>
              )}
            </button>

            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>

            <Link to="/register">
              <Button>Join Platform</Button>
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={openCart}
              className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700"
            >
              <ShoppingCart size={21} />

              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1.5 text-[11px] font-black text-white">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-xl lg:hidden">
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={navClass}
                >
                  {link.label}
                </NavLink>
              ))}

              <button
                type="button"
                onClick={openCart}
                className="mt-2 flex items-center justify-between rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-700"
              >
                <span className="flex items-center gap-2">
                  <ShoppingCart size={18} />
                  View Cart
                </span>

                <span>{totalItems} items</span>
              </button>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>

                <Link to="/register" onClick={() => setMenuOpen(false)}>
                  <Button className="w-full">Join</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {totalItems > 0 && (
        <button
          type="button"
          onClick={openCart}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-2xl bg-emerald-600 px-5 py-4 text-sm font-black text-white shadow-2xl shadow-emerald-600/30 transition hover:bg-emerald-700 lg:hidden"
        >
          <ShoppingCart size={20} />
          Cart
          <span className="rounded-full bg-white px-2 py-1 text-xs text-emerald-700">
            {totalItems}
          </span>
        </button>
      )}

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
