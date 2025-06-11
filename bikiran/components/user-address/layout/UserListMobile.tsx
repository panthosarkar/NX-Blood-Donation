import { FC } from "react";
import { TUserAddressItem } from "../userAddressType";

type TProps = {
  data: TUserAddressItem[];
};
const UserListMobile: FC<TProps> = ({ data }) => {
  return <section>userMobileList</section>;
};

export default UserListMobile;
