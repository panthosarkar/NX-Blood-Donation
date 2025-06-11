import { FC } from "react";

import { useTestLogs } from "./context/TestLogsProvider";
import { TTestLogs } from "./TestLogsTypes";

import TestLogsSkeleton from "./TestLogsSkeleton";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { GetDate } from "@/bik-lib/utils/date";

const TableRow: FC<{ data: TTestLogs }> = ({ data }) => {
  return (
    <tr>
      <td className=" text-center">{data?.id}</td>

      <td className="!max-w-[500px] 2xl:!max-w-[800px] overflow-hidden line-clamp-2  overflow-ellipsis">
        {data?.value}
      </td>

      <td className="text-center">{GetDate(data?.timeCreated) || "--"}</td>
      <td>
        <InstOption disabled>
          <button>Download</button>
          <button>Delete</button>
        </InstOption>
      </td>
    </tr>
  );
};

const TestLogsTable: FC = () => {
  const { loading, data } = useTestLogs();

  const placeholderArr = Array.from({ length: data?.length || 3 }, (_, i) => i);

  return (
    <table cellPadding={0} cellSpacing={0} className="table-container">
      <thead>
        <tr>
          <th className="w-[100px] !text-center">ID</th>

          <th className="text-left !max-w-[500px]">Description</th>

          <th className="w-[100px] text-center">Created</th>
          <th className="w-[50px] !text-center">#</th>
        </tr>
      </thead>
      <tbody>
        {loading
          ? placeholderArr.map((i) => <TestLogsSkeleton key={i} />)
          : data?.map((item) => <TableRow key={item?.id} data={item} />)}

        {!loading && data && data.length === 0 && (
          <tr className="not-found">
            <td className="" colSpan={4}>
              No User Activity Log Found!
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TestLogsTable;
