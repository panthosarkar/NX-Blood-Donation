import { FC } from "react";
import {
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";
import chartData from "./dashboard.json";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import ChartHeader from "./ChartHeader";
import { dashboardIcons } from "@/bikiran/lib/icons";

type TProps = {
  formData: Record<string, any>;
  onChange: (ev: TInputChangeEvent) => void;
};

const RevenueChart: FC<TProps> = ({ formData, onChange }) => {
  return (
    <div className="bg-white border border-primary-100 rounded-[25px] p-6 pl-0">
      <ChartHeader
        icon={dashboardIcons.graphLine}
        title="Revenue/Month"
        formData={formData}
        onChange={onChange}
      />
      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={chartData.revenue} barSize={30}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: "#6b7280" }} />
          <YAxis
            domain={[0, (dataMax: number) => dataMax + dataMax * 0.1]} // add 10% headroom
            tickFormatter={(v) => `${v / 1000}k`}
            tick={{ fill: "#6b7280" }}
          />
          <Tooltip
            cursor={{ fill: "transparent" }}
            contentStyle={{ borderRadius: 8 }}
            formatter={(value) => `BDT ${value}`}
          />
          <Bar
            dataKey="value"
            fill="#F000FF"
            radius={[4, 4, 0, 0]}
            isAnimationActive={true}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
