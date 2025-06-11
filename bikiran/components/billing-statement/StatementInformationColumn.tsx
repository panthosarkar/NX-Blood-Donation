import { FC } from "react";
import { useStatementInfo } from "./context/StatementProvider";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import StatementInfoComp from "./StatementInfoComp";

const StatementInformationColumn: FC = () => {
  const { statement, loading } = useStatementInfo();
  const { openModal } = useTemplate();

  return (
    <div className="w-full p-7.5 shadow-[0_0_50px_rgba(19,15,64,.08)] rounded-20">
      <button
        type="button"
        className="w-full py-2.5 px-4 rounded-10 bg-primary-100 hover:bg-primary-300 h-16 transition-colors mb-4 print:hidden"
        onClick={() => openModal("update-title")}
      >
        <h2 className="text-primary text-lg font-medium text-left ">
          {statement?.account?.title || "Statement"}
        </h2>
      </button>

      <div className="[&>div]:!p-0 [&>div]:shadow-none [&>div]:!bg-transparent">
        <StatementInfoComp data={statement} />
      </div>
    </div>
  );
};

export default StatementInformationColumn;
