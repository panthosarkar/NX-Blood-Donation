import { cn } from "@/src/utils/cn";
import Copy from "@/src/utils/Copy";
import Image from "next/image";
import React, { FC } from "react";
import IconTick from "./icon-tick.svg";
import IconCopy from "./icon-copy.svg";

const CopyWrapper: FC<{ content: any; className?: string }> = ({ content, className }) => {
  const { copy, isCopied } = Copy();
  return (
    <button className={cn("group flex items-center gap-1", className)} onClick={() => copy(content)}>
      {/* <div className="text-sm">{content}</div> */}
      {isCopied ? (
        <Image src={IconTick} alt="copy" width={100} height={100} sizes="100vw" className="size-4" />
      ) : (
        <Image src={IconCopy} alt="copy" width={100} height={100} sizes="100vw" className="hidden size-4 group-hover:block" />
      )}
    </button>
  );
};

export default CopyWrapper;
