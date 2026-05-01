import { CheckCircle2, ClipboardList, Store, Truck } from "lucide-react";

const steps = [
  {
    icon: Store,
    title: "Retailer joins",
    description:
      "Small pharmacy or shop gets access to your supplier’s digital catalog.",
  },
  {
    icon: ClipboardList,
    title: "Order placed",
    description:
      "Retailer selects products, quantity and supplier price from the platform.",
  },
  {
    icon: CheckCircle2,
    title: "Supplier confirms",
    description:
      "Distributor receives structured order and confirms stock availability.",
  },
  {
    icon: Truck,
    title: "Delivery as usual",
    description:
      "Supplier delivers through their existing representative or delivery team.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="rounded-[2.5rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-900/20 lg:p-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-300">
            Platform-only model
          </p>

          <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
            You provide the order system. Supplier handles delivery.
          </h2>

          <p className="mt-4 text-slate-300">
            This is the safest MVP model because you avoid logistics, warehouse,
            driver management and payment complexity in the beginning.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur"
              >
                <div className="absolute right-5 top-4 text-6xl font-black text-white/5">
                  {index + 1}
                </div>

                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400 text-slate-950">
                  <Icon size={24} />
                </div>

                <h3 className="mt-6 text-xl font-black">{step.title}</h3>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
