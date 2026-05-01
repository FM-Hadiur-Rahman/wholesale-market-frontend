import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Card from "../ui/Card";
import { formatCurrency } from "../../lib/utils";

export default function RevenueChart({ data = [] }) {
  return (
    <Card className="h-[360px]">
      <div className="mb-6">
        <h3 className="text-xl font-black text-slate-950">
          Order Value Growth
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Monthly platform GMV from wholesale orders.
        </p>
      </div>

      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip
              formatter={(value) => [formatCurrency(value), "Revenue"]}
              contentStyle={{
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#059669"
              fill="#d1fae5"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
