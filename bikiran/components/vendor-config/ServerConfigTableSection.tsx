import TableWrapper from "@/bikiran/shared/table-wrapper/TableWrapper";
import { FC, useState } from "react";
import { useUnlocatedHosting } from "./context/ServerConfigProvider";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import useApi from "@/bik-lib/utils/useApi";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import Image from "next/image";
import { icons } from "@/bikiran/lib/icons";
import { Loader2 } from "lucide-react";
import { Button } from "@bikiran/button";
import { GetDate, GetTime } from "@/bik-lib/utils/date";

const ServerConfigTableSection: FC = () => {
  const { loading, pageData, reload } = useUnlocatedHosting();
  const { put } = useApi();
  const { setMessage } = useTemplate();

  const [syncingId, setSyncingId] = useState<number | null>(null);

  const syncDown = (hostname: string, id: number) => {
    setSyncingId(id);
    put(`/admin/hosting/cp-server-conf/${hostname}/sync-down`, {})
      .then((res) => {
        setMessage(res.message);
        reload();
      })
      .catch((err: Error) => {
        console.log(err.message);
        setMessage(`Error: ${err.message}`);
      })
      .finally(() => {
        setSyncingId(null);
      });
  };

  return (
    <TableWrapper
      headers={[
        "ID + w-[100px] !text-center",
        "Title + text-left",
        "Hostname + w-[200px] text-left",
        "Quota + w-[100px]  ",
        "Used + w-[100px] ",
        "Time Synced + w-[120px] ",
        "Type + w-[100px] ",
        "Status + w-[100px] !text-center",
        "# + w-[100px]",
      ]}
      loading={loading}
      notFoundText="No configuration found!"
    >
      {pageData?.map((item) => (
        <tr key={item?.id}>
          <td className="!text-center">{item?.id}</td>
          <td className="">{item?.title}</td>
          <td className="">
            <div className="text-primary">{item?.hostname}</div>
            <div className="text-sm text-primary-700">{item?.username}</div>
          </td>
          <td className="!text-center">{item?.licenseQuota}</td>
          <td className="!text-center">{item?.licenseUsed}</td>
          <td className="!text-center">
            {GetDate(item?.timeSynced)}
            <p className="text-primary-500 text-xs text-center">
              {GetTime(item?.timeSynced)}
            </p>
          </td>
          <td className="!text-center">{capitalizeFirstLetter(item?.type)}</td>
          <td className="!text-center">
            {capitalizeFirstLetter(item?.status)}
          </td>
          <td>
            <div className="flex justify-end">
              <Button
                className="p-[5px] size-8 group flex justify-center items-center !bg-secondary-50 hover:!bg-secondary"
                onClick={() => syncDown(item?.hostname, item?.id)}
                loading={syncingId === item?.id}
                disabled={loading}
              >
                <Image
                  src={icons.iconSync}
                  width={100}
                  height={100}
                  alt="sync"
                  sizes="100vw"
                  className="size-7 group-hover:hidden block"
                />
                <Image
                  src={icons.iconSyncHover}
                  width={100}
                  height={100}
                  alt="sync"
                  sizes="100vw"
                  className="size-7 group-hover:block hidden"
                />
              </Button>
            </div>
          </td>
        </tr>
      ))}
    </TableWrapper>
  );
};

export default ServerConfigTableSection;
