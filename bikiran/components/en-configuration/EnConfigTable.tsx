"use client";
import { FC } from "react";
import { Switch } from "../ui/switch";
import { TEnConfig } from "./enConfigTypes";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { useEnConfig } from "./context/EnConfigProvider";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import TableWrapper from "@/bikiran/shared/table-wrapper/TableWrapper";
import EmailUploadButton from "./EmailUploadButton";
import useApi from "@/bik-lib/utils/useApi";

const EnConfigTable: FC = () => {
  const { configs: data } = useEnConfig();
  const { openModal, setConfirm, setMessage, setTemplateLoading } =
    useTemplate();

  const { post } = useApi();
  const { reload, loading } = useEnConfig();

  const toggleStatus = (key: string, st: boolean) => {
    setConfirm({
      show: true,
      text: `Are you sure you want to ${
        st ? "enable" : "disable"
      } notification?`,
      textCancel: "Cancel",
      textAction: st ? "Enable" : "Disable",
      textActionCname: st ? "bg-success" : "bg-error",
      textCancelCname: "bg-primary-200",
      clickAction: () => {
        setTemplateLoading(true);
        post(`/admin/notification/email/config/${key}/update-status`, {
          status: st ? "active" : "inactive",
        })
          .then(({ message }) => {
            setMessage(message);
            setConfirm(null);
            reload();
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
        "Key + text-left",
        "Title + w-[150px] xl:w-[300px] text-left",
        // "Vendor + w-[200px] !text-left",
        "Email + w-[100px] !text-center",
        "Status + w-[100px] !text-center",
        "# + w-[50px]",
      ]}
      loading={loading}
      notFoundText="No configuration found!"
    >
      {/* Data */}
      {data?.map((item: TEnConfig) => (
        <tr key={item.id}>
          <td className="!text-center">{item.id}</td>
          <td className="text-left text-primary-500 overflow-hidden text-ellipsis">
            {item.key}
          </td>
          <td className="overflow-hidden text-ellipsis">{item.title}</td>
          <td>
            <div className="flex justify-center">
              <EmailUploadButton data={item} />
            </div>
          </td>
          <td>
            <div className="flex justify-center">
              <Switch
                checked={item.status === "active"}
                onClick={() =>
                  toggleStatus(item?.key, !(item.status === "active"))
                }
              />
            </div>
          </td>
          <td>
            <div className="flex justify-end">
              <InstOption disabled={!item?.vendor}>
                <button
                  type="button"
                  onClick={() => openModal("vendor-update", item)}
                >
                  Update vendor
                </button>
                <button
                  type="button"
                  onClick={() => openModal("send-email", item)}
                >
                  Send email
                </button>
                {item?.isTemplateUploaded && (
                  <button
                    type="button"
                    onClick={() => openModal("update-template", item)}
                  >
                    Update template
                  </button>
                )}
              </InstOption>
            </div>
          </td>
        </tr>
      ))}
    </TableWrapper>
  );
};

export default EnConfigTable;
