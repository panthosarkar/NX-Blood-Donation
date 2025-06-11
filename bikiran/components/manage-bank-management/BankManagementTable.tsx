import { FC } from "react";
import { useBankManagement } from "./context/BankManagementProvider";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import StatusColor from "@/bik-lib/utils/statusColor";
import TableWrapper from "@/bikiran/shared/table-wrapper/TableWrapper";
import useApi from "@/bik-lib/utils/useApi";
import { TBankAccount } from "./bankManagementTypes";

const BankManagementTable: FC = () => {
  const { loading, accounts } = useBankManagement();
  const { openModal, setStatus, setTemplateLoading, setMessage } =
    useTemplate();
  const { put } = useApi();
  const { reload } = useBankManagement();

  const updateStatus = (item: TBankAccount) => {
    setStatus({
      array: ["active", "inactive"],
      name: item?.id.toString(),
      defaultValue: item?.status,
      clickAction: (payload: Record<string, any>) => {
        setTemplateLoading(true);
        setMessage("Updating status...");
        put(`/admin/config/bank-account/${item?.id}/update-status`, payload)
          .then(({ message }) => {
            setMessage(message);
            reload();
            setStatus(null);
          })
          .catch((err) => {
            setMessage(err.message);
          })
          .finally(() => {
            setTemplateLoading(false);
          });
      },
    });
  };

  return (
    <TableWrapper
      headers={[
        "ID + w-[100px] !text-center",
        "Account Name + text-left",
        "Ac. Number + w-[130px] !text-center",
        "Bank Name + text-left",
        "Routing Number + w-[130px] !text-center",
        "Swift + w-[100px] !text-center",
        "Status + w-[100px] !text-center",
        "# + w-[50px]",
      ]}
      loading={loading}
      notFoundText="No Bank account added!"
    >
      {accounts?.map((item) => {
        const isInactive: boolean = item.status !== "active";

        const bankInfo = item?.bankInfo;
        return (
          <tr key={item.id}>
            <td className=" text-center">{item?.id}</td>
            <td className="text-left">{bankInfo.accountName}</td>
            <td className="text-center">{bankInfo.accountNumber}</td>
            <td className="text-left">{bankInfo.bankName}</td>
            <td className="text-center">{bankInfo.routingNumber}</td>
            <td className="text-center">{bankInfo.swift}</td>

            <td className="text-center">
              <StatusColor status={isInactive ? "Inactive" : "Active"} />
            </td>
            <td>
              <InstOption>
                <button
                  type="button"
                  onClick={() => openModal("update:bank-account", item)}
                >
                  Update Info
                </button>
                <button type="button" onClick={() => updateStatus(item)}>
                  Update Status
                </button>
              </InstOption>
            </td>
          </tr>
        );
      })}
    </TableWrapper>
  );
};

export default BankManagementTable;
