"use client";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import InvitationAssetComp from "./InvitationAssetComp";
import { useProjectInvitation } from "./context/ProjectInvitationProvider";
import { SelectField } from "@/bik-lib/lib/InputFields";
import assetIconPicker from "@/bikiran/shared/assetIconPicker";
import { Select } from "@bikiran/inputs";

const InvitationAssetSelectionComp = () => {
  const { formData, onChange, permissionData } = useProjectInvitation();

  const options = [
    ...(permissionData.assetNames?.map((name, index) => ({
      id: index,
      title: capitalizeFirstLetter(name),
      icon: assetIconPicker(name),
      value: name,
    })) || []),
    {
      id: 10000000000000,
      title: "All",
      value: "all",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-[15px]">
      <Select
        label=""
        options={options}
        name="assetKey"
        placeholder="Select Asset"
        formData={formData}
        onChange={onChange}
        className={
          !permissionData.assetLists ? "pointer-events-none bg-primary-50" : ""
        }
        // className="max-w-76"
      />
      <InvitationAssetComp
        show={
          formData.assetKey.length > 0 &&
          formData.assetKey !== "all" &&
          (permissionData.assetLists?.assets || []).length > 0
        }
      />
    </div>
  );
};

export default InvitationAssetSelectionComp;
