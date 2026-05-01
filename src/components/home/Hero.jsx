import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  PackageSearch,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import Badge from "../ui/Badge";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,#bbf7d0,transparent_32%),radial-gradient(circle_at_90%_50%,#dbeafe,transparent_34%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <Badge>Bangladesh B2B Wholesale Platform</Badge>

          <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-[-0.05em] text-slate-950 md:text-7xl">
            Wholesale ordering for pharmacies and local shops.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Retailers can compare supplier prices, place orders online, and
            receive delivery through the supplier’s existing distribution
            system.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/products">
              <Button size="lg">
                Browse Products <ArrowRight size={20} />
              </Button>
            </Link>

            <Link to="/supplier/dashboard">
              <Button size="lg" variant="outline">
                Supplier Demo
              </Button>
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: PackageSearch, label: "Compare prices" },
              { icon: ShieldCheck, label: "Verified suppliers" },
              { icon: Truck, label: "Usual delivery" },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-3xl border border-slate-200 bg-white/85 p-4 shadow-sm backdrop-blur-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                      <Icon size={20} />
                    </div>
                    <p className="text-sm font-black text-slate-700">
                      {item.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="relative"
        >
          <div className="rounded-[2.5rem] border border-slate-200 bg-white/80 p-4 shadow-2xl shadow-slate-900/10 backdrop-blur">
            <div className="rounded-[2rem] bg-[#050816] p-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-black text-emerald-300">
                    Today’s Order Flow
                  </p>
                  <h3 className="mt-1 text-2xl font-black">Rahman Pharmacy</h3>
                </div>

                <Badge tone="emerald">Live</Badge>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  ["Napa 500mg", "10 boxes", "৳2,800"],
                  ["Seclo 20mg", "8 boxes", "৳3,280"],
                  ["Surgical Mask", "20 packs", "৳1,600"],
                ].map(([name, qty, price]) => (
                  <div
                    key={name}
                    className="flex items-center justify-between rounded-3xl bg-white/10 p-4"
                  >
                    <div>
                      <p className="font-black">{name}</p>
                      <p className="mt-1 text-sm text-slate-300">{qty}</p>
                    </div>

                    <p className="text-lg font-black text-emerald-300">
                      {price}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-3xl bg-emerald-500 p-4 text-slate-950">
                <p className="font-black">Supplier notified</p>
                <p className="mt-1 text-xs font-bold">
                  Delivery continues through existing distributor system.
                </p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-7 -left-5 hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-xl md:block">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <BadgeCheck size={22} />
              </div>
              <div>
                <p className="text-3xl font-black text-slate-950">18%</p>
                <p className="text-sm font-bold text-slate-500">
                  faster ordering
                </p>
              </div>
            </div>
          </div>

          <div className="absolute -right-4 -top-6 hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-xl md:block">
            <div className="flex items-center gap-3">
              <Building2 className="text-emerald-700" size={22} />
              <div>
                <p className="font-black text-slate-950">Supplier-first</p>
                <p className="text-sm font-bold text-slate-500">
                  no delivery change
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
