import { FC, ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/bikiran/components/ui/tooltip";

type Props = {
  children: ReactNode;
  asChild?: boolean;
  ignore?: boolean;
  content: string;
};

const TooltipWrapper: FC<Props> = ({
  children,
  content,
  asChild,
  ignore = false,
}) => {
  if (ignore) return children;
  return (
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
      <TooltipContent className="bg-primary text-white">
        {content}
      </TooltipContent>
    </Tooltip>
  );
};

export default TooltipWrapper;
