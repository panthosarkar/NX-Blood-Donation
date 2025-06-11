import Copy from "@/bik-lib/utils/Copy";
import { icons } from "@/src/lib/icons";
import Image from "next/image";
import React, { FC } from "react";
import { cn } from "../dropdown/CustomDropdown";

const CopyWrapper: FC<{ content: any; className?: string }> = ({
  content,
  className,
}) => {
  const { copy, isCopied } = Copy();
  return (
    <button
      className={cn("flex items-center gap-1 group", className)}
      onClick={() => copy(content)}
    >
      <div className="text-sm">{content}</div>
      {isCopied ? (
        <Image
          src={icons.iconTick}
          alt="copy"
          width={100}
          height={100}
          sizes="100vw"
          className="size-4 "
        />
      ) : (
        <Image
          src={icons.iconCopy}
          alt="copy"
          width={100}
          height={100}
          sizes="100vw"
          className="size-4 hidden group-hover:block"
        />
      )}
    </button>
  );
};

export default CopyWrapper;
