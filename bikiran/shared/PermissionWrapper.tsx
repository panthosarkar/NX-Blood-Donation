import { cn } from "@/bik-lib/utils/cn";
import { FC, ReactNode, useEffect, useRef } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  permissions: string[];
  requiredPerm: string;
};

export const OptionPermissionWrapper: FC<Props> = ({
  children,
  className,
  permissions,
  requiredPerm,
}) => {
  const childRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Access the parent element and check for the role attribute
    if (childRef.current) {
      const parentDiv = childRef.current.parentElement as HTMLElement;

      // Check if the parent div has the role="menuitem" attribute
      if (parentDiv && parentDiv.getAttribute("role") === "menuitem") {
        parentDiv.classList.add("hidden"); // Add Tailwind 'hidden' class
      }
    }
  }, []);

  const hasPermission =
    permissions.length > 0 &&
    requiredPerm.length > 0 &&
    permissions.indexOf(requiredPerm) !== -1;

  if (!hasPermission) {
    return <div ref={childRef} className="hidden" />;
  }

  return <>{children}</>; // Render the children if permission is granted
};

const PermissionWrapper: FC<Props> = ({
  children,
  className,
  permissions,
  requiredPerm,
}) => {
  const hasPermission =
    permissions.length > 0 &&
    requiredPerm.length > 0 &&
    permissions.indexOf(requiredPerm) !== -1;

  if (hasPermission) {
    return children;
  }
  return (
    <div className={cn("grayscale pointer-events-none", className)}>
      {children}
    </div>
  );
};

export default PermissionWrapper;
