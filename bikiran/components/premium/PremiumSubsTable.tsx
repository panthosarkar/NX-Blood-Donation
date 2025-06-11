import { icons } from "@/bikiran/lib/icons";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { usePremiumInfo } from "./context/PremiumInfoProvider";
import { GetDate, GetTime } from "@/bik-lib/utils/date";
import { InformationTooltip } from "@bikiran/utils";
import { showCurrencySign, showInt } from "@/bik-lib/utils/show";
import { Pagination, TooltipUserInfo } from "@bikiran/utils";
import StatusColor from "@/bik-lib/utils/statusColor";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import useApi from "@/bik-lib/utils/useApi";
import TableWrapper from "@/bikiran/shared/table-wrapper/TableWrapper";

const PremiumSubsTable = () => {
  const router = useRouter();

  const { post } = useApi();
  const { data, loading, reload } = usePremiumInfo();
  const { openModal, setStatus, setMessage, setTemplateLoading } =
    useTemplate();

  const pagination = data?.pagination;
  const premiumData = data?.contract;
  const status = data?.filters?.status;

  const updateStatus = (item: any) => {
    setStatus({
      array: status,
      name: item?.title,
      defaultValue: item?.status,
      clickAction: (payload: Record<string, any>) => {
        setTemplateLoading(true);
        setMessage("Updating status...");
        post(
          `/admin/premium-contract/{subscriptionId}/change-duration`,
          payload
        )
          .then(({ message }) => {
            setMessage(message);
            reload();
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
    <div>
      <TableWrapper
        headers={[
          "ID  + w-[100px]",
          "User + w-[80px]",
          "Title + !text-left",
          "Date Started + w-[120px] text-center",
          "Date Expire + w-[120px] text-center",
          "Duration + w-[100px] text-center",
          "Currency + w-[80px] text-center",
          "Price + w-[120px] text-center",
          "vat + w-[100px] text-center",
          "Status + w-[100px] text-center",
          "# + w-[50px]",
        ]}
        loading={loading}
        notFoundText="No Premium Contact Found"
      >
        {premiumData?.map((item) => (
          <tr key={item?.id} className="hover:!bg-primary-100">
            <td>{item?.id}</td>
            <td>
              <div className="flex justify-center items-center">
                <TooltipUserInfo ImageComponent={Image} user={item?.user} />
              </div>
            </td>
            <td>
              <div className="text-primary font-medium flex items-center gap-1">
                {" "}
                {item?.title}
                <InformationTooltip
                  content={item?.subType?.replace(/_/g, " ")}
                  align="top"
                  className="z-10"
                >
                  <Image
                    src={icons.iconInfoLine}
                    width={100}
                    height={100}
                    sizes="100vw"
                    alt="info"
                    className="size-4"
                  />
                </InformationTooltip>
              </div>
              <div className="text-primary-500 text-xs font-medium">
                {item?.identityName}
              </div>
            </td>
            <td className="text-center">
              <div>{GetDate(item?.timeIssue)}</div>
              <div>{GetTime(item?.timeIssue)}</div>
            </td>
            <td className="text-center">
              {GetDate(item?.timeExpire)} <br />
              <span
                className={`${
                  item?.expireRemain > 30 ? "text-success" : "text-error"
                } text-xs`}
              >
                {item?.expireRemain} days left
              </span>
            </td>
            <td className="text-center">
              {item?.contractDuration || "_"} {item?.contractUnitName || "_"}
            </td>
            <td className="text-center">{item?.contractCurrency}</td>
            <td>
              <div className="text-primary  font-medium text-center">
                {item?.contractPrice === item?.contractPriceOffer ? (
                  <span>
                    {showCurrencySign(item?.contractCurrency)}{" "}
                    {showInt(item?.contractPriceOffer)}
                  </span>
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="">
                      {showCurrencySign(item?.contractCurrency)}{" "}
                      {showInt(item?.contractPriceOffer)}
                    </span>
                    <span className="line-through text-primary-500 text-[11px] leading-4">
                      {showCurrencySign(item?.contractCurrency)}{" "}
                      {showInt(item?.contractPrice)}
                    </span>
                  </div>
                )}
              </div>
            </td>
            <td className="text-center">{item?.contractVatPercent} %</td>
            <td className="text-center">
              <StatusColor status={item?.status} />
            </td>
            <td>
              <div className="flex justify-end items-center">
                <InstOption disabled={loading}>
                  <button
                    type="button"
                    onClick={(ev) => {
                      ev.stopPropagation();
                      router.push(
                        `/renew?subscriptionId=${item?.id}&asset=premium&userId=${item?.user?.id}&currency=${item?.contractCurrency?.toLowerCase()}`
                      );
                    }}
                  >
                    Renew
                  </button>
                  <button
                    type="button"
                    onClick={() => openModal("add-premium", item)}
                  >
                    Duplicate
                  </button>
                  <button
                    type="button"
                    onClick={() => openModal("premium-update-basic", item)}
                  >
                    Update Basic
                  </button>
                  <button
                    type="button"
                    onClick={() => openModal("update-premium-duration", item)}
                  >
                    Update Duration
                  </button>
                  <button
                    type="button"
                    onClick={() => openModal("update-premium-currency", item)}
                  >
                    Update Currency
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      openModal("premium-subscription-update", item)
                    }
                  >
                    Update Pricing
                  </button>
                  <button
                    type="button"
                    onClick={() => openModal("update-premium-dates", item)}
                  >
                    Update Dates
                  </button>

                  <button
                    type="button"
                    onClick={() => openModal("update-ownership", item)}
                  >
                    Update Ownership
                  </button>
                  <button
                    type="button"
                    onClick={() => updateStatus(item)}
                    className="text-error"
                  >
                    Update Status
                  </button>
                </InstOption>
              </div>
            </td>
          </tr>
        ))}
      </TableWrapper>
      <Pagination
        data={pagination}
        LinkComp={Link}
        pathNameFn={usePathname}
        searchParamsFn={useSearchParams}
        disabled={loading || !premiumData?.length}
      />
    </div>
  );
};

export default PremiumSubsTable;
