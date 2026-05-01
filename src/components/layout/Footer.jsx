import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Store, MessageCircle } from "lucide-react";
import { APP_NAME } from "../../lib/constants";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white">
              <Store size={22} />
            </div>

            <div>
              <p className="text-lg font-black text-slate-950">{APP_NAME}</p>
              <p className="text-xs font-semibold text-slate-500">
                Bangladesh B2B wholesale ordering platform
              </p>
            </div>
          </div>

          <p className="mt-5 max-w-md text-sm leading-7 text-slate-500">
            Helping small pharmacies, shops and suppliers digitize orders,
            compare wholesale prices and grow faster without changing their
            existing delivery process.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-slate-950">Platform</h4>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-500">
            <Link to="/products">Browse Products</Link>
            <Link to="/retailer/dashboard">Retailer Dashboard</Link>
            <Link to="/supplier/dashboard">Supplier Dashboard</Link>
            <Link to="/admin/dashboard">Admin</Link>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-slate-950">Contact</h4>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <MapPin size={16} /> Dhaka, Bangladesh
            </span>
            <span className="flex items-center gap-2">
              <Phone size={16} /> +880 1700 000000
            </span>
            <span className="flex items-center gap-2">
              <Mail size={16} /> hello@bazaarlink.com
            </span>
            <span className="flex items-center gap-2">
              <MessageCircle size={16} /> Facebook: BazaarLink BD
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 px-4 py-5 text-center text-xs font-semibold text-slate-500">
        © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
      </div>
    </footer>
  );
}
