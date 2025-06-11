import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { FC, useState } from "react";
import { TStatus, TAppsProxyListItem } from "./AppsProxyListType";
import { useAppsProxyList } from "./context/AppsProxyListProvider";
import AppsProxyListSkeletonWeb from "./AppsProxyListSkeletonWeb";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { TPagination } from "@/bik-lib/types/response";
import { UserInfoComp } from "@bikiran/utils";
import Image from "next/image";
import StatusColor from "@/bik-lib/utils/statusColor";

type TProps = {
  data: {
    proxy: TAppsProxyListItem[];
    status: TStatus[];
    pagination: TPagination;
  };
};

const TableRow: FC<{ data: TAppsProxyListItem }> = ({ data }) => {
  const { modalData, openModal } = useTemplate();
  const [isActive, setIsActive] = useState(false);

  const handleRowClick = () => {
    setIsActive(!isActive); // Active state toggle
    openModal("custom-sidebar", data); // Modal open
  };

  return (
    <tr
      onClick={handleRowClick}
      className={`cursor-pointer ${
        modalData?.id === data.id ? "!bg-primary-200" : ""
      }`}
    >
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

const AppsProxyListWeb: FC<TProps> = ({ data }) => {
  const { loading } = useAppsProxyList();
  const placeholder = Array.from(
    { length: data?.proxy?.length || 3 },
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

          <th className="text-center w-[650px]">Proxy</th>
          <th className="text-center w-[100px]">Status</th>
          {/* <th className="text-center w-32">Created on</th> */}
          <th className="!text-center w-[50px]">#</th>
        </tr>
      </thead>
      <tbody>
        {loading
          ? placeholder.map((i) => <AppsProxyListSkeletonWeb key={i} />)
          : data?.proxy?.map((item) => <TableRow key={item.id} data={item} />)}

        {!loading && data && data?.proxy?.length === 0 && (
          <tr className="not-found">
            <td colSpan={8} className="text-center">
              No Proxy List found!
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default AppsProxyListWeb;
