import { FC } from "react";
import DomainListWeb from "./layouts/DomainListWeb";
import { useDomainList } from "./context/DomainListProvider";
import { SIZE_MD, useLayout } from "@/bik-lib/context/LayoutProvider";
import DomainListMobile from "./layouts/DomainListMobile";
import { Pagination } from "@bikiran/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const DomainListTable: FC = () => {
  const { loading, domainListData, pagination } = useDomainList();
  const { windowWidth } = useLayout();

  return (
    <div>
      {windowWidth > SIZE_MD ? (
        <DomainListWeb data={domainListData} />
      ) : (
        <DomainListMobile data={domainListData} />
      )}
      <Pagination
        data={pagination}
        LinkComp={Link}
        pathNameFn={usePathname}
        searchParamsFn={useSearchParams}
        disabled={loading || domainListData?.length === 0}
      />
    </div>
  );
};

export default DomainListTable;
