"use client";
import { FC } from "react";
import { icons } from "@/bikiran/lib/icons";
import { Switch } from "../ui/switch";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { useUserProp } from "./context/UserPropertiesProvider";
import { UserInfoComp } from "@bikiran/utils";
import Image from "next/image";
import useApi from "@/bik-lib/utils/useApi";
import StatusColor from "@/bik-lib/utils/statusColor";
import TableWrapper from "@/bikiran/shared/table-wrapper/TableWrapper";

const UserPropertiesTable: FC = () => {
  const { loading, userProperties, reload } = useUserProp();

  const { openModal, setConfirm, setTemplateLoading, setMessage } =
    useTemplate();

  const { put } = useApi();

  const toggleStatus = (
    type: "2FA" | "Billing",
    userId: number,
    status: boolean
  ) => {
    const apiUrl =
      type === "Billing"
        ? `/admin/user/prop/${userId}/change-billing-status`
        : `/admin/user/prop/${userId}/change-tfa-status`;

    setConfirm({
      show: true,
      text: `Are you sure you want to ${status ? "disable" : "enable"} ${type}?`,
      textCancel: "Cancel",
      textAction: status ? "Disable" : "Enable",
      textActionCname: status ? "bg-error" : "bg-success",
      textCancelCname: "bg-primary-200",
      clickAction: () => {
        setTemplateLoading(true);
        setMessage("Updating status...");
        put(apiUrl, {
          isEnable: status ? false : true,
        })
          .then(({ message }) => {
            setMessage(message);
            reload();
            setConfirm(null);
          })
          .catch((err: Error) => {
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
        "Username + text-start w-[300px]",
        "2FA + w-[80px]",
        "Billing + w-[80px]",
        "Projects + text-center w-[80px]",
        "Status + text-center w-20",
        "# + w-[50px]",
      ]}
      loading={loading}
    >
      {userProperties?.map((data) => {
        const isInactive: boolean = data.status !== "active";
        return (
          <tr key={data?.id} className="hover:!bg-primary-100">
            <td className=" text-center">{data?.id}</td>
            <td className="text-start">
              <UserInfoComp
                photoUrl={data?.photoUrl?.trimEnd() || icons.iconUser}
                name={data?.name || "----"}
                email={data?.email || "----"}
                ImageComponent={Image}
              />
            </td>
            <td>
              <div className="flex justify-center">
                <Switch
                  checked={data.tfaEnabled}
                  disabled={isInactive}
                  onClick={() =>
                    toggleStatus("2FA", data?.id, data?.tfaEnabled)
                  }
                />
              </div>
            </td>
            <td>
              <div className="flex justify-center">
                <Switch
                  checked={data?.billingEnabled}
                  disabled={isInactive}
                  onClick={() =>
                    toggleStatus("Billing", data?.id, data?.billingEnabled)
                  }
                />
              </div>
            </td>
            <td className="text-center">{data?.projectLimit}</td>
            <td className="text-center">
              <StatusColor status={isInactive ? "Inactive" : "Active"} />
            </td>
            <td>
              <div className="flex justify-end">
                <InstOption>
                  <button
                    type="button"
                    onClick={() => openModal("update-project-limit", data)}
                  >
                    Update Project Limit
                  </button>
                </InstOption>
              </div>
            </td>
          </tr>
        );
      })}
    </TableWrapper>
  );
};

export default UserPropertiesTable;
