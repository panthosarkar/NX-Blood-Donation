import { FC } from "react";
import UserPhonesListProvider from "./context/UserPhonesListProvider";
import UserPhonesHeaderSection from "./UserPhonesHeaderSection";
import UserPhonesListTable from "./UserPhoneListTable";

const UserPhonesPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  return (
    <UserPhonesListProvider query={query}>
      <section>
        <UserPhonesHeaderSection />
      </section>
      <section>
        <UserPhonesListTable />
      </section>
    </UserPhonesListProvider>
  );
};

export default UserPhonesPage;
