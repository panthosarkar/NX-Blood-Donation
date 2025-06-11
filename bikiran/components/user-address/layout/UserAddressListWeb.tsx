import { FC } from "react";
import { TUserAddressItem } from "../userAddressType";
import UserListSkeletonComp from "../UserAddressSkeletonComp";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { useUserAddressList } from "../context/UserAddressListProvider";
import Image from "next/image";
import { icons } from "@/bikiran/lib/icons";
import { UserInfoComp } from "@bikiran/utils";
import StatusColor from "@/bik-lib/utils/statusColor";
import useApi from "@/bik-lib/utils/useApi";

type TProps = {
  data: TUserAddressItem[];
};

const TableRow: FC<{ data: TUserAddressItem }> = ({ data }) => {
  const { put } = useApi();
  const { status, reload } = useUserAddressList();
  const { openModal, setStatus, setMessage, setTemplateLoading } =
    useTemplate();

  const isInactive: boolean =
    data.status !== "active" || data?.user?.status !== "active";

  const updateStatus = () => {
    setStatus({
      array: status,
      name: data?.name,
      defaultValue: data?.status,
      clickAction: (payload: Record<string, any>) => {
        setTemplateLoading(true);
        setMessage("Updating status...");
        put(`/admin/user/address/${data?.id}/change-status`, payload)
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
    <tr>
      <td className=" text-center">{data?.id}</td>
      <td className="text-start">
        <UserInfoComp
          photoUrl={data?.user?.photoUrl.trimEnd() || icons.iconUser}
          name={data?.user?.displayName || "----"}
          email={data?.email || "----"}
          ImageComponent={Image}
        />
      </td>
      <td>{data?.mobile}</td>
      <td>
        <span className="max-w-[430px] w-full text-start text-wrap line-clamp-2 overflow-hidden text-ellipsis">
          {data?.line1 || "--"} {data?.line2}
          {data?.line3}
        </span>
      </td>
      <td className="text-start text-nowrap overflow-hidden overflow-ellipsis">
        {data?.zipCode}
      </td>
      <td>
        {data?.isPrimary && (
          <div className="size-5  mx-auto">
            <Image
              src={icons.iconTickV2}
              alt="avatar"
              width={25}
              height={25}
              className="w-full h-auto rounded-full"
            />
          </div>
        )}
      </td>
      <td className="text-center">
        <StatusColor status={isInactive ? "Inactive" : "Active"} />
      </td>
      <td>
        <InstOption>
          <button
            type="button"
            onClick={() => openModal("update-address", data)}
          >
            Update Address
          </button>
          <button type="button" onClick={() => updateStatus()}>
            Update Status
          </button>
        </InstOption>
      </td>
    </tr>
  );
};

const UserAddressListWeb: FC<TProps> = ({ data }) => {
  const { loading } = useUserAddressList();
  const arr = Array.from({ length: data?.length || 3 }, (_, i) => i);
  return (
    <table cellPadding={0} cellSpacing={0} className="table-container">
      <thead>
        <tr>
          <th className="!text-center w-[100px]">ID</th>
          <th className="text-start w-[300px]">User/Name </th>
          <th className="text-start w-[150px]">Phone</th>
          <th className="text-left ">Address</th>
          <th className="text-left w-[50px]">Zip</th>
          <th className="text-center w-[80px]">Primary</th>
          <th className="text-center w-24">Status</th>
          <th className="!text-center w-[50px]">#</th>
        </tr>
      </thead>
      <tbody>
        {loading
          ? arr.map((i) => <UserListSkeletonComp key={i} />)
          : data?.map((item) => <TableRow key={item.id} data={item} />)}

        {!loading && data && data.length === 0 && (
          <tr className="not-found">
            <td className="text-center " colSpan={8} rowSpan={3}>
              No Address Found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserAddressListWeb;
