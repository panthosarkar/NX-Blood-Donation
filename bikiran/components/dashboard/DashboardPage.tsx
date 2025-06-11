"use client";
import { dashboardIcons } from "@/bikiran/lib/icons";
import RevenueChart from "./RevenueChart";
import CustomerChart from "./CustomerChart";
import OverviewHeaderCard from "./OverviewHeaderCard";
import { useState } from "react";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import dayjs from "dayjs";

const DashboardPage = () => {
  const [formData, setFormData] = useState<Record<string, any>>({
    type: "this-year",
    dateFrom: dayjs().startOf("year").format("YYYY-MM-DD"),
    dateTo: dayjs().endOf("year").format("YYYY-MM-DD"),
  });

  const onChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    if (value === "next") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        dateFrom: dayjs().format("YYYY-MM-DD"),
        dateTo: dayjs().add(1, "month").format("YYYY-MM-DD"),
      }));
    }
    if (value === "this") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        dateFrom: dayjs().startOf("month").format("YYYY-MM-DD"),
        dateTo: dayjs().endOf("month").format("YYYY-MM-DD"),
      }));
    }
    if (value === "last") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        dateFrom: dayjs()
          .subtract(1, "month")
          .startOf("month")
          .format("YYYY-MM-DD"),
        dateTo: dayjs()
          .subtract(1, "month")
          .endOf("month")
          .format("YYYY-MM-DD"),
      }));
    }
    if (value === "this-year") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        dateFrom: dayjs().startOf("year").format("YYYY-MM-DD"),
        dateTo: dayjs().endOf("year").format("YYYY-MM-DD"),
      }));
    }
    if (value === "last-year") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        dateFrom: dayjs()
          .subtract(1, "year")
          .startOf("year")
          .format("YYYY-MM-DD"),
        dateTo: dayjs().subtract(1, "year").endOf("year").format("YYYY-MM-DD"),
      }));
    }
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <OverviewHeaderCard
          icon={dashboardIcons.userFill}
          title="Total Registered"
          subtext="Customer"
          value="167"
          valueColor="#FF9100"
          bgColor="#FFF3E2"
        />
        <OverviewHeaderCard
          icon={dashboardIcons.subscription}
          title="Active Sale"
          subtext="Subscription"
          value="124"
          valueColor="#00BAF6"
          bgColor="#E0F7FF"
        />
        <OverviewHeaderCard
          icon={dashboardIcons.graphFill}
          title="Revenue Groth"
          subtext="Last 1 year"
          value={
            <div className="text-center">
              <span className="text-base block leading-3">BDT</span>
              <span>2.4M</span>
            </div>
          }
          valueColor="#F000FF"
          bgColor="#FDEAFF"
        />
      </div>

      <CustomerChart formData={formData} onChange={onChange} />
      <RevenueChart formData={formData} onChange={onChange} />
    </div>
  );
};
export default DashboardPage;
