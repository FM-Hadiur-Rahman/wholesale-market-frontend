import { BadgeCheck, Building2, ShieldCheck, Users } from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    value: "Verified",
    label: "supplier onboarding",
  },
  {
    icon: Users,
    value: "Retailer-first",
    label: "simple ordering flow",
  },
  {
    icon: Building2,
    value: "B2B",
    label: "made for Bangladesh market",
  },
  {
    icon: BadgeCheck,
    value: "No logistics",
    label: "supplier delivers as usual",
  },
];

export default function TrustSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-5 md:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.label} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <Icon size={24} />
                </div>

                <p className="mt-4 text-2xl font-black text-slate-950">
                  {item.value}
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-500">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
