import { FC } from "react";
import { useUserProjectsList } from "../context/UserProjectsListProvider";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { TUserProjectsItem } from "../userProjectsType";
import UserProjectsSkeletonComp from "../UserProjectsSkeletonComp";
import { UserInfoComp } from "@bikiran/utils";
import Image from "next/image";
import { icons } from "@/bikiran/lib/icons";
import StatusColor from "@/bik-lib/utils/statusColor";
import TableWrapper from "@/bikiran/shared/table-wrapper/TableWrapper";

type TProps = {
  data: {
    projects: TUserProjectsItem[];
  };
};

const UserProjectsListWeb: FC<TProps> = ({ data }) => {
  const { loading } = useUserProjectsList();

  const { openModal } = useTemplate();

  return (
    <TableWrapper
      headers={[
        "ID + w-[100px] !text-center",
        "User/Name + text-start w-[300px]",
        "Project + text-left w-[250px]",
        "Contact + text-left w-[250px]",
        "Status + text-center w-20",
        "# + w-[50px]",
      ]}
      loading={loading}
    >
      {data?.projects.map((item) => (
        <tr key={item?.id} className="hover:!bg-primary-200">
          <td className=" text-center">{item?.id}</td>
          <td className="text-start">
            <UserInfoComp
              photoUrl={item?.user?.photoUrl.trimEnd() || icons.iconUser}
              name={item?.user?.displayName || "----"}
              email={item?.user?.email || "----"}
              ImageComponent={Image}
            />
          </td>
          <td>
            <div className="flex flex-col gap-1">
              <span className="text-primary font-medium">{item.title}</span>
              <span className="text-primary-500">{item.domain}</span>
            </div>
          </td>
          <td className="text-left overflow-ellipsis items-center">
            {item.phone}
          </td>
          <td className="text-center">
            <StatusColor
              status={item.status !== "active" ? "Inactive" : "Active"}
            />
          </td>
          <td>
            <div className="flex justify-end items-center">
              <InstOption disabled>
                <button
                  type="button"
                  onClick={() => openModal("status-Update", item)}
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

export default UserProjectsListWeb;
