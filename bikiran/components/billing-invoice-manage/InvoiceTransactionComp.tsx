import { FC } from "react";
import { usePathname } from "next/navigation";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { useInvoiceInfo } from "./context/InvoiceManageProvider";
import { showCurrencySign, showInt } from "@/bik-lib/utils/show";
import { CustomSidebar } from "@bikiran/utils";
import { TInvoiceTransaction } from "./invoiceManageTypes";

const Header: FC<{
  data: TInvoiceTransaction[];
}> = ({ data }) => {
  const { openModal } = useTemplate();
  return (
    <div className="flex items-center justify-between w-full mb-4">
      <div className="flex items-center gap-2">
        <span className="text-primary text-xl font-medium">Transactions</span>
        <div className="text-xs text-secondary font-medium bg-secondary-100 size-6 rounded-full flex justify-center items-center">
          {data?.length || 0}
        </div>
      </div>
      {data?.length !== 0 && (
        <button
          type="button"
          onClick={() => openModal("transaction-sidebar", data)}
          className="text-primary-500 text-sm font-medium hover:border-b hover:text-primary"
        >
          View All
        </button>
      )}
    </div>
  );
};

const TransactionItem: FC<{
  data: TInvoiceTransaction;
}> = ({ data }) => {
  return (
    <div className="border-b last:border-none border-primary-200 pb-2 last:pb-0 mb-2 last:mb-0 flex justify-between items-center">
      <div>
        <p className="text-primary-500 text-xs">Trx : {data?.transactionId}</p>
        <p className="text-primary text-sm">Note : {data?.note}</p>
      </div>

      <div className="text-sm font-medium">
        {showCurrencySign(data?.transactionCurrency)}
        {showInt(data?.transactionAmount)}
      </div>
    </div>
  );
};

const InvoiceTransactionComp: FC = () => {
  const { invoiceInfo, loading } = useInvoiceInfo();
  const { transactions } = invoiceInfo;

  return (
    <div className="invoice-action-cont overflow-hidden">
      <Header data={transactions} />

      {!loading && transactions?.length === 0 && (
        <div className="text-sm text-primary-700">Not transaction found!</div>
      )}

      {!loading &&
        transactions
          ?.slice(0, 4) // Show only 4 transactions
          ?.map((item: TInvoiceTransaction) => (
            <TransactionItem key={item?.transactionId} data={item} />
          ))}

      <CustomSidebar
        showType="transaction-sidebar"
        usePathname={usePathname}
        useTemplate={useTemplate}
        className="max-w-[500px]"
      >
        <h2 className="text-primary text-xl font-medium mb-4">Transactions</h2>
        {!loading &&
          transactions?.map((item: TInvoiceTransaction) => (
            <TransactionItem key={item?.transactionId} data={item} />
          ))}
      </CustomSidebar>
    </div>
  );
};

export default InvoiceTransactionComp;
