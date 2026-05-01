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
  const [open, setOpen] = useState(false);
  const { cart } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  const navClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      isActive
        ? "bg-emerald-50 text-emerald-700"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
    }`;

  return (
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
          <Button variant="ghost" onClick={() => setCartOpen(true)}>
            <ShoppingCart size={18} />
            Cart ({cart.length})
          </Button>

          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>

          <Link to="/register">
            <Button>Join Platform</Button>
          </Link>
        </div>

        <button
          onClick={() => setOpen((value) => !value)}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={navClass}
              >
                {link.label}
              </NavLink>
            ))}

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Link to="/login" onClick={() => setOpen(false)}>
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>

              <Link to="/register" onClick={() => setOpen(false)}>
                <Button className="w-full">Join</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
