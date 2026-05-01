import {
  BriefcaseBusiness,
  HeartPulse,
  NotebookPen,
  Paintbrush,
  ShoppingBasket,
  Wrench,
} from "lucide-react";
import { categories } from "../../lib/constants";

const icons = {
  Pharmaceuticals: HeartPulse,
  Stationery: NotebookPen,
  Beauty: Paintbrush,
  Tiles: BriefcaseBusiness,
  Grocery: ShoppingBasket,
  Hardware: Wrench,
};

const descriptions = {
  Pharmaceuticals: "Medicine and pharmacy supply ordering.",
  Stationery: "Office, school and shop stationery stock.",
  Beauty: "Cosmetics, salon and beauty wholesale.",
  Tiles: "Tiles, sanitary and construction supply.",
  Grocery: "Daily retail goods and FMCG products.",
  Hardware: "Tools, parts and hardware wholesale.",
};

export default function CategoryStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-600">
            Categories
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
            Start with pharma. Expand into every wholesale sector.
          </h2>
        </div>

        <p className="max-w-xl text-sm leading-6 text-slate-500">
          Your platform can begin with one distributor, then grow into a
          multi-category B2B marketplace for Bangladesh.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {categories.map((category) => {
          const Icon = icons[category] || ShoppingBasket;

          return (
            <div
              key={category}
              className="group rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
            >
              <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white">
                <Icon size={23} />
              </div>

              <h3 className="mt-5 font-black text-slate-950">{category}</h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {descriptions[category]}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
