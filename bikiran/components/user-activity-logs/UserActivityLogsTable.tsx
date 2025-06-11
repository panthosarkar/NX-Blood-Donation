import { FC } from "react";
import { useActivityUser } from "./context/UserActivityProvider";
import { TUserActivityLogs } from "./UserActivityTypes";
import UserActivitySkeleton from "./UserActivitySkeleton";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { GetDate } from "@/bik-lib/utils/date";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { TooltipUserInfo } from "@bikiran/utils";
import Image from "next/image";
import { icons } from "@/bikiran/lib/icons";
import { useRouter } from "next/navigation";

const TableRow: FC<{ data: TUserActivityLogs }> = ({ data }) => {
  const router = useRouter();

  return (
    <tr>
      <td className=" text-center">{data?.id}</td>
      <td className="">
        <div className="flex justify-center items-center">
          <TooltipUserInfo
            user={data?.user}
            ImageComponent={Image}
            redirectClick={() =>
              router.push(`/user/${data?.user?.id}/overview`)
            }
          />
        </div>
      </td>
      <td>
        <span className="text-primary text-sm font-medium line-clamp-1">
          {data?.title}
        </span>
        <span className="text-primary-500 line-clamp-1 text-[13px]">
          {data?.description}
        </span>
      </td>
      <td className="text-center">{data?.projectId}</td>
      <td className="text-center">{data?.subscriptionId}</td>
      <td className="text-center">{data?.assetId}</td>
      <td className="text-center">{data?.assetKey}</td>
      <td className="text-center">{capitalizeFirstLetter(data?.weight)}</td>
      <td className="text-center">{GetDate(data?.timeCreated)}</td>
      <td>
        <InstOption disabled>
          <button>Download</button>
          <button>Delete</button>
        </InstOption>
      </td>
    </tr>
  );
};

const UserActivityLogsTable: FC = () => {
  const { loading, data } = useActivityUser();

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
          <th className="w-32 text-center">Created</th>
          <th className="w-[50px] !text-center">#</th>
        </tr>
      </thead>
      <tbody>
        {loading
          ? placeholderArr.map((i) => <UserActivitySkeleton key={i} />)
          : data.map((item) => <TableRow key={item.id} data={item} />)}

        {!loading && data && data?.length === 0 && (
          <tr className="not-found">
            <td colSpan={10}>No User Activity Log Found!</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserActivityLogsTable;
