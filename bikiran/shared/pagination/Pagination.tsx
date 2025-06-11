"use client";

import { FC } from "react";
import { TPagination } from "@/bik-lib/types/response";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

const Tab: FC<{
  path: string;
  title: string;
  isDisabled: boolean;
}> = ({ path, title, isDisabled }) => {
  return (
    <Link
      href={path}
      className={`px-2.5 min-h-8 text-sm flex justify-center items-center py-1 bg-secondary-100 hover:bg-secondary text-secondary hover:text-white transition-colors rounded-5 ${
        isDisabled ? "grayscale pointer-events-none" : ""
      }`}
    >
      {title}
    </Link>
  );
};

const Pages: FC<{ pages: number[]; total: number; disabled: boolean }> = ({
  pages,
  total,
  disabled,
}) => {
  // const [show, setShow] = useState<boolean>(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("CurrentPage"));
  const queries = new URLSearchParams(searchParams.toString());
  const nextPage = pages?.length
    ? Math.min(currentPage + 1, pages[pages.length - 1])
    : currentPage;

  // Make URL with existing queries if any
  const mkUrl = (number: number) => {
    queries.set("CurrentPage", number.toString());
    return `${pathname}?${queries.toString()}`;
  };

  return (
    <div className="flex justify-center items-end gap-3 py-3 relative ">
      {/* Prev */}
      <Tab
        title="<"
        path={mkUrl(currentPage - 1)}
        isDisabled={currentPage === 1 || !currentPage || disabled}
      />

      {/* Pages */}
      {pages?.map((number: number) => {
        if (number === -100 || number === -101) {
          return (
            <div key={number} className="text-secondary">
              ....
            </div>
          );
        }

        return (
          <Link
            key={number}
            href={mkUrl(number)}
            className={`w-10 min-h-8 flex justify-center items-center py-1 bg-secondary-100 hover:bg-secondary text-secondary hover:text-white transition-colors rounded-5 
              ${
                disabled
                  ? "!bg-primary-100 !text-primary-300 pointer-events-none"
                  : ""
              }
              ${
                !disabled && (currentPage || 1) === number
                  ? "!bg-secondary text-white"
                  : ""
              } 
              `}
          >
            {number}
          </Link>
        );
      })}

      {/* Next */}
      <Tab
        title=">"
        path={mkUrl(nextPage)}
        isDisabled={currentPage === total || disabled}
      />
    </div>
  );
};

// todo: Create a Pagination data validation

const Pagination: FC<{
  data: TPagination;
  disabled?: boolean;
}> = ({ data, disabled = false }) => {
  // Hide pagination if no data
  if (data == null) {
    return null;
  }

  // Hide pagination if only one page
  return (
    <div className={`w-full flex justify-between items-center`}>
      <div className="text-primary">
        Showing {data.showingFrom} to {data.showingTo} of {data.totalContent}
        &nbsp; entries
      </div>
      <Pages
        pages={data?.pages}
        total={data?.numberOfPages}
        disabled={disabled}
      />
    </div>
  );
};

export default Pagination;
