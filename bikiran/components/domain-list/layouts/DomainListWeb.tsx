import { FC } from "react";
import { cn } from "@/bik-lib/utils/cn";
import { GetDate } from "@/bik-lib/utils/date";
import { useRouter } from "next/navigation";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { TApiResponse } from "@/bik-lib/types/response";
import { useDomainList } from "../context/DomainListProvider";
import { TDomainListItem } from "../domainListTypes";
import { TooltipUserInfo } from "@bikiran/utils";
import { showCurrencySign, showInt } from "@/bik-lib/utils/show";
import Image from "next/image";
import useApi from "@/bik-lib/utils/useApi";
import StatusColor from "@/bik-lib/utils/statusColor";
import TooltipWrapper from "@/bik-lib/lib/TooltipWrapper";
import DomainListSkeleton from "./DomainListSkeleton";

type TProps = {
  data: TDomainListItem[];
};

const DomainInfo: FC<{
  data: TDomainListItem;
}> = ({ data }) => {
  return (
    <div className="flex flex-col">
      {" "}
      <span className="font-medium text-primary">
        {data?.domainName.toUpperCase() || "---"}
      </span>
      <div className="flex items-center gap-1">
        <span className="text-primary-500 text-xs"> {data?.title}</span>
        <TooltipWrapper content={data.isVerified ? "Verified" : "Not Verified"}>
          {data.isVerified ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={data?.isVerified ? "text-success" : "text-error"}
            >
              <path
                d="M13 0.142853C5.89645 0.142853 0.142883 5.89642 0.142883 13C0.142883 20.1036 5.89645 25.8571 13 25.8571C20.1036 25.8571 25.8572 20.1036 25.8572 13C25.8572 5.89642 20.1036 0.142853 13 0.142853ZM19.3965 7.55714C19.3643 7.64285 19.3322 7.73928 19.2786 7.81428L12.325 18.6464C11.8215 19.375 11.2322 19.3857 10.8036 19.2464C10.5143 19.15 10.2572 18.9786 10.0643 18.7429L6.94645 15.0893C6.6036 14.6929 6.47503 14.1464 6.61431 13.6321C6.8286 12.925 7.39645 12.775 7.88931 12.7964C8.33931 12.8286 8.76788 13.0321 9.05717 13.375L10.525 15.0464C10.5465 15.0679 10.5679 15.1 10.6 15.1214C10.9 15.3679 11.35 15.325 11.6072 15.025L18.1536 7.13928C18.3036 6.96785 18.4857 6.82857 18.7 6.73214C19.4715 6.42142 19.4929 7.20357 19.3965 7.55714Z"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.1401 2.15974C13.7193 -0.213402 10.2807 -0.213401 8.85985 2.15974L0.52546 16.0798C-0.935157 18.5193 0.822257 21.6198 3.6656 21.6198H20.3344C23.1777 21.6198 24.9352 18.5193 23.4745 16.0798L15.1401 2.15974ZM11.4535 13.819C11.4925 14.3135 11.7333 14.5608 12.1757 14.5608C12.6051 14.5608 12.8394 14.3135 12.8784 13.819L13.425 6.63572C13.464 6.23231 13.3599 5.89396 13.1127 5.62069C12.8654 5.34741 12.5466 5.21077 12.1562 5.21077C11.7658 5.21077 11.447 5.34741 11.1997 5.62069C10.9655 5.89396 10.8614 6.23231 10.8874 6.63572L11.4535 13.819ZM11.1607 18.5818C11.3689 18.777 11.6617 18.8746 12.0391 18.8746H12.2928C12.6702 18.8746 12.9565 18.777 13.1517 18.5818C13.3599 18.3736 13.464 18.0808 13.464 17.7034V17.3716C13.464 16.9942 13.3599 16.7079 13.1517 16.5127C12.9565 16.3045 12.6702 16.2004 12.2928 16.2004H12.0391C11.6617 16.2004 11.3689 16.3045 11.1607 16.5127C10.9655 16.7079 10.8679 16.9942 10.8679 17.3716V17.7034C10.8679 18.0808 10.9655 18.3736 11.1607 18.5818Z"
                fill="#F24A17"
              />
            </svg>
          )}
        </TooltipWrapper>
      </div>
    </div>
  );
};

