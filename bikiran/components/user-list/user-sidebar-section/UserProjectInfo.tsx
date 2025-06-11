import InfoWrapper, {
  InfoDivider,
} from "@/bik-lib/features/info-wrapper/InfoWrapper";
import { FC } from "react";
import { icons } from "@/bikiran/lib/icons";
import { TProject } from "../userListType";
import Image from "next/image";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";

const UserProjectInfo: FC<{ data: TProject[] }> = ({ data }) => {
  return (
    <InfoWrapper className="!p-5">
      <InfoDivider title="Project" />
      <table className="table-container mt-2">
        <thead>
          <tr>
            <th className="w-[50px] !text-center">ID</th>
            <th className="w-[100px] !text-center">Icon</th>
            <th className="text-start">Title</th>
            <th className="w-[80px] !text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {data !== undefined && data?.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <td className="text-center">{item.id}</td>
                <td>
                  <div className="flex items-center justify-center">
                    <Image
                      src={item.faviconUrl || icons.iconDefaultApp}
                      alt="Project Icon"
                      width={20}
                      height={20}
                    />
                  </div>
                </td>
                <td>
                  <div className="flex flex-col justify-center">
                    <span className="text-primary font-medium flex items-center gap-2">
                      {item.title}
                      {item.isPrimary && (
                        <span className="text-xs bg-green-400 text-white px-1 py-0.5 rounded-full ">
                          Primary
                        </span>
                      )}
                    </span>
                    <span className="text-primary-500 text-xs">
                      {item.domain}
                    </span>
                  </div>
                </td>
                <td className="text-center">
                  <span
                    className={
                      item.status === "active" ? "text-success" : "text-warning"
                    }
                  >
                    {capitalizeFirstLetter(item.status)}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr className="not-found !h-22">
              <td colSpan={4}>No Project Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </InfoWrapper>
  );
};

export default UserProjectInfo;
