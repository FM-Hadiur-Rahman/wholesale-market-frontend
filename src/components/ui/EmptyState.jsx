import { PackageSearch } from "lucide-react";
import Card from "./Card";
import Button from "./Button";

export default function EmptyState({
  title = "Nothing found",
  description = "Try changing your filters or search keywords.",
  actionLabel,
  onAction,
}) {
  return (
    <Card className="flex flex-col items-center justify-center py-14 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-500">
        <PackageSearch size={28} />
      </div>

      <h3 className="text-xl font-bold text-slate-950">{title}</h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        {description}
      </p>

      {actionLabel && (
        <Button className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </Card>
  );
}
