import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { FC, useState } from "react";
import { TStatus, TAppsLoadBalancerItem } from "./AppsLoadBalancerType";
import { useAppsLoadBalancer } from "./context/AppsLoadBalancerProvider";
import AppsLoadBalancerSkeletonWeb from "./AppsLoadBalancerSkeletonWeb";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { TPagination } from "@/bik-lib/types/response";
import { UserInfoComp } from "@bikiran/utils";
import Image from "next/image";
import StatusColor from "@/bik-lib/utils/statusColor";

type TProps = {
  data: {
    appsBalancer: TAppsLoadBalancerItem[];
    status: TStatus[];
    pagination: TPagination;
  };
};

const TableRow: FC<{ data: TAppsLoadBalancerItem }> = ({ data }) => {
  const { modalData, openModal } = useTemplate();

  return (
    <tr>
      <td className="text-center">{data?.id}</td>
      <td className="text-left">
        <UserInfoComp
          photoUrl={data?.photoUrl.trimEnd()}
          name={data?.name}
          email={data?.email}
          ImageComponent={Image}
        />
      </td>

      <td className="text-center">{data?.apps || "--"}</td>
      <td className="text-center">
        <StatusColor status={data.status} />
      </td>
      <td>
        <div className="w-full flex justify-end">
          <InstOption className="size-7">
            {/* <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openModal("update-user", data);
              }}
            >
              Update
            </button> */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openModal("status-Update", data);
              }}
            >
              Update Status
            </button>
          </InstOption>
        </div>
      </td>
    </tr>
  );
};

const AppsLoadBalancerWeb: FC<TProps> = ({ data }) => {
  const { loading } = useAppsLoadBalancer();
  const placeholder = Array.from(
    { length: data?.appsBalancer?.length || 3 },
    (_, i) => i
  );

  return (
    <table
      cellPadding={0}
      cellSpacing={0}
      className="table-container table-fixed"
    >
      <thead>
        <tr>
          <th className="!text-center w-[100px]">ID</th>
          <th className="text-left w-[260px]">User/Name</th>

          <th className="text-center w-[650px]">LoadBalancer</th>
          <th className="text-center w-[100px]">Status</th>
          {/* <th className="text-center w-32">Created on</th> */}
          <th className="!text-center w-[50px]">#</th>
        </tr>
      </thead>
      <tbody>
        {loading
          ? placeholder.map((i) => <AppsLoadBalancerSkeletonWeb key={i} />)
          : data?.appsBalancer?.map((item) => (
              <TableRow key={item.id} data={item} />
            ))}

        {!loading && data && data?.appsBalancer?.length === 0 && (
          <tr className="not-found">
            <td colSpan={8} className="text-center">
              No Load Balancer list found!
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default AppsLoadBalancerWeb;
