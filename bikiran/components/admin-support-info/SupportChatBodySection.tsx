import { FC, useState } from "react";
import SupportConversationActionComp from "./SupportConversationActionComp";
import SupportConversationComp from "./SupportConversationComp";
import SupportSkeletonBody from "./SupportSkeletonBody";
import { useSupportChat } from "./context/SupportChatProvider";

const SupportChatBodySection: FC = () => {
  const [textAreaHeight, setTextAreaHeight] = useState<number>(50); // Default height

  const { supportData } = useSupportChat();

  if (supportData === undefined) return <SupportSkeletonBody />;
  return (
    <section className="max-w-[900px] w-full mx-auto flex flex-col h-[calc(100%-90px)]">
      <SupportConversationComp textAreaHeight={textAreaHeight} />

      <SupportConversationActionComp
        textAreaHeight={textAreaHeight}
        setTextAreaHeight={setTextAreaHeight}
      />
    </section>
  );
};

export default SupportChatBodySection;
