import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { FC, useState } from "react";
import { TUserListItem } from "../userListType";
import { useUserList } from "../context/UserListProvider";
import UserListSkeletonWeb from "./UserListSkeletonWeb";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { TPagination } from "@/bik-lib/types/response";
import { UserInfoComp } from "@bikiran/utils";
import Image from "next/image";
import StatusColor from "@/bik-lib/utils/statusColor";
import useApi from "@/bik-lib/utils/useApi";
import TableWrapper from "@/bikiran/shared/table-wrapper/TableWrapper";

type TProps = {
  data: {
    users: TUserListItem[];
    status: string[];
    pagination: TPagination;
  };
};
const UserListWeb: FC<TProps> = ({ data }) => {
  const [isActive, setIsActive] = useState(false);

  const { post } = useApi();
  const { loading, reload, userListData } = useUserList();
  const { modalData, openModal, setStatus, setTemplateLoading, setMessage } =
    useTemplate();

  const handleRowClick = (item: TUserListItem) => {
    setIsActive(!isActive); // Active state toggle
    openModal("user-list-sidebar", item); // Modal open
  };

  const updateStatus = (item: TUserListItem) => {
    setStatus({
      array: userListData?.status,
      name: item?.name,
      defaultValue: item?.status,
      clickAction: (payload: Record<string, any>) => {
        setTemplateLoading(true);
        setMessage("Updating status...");
        post(`/admin/user/${item?.id}/update-status`, payload)
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
        "User/Name + text-left w-[260px]",
        "Phone + text-left w-[150px]",
        "Organization + text-left w-[100px]",
        "Address + text-left w-[150px]",
        "Source + text-center w-[100px]",
        "Status + text-center w-[100px]",
        "# + !text-center w-[50px]",
      ]}
      loading={loading}
    >
      {data?.users?.map((item) => (
        <tr
          key={item?.id}
          onClick={() => handleRowClick(item)}
          className={`cursor-pointer hover:!bg-primary-100 ${
            modalData?.id === item.id ? "!bg-primary-200" : ""
          }`}
        >
          <td className="text-center">{item?.id}</td>
          <td className="text-left">
            <UserInfoComp
              photoUrl={item?.photoUrl.trimEnd()}
              name={item?.name}
              email={item?.email}
              ImageComponent={Image}
            />
          </td>
          <td>{item?.phone || "--"}</td>
          <td>{item?.organization || "--"}</td>
          <td>
            <div className="max-w-[275px] overflow-hidden">
              <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                {item?.address || "--"}
              </div>
              <div>{item?.addressZip || "--"}</div>
            </div>
          </td>
          <td className="text-center">{item?.source || "--"}</td>
          <td className="text-center">
            <StatusColor status={item.status} />
          </td>
          <td>
            <div className="w-full flex justify-end">
              <InstOption className="size-7">
                {/* <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            openModal("update-user", item);
          }}
        >
          Update
        </button> */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateStatus(item);
                  }}
                >
                  Update Status
                </button>
              </InstOption>
            </div>
          </td>
        </tr>
      ))}
    </TableWrapper>
  );
};

export default UserListWeb;
