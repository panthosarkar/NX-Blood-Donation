import { Skeleton } from "@/bikiran/components/ui/skeleton";
import { FC } from "react";

const InvoiceInfoRow: FC<{
  title: string;
}> = ({ title }) => {
  return (
    <div className="flex items-center justify-between mb-1">
      <div className="text-primary-700 font-normal">{title}:</div>
      <Skeleton className="w-22 h-4" />
    </div>
  );
};

const InvoiceInfoSkeleton: FC = () => {
  return (
    <div className="text-sm w-full">
      <h2 className="text-primary text-base md:text-lg font-medium text-left mb-2">
        Invoice Info
      </h2>
      <InvoiceInfoRow title="Invoice Number" />
      <InvoiceInfoRow title="Date of Issue" />
      <InvoiceInfoRow title="Payment Due Date" />
      <InvoiceInfoRow title="Currency" />
      <InvoiceInfoRow title="Status" />
    </div>
  );
};

export default InvoiceInfoSkeleton;
