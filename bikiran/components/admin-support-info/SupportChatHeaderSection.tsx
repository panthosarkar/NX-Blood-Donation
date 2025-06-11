import { FC } from "react";
import { GetDate } from "@/bik-lib/utils/date";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { useSupportChat } from "./context/SupportChatProvider";
import Link from "next/link";
import SupportChatHeaderSkeleton from "./SupportChatHeaderSkeleton";
import { Button } from "@bikiran/button";
import useApi from "@/bik-lib/utils/useApi";

const BackButton: FC = () => {
  return (
    <Link
      href="/support/tickets-list"
      className="block size-10 bg-primary p-2.5 rounded-full"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 26 26"
        fill="none"
      >
        <path
          d="M2.65454 13.8293L2.66972 13.8427L10.2581 20.7918C10.7751 21.265 11.6135 21.2641 12.1278 20.7873C12.3733 20.5605 12.5081 20.2605 12.5072 19.9418C12.5063 19.623 12.3706 19.323 12.1233 19.098L6.77151 14.1971L22.3983 14.1971C23.1233 14.1971 23.7144 13.6578 23.7144 12.9962C23.7144 12.3346 23.1233 11.7962 22.3983 11.7962L6.7724 11.7962L12.1242 6.89533C12.3706 6.66944 12.5072 6.36944 12.5081 6.05069C12.5081 5.73194 12.3742 5.43194 12.1286 5.20604C11.6144 4.73104 10.776 4.72836 10.259 5.20158L2.65544 12.1641C2.41615 12.3873 2.28579 12.6819 2.28579 12.9953C2.28579 13.3087 2.41615 13.6052 2.65454 13.8293Z"
          fill="white"
        />
      </svg>
    </Link>
  );
};

const SupportChatHeaderSection: FC = () => {
  const { supportData, reload, isClosed } = useSupportChat();
  const { id, subject, timeCreated, status } = supportData?.invoiceInfo! || {};

  const { put } = useApi();
  const { setMessage, setConfirm, setTemplateLoading } = useTemplate();

  const updateTicketStatus = (type: string) => {
    setConfirm({
      show: true,
      text: `Are you sure you want to ${type} this ticket?`,
      textCancel: "No",
      txtAction: "Yes",

      clickAction: () => {
        setMessage("Closing ticket...");
        setTemplateLoading(true);
        put(`/admin/ticket/${id}/${type}`, {})
          .then(({ message }) => {
            setMessage(message);
            //reload the chat
            reload();

            setConfirm(null);
          })
          .catch(({ message }: Error) => {
            setMessage(message);
          })
          .finally(() => {
            setTemplateLoading(false);
          });
      },
    });
  };
  if (supportData === undefined) return <SupportChatHeaderSkeleton />;
  return (
    <section className="bg-[rgba(254,238,255,0.80)] h-[90px] ">
      <div className="container flex flex-wrap justify-between items-center gap-2.5 h-full">
        <div className="flex items-start gap-3 ">
          <BackButton />
          <div className="">
            <p className="text-sm text-secondary font-normal">#{id}</p>
            <p className="text-primary text-xl font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[500px]">
              {subject}
            </p>
            <p className="text-primary-700 text-sm font-normal">
              Created on: {GetDate(timeCreated)}
            </p>
          </div>
        </div>
        <div>
          {isClosed ? (
            <Button
              variant="red"
              className="h-11 px-5"
              onClick={() => updateTicketStatus("reopen")}
            >
              Reopen
            </Button>
          ) : (
            <Button
              variant="green"
              className="h-11 px-5 !bg-[#00B631]"
              onClick={() => updateTicketStatus("close")}
            >
              Close Ticket
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default SupportChatHeaderSection;
