"use client";
import React, { FC } from "react";
import { useHosting } from "./context/HostingPricingProvider";
import HostingTableHeaderComp from "./HostingTableHeaderComp";
import HostingTableBodyComp from "./HostingTableBodyComp";
import HostingTableSkeleton from "./HostingTableSkeleton";

const HostingTableSection: FC = () => {
  const { loading, hostingPriceData } = useHosting();

  const arr = Array.from(
    { length: hostingPriceData.hostingPackages.length || 7 },
    (_, i) => i
  );

  return (
    <div className="flex flex-col gap-3">
      <table cellPadding={0} cellSpacing={0} className="table-container">
        <HostingTableHeaderComp />
        <tbody>
          {loading ? arr.map((i) => <HostingTableSkeleton key={i} />) : null}

          {!loading
            ? hostingPriceData.hostingPackages?.map((item) => (
                <HostingTableBodyComp key={item?.id} data={item} />
              ))
            : null}

          {!loading && !hostingPriceData.hostingPackages.length && (
            <tr className="not-found">
              <td className="text-center" colSpan={12} rowSpan={3}>
                No Hosting List yet!
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* <Pagination totalData={Array.isArray(hostingPriceData) ? hostingPriceData.length : 0} dataPerPage={dataPerPage} setCurrentPage={setCurrentPage} /> */}
    </div>
  );
};

export default HostingTableSection;
