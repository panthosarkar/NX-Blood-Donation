import { useRouter } from "next/navigation";
import { TInvoiceData } from "@/bik-lib/types/invoice";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import InvoiceComp from "@/bikiran/shared/invoice-overview/InvoiceComp";
import notFoundImage from "@/public/assets/images/not-found.svg";
import InvoiceSkeletonComp from "@/bikiran/shared/invoice-overview/skeleton-comp/InvoiceSkeletonComp";
import useApi from "@/bik-lib/utils/useApi";

const InvoiceSidebarSection: FC<{ invoiceId: any }> = ({ invoiceId }) => {
  const [invoiceInfo, setInvoiceInfo] = useState<TInvoiceData>(
    {} as TInvoiceData
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const title = "Invoice Info";

  const router = useRouter();

  const { get } = useApi();

  useEffect(() => {
    if (invoiceId > 0) {
      setLoading(true);
      get(`/admin/invoice/${invoiceId as string}/detail`)
        .then(({ data }) => {
          if (data) {
            setInvoiceInfo(data);
          }
        })
        .catch((err: Error) => {
          console.log(err.message);
          setInvoiceInfo({ ...({} as TInvoiceData), notFound: true });
          setErrorMessage(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [invoiceId]);
  if (!invoiceInfo?.invoice && !loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[100vh] ">
        <div className="mb-40">
          <Image
            alt="No invoice selected"
            src={notFoundImage}
            width={0}
            height={0}
          />
          <div className="flex justify-center items-center">
            <h3 className="text-primary text-lg font-medium text-center">
              {errorMessage}
            </h3>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      {invoiceId ? (
        <div>
          <button
            type="button"
            className={`w-full py-2.5 px-4  rounded-10 bg-primary-100  h-16 transition-colors mb-4`}
          >
            <h2 className="text-primary text-lg font-medium text-left">
              {invoiceInfo?.invoice?.invoiceTitle || title}
            </h2>
          </button>
          <div className="[&>div]:!p-0 [&>div]:shadow-none [&>div]:!bg-transparent">
            {loading && <InvoiceSkeletonComp />}
            {!loading && invoiceInfo?.invoice?.id !== 0 && (
              <InvoiceComp data={invoiceInfo} editable={false} />
            )}
          </div>
          <button
            className="fixed bottom-40 right-10 p-3 cursor-pointer "
            onClick={() => router.push(`/billing/invoice/${invoiceId}/update`)}
          >
            <svg
              width="50"
              height="50"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="15" cy="15" r="15" fill="#FFA113" />
              <path
                d="M20.3265 19.6355C20.6979 19.6355 21 19.9415 21 20.3178C21 20.6947 20.6979 21 20.3265 21H16.5198C16.1484 21 15.8463 20.6947 15.8463 20.3178C15.8463 19.9415 16.1484 19.6355 16.5198 19.6355H20.3265ZM17.6866 9.46604L18.6699 10.2472C19.0732 10.5625 19.342 10.9782 19.4339 11.4153C19.5401 11.8962 19.4269 12.3685 19.1085 12.777L13.2509 20.3519C12.9821 20.6959 12.5859 20.8894 12.1615 20.8966L9.82693 20.9253C9.69959 20.9253 9.59348 20.8393 9.56518 20.7174L9.0346 18.417C8.94263 17.9942 9.0346 17.557 9.30343 17.2202L13.4561 11.8453C13.5268 11.7593 13.6542 11.7457 13.7391 11.8095L15.4864 13.1998C15.5996 13.2929 15.7553 13.3431 15.918 13.3216C16.2646 13.2786 16.4981 12.9633 16.4627 12.6265C16.4415 12.4545 16.3566 12.3111 16.2434 12.2036C16.208 12.175 14.5455 10.842 14.5455 10.842C14.4394 10.756 14.4182 10.5983 14.5031 10.4916L15.161 9.63804C15.7694 8.85689 16.8306 8.78523 17.6866 9.46604Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-[100vh] ">
          <div className="mb-40">
            <Image
              alt="No invoice selected"
              src={notFoundImage}
              width={0}
              height={0}
            />
            <div className="flex justify-center items-center">
              <h3 className="text-primary text-lg font-medium text-center">
                No invoice selected
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceSidebarSection;
