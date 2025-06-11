/* eslint-disable no-unused-vars */
import { FC, useState } from "react";
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
import { addOption } from "@/bik-lib/utils/option";
import countries from "@/bik-lib/utils/country.json";
import { AnimatedInputField, EmailInputField, Select } from "@bikiran/inputs";
import UserSearchComp from "@/bikiran/shared/user-search/UserSearchComp";
import useApi from "@/bik-lib/utils/useApi";
import { Button } from "@bikiran/button";

const ModalBody: FC<{
  closeModal: () => void;
}> = ({ closeModal }) => {
  const [formData, setFormData] = useState<any>({
    organization: "",
    mobile: "",
    line1: "",
    line2: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<TUser>();
  const [userData, setUserData] = useState<any[]>([]);
  const { setMessage } = useTemplate();
  const handleChange = (e: TInputChangeEvent | any) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const { reload } = useUserAddressList();
  const { post } = useApi();
  //Create emails user
  const addAddressUser = (ev: TFormEvent) => {
    ev.preventDefault();
    setLoading(true);
    setMessage("Adding new address...");

    const userId = selectedUser?.id;
    post(`/admin/user/address/${userId || 0}/create`, formData)
      .then(({ message }) => {
        closeModal();
        reload();

        setMessage(message);
      })
      .catch((err: Error) => {
        setMessage(err?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={addAddressUser} className="flex flex-col gap-4 mt-1">
      <UserSearchComp
        formData={formData}
        setFormData={setFormData}
        setUserData={setUserData}
        userData={userData}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
      <div className="grid grid-cols-2 gap-4">
        <AnimatedInputField
          formData={formData}
          name="name"
          label="Name"
          onChange={handleChange}
          required
        />
        <AnimatedInputField
          formData={formData}
          name="organization"
          label="Organization"
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <EmailInputField
          formData={formData}
          name="email"
          label="Email"
          onChange={handleChange}
          required
        />
        <AnimatedInputField
          formData={formData}
          name="mobile"
          label="Mobile"
          onChange={handleChange}
          required
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
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <AnimatedInputField
          formData={formData}
          name="city"
          label="City"
          onChange={handleChange}
          required
        />
        <AnimatedInputField
          formData={formData}
          name="zipCode"
          label="Zip Code"
          onChange={handleChange}
          required
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
          title="Create"
          className="w-[100px] h-10"
          type="submit"
          loading={loading}
        />
      </div>
    </form>
  );
};

const ModalAddAddressUser: FC = () => {
  const { closeModal, modalType } = useTemplate();
  return (
    <Dialog open={modalType === "add-address"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader>
          <DialogTitle>Create Address</DialogTitle>
        </DialogHeader>
        <DialogBody className="!min-h-1">
          <ModalBody closeModal={closeModal} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddAddressUser;
