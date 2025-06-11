import { FC } from "react";

import ClientInfoTableHeaderComp from "./ClientInfoTableHeaderComp";
import { useClientInfo } from "./context/ClientInfoProvider";
import ClientTableBody from "./ClientTableBody";

const ClientInfoTableSection: FC = () => {
  const { clientData } = useClientInfo();
  return (
    <div>
      <ClientInfoTableHeaderComp />
      <ClientTableBody data={clientData || []} />
    </div>
  );
};

export default ClientInfoTableSection;
