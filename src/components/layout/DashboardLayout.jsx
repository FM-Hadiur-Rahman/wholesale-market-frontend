import { NavLink } from "react-router-dom";
import {
  BarChart3,
  Boxes,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import { APP_NAME } from "../../lib/constants";

export default function DashboardLayout({
  title,
  subtitle,
  role = "supplier",
  children,
}) {
  const menuByRole = {
    retailer: [
      {
        label: "Dashboard",
        path: "/retailer/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "My Orders",
        path: "/retailer/orders",
        icon: ClipboardList,
      },
      {
        label: "Browse Products",
        path: "/products",
        icon: Boxes,
      },
    ],
    supplier: [
      {
        label: "Dashboard",
        path: "/supplier/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Products",
        path: "/supplier/products",
        icon: Boxes,
      },
      {
        label: "Orders",
        path: "/supplier/orders",
        icon: ClipboardList,
      },
      {
        label: "Analytics",
        path: "/supplier/dashboard",
        icon: BarChart3,
      },
    ],
    admin: [
      {
        label: "Dashboard",
        path: "/admin/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Suppliers",
        path: "/admin/dashboard",
        icon: Users,
      },
      {
        label: "Orders",
        path: "/admin/dashboard",
        icon: ClipboardList,
      },
      {
        label: "Settings",
        path: "/admin/dashboard",
        icon: Settings,
      },
    ],
  };

  const menu = menuByRole[role] || menuByRole.supplier;

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${
      isActive
        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
    }`;

  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[280px_1fr] lg:px-8">
      <aside className="h-fit rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-6 rounded-3xl bg-slate-950 p-5 text-white">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">
            {APP_NAME}
          </p>
          <h2 className="mt-2 text-xl font-black capitalize">{role} Portal</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Manage wholesale orders, products and performance.
          </p>
        </div>

        <nav className="flex flex-col gap-2">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink key={item.label} to={item.path} className={navClass}>
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <button className="mt-6 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50">
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      <div>
        <div className="mb-6 rounded-[2rem] bg-gradient-to-r from-slate-950 to-emerald-900 p-6 text-white shadow-xl shadow-slate-900/10">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-300">
            Live Workspace
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-tight">{title}</h1>

          {subtitle && (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-200">
              {subtitle}
            </p>
          )}
        </div>

        {children}
      </div>
    </section>
  );
}
