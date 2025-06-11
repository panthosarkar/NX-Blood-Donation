"use client";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { icons } from "@/bikiran/lib/icons";
import ImageHover from "@/bikiran/shared/image-hover/ImageHover";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const TableApplicationViewButton = ({ item }: any) => {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.push(`/manage/application/${item.id}`)}
      className="group/view"
    >
      <ImageHover className={"size-8"}>
        <Image
          src={icons.iconDetails}
          alt="View icon line"
          className="group-hover/view:opacity-0 group/view:opacity-100 transition-opacity duration-300"
        />
        <Image
          src={icons.iconDetailsFill}
          alt="View icon fill"
          className="group-hover/view:opacity-100 group/view:opacity-0  transition-opacity duration-300"
        />
      </ImageHover>
    </button>
  );
};

export const TableApplicationEditButton = ({ item }: any) => {
  const { openModal } = useTemplate();
  return (
    <button
      type="button"
      onClick={() => openModal("update-application", item)}
      className="group/edit"
    >
      <ImageHover className={"size-8"}>
        <Image
          src={icons.iconEdit}
          alt="Edit icon line"
          className="group-hover/edit:opacity-0 group/edit:opacity-100 transition-opacity duration-300 !rounded-full"
        />
        <Image
          src={icons.iconEditFill}
          alt="Edit icon fill"
          className="group-hover/edit:opacity-100 group/edit:opacity-0  transition-opacity duration-300"
        />
      </ImageHover>
    </button>
  );
};

export const TableApplicationStatusUpdateButton = ({ item }: any) => {
  const { openModal } = useTemplate();
  return (
    <button
      type="button"
      onClick={() => openModal("update-app-status", item)}
      className="group/delete"
    >
      {item?.status === "active" ? (
        <ImageHover className={"size-8"}>
          <Image
            src={icons.iconTickGreen}
            width={0}
            height={0}
            alt="Delete icon line"
            className="group-hover/delete:opacity-0 group/delete:opacity-100 transition-opacity duration-300"
          />
          <Image
            src={icons.iconTickHover}
            width={0}
            height={0}
            alt="Delete icon fill"
            className="group-hover/delete:opacity-100 group/delete:opacity-0  transition-opacity duration-300"
          />
        </ImageHover>
      ) : (
        <ImageHover className={"size-8"}>
          <Image
            src={icons.iconClose}
            width={0}
            height={0}
            alt="Delete icon line"
            className="group-hover/delete:opacity-0 group/delete:opacity-100 transition-opacity duration-300 "
          />
          <Image
            src={icons.iconCloseFill}
            width={0}
            height={0}
            alt="Delete icon fill"
            className="group-hover/delete:opacity-100 group/delete:opacity-0  transition-opacity duration-300"
          />
        </ImageHover>
      )}
    </button>
  );
};
