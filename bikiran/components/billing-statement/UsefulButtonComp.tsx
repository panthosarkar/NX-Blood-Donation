import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { FC } from "react";
import { useParams } from "next/navigation";
import { Button } from "@bikiran/button";
import { useStatementInfo } from "./context/StatementProvider";
import useApi from "@/bik-lib/utils/useApi";

const UsefulButtonComp: FC<{ disabled: boolean }> = ({ disabled }) => {
  const { setMessage, setConfirm, setTemplateLoading, openModal } =
    useTemplate();
  const { post } = useApi();
  const invoiceId = useParams().id || "";
  const { reload } = useStatementInfo();

  const activeInvoice = () => {
    setConfirm({
      show: true,
      text: "Are you sure, you want to active this statement?",
      textCancel: "Cancel",
      textAction: "Active",
      clickAction: () => {
        setTemplateLoading(true);
        setMessage("Status Updating...");
        post(`/admin/${invoiceId?.toString()}/statement/update-status`, {
          providerId: invoiceId?.toString(),
        })
          .then(({ message }) => {
            setMessage(message);
            setConfirm(null);
            setTemplateLoading(false);
            reload();
          })
          .catch((err: Error) => {
            setTemplateLoading(false);
            setMessage(err.message);
          });
      },
    });
  };

  return (
    <div className="">
      <h2 className="text-primary text-xl font-medium mb-4">Useful Button</h2>
      <div className="flex flex-wrap gap-3">
        <Button
          variant="secondary"
          className="px-4 py-2"
          onClick={() => openModal("filter-by-customer")}
          disabled={disabled}
        >
          Filter by customer
        </Button>
        <Button
          variant="secondary"
          className="px-4 py-2"
          onClick={activeInvoice}
          disabled={disabled}
        >
          Change Status
        </Button>
      </div>

      {/* TODO : Need to add condition according to  backend scopes for all buttons */}
    </div>
  );
};

export default UsefulButtonComp;
