import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { getTimestamp } from "@/server/utils/time";
import { useAdminSupportData } from "../../context/SupportAdminDataProvider";
import iconProject from "@/public/assets/images/icons/icon-default-app.svg";
import { Button } from "@bikiran/button";

const SupportAdminTableMobileComp: FC = () => {
  const { ticketData } = useAdminSupportData();

  return (
    <div className="flex flex-col gap-[10px]">
      {ticketData &&
        ticketData.map((data, index) => (
          <div key={index} className="bg-primary-100 rounded-10 p-1.5">
            <div className="flex items-center">
              <div className=" support-table-cell-mobile text-secondary !text-lg font-normal ">
                #{data.id}
              </div>
              <div
                className={` support-table-cell-mobile  font-medium  ${
                  data.status === "Pending"
                    ? "text-[#FFAF13]"
                    : data.status === "Open"
                      ? "text-secondary"
                      : data.status === "Closed"
                        ? "text-[#00B631]"
                        : ""
                }`}
              >
                {data.status}
              </div>
            </div>
            <div className=" support-table-cell-mobile text-primary  font-medium ">
              {data.subject}
            </div>
            <div className="flex items-center">
              <div className="support-table-cell-mobile text-primary-700  font-medium ">
                {data.department}
              </div>
              <div className=" support-table-cell-mobile text-primary-700  font-medium ">
                {getTimestamp() - parseInt(data?.timeCreated.toString()) < 86400
                  ? "Today"
                  : getTimestamp() - parseInt(data?.timeCreated.toString()) <
                      172800
                    ? "Yesterday"
                    : new Date(
                        parseInt(data?.timeCreated.toString()) * 1000
                      ).toLocaleDateString()}
              </div>
            </div>
            <div className="flex items-center px-[10px] py-[5px] gap-[10px]">
              <div className="support-table-cell-mobile !px-0 !py-0">
                <div className="flex justify-start items-center">
                  <Image
                    src={data?.projectFavicon || iconProject}
                    alt="icons"
                    width={0}
                    height={0}
                    className="size-8"
                  />
                </div>
              </div>
              <div className="flex justify-start items-center">
                <Button variant="secondary-line">
                  <Link href={`/manage/support/${data.id}/info`}>View</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SupportAdminTableMobileComp;
