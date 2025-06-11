import { FC } from "react";
import UserEmailsListProvider from "./context/UserEmailsListProvider";
import UserEmailsHeaderSection from "./UserEmailsHeaderSection";
import UserEmailsListTable from "./UserEmailsListTable";

const UserEmailsPage: FC<{ query: Record<string, any> }> = ({ query }) => {
  return (
    <UserEmailsListProvider query={query}>
      <UserEmailsHeaderSection />
      <UserEmailsListTable />
    </UserEmailsListProvider>
  );
};

export default UserEmailsPage;
