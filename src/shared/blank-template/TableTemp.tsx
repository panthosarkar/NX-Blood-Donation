import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { FC } from "react";

import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";

type TTable = {
  id: number;
  displayName: string;
  email: string;
};

const tableData: TTable[] = [
  {
    id: 1,
    displayName: "John Doe",
    email: "john@gmail.com",
  },
  {
    id: 2,
    displayName: "Chris Doe",
    email: "chris@gmail.com",
  },
];

const TableRow: FC<{ data: TTable }> = ({ data }) => {
  return (
    <tr className="h-[60px]">
      <td>{data?.id}</td>
      <td>{data?.displayName}</td>
      <td>{data?.email}</td>
      <td>
        <InstOption>
          <button type="button">Delete</button>
        </InstOption>
      </td>
    </tr>
  );
};

const TableTemp: FC = () => {
  const loading = false;
  const placeholderArr = Array.from(
    { length: tableData?.length || 3 },
    (_, i) => i
  );

  return (
    <table cellPadding={0} cellSpacing={0} className="table-container">
      <thead>
        <tr>
          <th className="w-24">ID</th>
          <th>Name</th>
          <th>Email</th>
          <th className="w-20">Action</th>
        </tr>
      </thead>

      <tbody>
        {loading
          ? placeholderArr.map((i) => <div key={i}>Placeholder...</div>)
          : tableData?.map((item) => <TableRow key={item.id} data={item} />)}

        {!loading && tableData && tableData.length === 0 && (
          <tr className="not-found">
            <td className="" colSpan={6}>
              No Domain Found!
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TableTemp;
