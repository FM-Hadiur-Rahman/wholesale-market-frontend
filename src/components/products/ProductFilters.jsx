import { Search, SlidersHorizontal } from "lucide-react";
import Input from "../ui/Input";
import { categories } from "../../lib/constants";

export default function ProductFilters({
  search,
  setSearch,
  category,
  setCategory,
}) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-4 lg:grid-cols-[1fr_260px_auto]">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products, medicine, supplier..."
            className="pl-12"
          />
        </div>

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
        >
          <option value="All">All categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white">
          <SlidersHorizontal size={18} />
          Filters
        </button>
      </div>
    </div>
  );
}