const TableRow: FC<{ data: TDomainListItem }> = ({ data }) => {
  const { openModal, setMessage, setConfirm, setTemplateLoading, setStatus } =
    useTemplate();
  const { put } = useApi();
  const { reload, status } = useDomainList();
  const router = useRouter();

  const updateStatus = () => {
    setStatus({
      array: status,
      name: data?.domainName.toUpperCase(),
      defaultValue: data?.status,
      clickAction: (payload: Record<string, any>) => {
        setTemplateLoading(true);
        setMessage("Updating status...");
        put(`/admin/domain/manage/${data.id}/change-status`, payload)
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

  const deleteDomain = (subsId: number) => {
    setConfirm({
      show: true,
      text: `Are you sure you want to delete this domain`,
      textCancel: "No",
      txtAction: "Yes",

      clickAction: () => {
        setMessage("Closing ticket...");
        setTemplateLoading(true);
        put(`/admin/domain/manage/${subsId}/delete`, {})
          .then(({ message }) => {
            setMessage(message);
            //reload the chat
            reload();
            setConfirm(null);
          })
          .catch(({ message }: Error) => {
            setMessage(message);
          })
          .finally(() => {
            setTemplateLoading(false);
          });
      },
    });
  };

  const syncDown = (id: string) => {
    setMessage("Syncing Down...");
    put<TApiResponse<null>>(`/admin/domain/manage/${id}/sync-down`, {})
      .then(({ message }) => {
        setMessage(message || "Sync Down Success!");
        reload();
      })
      .catch((error) => {
        setMessage(`Error: ${error.message}`);
      });
  };

  const project = data?.project;

  return (
    <tr className="overflow-visible">
      <td className="text-center">{data?.id}</td>
      <td className="text-left items-center">
        <TooltipUserInfo
          user={data?.user}
          ImageComponent={Image}
          redirectClick={() => router.push(`/user/${data?.user?.id}/overview`)}
        />
      </td>
      <td className="text-left">
        <p className="text-primary font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
          {data?.project?.title || "[Not Set]"}
        </p>
        {data?.project?.title && (
          <p className="text-primary-700 text-[11px] leading-4 ">
            #{project?.id}
          </p>
        )}
      </td>
      <td className="text-left">
        <DomainInfo data={data} />
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
      <td className="text-center ">
        {data.contractDuration} {data.contractUnitName}
      </td>
      <td className="text-center">{data?.contractCurrency}</td>
      <td className="text-center !font-medium">
        {data.contractPrice === data.contractPriceOffer ? (
          <div>
            <span>
              {showCurrencySign(data?.contractCurrency)}{" "}
              {showInt(data?.contractPriceOffer)}
            </span>
          </div>
        ) : (
          <div>
            <div>
              <span className="">
                {showCurrencySign(data?.contractCurrency)}{" "}
                {showInt(data?.contractPriceOffer)}
              </span>
            </div>
            <span className="line-through text-primary-500 text-xs">
              {showCurrencySign(data?.contractCurrency)}{" "}
              {showInt(data?.contractPrice)}
            </span>
          </div>
        )}
      </td>
      <td className="text-center !font-medium">
        {data.contractPriceUSD === data.contractPriceOfferUSD ? (
          <span>$ {showInt(data?.contractPriceOfferUSD)}</span>
        ) : (
          <div>
            <span className="">$ {showInt(data.contractPriceOfferUSD)}</span>
            <br />
            <span className="line-through text-primary-500 text-xs">
              $ {showInt(data.contractPriceUSD)}
            </span>
          </div>
        )}
      </td>
      {/* <td className="text-center !font-medium text-success">
        {data.contractVatPercent}%
      </td> */}

      <td
        className={cn("text-center !text-xs !font-medium", {
          "text-green-500":
            data.status === "active" && data.domainStatus === "active",
          "text-red-500":
            data.status !== "active" || data.domainStatus !== "active",
        })}
      >
        <StatusColor
          status={
            data.status === "active" && data.domainStatus === "active"
              ? data.status
              : data.domainStatus?.toLowerCase()
          }
        />
      </td>
      <td>
        <div className="w-full flex justify-end">
          <InstOption className="size-7">
            <button
              type="button"
              onClick={(ev) => {
                ev.stopPropagation();
                syncDown(data.id.toString());
              }}
            >
              Sync Down
            </button>
            <button
              type="button"
              onClick={(ev) => {
                ev.stopPropagation();
                router.push(
                  `/renew?subscriptionId=${data.id}&asset=domain&userId=${data?.user?.id}&currency=${data?.contractCurrency?.toLowerCase()}`
                );
              }}
            >
              Renew
            </button>
            <button
              type="button"
              onClick={(ev) => {
                ev.stopPropagation();
                openModal("domain-add", {
                  ...data,
                  duplicate: "duplicate-pre-register",
                });
              }}
            >
              Dup. Pre-Register Domain
            </button>
            <button
              type="button"
              onClick={(ev) => {
                ev.stopPropagation();
                openModal("domain-add", {
                  ...data,
                  duplicate: "duplicate-resellbiz",
                });
              }}
            >
              Dup. ResellBiz Domain
            </button>
            <button
              type="button"
              onClick={(ev) => {
                ev.stopPropagation();
                openModal("domain-currency-update", data);
              }}
            >
              Update Currency
            </button>
            <button
              type="button"
              onClick={(ev) => {
                ev.stopPropagation();
                openModal("domain-subscription-update", data);
              }}
            >
              Update Pricing
            </button>
            <button
              type="button"
              onClick={(ev) => {
                ev.stopPropagation();
                openModal("update-domain-dates", data);
              }}
            >
              Update Dates
            </button>
            <button
              type="button"
              onClick={(ev) => {
                ev.stopPropagation();
                openModal("domain-change-owner", data);
              }}
            >
              Update Ownership
            </button>
            <button type="button" onClick={updateStatus}>
              Update Status
            </button>
            {data?.status !== "active" && (
              <button onClick={() => deleteDomain(data.id)}>
                Remove Domain
              </button>
            )}
          </InstOption>
        </div>
      </td>
    </tr>
  );
};

const DomainListWeb: FC<TProps> = ({ data }) => {
  const { loading } = useDomainList();
  const placeholderArr = Array.from({ length: data?.length || 3 }, (_, i) => i);
  return (
    <table cellPadding={0} cellSpacing={0} className="table-container">
      <thead>
        <tr>
          <th className="w-[100px] !text-center">ID</th>
          <th className="text-center w-14">User</th>
          <th className="text-left w-[200px]">Project</th>
          <th className="text-left">Domain</th>
          <th className="text-center w-30">Expire At</th>
          <th className="text-center w-[80px]">Duration</th>
          <th className="text-center w-[80px]">Currency</th>
          <th className="text-center w-[100px]">Price(local)</th>
          <th className="text-center w-[100px]">Price(USD)</th>
          {/* <th className="text-center w-20">Vat</th> */}
          <th className="w-[80px] text-center">Status</th>
          <th className="!w-[50px] !text-center">#</th>
        </tr>
      </thead>
      <tbody>
        {loading
          ? placeholderArr.map((i) => <DomainListSkeleton key={i} />)
          : data?.map((item) => <TableRow key={item.id} data={item} />)}

        {!loading && data && data.length === 0 && (
          <tr className="not-found">
            <td className="text-center" colSpan={10} rowSpan={3}>
              No Domain Found!
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default DomainListWeb;
