"use client";
import {
  AccountAdmProvider,
  useAccountAdmContext,
} from "./context/AccountAdmProvider";
import { FC } from "react";
import { Pagination } from "@bikiran/utils";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import ModalDebit from "./modals/fund/ModalDebit";
import checkModal from "@/bik-lib/utils/checkModal";
import ModalCredit from "./modals/fund/ModalCredit";
import AccountAdmTableSection from "./AccountAdmTableSection";
import AccountAdmHeaderSection from "./AccountAdmHeaderSection";

const AccountAdmTableComp: FC<{ isHash: boolean }> = ({ isHash }) => {
  const { data, reFetching, pagination } = useAccountAdmContext();

  return (
    <div>
      <AccountAdmTableSection data={data} isHash={isHash} />
      <Pagination
        data={pagination}
        LinkComp={Link}
        pathNameFn={usePathname}
        searchParamsFn={useSearchParams}
        disabled={reFetching || !data}
      />
    </div>
  );
};
const AccountAdmPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  // Check for hash in URL to open specific modal
  // This is a client-side check to open modals based on URL hash
  const { isHash } = checkModal("add-credit-debit-note");

  return (
    <AccountAdmProvider query={query}>
      <div className="admin-section">
        <AccountAdmHeaderSection isHash={isHash} />
        <AccountAdmTableComp isHash={isHash} />
      </div>
      {/* Modals */}
      <ModalCredit />
      <ModalDebit />
      {/* <ModalCreditNote />
      <ModalDebitNote /> */}
    </AccountAdmProvider>
  );
};

export default AccountAdmPage;
