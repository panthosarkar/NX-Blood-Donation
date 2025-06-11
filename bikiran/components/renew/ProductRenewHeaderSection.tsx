import { FC, useState } from "react";
import { icons } from "@/bikiran/lib/icons";
import { useApp } from "@/bik-lib/context/AppProvider";
import { addOption } from "@/bik-lib/utils/option";
import { SelectField } from "@/bik-lib/lib/InputFields";
import { ButtonRefresh } from "@/bik-lib/lib/button";
import { TBillingAccount } from "./renewProductTypes";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type Props = {
  billingAccounts: TBillingAccount[];
  reloadRenewData: () => void;
  query: Record<string, any>;
  notFound?: boolean;
};

const ProductRenewHeaderSection: FC<Props> = ({
  billingAccounts,
  reloadRenewData,
  query,
  notFound,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(query);
  const router = useRouter();
  const searchParams = useSearchParams();

  const { currencies } = useApp();

  return (
    <div>
      <Link
        href=""
        onClick={() => router.back()}
        aria-label="Go Back"
        className="w-fit"
      >
        <div className=" flex items-center gap-3 mb-[25px]">
          <Image
            src={icons.iconRightArrow}
            alt="Back to projects"
            width={0}
            height={0}
            sizes="100"
            className="size-7.5"
          />
          <h1 className="text-primary text-lg font-medium leading-[25px]">
            Back to List
          </h1>
        </div>
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <h1 className="text-primary text-2xl lg:text-3xl font-medium text-left">
          Product Renew
        </h1>
        <div className="flex flex-wrap items-center gap-3 h-10">
          {/* Only visible when products is available */}
          {!notFound && (
            <SelectField
              label=""
              placeholder="Currency"
              options={
                currencies
                  ? currencies.map((item: Record<string, string>) =>
                      addOption(
                        item.currency,
                        item.currency,
                        item.currency?.toLowerCase()
                      )
                    )
                  : []
              }
              name="currency"
              formData={formData}
              onChange={(ev) => {
                const allParams = {
                  ...Object.fromEntries(searchParams),
                  currency: ev.target.value,
                };
                const queryString = new URLSearchParams(allParams).toString();
                router.push(`/renew?${queryString}`);
                setFormData((prev: any) => ({
                  ...prev,
                  currency: ev.target.value,
                }));
              }}
              className="text-primary text-left w-40 h-10"
            />
          )}

          {/* Only visible when billing accounts is available */}
          {billingAccounts?.length !== 0 && billingAccounts?.length > 1 && (
            <SelectField
              label=""
              placeholder="Billing account"
              options={billingAccounts?.map((item: TBillingAccount) =>
                addOption(
                  item.id?.toString(),
                  item.title.toString(),
                  item.id?.toString()
                )
              )}
              name="billingAccountId"
              formData={formData}
              onChange={(ev) => {
                const allParams = {
                  ...Object.fromEntries(searchParams),
                  billingAccountId: ev.target.value,
                };
                const queryString = new URLSearchParams(allParams).toString();
                router.push(`/renew?${queryString}`);

                setFormData((prev: any) => ({
                  ...prev,
                  billingAccountId: ev.target.value,
                }));
              }}
              className="text-primary text-left w-50 h-10 !py-0"
            />
          )}

          {/* Page data reload button */}
          <div className="items-center  size-10">
            <ButtonRefresh onClick={reloadRenewData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRenewHeaderSection;
