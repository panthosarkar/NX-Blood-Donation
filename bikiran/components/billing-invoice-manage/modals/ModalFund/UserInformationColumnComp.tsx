import { TInputChangeEvent } from "@/bik-lib/types/event";
import { cn } from "@/bik-lib/utils/cn";
import { showInt } from "@/bik-lib/utils/show";
import { TDebitCredit } from "@/bikiran/components/billing-account/AccountAdmTypes";
import { Skeleton } from "@/bikiran/components/ui/skeleton";
import UserDetailsComp from "@/bikiran/shared/user-search/UserDetailsComp";
import UserSkeletonComp from "@/bikiran/shared/user-search/UserSkeletonComp";
import { InputField } from "@bikiran/inputs";
import React, { FC } from "react";

const UserInformationColumn: FC<{
  type: "debit" | "credit";
  data: TDebitCredit;
  newBalance: number;
  loading: boolean;
  formData: {
    amount: number;
    note: string;
  };
  onChange: (ev: TInputChangeEvent) => void;
  className?: string;
}> = ({ type, data, newBalance, loading, formData, onChange, className }) => {
  return (
    <div className={cn("w-full space-y-[5px]", className)}>
      {loading ? (
        <UserSkeletonComp className="py-3" />
      ) : (
        <UserDetailsComp data={data.user} className="px-0" />
      )}
      <div className="space-y-[5px]">
        <div className="flex justify-between items-center text-sm font-medium py-[8px]">
          <div className="text-primary-700">AC Number</div>
          <div className="text-primary">
            {" "}
            {loading ? <Skeleton className="h-4 w-24" /> : data.fac.facId}
          </div>
        </div>
        <div className="flex justify-between items-center text-sm font-medium py-[8px]">
          <div className="text-primary-700">AC Type</div>
          <div className="text-primary">
            {loading ? (
              <Skeleton className="h-4 w-24" />
            ) : (
              <span>{data.fac.facType}</span>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center text-sm font-medium py-[8px]">
          <div className="text-primary-700">Balance</div>
          <div className="text-primary">
            {loading ? (
              <Skeleton className="h-4 w-24" />
            ) : (
              <span>
                {data.fac.currency} {showInt(data.fac.balance)}
              </span>
            )}
          </div>
        </div>

        {type === "debit" ? (
          <div className="flex justify-between items-center text-sm font-medium">
            <div className="text-primary-700">Amount</div>
            <div className="">
              <InputField
                formData={formData}
                label=""
                name="amount"
                onChange={onChange}
                className="!w-32 !h-9 text-sm text-end"
              />
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center text-sm font-medium pt-[5px] pb-[8px]">
            <div className="text-primary-700">Amount</div>
            <div className="w-32 h-9 text-sm bg-secondary-50 !font-normal text-secondary text-center justify-center flex items-center rounded-8">
              {formData.amount > 0 ? (
                <span> + {formData.amount}</span>
              ) : (
                <span>+ 0</span>
              )}
            </div>
          </div>
        )}

        {type === "debit" ? (
          <div className="flex justify-between items-center text-sm font-medium">
            <div className="text-primary-700">New Balance</div>
            <div className="text-primary">
              {loading ? (
                <Skeleton className="h-4 w-24" />
              ) : (
                <span>{showInt(newBalance)}</span>
              )}
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center text-sm font-medium">
            <div className="text-primary-700">New Balance</div>
            <div className="text-primary">
              {loading ? (
                <Skeleton className="h-4 w-24" />
              ) : (
                <span>{showInt(newBalance)}</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInformationColumn;
