import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { FC, useState } from "react";
import { TStatus, TAppsServerListItem } from "./AppsServerListType";
import { useAppsServerList } from "./context/AppsServerListProvider";
import AppsServerListSkeletonWeb from "./AppsServerListSkeletonWeb";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { TPagination } from "@/bik-lib/types/response";
import { UserInfoComp } from "@bikiran/utils";
import Image from "next/image";
import StatusColor from "@/bik-lib/utils/statusColor";

type TProps = {
  data: {
    server: TAppsServerListItem[];
    status: TStatus[];
    pagination: TPagination;
  };
};

const TableRow: FC<{ data: TAppsServerListItem }> = ({ data }) => {
  const { openModal } = useTemplate();

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

const AppsServerListWeb: FC<TProps> = ({ data }) => {
  const { loading } = useAppsServerList();
  const placeholder = Array.from(
    { length: data?.server?.length || 3 },
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
          <th className="text-center w-[650px]">Server</th>
          <th className="text-center w-[100px]">Status</th>
          {/* <th className="text-center w-32">Created on</th> */}
          <th className="!text-center w-[50px]">#</th>
        </tr>
      </thead>
      <tbody>
        {loading
          ? placeholder.map((i) => <AppsServerListSkeletonWeb key={i} />)
          : data?.server?.map((item) => <TableRow key={item.id} data={item} />)}

        {!loading && data && data?.server?.length === 0 && (
          <tr className="not-found">
            <td colSpan={8} className="text-center">
              No Server Config found!
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default AppsServerListWeb;
