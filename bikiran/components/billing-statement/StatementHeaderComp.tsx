"use client";
import { ButtonRefresh } from "@/bik-lib/lib/button";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { FC, useEffect, useState } from "react";
import { useStatementInfo } from "./context/StatementProvider";
import { useRouter } from "next/navigation";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "@/bik-lib/utils/cn";
import { FilterBarWrapper } from "@bikiran/utils";
import dayjs from "dayjs";
import { TUser } from "@/bikiran/shared/user-search/UserSearchType";
import SelectedUserInfo from "@/bikiran/shared/user-info/SelectedUserInfo";
import FilterUser from "@/bikiran/shared/user-info/FilterUser";
import DateInputRange from "@/bikiran/shared/inputs/DateInputRange";

const StatementHeaderComp: FC<{ handlePrint: any }> = ({ handlePrint }) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({
    statementId: "",
    dateFrom: dayjs().subtract(1, "year").format("YYYY-MM-DD"),
    dateTo: dayjs().format("YYYY-MM-DD"),
  });
  const [selectedUser, setSelectedUser] = useState<TUser>({} as TUser);
  const { reload, loading, statement } = useStatementInfo();
  const { openModal } = useTemplate();

  const router = useRouter();

  const handleInputChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSearch = (search: string) => {
    router.push(`${search}`);
  };

  useEffect(() => {
    if (selectedUser.id) {
      formData["userId"] = selectedUser.id;
    } else {
      delete formData["userId"];
    }
  }, [selectedUser]);
  return (
    <section className="flex items-center justify-between gap-3 mb-7.5 print:hidden">
      <div className="flex items-center gap-3">
        <h2 className="text-primary text-2xl font-medium  whitespace-nowrap ">
          Statement
        </h2>
      </div>
      <div className="w-full">
        <FilterBarWrapper formData={formData} onSearch={handleSearch}>
          {selectedUser.id ? (
            <SelectedUserInfo
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          ) : (
            <FilterUser
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          )}
          {/* <DataRangeInput
            formData={formData}
            setFormData={setFormData}
            onChange={handleInputChange}
          /> */}
          <DateInputRange
            formData={formData}
            name="dateRange"
            onChange={handleInputChange}
            setFormData={setFormData}
          />
        </FilterBarWrapper>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <ButtonRefresh
          className="size-10"
          onClick={reload}
          disabled={loading || statement?.account?.accountId === 0}
        />

        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none print:hidden">
            <div
              className={cn(
                "px-3 py-2 bg-secondary font-medium text-white rounded-8 ",
                {
                  "cursor-not-allowed bg-primary-100 text-primary-500":
                    statement?.account?.accountId === 0,
                }
              )}
            >
              Print Statement
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="print:hidden">
            <DropdownMenuItem>
              <button
                className="flex items-center gap-2"
                onClick={() => handlePrint("withHPrint")}
              >
                With Headers
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button
                className="flex items-center gap-2"
                onClick={() => handlePrint("withoutHPrint")}
              >
                Without Headers
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>
  );
};

export default StatementHeaderComp;
