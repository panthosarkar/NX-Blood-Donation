"use client";
import { FC, useEffect } from "react";
import UserListProvider from "./context/UserListProvider";
import UserListHeader from "./UserListHeader";
import UserListTable from "./UserListTable";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import UserSideBarSection from "./user-sidebar-section/UserSideBarSection";
import { CustomSidebar } from "@bikiran/utils";
import { usePathname } from "next/navigation";
import checkModal from "../../../bik-lib/utils/checkModal";

const UserListPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  const { modalData } = useTemplate();
  // Check for hash in URL to open specific modal
  // This is a client-side check to open modals based on URL hash
  checkModal("create-user");

  return (
    <UserListProvider query={query}>
      <section>
        <UserListHeader />
      </section>
      <section className="overflow-auto custom-scrollbar">
        <UserListTable />
        <CustomSidebar
          showType="user-list-sidebar"
          usePathname={usePathname}
          useTemplate={useTemplate}
          className="[&_.content-wrapper]:!pt-0"
        >
          <UserSideBarSection data={modalData} />
        </CustomSidebar>
      </section>
    </UserListProvider>
  );
};

export default UserListPage;
