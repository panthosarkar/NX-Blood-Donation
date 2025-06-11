import React, { FC } from "react";
import { useDomain } from "./context/DomainPricingProvider";
import { TDomainPrice } from "./DomainTypes";
import TableWrapper from "@/bikiran/shared/table-wrapper/TableWrapper";
import useApi from "@/bik-lib/utils/useApi";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { showInt } from "@/bik-lib/utils/show";
import StatusColor from "@/bik-lib/utils/statusColor";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";

const DomainTableSection: FC<{ data: any }> = ({ data }) => {
  const { setMessage, setTemplateLoading, setStatus, openModal } =
    useTemplate();
  const { data: tableData, reFetch } = useDomain();
  const { loading } = useDomain();
  const { post } = useApi();

  const updateStatus = () => {
    setStatus({
      array: tableData?.status,
      name: data?.tld,
      defaultValue: data?.status,
      clickAction: (payload: Record<string, any>) => {
        setTemplateLoading(true);

        setMessage("Updating status...");

        post(`/admin/domain/packages/${data?.id}/status-update`, payload)
          .then(({ message }) => {
            setMessage(message);

            reFetch();

            setStatus(null);
          })
          .catch((err) => {
            setMessage(err.message);
          })
          .finally(() => {
            setTemplateLoading(false);
          });
      },
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <TableWrapper
        headers={[
          "ID + !w-[100px] !text-center",
          "TLD + w-[100px] text-start",
          "Price + w-[120px]",
          "Restore Price + w-[120px]",
          "Transfer & renew Price + w-[150px]",
          "Redemption Price + w-[120px]",
          "Duration + w-[100px] text-center",
          "Status + w-[100px] text-center",
          "# + !w-[50px] !text-center",
        ]}
        loading={loading}
        notFoundText="No Domain Found"
      >
        {tableData.domainPackages?.map((item: TDomainPrice) => (
          <tr key={item?.id} className="hover:!bg-primary-200">
            <td className="font-medium !w-[100px] !text-center">{item?.id}</td>
            <td>
              <p className="text-primary-500 text-left font-normal">
                {item?.tld}
              </p>
            </td>
            <td>
              <div className="text-primary  font-medium text-center">
                {item?.price === item?.pricePromotion ? (
                  <span>$ {showInt(item?.price)}</span>
                ) : (
                  <div className="flex flex-col items-center">
                    <span
                      className={`${item?.pricePromotion === 0 || item?.pricePromotion > item?.price ? "!text-error" : ""}`}
                    >
                      $ {showInt(item?.pricePromotion)}
                    </span>
                    <span className="line-through text-primary-500 text-[11px] leading-4">
                      $ {showInt(item?.price)}
                    </span>
                  </div>
                )}
              </div>
            </td>
            <td>
              <p className="text-primary  text-center font-normal">
                ${showInt(item?.priceRestore)}
              </p>
            </td>
            <td>
              <p className="text-primary  text-center font-normal">
                ${showInt(item?.priceTransferIn)}
              </p>
            </td>
            <td>
              <p className="text-primary  text-center font-normal">
                ${showInt(item?.priceRedemption)}
              </p>
            </td>
            <td>
              <p className="text-primary-500  font-normal text-center">
                {item?.minQuantity} Year
              </p>
            </td>
            <td className="text-center">
              <StatusColor status={item?.status} />
            </td>
            <td>
              <div className="flex items-center justify-center">
                <InstOption>
                  <button
                    type="button"
                    onClick={() => openModal("update-domain-package", item)}
                  >
                    Update Package
                  </button>
                  <button type="button" onClick={updateStatus}>
                    Update Status
                  </button>
                </InstOption>
              </div>
            </td>
          </tr>
        ))}
      </TableWrapper>

      {/* <tbody>
          {loading
            ? Array.from({ length: data?.domainPackages.length || 2 })
                .map((_, i) => i)
                .map((i) => <DomainTableSkeletonComp key={i} />)
            : null}

          {!loading &&
            data.domainPackages?.map((item: TDomainPrice) => (
              <DomainTableBodyComp key={item?.id} data={item} />
            ))}

          {!loading && data.domainPackages.length === 0 && (
            <tr className="hover:!bg-transparent">
              <td colSpan={8} className="text-center font-medium !text-xl h-40">
                No Domain Found
              </td>
            </tr>
          )}
        </tbody>
      </table> */}
      {/* <Pagination
        totalData={Array.isArray(data) ? data.domainPackages.length : 0}
        dataPerPage={dataPerPage}
        setCurrentPage={setCurrentPage}
      /> */}
    </div>
  );
};

export default DomainTableSection;
