import { FC } from "react";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { UserInfoComp } from "@bikiran/utils";
import Image from "next/image";
import StatementTableBody from "./StatementTableBody";
import { TStatement, TStatementTransaction } from "./statementTypes";
import { useStatementInfo } from "./context/StatementProvider";
import StatementSkeletonComp from "./StatementSkeletonComp";
import UserSkeletonComp from "@/bikiran/shared/user-search/UserSkeletonComp";

const StatementInfoComp: FC<{
  data: TStatement;
  editable?: boolean;
}> = ({ data, editable = true }) => {
  const { openModal } = useTemplate();
  const { loading } = useStatementInfo();

  const placeholder = Array.from(
    { length: data?.transactions?.length || 3 },
    (_, i) => i
  );

  return (
    <div className="w-full text-gray-800 bg-white shadow-[0px_4px_70px_0px_rgba(19,15,64,0.05)] px-[25px] sm:px-5 py-6 print:!p-0 print:shadow-none">
      <h2 className="text-primary text-3xl text-center font-medium mb-5 hidden print:block">
        Statement
      </h2>
      {/* Sending To... */}
      <div className="grid grid-cols-2 gap-10 mb-8">
        <div>
          <div
            {...(editable && {
              onClick: () => {
                openModal("change-user");
              },
            })}
            className={`p-4 rounded-10 transition-colors duration-300  ${
              editable ? "hover:bg-primary-100" : ""
            } ,${!data?.account?.user?.displayName ? "pointer-events-none grayscale" : "cursor-pointer"}`}
          >
            {data?.account && !loading ? (
              <div className="text-start">
                <UserInfoComp
                  ImageComponent={Image}
                  email={data?.account?.user?.email || "--"}
                  name={data?.account?.user?.displayName || "--"}
                  photoUrl={data?.account?.user?.photoUrl}
                />
              </div>
            ) : (
              <UserSkeletonComp />
            )}
          </div>
          {/* <StatementToInfoComp data={data} editable={editable} /> */}
        </div>
        {/* <StatementUserInfoComp data={data} /> */}
      </div>
      {/* Order Summary */}
      <div className="mb-5">
        <h3 className="text-lg font-medium mb-3">Order Summary</h3>
        <table className="w-full border border-black mb-6 text-sm">
          <thead>
            <tr className="[&>th]:border [&>th]:bg-primary-100 [&>th]:border-black [&>th]:px-2 [&>th]:h-[50px] [&>th]:text-primary [&>th]:font-medium h-[50px]">
              <th className="w-[90px]">SL</th>
              <th className="w-[100px]">Date</th>
              <th className="w-[100px]">Description</th>
              <th className="w-[100px]">Debit</th>
              <th className="w-[100px]">Credit </th>
              <th className="w-[100px]">Balance </th>
            </tr>
          </thead>

          {!loading &&
            data?.transactions &&
            data?.transactions?.map((item: TStatementTransaction) => (
              <StatementTableBody
                key={item.transactionId}
                data={item}
                editable={editable}
              />
            ))}

          {loading && placeholder.map((i) => <StatementSkeletonComp key={i} />)}

          {!loading && !data?.transactions && (
            <tbody>
              <tr>
                <td colSpan={6} className="text-center">
                  No data found
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default StatementInfoComp;
