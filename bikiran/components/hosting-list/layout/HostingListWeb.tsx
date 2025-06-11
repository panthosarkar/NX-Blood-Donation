import { FC } from "react";
import { GetDate } from "@/bik-lib/utils/date";
import { useRouter } from "next/navigation";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { useHostingList } from "../context/HostingListProvider";
import { THostingListItem } from "../hostingListType";
import { showCurrencySign, showInt } from "@/bik-lib/utils/show";
import { CopyWrapper, TooltipUserInfo } from "@bikiran/utils";
import Image from "next/image";
import useApi from "@/bik-lib/utils/useApi";
import StatusColor from "@/bik-lib/utils/statusColor";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import HostingListSkeletonComp from "../HostingListSkeletonComp";
import Link from "next/link";
type TProps = {
  data: THostingListItem[];
};

const TableRow: FC<{ data: THostingListItem }> = ({ data }) => {
  const { openModal, setMessage, setStatus, setTemplateLoading } =
    useTemplate();

  const router = useRouter();

  const { put } = useApi();
  const { reload, status } = useHostingList();

  const updateStatus = () => {
    setStatus({
      array: status,
      name: data?.title,
      defaultValue: data?.status,
      clickAction: (payload: Record<string, any>) => {
        setTemplateLoading(true);
        setMessage("Updating status...");
        put(`/admin/hosting/manage/${data?.id}/update-status`, payload)
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
    <tr>
      <td className=" text-center">
        <CopyWrapper content={data?.id} />
      </td>
      <td>
        <TooltipUserInfo
          user={data?.user}
          ImageComponent={Image}
          redirectClick={() => router.push(`/user/${data?.user?.id}/overview`)}
        />
        {/* <UserInformation data={data.user} key={data.id} /> */}
      </td>
      <td className="text-left">
        <div className="flex flex-col">
          {data?.domainName ? (
            <span className="text-primary font-medium  2xl:text-sm text-[13px]">
              {data?.domainName.toUpperCase()}
            </span>
          ) : (
            <span className="text-xs text-error">Not Configured</span>
          )}
          <span className=" text-primary-500 2xl:text-base text-sm">
            {data?.title}
          </span>
        </div>
      </td>
      <td className="text-center">
        <Link
          href={`/hosting/cpanels?subscriptionId=${data?.id}`}
          className="size-full underline hover:text-secondary"
        >
          {data.cpUsed}/{data?.cpLimit}
        </Link>
      </td>
      <td className="text-center">
        {GetDate(data?.timeExpire)} <br />
        {data?.expireRemain === 0 ? (
          <span className="text-error text-xs">Expired</span>
        ) : (
          <span
            className={`${
              data?.expireRemain > 30 ? "text-success" : "text-error"
            } text-xs`}
          >
            {data?.expireRemain} days left
          </span>
        )}
      </td>
      <td className="text-center">
        {data?.contractDuration} {capitalizeFirstLetter(data?.contractUnitName)}
      </td>
      <td className="text-center !font-medium">
        <div className="flex justify-center">
          {data?.contractPrice === data?.contractPriceOffer ? (
            <span>
              {showCurrencySign(data.contractCurrency)}{" "}
              {showInt(data?.contractPriceOffer)}
            </span>
          ) : (
            <div className="flex flex-col">
              <span className="">
                {showCurrencySign(data.contractCurrency)}{" "}
                {showInt(data?.contractPriceOffer)}
              </span>
              <span className="line-through text-xs text-primary-500">
                {showCurrencySign(data.contractCurrency)}{" "}
                {showInt(data?.contractPrice)}
              </span>
            </div>
          )}
        </div>
      </td>
      <td className="text-center !font-medium">
        <div className="flex justify-center">
          {data?.contractPriceUSD === data?.contractPriceOfferUSD ? (
            <span>$ {showInt(data?.contractPriceOfferUSD)}</span>
          ) : (
            <div className="flex flex-col">
              <span className="">${showInt(data?.contractPriceOfferUSD)}</span>
              <span className="line-through text-xs text-primary-500">
                ${showInt(data?.contractPriceUSD)}
              </span>
            </div>
          )}
        </div>
      </td>
      <td className="text-center text-success">{data?.contractVatPercent}%</td>
      <td className="text-center">
        <StatusColor status={data?.status} />
      </td>
      <td>
        <InstOption>
          <button
            type="button"
            onClick={(ev) => {
              ev.stopPropagation();
              router.push(
                `/renew?subscriptionId=${data.id}&asset=hosting&userId=${data?.user?.id}&currency=${data?.contractCurrency?.toLowerCase()}`
              );
            }}
          >
            Renew
          </button>
          <button
            type="button"
            onClick={() => openModal("update-Package", data)}
          >
            Update Package
          </button>
          <button type="button" onClick={() => openModal("update-basic", data)}>
            Update Basic
          </button>
          <button
            type="button"
            onClick={() => openModal("update-cp-limit", data)}
          >
            Update cP Limit
          </button>
          <button
            type="button"
            onClick={() => openModal("update-ownership", data)}
          >
            Update Ownership
          </button>
          <button
            type="button"
            onClick={() => openModal("update-hosting-duration", data)}
          >
            Update Duration
          </button>
          <button
            type="button"
            onClick={() => openModal("update-hosting-currency", data)}
          >
            Update Currency
          </button>
          <button
            type="button"
            onClick={() => openModal("update-pricing", data)}
          >
            Update Pricing
          </button>{" "}
          <button
            type="button"
            onClick={() => openModal("update-hosting-dates", data)}
          >
            Update Dates
          </button>
          <button type="button" onClick={updateStatus}>
            Update Status
          </button>
        </InstOption>
      </td>
    </tr>
  );
};

const HostingListWeb: FC<TProps> = ({ data }) => {
  const { loading } = useHostingList();
  const placeholderArr = Array.from({ length: data?.length || 3 }, (_, i) => i);
  return (
    <table cellPadding={0} cellSpacing={0} className="table-container">
      <thead>
        <tr>
          <th className="w-[100px] !text-center">ID</th>
          <th className="text-center w-14">User </th>
          <th className="text-left">Title</th>
          <th className="text-center w-20">cPanels</th>
          <th className="text-center w-28">Expire At</th>
          <th className="text-center w-28">Duration</th>
          <th className="text-center w-24">Price(local)</th>
          <th className="text-center w-24">Price(USD)</th>
          <th className="text-center w-20">Vat</th>
          <th className="text-center w-[80px]">Status</th>
          <th className="!w-[50px]"># </th>
        </tr>
      </thead>
      <tbody>
        {loading
          ? placeholderArr.map((i) => <HostingListSkeletonComp key={i} />)
          : data.map((item) => <TableRow key={item.id} data={item} />)}

        {!loading && data.length === 0 && (
          <tr className="not-found">
            <td colSpan={11} className="text-center">
              No hosting data found!
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default HostingListWeb;
