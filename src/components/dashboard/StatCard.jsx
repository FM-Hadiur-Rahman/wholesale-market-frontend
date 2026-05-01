import Card from "../ui/Card";

export default function StatCard({ label, value, change, icon: Icon }) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-black text-slate-950">{value}</p>

          {change && (
            <p className="mt-3 text-sm font-bold text-emerald-600">
              {change} from last month
            </p>
          )}
        </div>

        {Icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
            <Icon size={22} />
          </div>
        )}
      </div>
    </Card>
  );
}
