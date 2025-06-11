import React, { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogDescription,
} from "@/bikiran/components/ui/dialog";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { Button } from "@bikiran/button";
import { CopyWrapper, LoadingComp, UserInfoComp } from "@bikiran/utils";
import Image from "next/image";
import iconClipBoard from "@/public/assets/images/icons/icon-clipboard-secondary.svg";
import iconClipBoardHover from "@/public/assets/images/icons/icon-clipboard-white.svg";
import iconAlert from "@/public/assets/images/icons/icon-triangle-alert.svg";

import UserSkeletonComp from "@/bikiran/shared/user-search/UserSkeletonComp";
import useApi from "@/bik-lib/utils/useApi";
import { TSubsData } from "../CPanalType";
import { Skeleton } from "../../ui/skeleton";
import { useCPanel } from "../context/CPanelProvider";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { AnimatedInputField } from "@bikiran/inputs";

const ErrorContent: FC<{ formData: Record<string, any> }> = ({ formData }) => {
  return (
    <div className="bg-[#FFFDF6] border border-[#FFD99F] text-center flex flex-col justify-center items-center !h-[136px] gap-2 p-4 rounded-md">
      <Image
        src={iconAlert}
        alt="icon-alert"
        width={100}
        height={100}
        sizes="100vw"
        className="size-10"
      />
      <span className="">{formData?.error}</span>
    </div>
  );
};

const SubscriptionInfo: FC<{
  loading: boolean;
  formData: Record<string, any>;
  data: TSubsData;
}> = ({ loading, formData, data }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center gap-8">
        <span className="text-primary-700 text-sm w-[100px]">
          Subscription:
        </span>
        <span className="text-primary text-sm flex-1">
          {loading || !data?.subscription?.id ? (
            <Skeleton className="h-4 w-full" />
          ) : (
            data?.subscription?.title
          )}
        </span>
      </div>
      <div className="flex justify-between items-center gap-8">
        <span className="text-primary-700 text-sm w-[100px]">Domain:</span>
        <span className="text-primary text-sm flex-1">
          {loading || !data?.subscription?.id ? (
            <Skeleton className="h-4 w-full" />
          ) : (
            data?.subscription?.domain || "N/A"
          )}
        </span>
      </div>
      <div className="flex justify-between items-center gap-8">
        <span className="text-primary-700 text-sm w-[100px]">
          cPanel Limit:
        </span>
        <span className="text-primary text-sm flex-1">
          {loading || !data?.subscription?.id ? (
            <Skeleton className="h-4 w-full" />
          ) : (
            `${data?.subscription?.cpUsed}/${data?.subscription?.cpLimit}`
          )}
        </span>
      </div>
    </div>
  );
};

const ModalContent: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<{
    id: string;
    error: string;
  }>({
    id: "",
    error: "",
  });
  const [data, setData] = useState<TSubsData>({} as TSubsData);

  const { get, post } = useApi();
  const { closeModal, modalData, setMessage } = useTemplate();
  const { reload } = useCPanel();

  const handleChange = (e: TInputChangeEvent) => {
    const { name, value } = e.target;
    if (name === "id") {
      // Remove all non-digit characters
      const numericValue = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    setFormData((prev) => ({ ...prev, error: "" }));
  }, [formData.id]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (formData?.id?.length > 0) {
        setLoading(true);
        get<TSubsData>(
          `/admin/hosting/cp-assign/${formData?.id}/search/${modalData?.id}`
        )
          .then(({ data }) => {
            setData(data as TSubsData);
          })
          .catch((err) => {
            setMessage(err.message);
            setFormData((prev) => ({ ...prev, error: err.message }));
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [formData?.id]);

  const locateSubs = () => {
    setLoading(true);
    if (data?.subscription?.id && formData?.id?.length > 5) {
      post(
        `/admin/hosting/cp-assign/${data?.subscription?.id}/add/${modalData?.id}`,
        {}
      )
        .then(() => {
          setMessage("Subscription ID added successfully.");
          closeModal();
          reload();
        })
        .catch((err: Error) => {
          setMessage(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className="space-y-4">
      <div className="mt-3 relative">
        <AnimatedInputField
          formData={formData}
          label="Subscription ID"
          name="id"
          placeholder="Enter Subscription ID"
          className=""
          onChange={handleChange}
        />
        <div
          className="group flex items-center justify-center p-[7px] bg-secondary-100 hover:bg-secondary rounded-md transition-all duration-200 ease-in-out cursor-pointer size-8.5 absolute top-[5.5px] right-[5.5px]"
          onClick={async () => {
            const clipboardText = await navigator.clipboard.readText();
            const numericValue = clipboardText.replace(/\D/g, "");
            setFormData((prev) => ({ ...prev, id: numericValue }));
          }}
        >
          <Image
            src={iconClipBoard}
            alt="icon-clipboard"
            width={100}
            height={100}
            sizes="100vw"
            className="size-6 group-hover:hidden block"
          />
          <Image
            src={iconClipBoardHover}
            alt="icon-clipboard-hover"
            width={100}
            height={100}
            sizes="100vw"
            className="size-6 group-hover:block hidden"
          />
        </div>
      </div>
      {loading || !data?.user?.id ? (
        <UserSkeletonComp />
      ) : (
        !formData?.error && (
          <UserInfoComp
            ImageComponent={Image}
            email={data?.user?.email}
            name={data?.user?.displayName}
            photoUrl={data?.user?.photoUrl}
          />
        )
      )}
      {loading && formData?.id.length !== 0 ? (
        <div className="size-full">
          <LoadingComp />
        </div>
      ) : null}
      {formData?.error && <ErrorContent formData={formData} />}
      {!formData?.error && (
        <SubscriptionInfo data={data} formData={formData} loading={loading} />
      )}

      {/* {!formData?.error &&
        (formData?.id?.length > 0 && !loading ? (
          <UserInfoComp
            ImageComponent={Image}
            email={data?.user?.email}
            name={data?.user?.displayName}
            photoUrl={data?.user?.photoUrl}
          />
        ) : (
          <UserSkeletonComp />
        ))}

      {!formData?.error ? (
        <SubscriptionInfo data={data} formData={formData} loading={loading} />
      ) : (
        <ErrorContent formData={formData} />
      )} */}

      <div className="flex justify-end gap-2.5">
        <Button
          variant="gray"
          className="w-24 h-10"
          disabled={loading}
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button
          variant="secondary"
          className="w-24 h-10"
          disabled={formData?.id?.length === 0 || loading}
          onClick={locateSubs}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

const ModalLocateCPanel = () => {
  const { modalType, modalData, closeModal } = useTemplate();
  return (
    <Dialog open={modalType === "locate-subs"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined} className="!max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Locate Subscription</DialogTitle>
          <DialogDescription className="uppercase group flex gap-1">
            Id : <CopyWrapper content={modalData?.id} />
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <ModalContent />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalLocateCPanel;
