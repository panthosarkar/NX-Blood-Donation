import { FC, useState } from "react";
import Image from "next/image";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { GetDate } from "@/bik-lib/utils/date";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { useActivityAdmin } from "./context/AdminActivityProvider";
import { TActivityAdmin, TAdminActivityLogs } from "./AdminActivityTypes";
import AdminActivitySkeleton from "./AdminActivitySkeleton";
import { TooltipUserInfo } from "@bikiran/utils";
import { icons } from "@/bikiran/lib/icons";
import { useRouter } from "next/navigation";

const TableRow: FC<{ data: TAdminActivityLogs }> = ({ data }) => {
  const router = useRouter();
  return (
    <tr>
      <td className=" text-center">{data?.id}</td>
      <td className="text-left">
        <div className="flex justify-center items-center">
          {data?.user ? (
            <TooltipUserInfo
              user={data?.user}
              ImageComponent={Image}
              redirectClick={() =>
                router.push(`/user/${data?.user?.id}/overview`)
              }
            />
          ) : (
            <Image
              alt="icon"
              src={icons.iconUser}
              width={100}
              height={100}
              sizes="100vw"
              className="size-11"
            />
          )}
        </div>
      </td>
      <td>
        <span className=" text-primary font-medium line-clamp-1 text-ellipsis">
          {data.title}
        </span>
        <span className="text-primary-500 line-clamp-1 text-ellipsis">
          {data.description}
        </span>
      </td>
      <td className="text-center">{data.projectId}</td>
      <td className="text-center">{data.subscriptionId}</td>
      <td className="text-center">{data.assetId}</td>
      <td className="text-center">{data.assetKey}</td>
      <td className="text-center">{capitalizeFirstLetter(data.weight)}</td>
      <td className="text-center">{GetDate(data.timeCreated)}</td>
      <td>
        <InstOption disabled>
          <button>Download</button>
          <button>Delete</button>
        </InstOption>
      </td>
    </tr>
  );
};

const AdminActivityLogsTable: FC<{ data: any }> = ({ data }) => {
  const { loading } = useActivityAdmin();
  const placeholderArr = Array.from({ length: data?.length || 3 }, (_, i) => i);
  return (
    <table cellPadding={0} cellSpacing={0} className="table-container">
      <thead>
        <tr>
          <th className="w-[100px] !text-center">ID</th>
          <th className="w-16 !text-center">User</th>
          <th className="text-left">Title & Description</th>
          <th className="w-[100px] !text-center">Project ID</th>
          <th className="w-[125px] !text-center">Subscription ID</th>
          <th className="w-[85px] text-center">Asset ID</th>
          <th className="w-[85px] text-center">Asset Key</th>
          <th className="w-18 text-center">Weight</th>
          <th className="w-28 text-center">Time Created</th>
          <th className="w-[50px] !text-center">#</th>
        </tr>
      </thead>
      <tbody>
        {loading
          ? placeholderArr.map((i) => <AdminActivitySkeleton key={i} />)
          : data?.map((item: any) => <TableRow key={item.id} data={item} />)}

        {!loading && data && data.length === 0 && (
          <tr className="not-found">
            <td className="text-center" colSpan={10}>
              No User Activity Log Found!
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default AdminActivityLogsTable;
