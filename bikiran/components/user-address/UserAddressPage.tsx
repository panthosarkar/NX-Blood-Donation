import { FC } from "react";
import UserAddressListProvider from "./context/UserAddressListProvider";
import UserAddressHeaderSection from "./UserAddressHeaderSection";
import UserAddressListTable from "./UserAddressListTable";

const UserAddressPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  return (
    <UserAddressListProvider query={query}>
      <UserAddressHeaderSection />
      <UserAddressListTable />
    </UserAddressListProvider>
  );
};

export default UserAddressPage;
