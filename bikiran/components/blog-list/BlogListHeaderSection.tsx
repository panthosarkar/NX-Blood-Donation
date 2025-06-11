"use client";

import { ButtonRefresh } from "@/bik-lib/lib/button";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import DateInputRange from "@/bikiran/shared/inputs/DateInputRange";
import TableHeaderWrapperComp from "@/bikiran/shared/table-header-wrapper/TableHeaderWrapperComp";
import { Button } from "@bikiran/button";
import { FilterBarWrapper } from "@bikiran/utils";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const BlogListHeaderSection = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<{ [key: string]: any }>({
    dateFrom: dayjs().subtract(1, "month").format("YYYY-MM-DD"),
  });

  const handleInputChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSearch = (search: string) => {
    router.push(`${search}`);
  };

  return (
    <div className="flex gap-2">
      <div className="w-full">
        <div className="flex flex-wrap justify-between items-center gap-2.5 mb-4">
          <div className="flex items-center gap-x-8 gap-y-2 flex-1">
            <h2 className="text-2xl  font-medium whitespace-nowrap">
              Blog List
            </h2>
            <div className="w-full max-w-[700px]">
              <FilterBarWrapper formData={formData} onSearch={handleSearch}>
                <DateInputRange
                  formData={formData}
                  name="dateRange"
                  onChange={handleInputChange}
                  setFormData={setFormData}
                />
              </FilterBarWrapper>
            </div>
          </div>
          <div className="flex items-stretch gap-2">
            <div className="h-10">
              <ButtonRefresh disabled={false} onClick={() => {}} />
            </div>
            <Button
              variant="secondary"
              className="px-4 h-10 text-sm"
              disabled={false}
              onClick={() => router.push(`/blog/create-blog`)}
            >
              + Create Blog
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogListHeaderSection;
