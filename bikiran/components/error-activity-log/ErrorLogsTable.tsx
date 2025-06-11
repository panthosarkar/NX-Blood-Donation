import { FC } from "react";
import Image from "next/image";
import { icons } from "@/bikiran/lib/icons";
import TooltipWrapper from "@/bik-lib/lib/TooltipWrapper";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { GetDate } from "@/bik-lib/utils/date";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { useErrorLogs } from "./context/ErrorLogProvider";
import { TErrorLogs } from "./ErrorLogTypes";
import ErrorLogSkeleton from "./ErrorLogSkeleton";

const Container: FC<{
  children: React.ReactNode;
  content: string;
}> = ({ children, content }) => {
  return (
    <div className="flex items-center gap-1">
      <TooltipWrapper content={content}>
        <div className="w-4">
          <Image
            src={icons.iconInfoLine}
            alt="alt"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>
      </TooltipWrapper>
      {children}
    </div>
  );
};

const TableRow: FC<{ data: TErrorLogs }> = ({ data }) => {
  return (
    <tr>
      <td className=" text-center">{data?.id}</td>
      <td className="text-center text-error font-medium">Unknown</td>
      <td className="flex flex-col gap-1">
        <span className="text-primary font-medium">{data.title}</span>
        <span className="text-primary-500 line-clamp-1">
          {data.description}
        </span>
      </td>
      <td className="text-center">{data.projectId}</td>
      <td className="text-center">{data.subscriptionId}</td>
      <td className="text-center">{data.assetId}</td>
      <td className="text-center">{data.assetKey}</td>
      <td className="text-center">{data.activityKey}</td>
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

const ErrorLogsTable: FC = () => {
  const { loading, data } = useErrorLogs();
  const placeholderArr = Array.from({ length: data?.length || 3 }, (_, i) => i);
  return (
    <table cellPadding={0} cellSpacing={0} className="table-container">
      <thead>
        <tr>
          <th className="!text-center">ID</th>
          <th className="w-[80px] text-center">User</th>
          <th className="text-left">Title & Description</th>
          <th className="w-[100px] !text-center">Project ID</th>
          <th className="w-[125px] !text-center">Subscription ID</th>
          <th className="w-[85px] text-center">Asset ID</th>
          <th className="w-[85px] text-center">Asset Key</th>
          <th className="w-56 text-center">Activity Key</th>
          <th className="w-18 text-center">Weight</th>
          <th className="w-28 text-center">Time Created</th>
          <th className="w-[50px] !text-center">#</th>
        </tr>
      </thead>
      <tbody>
        {loading
          ? placeholderArr.map((i) => <ErrorLogSkeleton key={i} />)
          : data?.map((item) => <TableRow key={item.id} data={item} />)}

        {!loading && data && data.length === 0 && (
          <tr className="not-found">
            <td colSpan={11}>No Error Log Found!</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ErrorLogsTable;
