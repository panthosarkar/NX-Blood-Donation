import { FC } from "react";
import { TRenewProduct, TRenewProject } from "./renewProductTypes";
import RenewProductComp from "./RenewProductComp";

const RecommendedProductComp: FC<{
  data: TRenewProduct[];
  project: TRenewProject;
  selectProduct: (data: TRenewProduct) => void;
  selectedData: TRenewProduct[];
}> = ({ data, project, selectProduct, selectedData }) => {
  return (
    <div>
      <div className="mt-2.5 mb-3">
        <h2 className="text-primary font-medium">Recommended</h2>
        {project.id > 0 ? (
          <p className="text-xs">
            Based on project{" "}
            <span className="text-secondary">
              {project.title} , #{project?.id}
            </span>
          </p>
        ) : null}
      </div>
      <div className="sm:border border-y border-[#E0C1FF] sm:rounded-[13px]">
        {data?.map((item: TRenewProduct) => {
          return (
            <RenewProductComp
              key={item.subscriptionId}
              data={item}
              setSelectedData={() => selectProduct(item)}
              selectedData={selectedData}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RecommendedProductComp;
