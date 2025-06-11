import React, { FC } from "react";
import { useManagePermission } from "./context/ManagePermissionProvider";
import ManagePermissionSkeleton from "./ManagePermissionSkeleton";
import { TProjectPermissionItem } from "./dummydata";
import { RoleTag } from "./ManagePermissionActionComp";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { UserInfoComp } from "@bikiran/utils";
import Image from "next/image";
import { icons } from "@/bikiran/lib/icons";
import StatusColor from "@/bik-lib/utils/statusColor";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import useApi from "@/bik-lib/utils/useApi";

const TableRow: FC<{ data: any }> = ({ data }) => {
  const { openModal, setConfirm, setTemplateLoading, setMessage } =
    useTemplate();
  const { put } = useApi();
  const revokePermission = (data: TProjectPermissionItem) => {
    setConfirm({
      show: true,
      text: "Are you sure you want to revoke this invitation?",
      textCancel: "No",
      textAction: "Yes",
      clickAction: () => {
        setTemplateLoading(true);
        setMessage("Revoking invitation...");
        put(`/admin/founder/permission/${data?.id}/revoke`, {})
          .then(({ message }) => {
            setMessage(message);
            // reloadProjectInfo();
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
  const isInactive: boolean =
    data.status !== "active" || data?.user?.status !== "active";
  return (
    <tr>
      <td className="text-center">#{data.id}</td>
      <td className="text-start">
        <UserInfoComp
          photoUrl={data?.user?.photoUrl.trimEnd() || icons.iconUser}
          name={data?.user?.displayName || "----"}
          email={data?.user?.email || "----"}
          ImageComponent={Image}
        />
      </td>
      <td className="text-left">
        <RoleTag role={data.role} />
      </td>
      <td className="text-center">
        <StatusColor status={isInactive ? "Inactive" : "Active"} />
      </td>
      <td>
        <InstOption>
          <button onClick={() => openModal("update-permission-status", data)}>
            Update Status
          </button>
          <button onClick={() => revokePermission(data)}>Revoke</button>
        </InstOption>
      </td>
    </tr>
  );
};

const ManagePermissionListWeb: FC = () => {
  const { permissionData, loading } = useManagePermission();
  const arr = Array.from({ length: permissionData?.length || 3 }, (_, i) => i);
  return (
    <table
      cellPadding={0}
      cellSpacing={0}
      className="table-container table-fixed"
    >
      <thead>
        <tr>
          <th className="w-[100px] !text-center">User ID</th>
          <th className="text-start w-72">User </th>
          <th className="text-left w-[300px]">Role</th>
          <th className="text-center w-20">Status</th>
          <th className=" !text-center w-[50px]">#</th>
        </tr>
      </thead>
      <tbody>
        {loading && permissionData
          ? arr.map((i) => <ManagePermissionSkeleton key={i} />)
          : Array.isArray(permissionData) &&
            permissionData?.map((item) => (
              <TableRow key={item.id} data={item} />
            ))}

        {!loading && !permissionData.length && (
          <tr className="not-found">
            <td className="text-center" colSpan={5} rowSpan={3}>
              No Permission List yet!
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ManagePermissionListWeb;
