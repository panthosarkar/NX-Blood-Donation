import React, { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import { icons } from "@/bikiran/lib/icons";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { cn } from "@/bik-lib/utils/cn";
import { useParams } from "next/navigation";

const AddProductDropdown: FC<{ disabled: boolean }> = ({ disabled }) => {
  const { openModal } = useTemplate();
  const invoiceId = useParams().id || "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div
          className={cn(
            "px-4 py-2 text-[#4370FF] bg-[#ECF1FF] hover:bg-[#4370FF] hover:text-white rounded-8 font-medium",
            {
              "bg-primary-100 pointer-events-none text-primary-500": disabled,
            }
          )}
        >
          Add Product
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <button
            className="flex items-center gap-2 w-full"
            onClick={() =>
              openModal("add-product", {
                type: "domain",
                invoiceId: invoiceId,
              })
            }
          >
            <Image
              src={icons.iconDomainFill}
              width={20}
              height={20}
              alt="plus"
            />
            <span>Domain</span>
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            className="flex items-center gap-2 w-full"
            onClick={() =>
              openModal("add-product", {
                type: "hosting",
                invoiceId: invoiceId,
              })
            }
          >
            <Image src={icons.iconHosting} width={20} height={20} alt="plus" />
            <span>Hosting</span>
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            className="flex items-center gap-2 w-full"
            onClick={() =>
              openModal("add-product", {
                type: "dedicated-server",
                invoiceId: invoiceId,
              })
            }
          >
            <Image
              src={icons.iconDedicateServer}
              width={20}
              height={20}
              alt="plus"
            />
            <span>Dedicated Server</span>
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            className="flex items-center gap-2  w-full"
            onClick={() =>
              openModal("add-product", {
                type: "server-vps",
                invoiceId: invoiceId,
              })
            }
          >
            <Image src={icons.iconVPS} width={20} height={20} alt="plus" />
            <span>VPS</span>
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            className="flex items-center gap-2 w-full"
            onClick={() =>
              openModal("add-product", {
                type: "push",
                invoiceId: invoiceId,
              })
            }
          >
            <Image src={icons.iconPush} width={20} height={20} alt="plus" />
            <span>Push</span>
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            className="flex items-center gap-2 w-full"
            onClick={() =>
              openModal("add-product", {
                type: "sms",
                invoiceId: invoiceId,
              })
            }
          >
            <Image src={icons.iconSMS} width={20} height={20} alt="plus" />
            <span>SMS</span>
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            className="flex items-center gap-2 w-full"
            onClick={() =>
              openModal("add-product", {
                type: "email",
                invoiceId: invoiceId,
              })
            }
          >
            <Image src={icons.iconEmail} width={20} height={20} alt="plus" />
            <span>Email</span>
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            className="flex items-center gap-2 w-full"
            onClick={() =>
              openModal("add-product", {
                type: "premium",
                invoiceId: invoiceId,
              })
            }
          >
            <Image
              src={icons.iconPremiumContract}
              width={20}
              height={20}
              alt="plus"
            />
            <span>Premium Contract</span>
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            className="flex items-center gap-2 w-full"
            onClick={() =>
              openModal("add-product", {
                type: "custom",
                invoiceId: invoiceId,
              })
            }
          >
            <Image
              src={icons.iconDefaultApp}
              width={20}
              height={20}
              alt="plus"
            />
            <span>Other Product</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AddProductDropdown;
