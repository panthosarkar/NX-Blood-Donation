import { FC } from "react";
import { TUserListItem } from "../userListType";
type TProps = {
  data: TUserListItem[];
};
const UserListMobile: FC<TProps> = ({ data }) => {
  return <section>userMobileList</section>;
};

export default UserListMobile;
