import { FC, useEffect, useRef } from "react";
import { useSupportChat } from "./context/SupportChatProvider";
import Image from "next/image";
import { GetDate } from "@/bik-lib/utils/date";
import { TSupportMessage } from "../admin-support/SupportTypes";

const SupportConversationComp: FC<{
  textAreaHeight: number;
}> = ({ textAreaHeight }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { supportData } = useSupportChat();
  const messages = supportData?.messages || [];

  const containerHeight = {
    height: `calc(100% - ${textAreaHeight + 20}px)`,
  };

  // Scroll to bottom when new message is added
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className="flex-1 pt-5 pb-8 overflow-auto custom-scrollbar"
      style={containerHeight}
      ref={ref}
    >
      {messages.map((item: TSupportMessage) => (
        <div
          key={item.id}
          className="grid lg:grid-cols-[40px_640px] md:grid-cols-[35px_450px] grid-cols-[25px_300px] gap-[15px] py-[10px]"
        >
          <Image
            src={item.user.photoUrl || ""}
            width={40}
            height={40}
            alt="user"
            className="rounded-full"
          />
          <div className="w-full flex flex-col gap-[7px] message-content-container">
            <div>
              <div className="flex items-center gap-[10px]">
                <div className="text-primary text-[20px] font-semibold leading-normal">
                  {item.user.displayName}
                </div>
                <div className="text-primary-700 text-xs font-medium leading-normal">
                  {GetDate(item.timeCreated)}
                </div>
              </div>
              <div className="text-primary-700 text-sm font-medium leading-normal">
                {item.user.email}
              </div>
            </div>
            <div className="flex flex-col gap-[10px] text-justify text-primary-700 text-base font-normal leading-6  break-words message-box">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SupportConversationComp;
