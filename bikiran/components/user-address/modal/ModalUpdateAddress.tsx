/* eslint-disable no-unused-vars */
import { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { TFormEvent, TInputChangeEvent } from "@/bik-lib/types/event";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { TUser } from "@/bikiran/shared/user-search/UserSearchType";
import { useUserAddressList } from "../context/UserAddressListProvider";
import { TUserAddressItem } from "../userAddressType";
import UserDetailsComp from "@/bikiran/shared/user-search/UserDetailsComp";
import countries from "@/bik-lib/utils/country.json";
import { addOption } from "@/bik-lib/utils/option";
import {
  AnimatedInputField,
  EmailInputField,
  PhoneInputField,
  Select,
} from "@bikiran/inputs";
import useApi from "@/bik-lib/utils/useApi";
import { Button } from "@bikiran/button";

const ModalBody: FC<{
  closeModal: () => void;
  modalData: TUserAddressItem;
}> = ({ closeModal, modalData }) => {
  const [formData, setFormData] = useState<any>({
    organization: modalData?.organization || "",
    email: modalData?.email || "",
    name: modalData?.name || "",
    mobile: modalData?.mobile || "",
    line1: modalData?.line1 || "",
    line2: modalData?.line2 || "",
    country: modalData?.country || "",
    state: modalData?.state || "",
    city: modalData?.city || "",
    zipCode: modalData?.zipCode || "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<TUser>();
  const { setMessage } = useTemplate();
  const handleChange = (e: TInputChangeEvent | any) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const { put } = useApi();
  const { reload } = useUserAddressList();

  useEffect(() => {
    const user: TUser = {
      id: modalData?.id || 0,
      displayName: modalData?.name || "",
      email: modalData?.email || "",
      photoUrl: modalData?.photoUrl || "",
      phone: modalData?.mobile || "",
    };
    setSelectedUser(user);
  }, [modalData]);

  //Create emails user
  const updateUserAddress = (ev: TFormEvent) => {
    ev.preventDefault();
    setLoading(true);
    setMessage("Updating...");

    put(`/admin/user/address/${modalData?.id || 0}/update-basic`, formData)
      .then(({ message }) => {
        closeModal();
        reload();

        setMessage(message);
      })
      .catch((err: Error) => {
        console.log(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={updateUserAddress} className="flex flex-col gap-4 mt-1">
      <UserDetailsComp data={selectedUser} />
      <div className="grid grid-cols-2 gap-4">
        <AnimatedInputField
          formData={formData}
          name="name"
          label="Name"
          onChange={handleChange}
        />
        <AnimatedInputField
          formData={formData}
          name="organization"
          label="Organization"
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <EmailInputField
          formData={formData}
          name="email"
          label="Email"
          onChange={handleChange}
        />
        <PhoneInputField
          formData={formData}
          name="mobile"
          label="Mobile"
          onChange={handleChange}
        />
      </div>
      <div className="space-y-4">
        <AnimatedInputField
          formData={formData}
          name="line1"
          label="Holding, House, Road"
          onChange={handleChange}
          required
        />
        <AnimatedInputField
          formData={formData}
          name="line2"
          label="Area/Village"
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4 items-end">
        <Select
          formData={formData}
          label={"Country"}
          name="country"
          placeholder="Select Country"
          onChange={handleChange}
          options={countries.map((item) =>
            addOption(item.name, item.code, item.code)
          )}
        />
        <AnimatedInputField
          formData={formData}
          name="state"
          label="State"
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <AnimatedInputField
          formData={formData}
          name="city"
          label="City"
          onChange={handleChange}
        />
        <AnimatedInputField
          formData={formData}
          name="zipCode"
          label="Zip Code"
          onChange={handleChange}
        />
      </div>
      <div className="w-full flex justify-end items-center gap-2 mb-2">
        <Button
          variant="gray"
          title="Cancel"
          className="w-[100px] h-10"
          onClick={closeModal}
        />
        <Button
          variant="secondary"
          title="Update"
          className="w-[100px] h-10"
          type="submit"
          loading={loading}
        />
      </div>
    </form>
  );
};

const ModalUpdateAddress: FC = () => {
  const { closeModal, modalType, modalData } = useTemplate();
  return (
    <Dialog open={modalType === "update-address"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader>
          <DialogTitle>Update Address</DialogTitle>
        </DialogHeader>
        <DialogBody className="!min-h-1">
          <ModalBody closeModal={closeModal} modalData={modalData} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdateAddress;
