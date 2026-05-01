import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  PackageSearch,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Store,
  Truck,
} from "lucide-react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import Badge from "../ui/Badge";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
  const features = [
    { icon: PackageSearch, label: "Live price comparison" },
    { icon: ShieldCheck, label: "Verified suppliers" },
    { icon: Truck, label: "Existing delivery flow" },
  ];

  const products = [
    ["Napa 500mg", "10 boxes", "৳2,800", "Best price"],
    ["Seclo 20mg", "8 boxes", "৳3,280", "Verified"],
    ["Surgical Mask", "20 packs", "৳1,600", "In stock"],
  ];

  return (
    <section className="relative overflow-hidden bg-slate-950 pb-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(16,185,129,0.34),transparent_34%),radial-gradient(circle_at_88%_30%,rgba(59,130,246,0.28),transparent_36%),linear-gradient(135deg,#020617_0%,#0f172a_52%,#111827_100%)]" />

      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.08 }}
        >
          <motion.div variants={fadeUp}>
            <Badge tone="emerald">Bangladesh B2B Wholesale Platform</Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 max-w-4xl text-5xl font-black tracking-[-0.06em] text-white md:text-7xl"
          >
            Order wholesale products faster from verified suppliers.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-lg leading-8 text-slate-200"
          >
            A modern B2B marketplace for pharmacies, local shops, and suppliers
            in Bangladesh. Compare prices, build orders, and continue delivery
            through the supplier’s existing distribution system.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link to="/products">
              <Button size="lg">
                Browse Products <ArrowRight size={20} />
              </Button>
            </Link>

            <Link to="/supplier/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/10 text-white hover:bg-white/15"
              >
                Supplier Demo
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-8 grid gap-4 sm:grid-cols-3"
          >
            {features.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-3xl border border-white/15 bg-white/10 p-4 shadow-sm backdrop-blur-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300">
                      <Icon size={20} />
                    </div>
                    <p className="text-sm font-black text-white">
                      {item.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-br from-emerald-400/25 to-blue-400/20 blur-2xl" />

          <div className="relative rounded-[2.5rem] border border-white/15 bg-white/10 p-4 shadow-2xl shadow-emerald-950/30 backdrop-blur-xl">
            <div className="rounded-[2rem] bg-white p-5 text-slate-950 shadow-2xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Live order flow
                  </div>

                  <h3 className="mt-4 text-2xl font-black">Rahman Pharmacy</h3>

                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    Comparing 6 suppliers near Dhaka
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-950 p-3 text-white">
                  <Store size={22} />
                </div>
              </div>

              <div className="mt-6 rounded-3xl bg-slate-950 p-4 text-white">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <p className="text-sm font-black text-slate-300">
                    Smart Basket
                  </p>

                  <span className="rounded-full bg-emerald-400 px-3 py-1 text-xs font-black text-slate-950">
                    Best price selected
                  </span>
                </div>

                <div className="space-y-3">
                  {products.map(([name, qty, price, tag]) => (
                    <div
                      key={name}
                      className="flex items-center justify-between rounded-3xl bg-white/10 p-4"
                    >
                      <div>
                        <p className="font-black">{name}</p>
                        <p className="mt-1 text-sm text-slate-300">{qty}</p>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-black text-emerald-300">
                          {price}
                        </p>
                        <p className="mt-1 text-xs font-bold text-slate-400">
                          {tag}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-emerald-50 p-4">
                  <div className="flex items-center gap-2 text-emerald-700">
                    <CheckCircle2 size={18} />
                    <p className="text-sm font-black">Supplier notified</p>
                  </div>
                  <p className="mt-2 text-xs font-semibold text-slate-500">
                    WhatsApp-ready order message generated.
                  </p>
                </div>

                <div className="rounded-3xl bg-blue-50 p-4">
                  <div className="flex items-center gap-2 text-blue-700">
                    <ShoppingCart size={18} />
                    <p className="text-sm font-black">৳7,680 subtotal</p>
                  </div>
                  <p className="mt-2 text-xs font-semibold text-slate-500">
                    Order saved in database first.
                  </p>
                </div>
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

          <div className="absolute right-12 top-1/2 hidden -translate-y-1/2 rounded-3xl border border-white/20 bg-slate-950/95 p-4 text-white shadow-xl backdrop-blur md:block">
            <div className="flex items-center gap-3">
              <Sparkles className="text-emerald-300" size={22} />
              <div>
                <p className="font-black">Price intelligence</p>
                <p className="text-xs font-semibold text-slate-400">
                  supplier comparison in seconds
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
