import { FC } from "react";
import { TUserEmailsItem } from "../userEmailsType";

type TProps = {
  data: TUserEmailsItem[];
};
const UserListMobile: FC<TProps> = ({ data }) => {
  return <section>userMobileList</section>;
};

export default UserListMobile;
