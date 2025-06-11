import { FC } from "react";
import { TDomainListItem } from "../domainListTypes";
type TProps = {
  data: TDomainListItem[];
};
const DomainListMobile: FC<TProps> = ({ data }) => {
  return <section>DomainListMobile</section>;
};

export default DomainListMobile;
