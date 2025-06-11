import { FC } from "react";
import { icons } from "@/bikiran/lib/icons";
import { GetTime } from "@/bik-lib/utils/date";
import { useInvoiceInfo } from "./context/InvoiceManageProvider";
import { TInvoiceActivity } from "@/bik-lib/types/invoice";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import UserSkeletonComp from "@/bikiran/shared/user-search/UserSkeletonComp";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { CustomSidebar } from "@bikiran/utils";
import { usePathname } from "next/navigation";

const ActivityItem: FC<{ data: TInvoiceActivity; photoUrl: string }> = ({
  data,
  photoUrl,
}) => {
  return (
    <div className="flex items-start gap-[14px] py-3 px-3 w-full">
      <div className="size-9 flex-shrink-0 mt-1">
        <Avatar className="relative !size-full mb-3 group">
          <AvatarImage src={photoUrl || icons.iconBikLogo} />
          <AvatarFallback className="uppercase bg-secondary-300">
            X
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-col overflow-hidden">
        <div className="text-sm text-primary overflow-hidden">
          <p className="font-medium whitespace-nowrap text-ellipsis overflow-hidden">
            {data?.description}
          </p>
          {/* <small className=""> {item.description}</small> */}
        </div>
        <div className="text-primary-700 text-sm font-normal">
          {GetTime(data?.timeCreated)}
        </div>
      </div>
    </div>
  );
};

const InvoiceActivitiesComp: FC = () => {
  const { invoiceInfo, loading } = useInvoiceInfo();
  const { openModal } = useTemplate();

  const { activity, invoiceOwner } = invoiceInfo;

  return (
    <div className="invoice-action-cont">
      <div className="flex flex-col justify-between items-start overflow-y-auto">
        <div className="flex items-center justify-between w-full mb-4">
          <h2 className="text-primary text-xl font-medium">Activities</h2>
          {activity?.length !== 0 && (
            <button
              type="button"
              onClick={() => openModal("activity-sidebar", activity)}
              className="text-primary-500 text-sm font-medium hover:border-b hover:text-primary"
            >
              View All
            </button>
          )}
        </div>

        {loading && <UserSkeletonComp />}

        {!loading && activity?.length === 0 && (
          <div className="text-sm text-primary-700">Not activity found!</div>
        )}

        {!loading &&
          activity
            ?.slice(0, 6)
            ?.map((item) => (
              <ActivityItem
                key={item.id}
                data={item}
                photoUrl={invoiceOwner?.photoUrl}
              />
            ))}

        <CustomSidebar
          showType="activity-sidebar"
          usePathname={usePathname}
          useTemplate={useTemplate}
          className="max-w-[600px]"
        >
          <h2 className="text-primary text-xl font-medium mb-2">Activities</h2>
          {!loading &&
            activity?.map((item) => (
              <ActivityItem
                key={item.id}
                data={item}
                photoUrl={invoiceOwner?.photoUrl}
              />
            ))}
        </CustomSidebar>
      </div>
    </div>
  );
};

export default InvoiceActivitiesComp;
