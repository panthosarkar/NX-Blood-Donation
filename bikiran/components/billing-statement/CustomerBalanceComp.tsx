import UserDetailsComp from "@/bikiran/shared/user-search/UserDetailsComp";
import UserSkeletonComp from "@/bikiran/shared/user-search/UserSkeletonComp";
import React, { FC } from "react";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { cn } from "@/bik-lib/utils/cn";
import { TInvoiceInfo } from "@/bik-lib/types/invoice";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { useRouter } from "next/navigation";
import { UserInfoComp } from "@bikiran/utils";
import Image from "next/image";
import { TUser } from "@/bikiran/shared/user-search/UserSearchType";
import { icons } from "@/bikiran/lib/icons";
import { TStatement } from "./statementTypes";

type TProps = {
  data: TStatement;
  loading?: boolean;
};

const CustomerBalanceComp: FC<TProps> = ({ data, loading }) => {
  const { openModal } = useTemplate();
  const router = useRouter();
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between ">
          <h2 className="text-primary text-xl font-medium ">Balance</h2>
          {/* <InstOption disabled>
            <button
            // onClick={() =>
            //   router.push(
            //     `/billing/account/${data?.invoice?.facId}/statement`
            //   )
            // }
            >
              Statement
            </button>
          </InstOption> */}
        </div>
        <div>
          <span className="text-primary-700 text-sm font-medium">FAC ID :</span>{" "}
          &nbsp;
          {/* <span className=" text-sm">{data?.invoice?.facId || 0}</span> */}
        </div>
      </div>

      <div>
        {data && !loading ? (
          <UserInfoComp
            photoUrl={data?.account?.user?.photoUrl || icons.iconUser}
            name={data?.account?.user?.displayName || "--"}
            email={data?.account?.user?.email || "--"}
            ImageComponent={Image}
          />
        ) : (
          <UserSkeletonComp />
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="text-primary-700 text-sm font-medium">Balance</div>
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "bg-secondary-50 px-3 py-2 text-secondary font-medium rounded-8",
              {
                "bg-primary-100 pointer-events-none text-primary-500": loading,
              }
            )}
          >
            BDT: 0.00
          </div>
          <div className="space-x-0.5">
            <button
              className={cn(
                "relative group p-[10px] rounded-s-8 bg-[#fee6e6] hover:bg-error",
                {
                  "bg-primary-100 pointer-events-none text-primary-500":
                    loading,
                }
              )}
              onClick={() => openModal("remove-fund", data)}
              disabled={loading}
            >
              <div className="relative w-full h-full">
                {/* Default Icon */}
                <div className="block group-hover:hidden w-full h-full transition-colors ease-in-out duration-300">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.8289 8.62711H2.17082C1.56332 8.62711 1.07153 8.13479 1.07153 7.52783C1.07153 6.92033 1.56385 6.42854 2.17082 6.42854H12.8289C13.4364 6.42854 13.9281 6.92086 13.9281 7.52783C13.9287 8.13479 13.4364 8.62711 12.8289 8.62711Z"
                      fill="#F50303"
                    />
                  </svg>
                </div>
                {/* Hover Icon */}
                <div className="hidden group-hover:block w-full h-full">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.8289 8.62711H2.17082C1.56332 8.62711 1.07153 8.13479 1.07153 7.52783C1.07153 6.92033 1.56385 6.42854 2.17082 6.42854H12.8289C13.4364 6.42854 13.9281 6.92086 13.9281 7.52783C13.9287 8.13479 13.4364 8.62711 12.8289 8.62711Z"
                      fill="#ffffff"
                    />
                  </svg>
                </div>
              </div>
            </button>
            <button
              className={cn(
                "relative group p-[10px] rounded-e-8 bg-[#d0f3de] hover:bg-success",
                {
                  "bg-primary-100 pointer-events-none text-primary-500":
                    loading,
                }
              )}
              onClick={() => openModal("add-fund", data)}
            >
              <div className="relative w-full h-full">
                {/* Default Icon */}
                <div className="block group-hover:hidden w-full h-full transition-colors ease-in-out duration-300">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.44282 8.44132H12.9864C13.2381 8.44224 13.4755 8.34398 13.6536 8.16581C13.8318 7.98765 13.9291 7.75117 13.9291 7.49862C13.9301 6.99627 13.492 6.55546 12.9869 6.55638H8.44327V2.01367C8.44282 1.49433 8.01991 1.07143 7.50011 1.07143C6.98077 1.07143 6.55833 1.49388 6.55787 2.01367V6.55638H2.01378C1.76169 6.55638 1.52475 6.6551 1.34751 6.83234C1.16935 7.01051 1.07062 7.24745 1.07154 7.49862C1.07062 8.00418 1.51236 8.4427 2.01378 8.44087H6.55787V12.9859C6.55787 13.238 6.65567 13.4758 6.83338 13.6531C7.01154 13.8312 7.24986 13.9299 7.50057 13.9286C7.7522 13.9295 7.9896 13.8312 8.16685 13.654C8.34409 13.4767 8.44282 13.2384 8.44282 12.9859V8.44132Z"
                      fill="#12C55C"
                    />
                  </svg>
                </div>
                {/* Hover Icon */}
                <div className="hidden group-hover:block w-full h-full">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.44282 8.44132H12.9864C13.2381 8.44224 13.4755 8.34398 13.6536 8.16581C13.8318 7.98765 13.9291 7.75117 13.9291 7.49862C13.9301 6.99627 13.492 6.55546 12.9869 6.55638H8.44327V2.01367C8.44282 1.49433 8.01991 1.07143 7.50011 1.07143C6.98077 1.07143 6.55833 1.49388 6.55787 2.01367V6.55638H2.01378C1.76169 6.55638 1.52475 6.6551 1.34751 6.83234C1.16935 7.01051 1.07062 7.24745 1.07154 7.49862C1.07062 8.00418 1.51236 8.4427 2.01378 8.44087H6.55787V12.9859C6.55787 13.238 6.65567 13.4758 6.83338 13.6531C7.01154 13.8312 7.24986 13.9299 7.50057 13.9286C7.7522 13.9295 7.9896 13.8312 8.16685 13.654C8.34409 13.4767 8.44282 13.2384 8.44282 12.9859V8.44132Z"
                      fill="#ffffff"
                    />
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerBalanceComp;
