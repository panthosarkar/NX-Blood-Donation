import React, { FC, useEffect } from "react";
import { useAccountAdmContext } from "./context/AccountAdmProvider";
import TableWrapper from "@/bikiran/shared/table-wrapper/TableWrapper";
import { TooltipUserInfo } from "@bikiran/utils";
import { useRouter } from "next/navigation";
import { showCurrencySign, showInt } from "@/bik-lib/utils/show";
import TooltipWrapper from "@/bik-lib/lib/TooltipWrapper";
import { GetDate, GetTime } from "@/bik-lib/utils/date";
import StatusColor from "@/bik-lib/utils/statusColor";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import dayjs from "dayjs";
import Image from "next/image";

import iconCredit from "@/bikiran/shared/header/add-button-icons/credit-note-white.svg";
import iconDebit from "@/bikiran/shared/header/add-button-icons/debit-note-white.svg";
import iconCreditHover from "@/bikiran/shared/header/add-button-icons/credit-hover.svg";
import iconDebitHover from "@/bikiran/shared/header/add-button-icons/debit-hover.svg";
import { TAccountAdmData } from "./AccountAdmTypes";

const AccountAdmTableSection: FC<{
  data: TAccountAdmData[] | null | undefined;
  isHash: boolean;
}> = ({ data, isHash }) => {
  const { reFetching } = useAccountAdmContext();
  const router = useRouter();
  const { openModal } = useTemplate();

  const balance = (currency: string, balance: any) => {
    const numericBalance = parseFloat(balance);
    if (isNaN(numericBalance)) {
      return "Invalid balance";
    }
    return numericBalance < 0
      ? `-${showCurrencySign(currency)} ${Math.abs(numericBalance).toFixed(2)}`
      : `${showCurrencySign(currency)} ${numericBalance.toFixed(2)}`;
  };

  return (
    <TableWrapper
      headers={[
        "FAC + w-[100px] !text-center",
        "User + w-[80px] text-center",
        "Title + text-left",
        "Total Debit  + w-[125px] text-start",
        "Total Credit + w-[125px] text-start",
        "Balance + w-[120px]",
        "Currency + w-[100px]",
        "Last Transaction + w-[100px]",
        !isHash
          ? "Status + w-[100px] text-center"
          : "Actions + w-[100px] !text-center",
        "# + w-[50px]",
      ]}
      loading={reFetching}
      notFoundText="No Bank account added!"
    >
      {!reFetching &&
        data?.map((item, index) => (
          <tr key={index}>
            <td className="text-center">{item.id}</td>
            <td className="">
              <div className="flex justify-center items-center">
                {item?.user !== null ? (
                  <TooltipUserInfo
                    user={item?.user}
                    ImageComponent={Image}
                    redirectClick={() =>
                      router.push(`/user/${item?.user?.id}/overview`)
                    }
                  />
                ) : (
                  <span className="font-medium text-sm">System</span>
                )}
              </div>
            </td>
            <td>
              <div className="flex flex-col ">
                <span className="text-sm overflow-ellipsis text-nowrap overflow-hidden">
                  {item.title}
                </span>
                <span className=" text-primary-500 leading-3 ">
                  {item.type}
                </span>
              </div>
            </td>
            <td className="text-start">
              {showCurrencySign(item.currency)}{" "}
              {showInt(item?.balance?.debit) || "0.00"}
            </td>
            <td className="text-start">
              <span>
                {showCurrencySign(item.currency)}{" "}
                {showInt(item?.balance?.credit) || "0.00"}
              </span>
            </td>
            <td className="text-right">
              {balance(item.currency, item.balance?.balance)}
            </td>
            <td className="text-center">{item.currency || "---"}</td>
            <td className="text-center">
              <TooltipWrapper
                content={GetTime(item.timeLastTransaction)?.toString() || "N/A"}
              >
                {GetDate(item.timeLastTransaction) || "N/A"}
              </TooltipWrapper>
            </td>
            {!isHash ? (
              <td className="text-center">
                <StatusColor status={item?.status || "---"} />
              </td>
            ) : (
              <td>
                <div className="flex gap-2 justify-center">
                  <TooltipWrapper content="Add Credit Note" asChild>
                    <button
                      type="button"
                      onClick={() => openModal("credit-note", item)}
                      className="group bg-secondary-50 hover:bg-secondary rounded-8 transition-colors duration-300 p-2"
                    >
                      <Image
                        width={100}
                        height={100}
                        sizes="100vw"
                        src={iconCredit}
                        alt="iconBlock"
                        className="size-5 group-hover:block hidden"
                      />
                      <Image
                        width={100}
                        height={100}
                        sizes="100vw"
                        src={iconCreditHover}
                        alt="iconFill"
                        className="size-5 group-hover:hidden block"
                      />
                    </button>
                  </TooltipWrapper>
                  <TooltipWrapper content="Add Debit Note" asChild>
                    <button
                      type="button"
                      onClick={() => openModal("debit-note", item)}
                      className="group bg-secondary-50 hover:bg-secondary rounded-8 transition-colors duration-300 p-2"
                    >
                      <Image
                        width={100}
                        height={100}
                        sizes="100vw"
                        src={iconDebit}
                        alt="iconBlock"
                        className="size-5 group-hover:block hidden"
                      />
                      <Image
                        width={100}
                        height={100}
                        sizes="100vw"
                        src={iconDebitHover}
                        alt="iconFill"
                        className="size-5 group-hover:hidden block"
                      />
                    </button>
                  </TooltipWrapper>
                </div>
              </td>
            )}

            <td>
              <InstOption>
                {item?.user !== null && (
                  <button
                    type="button"
                    onClick={() => openModal("credit-note", item)}
                    className=""
                  >
                    Add Credit Note
                  </button>
                )}
                {item?.user !== null && (
                  <button
                    type="button"
                    onClick={() => openModal("debit-note", item)}
                    className=""
                  >
                    Add Debit Note
                  </button>
                )}
                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      `/billing/account/${item.id}/statement?dateFrom=${dayjs().subtract(1, "year").format("YYYY-MM-DD")}&dateTo=${dayjs().format("YYYY-MM-DD")}`
                    )
                  }
                >
                  Statement
                </button>
              </InstOption>
            </td>
          </tr>
        ))}
    </TableWrapper>
  );
};

export default AccountAdmTableSection;
