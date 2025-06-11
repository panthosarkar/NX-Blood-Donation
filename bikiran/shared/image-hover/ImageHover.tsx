import { cn } from "@/bik-lib/utils/cn";
import React, { ReactNode } from "react";

type Props = {
    className?: string;
    isActive?: boolean;
    children: ReactNode | ReactNode[] | string;
};

const ImageHover = ({ className, isActive, children }: Props) => {
    return (
        <div
            className={cn("image-hover", className, {
                active: isActive,
            })}
        >
            {children}
        </div>
    );
};

export default ImageHover;
