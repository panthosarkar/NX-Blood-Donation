"use client";
import InvoiceManageProvider, {
  useInvoiceInfo,
} from "./context/InvoiceManageProvider";
import { FC } from "react";
import { Button } from "@/bik-lib/lib/button";
import { useRouter } from "next/navigation";
import { INVOICE_SCOPES } from "./invoiceManageConstants";
import Image from "next/image";
import ModalAddNote from "./modals/ModalAddNote";
import ModalChangeUser from "./modals/ModalChangeUser";
import PdfWrapper from "@/bik-lib/features/pdf-wrapper/PdfWrapper";
import ModalSendSms from "./modals/ModalSendSms";
import ScopesWrapper from "./ScopesWrapper";
import notFoundImage from "@/public/assets/images/not-found.svg";
import ModalSendEmail from "./modals/ModalSendEmail";
import ModalVatPayment from "./modals/ModalVatPayment";
import ModalAddProduct from "./modals/ModalAddProduct/ModalAddProduct";
import ModalAddPayment from "./modals/ModalAddPayment";
import InvoiceDateComp from "./InvoiceDateComp";
import ModalUpdateTitle from "./modals/ModalUpdateTitle";
import UsefulButtonComp from "./UsefulButtonComp";
import InvoiceDeleteComp from "./InvoiceDeleteComp";
import ModalModifyAddress from "./modals/ModalModifyAddress";
import ModalDeleteInvoice from "./modals/ModalDeleteInvoice";
import ModalInvoiceReopen from "./modals/ModalInvoiceReopen";
import ModalUpdateProduct from "./modals/ModalUpdateProduct";
import ChangeCurrencyComp from "./ChangeCurrencyComp";
import ModalInvoiceRefund from "./modals/ModalInvoiceRefund";
import CustomerBalanceComp from "./CustomerBalanceComp";
import ModalDuplicateProduct from "./modals/ModalDuplicateProduct";
import InvoiceActivitiesComp from "./InvoiceActivitiesComp";
import ModalInvoiceDebitNote from "./modals/ModalFund/ModalInvoiceDebitNote";
import InvoiceTransactionComp from "./InvoiceTransactionComp";
import ModalInvoiceCreditNote from "./modals/ModalFund/ModalInvoiceCreditNote";
import InvoiceManageHeaderComp from "./InvoiceManageHeaderComp";
import InvoiceInformationColumn from "./InvoiceInformationColumn";
import ModalSendPushNotification from "./modals/ModalSendPushNotification";

const PageBody: FC = () => {
  const { invoiceInfo, loading } = useInvoiceInfo();
  const router = useRouter();
  const { invoice, invoiceOwner } = invoiceInfo;

  const invoiceData = {
    userinfo: invoiceOwner,
    invoice: invoice,
  };

  if (invoiceInfo?.notFound && !loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[100vh] ">
        <div className="mb-40">
          <Image
            alt="No invoice selected"
            src={notFoundImage}
            width={0}
            height={0}
          />
          <div className="flex justify-center items-center">
            <h3 className="text-primary text-lg font-medium text-center">
              No invoice found
            </h3>
          </div>
          <div className="flex justify-center items-center mt-5">
            <Button
              variant="secondary"
              className="px-3 py-2"
              onClick={() => router.push("/billing/invoice")}
            >
              Back to the list
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="h-auto flex flex-col lg:flex-row items-stretch justify-center gap-5 pb-30 print:!pb-0 print:overflow-hidden">
      <PdfWrapper className=" hidden print:block">
        <div className="flex-1 max-w-[800px] print:!w-[650px] print:h-fit print:items-center print:mx-auto">
          <InvoiceInformationColumn />
        </div>
      </PdfWrapper>

      <div className="flex-1 max-w-[800px] print:!w-[650px] print:h-[100vh] print:items-center print:mx-auto print:pt-16">
        <InvoiceInformationColumn />
      </div>
      <div className="w-[300px] xl:w-[350px] flex flex-col gap-5 print:hidden">
        <div className="invoice-action-cont">
          <UsefulButtonComp disabled={loading} />
        </div>
        <div className="invoice-action-cont">
          <CustomerBalanceComp />
        </div>
        {/* <div className="invoice-action-cont">
          <ActivitiesComp data={userData} loading={loading} />
        </div> */}
        <ScopesWrapper scope={INVOICE_SCOPES.UPDATE_DATES}>
          <InvoiceDateComp />
        </ScopesWrapper>
        <ScopesWrapper scope={INVOICE_SCOPES.UPDATE_CURRENCY}>
          <ChangeCurrencyComp />
        </ScopesWrapper>
        <ScopesWrapper scope={INVOICE_SCOPES.INVOICE_DELETE}>
          <div>
            <InvoiceDeleteComp invoiceId={invoiceData?.invoice?.id} />
          </div>
        </ScopesWrapper>
        <InvoiceTransactionComp />
        <InvoiceActivitiesComp />
      </div>
    </section>
  );
};

const InvoiceManagePage: FC = () => {
  return (
    <InvoiceManageProvider>
      <InvoiceManageHeaderComp />
      <PageBody />
      {/* modals */}
      <ModalUpdateProduct />
      <ModalChangeUser />
      <ModalModifyAddress />
      <ModalAddNote />
      <ModalUpdateTitle />
      <ModalInvoiceCreditNote />
      <ModalInvoiceDebitNote />
      <ModalSendSms />
      <ModalSendEmail />
      <ModalAddPayment />
      <ModalVatPayment />
      <ModalInvoiceRefund />
      <ModalSendPushNotification />
      <ModalDuplicateProduct />
      <ModalAddProduct />
      <ModalInvoiceReopen />
      <ModalDeleteInvoice />
    </InvoiceManageProvider>
  );
};

export default InvoiceManagePage;
