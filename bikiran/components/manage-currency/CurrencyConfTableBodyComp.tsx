import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { TCurrencyConfData } from "./CurrencyConfTypes";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { FC } from "react";
import StatusColor from "@/bik-lib/utils/statusColor";
import useApi from "@/bik-lib/utils/useApi";
import { useCurrencyConfContext } from "./context/CurrencyConfProvider";

interface IProps {
  data: TCurrencyConfData;
}
const CurrencyConfTableBodyComp: FC<IProps> = ({ data }: IProps) => {
  const { openModal, setStatus, setTemplateLoading, setMessage } =
    useTemplate();

  const { put } = useApi();
  const { status, reload } = useCurrencyConfContext();

  const updateStatus = () => {
    setStatus({
      array: status,
      name: data?.id.toString(),
      defaultValue: data?.status,
      clickAction: (payload: Record<string, any>) => {
        setTemplateLoading(true);
        setMessage("Updating status...");
        put(
          `/admin/billing/currency-configuration/${data?.id}/update-status`,
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
    <tr>
      <td className="font-medium text-center">{data.id}</td>
      <td>
        <p className="text-primary-500 text-sm font-normal text-left">
          {data.title}
        </p>
      </td>
      <td>
        <p className="text-primary-500 text-sm font-normal text-center">
          {data.currency}
        </p>
      </td>
      <td>
        <p className="text-primary-500 text-sm font-normal text-center">
          {data.rate}
        </p>
      </td>
      <td className="text-center">
        <StatusColor status={data?.status || "---"} />
      </td>
      <td>
        {data.currency !== "USD" ? (
          <InstOption>
            {/* <button type="button" onClick={() => {}}>
              Details
            </button> */}
            <button
              type="button"
              onClick={() => openModal("update-currency", data)}
            >
              Update Rate
            </button>
            <button type="button" onClick={updateStatus}>
              Update Status
            </button>
          </InstOption>
        ) : null}
      </td>
    </tr>
  );
};

export default CurrencyConfTableBodyComp;
