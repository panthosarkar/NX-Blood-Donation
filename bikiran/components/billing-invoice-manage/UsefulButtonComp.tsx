import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import AddProductDropdown from "./modals/AddProductDropdown";
import { Button } from "@bikiran/button";
import { useInvoiceInfo } from "./context/InvoiceManageProvider";
import ScopesWrapper from "./ScopesWrapper";
import { INVOICE_SCOPES } from "./invoiceManageConstants";
import { Skeleton } from "../ui/skeleton";
import useApi from "@/bik-lib/utils/useApi";

const UsefulButtonComp: FC<{ disabled: boolean }> = ({ disabled }) => {
  const [renderedItems, setRenderedItems] = useState<string[]>(["Loading"]);
  const ref = useRef<HTMLDivElement>(null);

  const { setMessage, setConfirm, setTemplateLoading, openModal } =
    useTemplate();
  const invoiceId = useParams().id || "";

  const { loading, reload } = useInvoiceInfo();
  const { put } = useApi();

  const activeInvoice = () => {
    setConfirm({
      show: true,
      text: "Are you sure, you want to active this invoice?",
      textCancel: "Cancel",
      textAction: "Active",
      clickAction: () => {
        setTemplateLoading(true);
        setMessage("Status Updating...");
        put(`/admin/invoice/${invoiceId}/make-active`, { invoiceId })
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

  // Callback ref to track when the ref is set
  const setRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      ref.current = node;
      const buttonTexts = Array.from(node.children || []).map(
        (i) => (i as HTMLElement).innerText
      );
      setRenderedItems(buttonTexts);
    }
  }, []);

  if (loading) {
    return (
      <div className="">
        <h2 className="text-primary text-xl font-medium mb-4">Useful Button</h2>
        <div className="flex flex-wrap gap-3">
          {renderedItems.map((i) => (
            <Skeleton key={i} className="px-4 py-2 rounded-8">
              {i}
            </Skeleton>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <h2 className="text-primary text-xl font-medium mb-4">Useful Button</h2>
      <div className="flex flex-wrap gap-3" ref={setRef}>
        <ScopesWrapper scope={INVOICE_SCOPES.PRODUCT_OPERATIONS}>
          <AddProductDropdown disabled={disabled} />
        </ScopesWrapper>
        <ScopesWrapper scope={INVOICE_SCOPES.PAYMENTS}>
          <Button
            variant="yellow-outline"
            className="px-4 py-2"
            onClick={() => openModal("modal-add-payment")}
            disabled={disabled}
          >
            Add Payment
          </Button>
        </ScopesWrapper>
        <ScopesWrapper scope={INVOICE_SCOPES.VAT_PAYMENT}>
          <Button
            disabled={disabled}
            variant="secondary-line"
            className="px-4 py-2"
            onClick={() => openModal("vat-payment")}
          >
            Vat pay
          </Button>
        </ScopesWrapper>
        <ScopesWrapper scope={INVOICE_SCOPES.SET_AS_OPEN}>
          <Button
            disabled={disabled}
            variant="green-outline"
            className="px-4 py-2"
            onClick={() => openModal("invoice-reopen")}
          >
            Reopen
          </Button>
        </ScopesWrapper>
        <ScopesWrapper scope={INVOICE_SCOPES.SEND_EMAIL}>
          <Button
            variant="yellow-outline"
            className="px-4 py-2"
            onClick={() => openModal("send-email")}
            disabled={disabled}
          >
            Send Email
          </Button>
        </ScopesWrapper>
        <ScopesWrapper scope={INVOICE_SCOPES.SEND_SMS}>
          <Button
            variant="secondary-line"
            className="px-4 py-2"
            onClick={() => openModal("send-sms")}
            disabled={disabled}
          >
            Send SMS
          </Button>
        </ScopesWrapper>
        <ScopesWrapper scope={INVOICE_SCOPES.SEND_PUSH_NOTIFICATION}>
          <Button
            variant="green-outline"
            className="px-4 py-2"
            onClick={() => openModal("send-push-notification")}
            disabled={disabled}
          >
            Send Push Notification
          </Button>
        </ScopesWrapper>
        <ScopesWrapper scope={INVOICE_SCOPES.REFUND}>
          <Button
            variant="yellow-outline"
            className="px-4 py-2"
            onClick={() => openModal("invoice-refund")}
            disabled={disabled}
          >
            Refund
          </Button>
        </ScopesWrapper>
        <ScopesWrapper scope={INVOICE_SCOPES.SET_AS_ACTIVE}>
          <Button
            variant="secondary-line"
            className="px-4 py-2"
            onClick={() => activeInvoice()}
            disabled={disabled}
          >
            Set as Active
          </Button>
        </ScopesWrapper>
      </div>
    </div>
  );
};

export default UsefulButtonComp;
