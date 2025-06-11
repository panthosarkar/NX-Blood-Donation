import { FC } from "react";
import { showInt } from "@/bik-lib/utils/show";
import { useHosting } from "./context/HostingPricingProvider";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { THostingPkg } from "./HostingTypes";
import useApi from "@/bik-lib/utils/useApi";
import StatusColor from "@/bik-lib/utils/statusColor";

const HostingTableBodyComp: FC<{ data: THostingPkg }> = ({ data }) => {
  const { post } = useApi();
  const { reload, hostingPriceData } = useHosting();
  const { openModal, setStatus, setMessage, setTemplateLoading } =
    useTemplate();

  const updateStatus = () => {
    setStatus({
      array: hostingPriceData?.status,
      name: data?.title,
      defaultValue: data?.status,
      clickAction: (payload: Record<string, any>) => {
        setTemplateLoading(true);
        setMessage("Updating status...");
        post(`/admin/hosting/packages/${data?.id}/change-status`, payload)
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
    <tr className="even:bg-primary-50 !border-0 ">
      <td className="font-medium text-center">{data?.id}</td>
      <td>
        <p className="text-primary-500 text-sm font-normal text-center">
          {data?.subType.toUpperCase()}
        </p>
      </td>
      <td>
        {data?.title}
        <p className="text-primary-500 text-sm font-normal">
          {data?.serverHost}
        </p>
        <p className="text-primary-500 text-sm font-normal">
          {data?.vendor}, {data?.vendorPackageName}
        </p>
      </td>
      <td>
        <p className="text-primary text-sm font-normal">
          {data?.disk} MB, {data?.diskType}
        </p>
        <p className="text-primary-500 text-xs font-normal">
          BW: {data?.bandwidth} MB/MONTH
        </p>
      </td>
      <td>
        <p className="text-primary text-sm font-normal ">
          {data?.cpu} core, {data?.ram / 1024} GB
        </p>
        <p className="text-primary-500 text-xs font-normal ">
          {data?.location}
        </p>
      </td>
      <td>
        <div className="text-primary text-sm font-medium text-center">
          {data?.price === data?.pricePromotion ? (
            <span>$ {showInt(data?.price)}</span>
          ) : (
            <div className="flex flex-col items-center">
              <span
                className={`${data?.pricePromotion === 0 || data?.pricePromotion > data?.price ? "!text-error" : ""}`}
              >
                $ {showInt(data?.pricePromotion)}
              </span>
              <span className="line-through text-primary-500 text-xs">
                $ {showInt(data?.price)}
              </span>
            </div>
          )}
        </div>
      </td>
      <td>
        <p className="text-primary-500 text-sm font-normal text-center">
          $ {showInt(data?.priceSetup)}
        </p>
      </td>
      <td>
        <p className="text-primary-500 text-sm font-normal text-center">
          $ {showInt(data?.priceRestore)}
        </p>
      </td>
      <td className="text-center">
        <StatusColor status={data?.status} />
      </td>
      <td>
        <div className="flex items-center justify-end">
          <InstOption>
            <button
              type="button"
              onClick={() => openModal("update-hosting-package", data)}
            >
              Update Package
            </button>
            <button
              type="button"
              onClick={() => openModal("hosting-server-config", data)}
            >
              Server Configuration
            </button>
            <button type="button" onClick={updateStatus}>
              Change Status
            </button>
          </InstOption>
        </div>
      </td>
    </tr>
  );
};

export default HostingTableBodyComp;
