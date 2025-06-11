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
import ChartHeader from "./ChartHeader";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { dashboardIcons } from "@/bikiran/lib/icons";

type TProps = {
  formData: Record<string, any>;
  onChange: (ev: TInputChangeEvent) => void;
};

const CustomerChart: FC<TProps> = ({ formData, onChange }) => {
  return (
    <div className="bg-white border border-primary-100 rounded-[25px] p-6 pl-0">
      <ChartHeader
        icon={dashboardIcons.userLine}
        title="New Customer/Month"
        formData={formData}
        onChange={onChange}
      />
      <ResponsiveContainer height={340}>
        <BarChart data={chartData.customer} barSize={30}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: "#6b7280" }} />
          <YAxis tick={{ fill: "#6b7280" }} domain={[0, "dataMax + 5"]} />
          <Tooltip
            cursor={{ fill: "transparent" }}
            contentStyle={{ borderRadius: 8 }}
          />
          <Bar
            dataKey="value"
            fill="#FF9100"
            radius={[4, 4, 0, 0]}
            isAnimationActive={true}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomerChart;
