import { FC } from "react";
import { useCurrencyConfContext } from "./context/CurrencyConfProvider";
import CurrencyConfSkeletonComp from "./CurrencyConfSkeletonComp";
import CurrencyConfTableBodyComp from "./CurrencyConfTableBodyComp";

const CurrencyConfTableSection: FC = () => {
  const { data, loading } = useCurrencyConfContext();

  return (
    <table className="table-container">
      <thead>
        <tr>
          <th className="w-[100px] !text-center">Id</th>
          <th className="w-[300px] text-start">Title</th>
          <th className="w-[300px] text-center">Currency</th>
          <th className="w-[250px] text-center">Rate</th>
          <th className="w-[100px] text-center">Status</th>
          <th className="w-[50px] text-right ">#</th>
        </tr>
      </thead>
      <tbody>
        {loading
          ? Array.from({ length: data?.length || 2 })
              .map((_, i) => i)
              .map((i) => <CurrencyConfSkeletonComp key={i} />)
          : data?.map((item) => (
              <CurrencyConfTableBodyComp key={item.id} data={item} />
            ))}
        {!loading && data?.length === 0 && (
          <tr className="hover:!bg-transparent not-found">
            <td colSpan={8} className="text-center font-medium !text-xl h-40">
              No Currency Found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default CurrencyConfTableSection;
