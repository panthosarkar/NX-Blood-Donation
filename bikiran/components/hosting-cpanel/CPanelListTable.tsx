import { CopyWrapper, TooltipUserInfo } from "@bikiran/utils";
import { FC } from "react";
import { dashboardIcons, icons } from "@/bikiran/lib/icons";
import { useRouter } from "next/navigation";
import { useCPanel } from "./context/CPanelProvider";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { TCPanel, TFilter } from "./CPanalType";
import { GetDate, GetTime } from "@/bik-lib/utils/date";
import Link from "next/link";
import Image from "next/image";
import useApi from "@/bik-lib/utils/useApi";
import StatusColor from "@/bik-lib/utils/statusColor";
import TableWrapper from "@/bikiran/shared/table-wrapper/TableWrapper";

const TableRow: FC<{ data: TCPanel }> = ({ data }) => {
  const { openModal, setMessage } = useTemplate();
  const { put } = useApi();
  const { reload } = useCPanel();
  const router = useRouter();

  const syncDown = (id: number) => {
    setMessage("Syncing Down...");
    put(`/admin/hosting/cp-manage/${id}/sync-down`, { cpHostingId: id })
      .then((res) => {
        setMessage(res.message);
        reload();
      })
      .catch((error: Error) => {
        setMessage(`Error: ${error.message}`);
      });
  };

  const unsuspend = (id: number) => {
    put(`/admin/hosting/cp-manage/${id}/cp-login`, { cpHostingId: id })
      .then((res) => {
        setMessage(res.message);
        reload();
      })
      .catch((error: Error) => {
        setMessage(error.message);
      });
  };

  return (
    <tr>
      <td className=" text-center">{data?.id}</td>
      <td>
        <div className="flex items-center justify-center">
          {data?.user ? (
            <TooltipUserInfo
              user={data?.user}
              ImageComponent={Image}
              redirectClick={() =>
                router.push(`/user/${data?.user?.id}/overview`)
              }
            />
          ) : (
            <span className="text-error">Unlocated</span>
          )}
        </div>
      </td>
      <td className="text-left">
        <div className="flex flex-col ">
          <span className="font-medium">
            <CopyWrapper content={data?.cPanel?.cpDomain.toUpperCase()} />
          </span>
          <span className="font-normal text-primary-500">
            <CopyWrapper content={data?.cPanel?.cpUsername} />
          </span>
          {data?.subscriptionId > 0 && (
            <div className="flex items-center gap-1 font-normal text-primary-500">
              <div className="w-4">
                <Image
                  src={dashboardIcons.subscription}
                  alt="alt"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto"
                />
              </div>
              <CopyWrapper content={data?.subscriptionId} />
            </div>
          )}
        </div>
      </td>
      <td>
        <span>
          <CopyWrapper content={data?.cPanel?.cpHostname} />
        </span>
        <span className="flex items-center gap-2">
          {data?.cPanel?.cpPackage || "-----"}
          <button
            onClick={(ev) => {
              ev.stopPropagation();
              openModal("packageDetails", data?.cPanel);
            }}
          >
            <Image
              src={icons.iconInfoLine}
              alt="copy"
              width={100}
              height={100}
              sizes="100vw"
              className="size-4"
            />
          </button>
        </span>
      </td>
      {/* <td>
        <CopyWrapper content={data?.cPanel?.cpUsername} />
      </td> */}
      <td className="text-center ">
        <div className="flex flex-col justify-center">
          <span>{GetDate(data?.cPanel?.timeCreated)}</span>
          <span>{GetTime(data?.cPanel?.timeCreated)}</span>
        </div>
      </td>
      <td className="text-center">
        <div className="flex justify-center items-center">
          {data?.cPanel?.cpShell ? (
            <Image
              alt="tick"
              src={icons.iconTickHover}
              width={100}
              height={100}
              sizes="100vw"
              className="size-5"
            />
          ) : (
            "---"
          )}
        </div>
      </td>
      <td className="text-center">
        <div className="flex justify-center items-center">
          {data?.isServerOkay ? (
            <Image
              alt="tick"
              src={icons.iconTickHover}
              width={100}
              height={100}
              sizes="100vw"
              className="size-5"
            />
          ) : (
            <Image
              alt="tick"
              src={icons.iconCloseFill}
              width={100}
              height={100}
              sizes="100vw"
              className="size-5"
            />
          )}
        </div>
      </td>
      <td className="text-center">
        <StatusColor
          status={
            data?.cpSuspention?.isSuspended === true ? "suspended" : "active"
          }
        />
      </td>
      <td>
        <div className="flex justify-end">
          <InstOption>
            <Link
              href={`/hosting/list?subscriptionId=${data?.subscriptionId}`}
              className="p-2 w-full"
            >
              Go to subscription
            </Link>
            <Link
              href={`/hosting/cpanels?subscriptionId=${data?.subscriptionId}`}
              className="p-2 w-full"
            >
              Filter by subscription
            </Link>
            <button
              type="button"
              className=""
              onClick={() => {
                openModal("cPanel-login", data);
              }}
            >
              cPanel Login
            </button>
            <button
              type="button"
              className=""
              onClick={(ev) => {
                ev.stopPropagation();
                syncDown(data.id);
              }}
            >
              Sync Down
            </button>
            <button
              type="button"
              className=""
              onClick={() => {
                openModal("cp-change-password", data);
              }}
            >
              cPanel Change & Share Password
            </button>
            <button
              type="button"
              className=""
              onClick={() => {
                openModal("cPanel-shell", data);
              }}
            >
              cPanel Change Shell Access
            </button>
            <button
              type="button"
              className=""
              onClick={() => openModal("cp-update-domain", data)}
            >
              Update Domain
            </button>
            <button
              type="button"
              className=""
              onClick={() => openModal("cp-update-server", data)}
            >
              Update Server
            </button>
            <button
              type="button"
              className=""
              onClick={() => openModal("locate-subs", data)}
            >
              Locate Subscription
            </button>
            <button
              type="button"
              className=""
              onClick={() => openModal("cp-resize", data)}
            >
              Resize cPanel
            </button>
            <button
              type="button"
              className=""
              onClick={() => openModal("cPanel-force-backup", data)}
            >
              Force cPanel Backup
            </button>
            <button
              type="button"
              className=""
              onClick={() => openModal("cp-migrate", data)}
            >
              Migration
            </button>
            <button
              type="button"
              className=""
              onClick={() =>
                data?.cpSuspention?.isSuspended
                  ? unsuspend(data?.id)
                  : openModal("cPanel-suspend", data)
              }
            >
              cPanel {data?.cpSuspention?.isSuspended ? "Unsuspend" : "Suspend"}
            </button>
            <button
              type="button"
              className=""
              onClick={() => openModal("cPanel-terminate", data)}
            >
              cPanel Terminate
            </button>
            <button
              type="button"
              className=""
              onClick={() => openModal("cp-force-remove", data)}
            >
              Force Remove
            </button>
          </InstOption>
        </div>
      </td>
    </tr>
  );
};

const CPanelListTable: FC<{
  data: {
    hostings: TCPanel[];
    filters: TFilter;
  };
}> = ({ data }) => {
  const { loading } = useCPanel();

  const placeholderArr = Array.from(
    { length: data?.hostings.length || 3 },
    (_, i) => i
  );
  return (
    <TableWrapper
      loading={loading}
      notFoundText="No cPanel data found!"
      headers={[
        "ID + w-[100px] !text-center",
        "User + text-center w-[90px]",
        "Domain & Username + text-left w-[300px]",
        "cP Hostname & Package + text-left",
        // "cP Username",
        "Time Created + text-center w-[120px]",
        "Shell + text-center w-[80px]",
        "Server + text-center w-[80px]",
        "Status + text-center w-[100px]",
        "# + w-[100px]",
      ]}
    >
      {data?.hostings?.map((item: TCPanel) => (
        <TableRow key={item.id} data={item} />
      ))}
    </TableWrapper>
  );
};

export default CPanelListTable;
