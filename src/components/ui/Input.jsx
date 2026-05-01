import { cn } from "../../lib/utils";

export default function Input({ label, className = "", ...props }) {
  return (
    <label className="block">
      {label && (
        <span className="mb-2 block text-sm font-semibold text-slate-700">
          {label}
        </span>
      )}

      <input
        className={cn(
          "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100",
          className,
        )}
        {...props}
      />
    </label>
  );
}
