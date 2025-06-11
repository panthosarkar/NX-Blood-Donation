"use client";
import {
  FC,
  useRef,
  Children,
  ReactNode,
  useEffect,
  ReactElement,
  isValidElement,
} from "react";
import "./style.css";
import TableSkeleton from "./TableSkeleton";
import MobileSkeleton from "./MobileSkeleton";

// SIZE_XS = 425;
// SIZE_SM = 576;
// SIZE_MD = 768;
// SIZE_LG = 991;
// SIZE_XL = 1199;
// SIZE_2XL = 1399;
// SIZE_3XL = 1599;
// SIZE_4XL = 1799;
// SIZE_5XL = 1999;

type TSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";

const getResponsiveClass = (size: TSize | undefined): string[] => {
  switch (size) {
    case "xs":
      return ["xs:table", "xs:hidden"];
    case "sm":
      return ["sm:table", "sm:hidden"];
    case "md":
      return ["md:table", "md:hidden"];
    case "lg":
      return ["lg:table", "lg:hidden"];
    case "xl":
      return ["xl:table", "xl:hidden"];
    case "2xl":
      return ["2xl:table", "2xl:hidden"];
    case "3xl":
      return ["3xl:table", "3xl:hidden"];
    case "4xl":
      return ["4xl:table", "4xl:hidden"];
    case "5xl":
      return ["5xl:table", "5xl:hidden"];
    default:
      return ["lg:table", "lg:hidden"];
  }
};

const TableWrapper: FC<{
  children: ReactNode;
  loading: boolean;
  headers: string[];
  notFoundText?: string;
  responsiveFrom?: TSize;
}> = ({ children, loading, headers, notFoundText, responsiveFrom }) => {
  const isArray = Array.isArray(children);

  const tbodyRef = useRef<HTMLTableSectionElement | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const tbody = tbodyRef.current;
      if (!tbody) return;
      const rows = Array.from(tbody.rows);
      if (rows.length === 0) {
        return;
      }
      const handleClick = (e: MouseEvent) => {
        const clickRow = e.currentTarget as HTMLTableRowElement;
        rows.forEach((row) => row.classList.remove("!bg-primary-200"));
        clickRow.classList.add("!bg-primary-200");
      };
      rows.forEach((row) => {
        row.addEventListener("click", handleClick);
        row.style.cursor = "pointer";
      });
      return () => {
        rows.forEach((row) => {
          row.removeEventListener("click", handleClick);
        });
      };
    }, 100); // slight delay to ensure rows are rendered
    return () => clearTimeout(timeout);
  }, [children]);

  const length =
    isArray && children?.length !== 0 ? children.length - 1 || 1 : 3;
  const placeholderArr = Array.from({ length }).map((_, i) => i);

  // Check if table has # action column
  const isTableHasAction =
    headers?.[headers.length - 1]?.split("+")[0]?.trim() === "#";

  // Remove the last column if it is action column
  const placeholderTds: string[] = isTableHasAction
    ? headers?.slice(0, headers.length - 1)
    : headers;

  const placeholderData = {
    arr: placeholderArr,
    tds: placeholderTds,
    isTableHasAction,
  };

  // Generate mobile cards from table rows
  const mobileData = isArray
    ? Children.map(children, (child: ReactNode) => {
        if (isValidElement(child)) {
          const tds = Children.toArray(
            (child as ReactElement<{ children: ReactNode }>)?.props.children
          );

          return (
            <div className="p-4 border rounded-2xl shadow-md mb-4 bg-white">
              {tds.map((td: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-center mb-3"
                >
                  <span className="text-sm font-medium text-primary-500">
                    {headers[index]?.split("+")[0]}
                  </span>
                  <span className="text-sm font-medium text-primary max-w-[60%] text-right break-words truncate">
                    {td.props.children || "--"}
                  </span>
                </div>
              ))}
            </div>
          );
        }
        return null;
      })
    : null;

  return (
    <div>
      {/* Desktop Table (visible on screens >= 991px) by default */}
      <table
        className={`table-container hidden ${getResponsiveClass(responsiveFrom)[0]}`}
      >
        <thead>
          <tr>
            {headers.map((header, index) => {
              const className = header?.split("+")[1] || "";
              const headerText = header?.split("+")[0] || "Not Set";
              return (
                <th key={`header${index}`} className={className}>
                  {headerText}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody ref={tbodyRef}>
          <TableSkeleton show={loading} data={placeholderData} />

          {!loading && isArray && children.length === 0 && (
            <tr className="not-found">
              <td colSpan={headers.length} className="text-center">
                {notFoundText || "No data found"}
              </td>
            </tr>
          )}
          {!loading && children}
        </tbody>
      </table>

      {/* Mobile Table (visible on screens < 991px) by default */}
      <div className={getResponsiveClass(responsiveFrom)[1]}>
        <MobileSkeleton show={loading} data={placeholderData} />

        {!loading && mobileData}
      </div>
    </div>
  );
};

export default TableWrapper;
