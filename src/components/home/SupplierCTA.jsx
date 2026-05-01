import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, BellRing, PackagePlus } from "lucide-react";
import Button from "../ui/Button";

export default function SupplierCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="overflow-hidden rounded-[2.5rem] bg-slate-950 shadow-2xl shadow-slate-900/20">
        <div className="grid gap-8 p-8 md:grid-cols-[1.1fr_0.9fr] lg:p-12">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-300">
              For suppliers
            </p>

            <h2 className="mt-4 max-w-2xl text-4xl font-black tracking-tight text-white md:text-5xl">
              Receive retailer orders digitally. Deliver as usual.
            </h2>

            <p className="mt-5 max-w-xl text-slate-300">
              Start with your current product catalog, your current sales reps
              and your current delivery process. BazaarLink simply gives you a
              modern order channel.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/supplier/dashboard">
                <Button size="lg">
                  View Supplier Demo <ArrowRight size={20} />
                </Button>
              </Link>

              <Link to="/register">
                <Button size="lg" variant="outline">
                  Join as Supplier
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            {[
              {
                icon: PackagePlus,
                title: "Upload products",
                text: "Add pharma, stationery, beauty or other wholesale items.",
              },
              {
                icon: BellRing,
                title: "Receive orders",
                text: "Get structured orders instead of messy phone calls.",
              },
              {
                icon: BarChart3,
                title: "Track performance",
                text: "See top products, order volume and retailer activity.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-white/10 p-5 text-white"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400 text-slate-950">
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-4 text-lg font-black">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-300">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
