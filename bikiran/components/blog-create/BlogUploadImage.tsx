import { TState } from "@/bik-lib/types/event";
import { icons } from "@/bikiran/lib/icons";
import Image from "next/image";
import { FC, useRef, useState } from "react";
import { TBlogCreate } from "./BlogCreateType";

type TProps = {
  formData: TBlogCreate;
  setFormData: TState<TBlogCreate>;
};

const BlogUploadImage: FC<TProps> = ({ formData, setFormData }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full h-[250px] rounded-5 mx-auto  overflow-hidden border border-primary-700 relative group self-start">
      {formData?.image ? (
        <Image
          src={formData?.image as string}
          alt="Preview"
          width={160}
          height={160}
          priority
          className="size-full object-cover"
        />
      ) : (
        <div className="size-full flex justify-center items-center bg-primary-50">
          Click to upload image
        </div>
      )}
      <button
        type="button"
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-50 bg-black bg-opacity-0 w-full h-full p-1 flex justify-center items-center group-hover:bg-opacity-50"
        onClick={handleFileInputClick}
      >
        <Image
          src={icons.iconCameraFill}
          alt="Camera"
          width={0}
          height={0}
          sizes="100vw"
          className="size-10 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
        />
      </button>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleImageChange}
        hidden
        accept="image/png, image/jpeg, image/jpg"
      />
    </div>
  );
};

export default BlogUploadImage;
