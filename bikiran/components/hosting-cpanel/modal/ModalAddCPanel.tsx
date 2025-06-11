"use client";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "@bikiran/button";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { useRouter } from "next/navigation";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { FC, useEffect, useState } from "react";
import { createPassword } from "@/bik-lib/features/inputFieldPassword/CreatePassword";
import { isValidPassword } from "@/bik-lib/features/inputFieldPassword/PasswordValidation";
import { InputFieldPassword } from "@/bik-lib/features/inputFieldPassword/InputFieldPassword";
import { TFormEvent, TInputChangeEvent } from "@/bik-lib/types/event";
import Image from "next/image";
import { useCPanel } from "../context/CPanelProvider";
import {
  AnimatedInputField,
  AnimatedSelect,
  ValidationInputField,
} from "@bikiran/inputs";
import { icons } from "@/bikiran/lib/icons";
import UserSearchComp from "@/bikiran/shared/user-search/UserSearchComp";
import { TUser } from "@/bikiran/shared/user-search/UserSearchType";
import { addOption } from "@/bik-lib/utils/option";
import useApi from "@/bik-lib/utils/useApi";

type TFormData = {
  userId: number;
  hostname: string;
  subscriptionId: string;
  domain: string;
  cpUsername: string;
  cpPassword: string;
};
type TSubscription = {
  id: number;
  title: string;
};

const ModalBody: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean | undefined>(false);
  const [validEmail, setValidEmail] = useState<boolean | undefined>(undefined);
  const [domainVal, setDomainVal] = useState<string>("");
  const [formData, setFormData] = useState<TFormData>({
    subscriptionId: "",
    domain: "",
    cpUsername: "",
    cpPassword: "",
    hostname: "",
    userId: 0,
  });
  const [errorMassage, setErrorMassage] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<TUser>();
  const [userData, setUserData] = useState<any[]>([]);
  const [subscription, setSubscription] = useState<TSubscription[]>([]);

  const valid = isValidPassword(formData.cpPassword);

  const handleChange = (e: TInputChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { reload, data } = useCPanel();
  const { authInfo, chkLoginReq } = useAuth2();
  const { modalData, closeModal, setMessage } = useTemplate();
  const router = useRouter();
  const { get, post } = useApi();

  const handleSubmit = (ev: TFormEvent) => {
    ev.preventDefault();
    setLoading(true);
    const payload: TFormData = {
      userId: selectedUser?.id || 0,
      hostname: formData.hostname,
      subscriptionId: formData.subscriptionId,
      domain: formData.domain,
      cpUsername: formData.cpUsername.trim(),
      cpPassword: formData.cpPassword,
    };
    post(`/admin/hosting/cp-server-conf/add-cpanel`, payload)
      .then(({ message, data }) => {
        setMessage(message);
        reload();
        closeModal();
        router.push(`hosting/${data.hostingId}/overview`);
      })
      .catch((err) => {
        setMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (formData.domain) {
      let usernameArr = formData.domain.split(".");
      usernameArr = usernameArr.filter((part) => part !== "www");
      const name = usernameArr.length > 1 ? usernameArr[0] : usernameArr[0];
      const currentYear = new Date().getFullYear().toFixed().slice(-2);
      setFormData((prev) => ({ ...prev, cpUsername: `${name}${currentYear}` }));
    } else {
      setFormData((prev) => ({ ...prev, cpUsername: "" }));
    }
  }, [formData.domain]);

  useEffect(() => {
    if (formData.cpUsername !== "") {
      setModalLoading(true);
      get(`/hosting/cpanel-username-available/${formData.cpUsername}`)
        .then(({ message }) => {
          setValidEmail(true);
        })
        .catch((err) => {
          setValidEmail(false);
          setErrorMassage(err.message);
        })
        .finally(() => {
          setModalLoading(false);
        });
    } else {
      setModalLoading(undefined);
    }
  }, [formData.cpUsername]);

  useEffect(() => {
    if (selectedUser) {
      get(`/admin/hosting/cp-server-conf/search-subscriptions`, {
        userId: selectedUser?.id,
      })
        .then(({ data }) => {
          setSubscription(data.subscriptions);
        })
        .catch((err) => {
          // setMessage(err.message);
          console.log(err);
        });
    }
  }, [selectedUser]);

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-3">
      <UserSearchComp
        formData={formData}
        selectedUser={selectedUser}
        setFormData={setFormData}
        setSelectedUser={setSelectedUser}
        setUserData={setUserData}
        userData={userData}
      />
      <AnimatedSelect
        formData={formData}
        label={""}
        placeholder="Select Hostname"
        name="hostname"
        onChange={handleChange}
        options={data?.filters?.hostname?.map((host) =>
          addOption(host, host, host)
        )}
      />
      <AnimatedSelect
        formData={formData}
        label={""}
        placeholder="Select Subscription"
        name="subscriptionId"
        onChange={handleChange}
        options={subscription.map((item) =>
          addOption(item.id, item.title, item.id.toString())
        )}
      />
      <AnimatedInputField
        formData={{
          domain: domainVal,
        }}
        label={"Domain"}
        name="domain"
        placeholder={"example.com"}
        onChange={(ev) => setDomainVal(ev.target.value)}
        onBlur={handleChange}
        className="h-10 "
      />
      <div>
        <ValidationInputField
          formData={formData}
          label={"cPanel Username"}
          name="cpUsername"
          placeholder={"example.com"}
          onChange={handleChange}
          className="h-10"
          valid={validEmail}
          loading={modalLoading}
          //   show={true}
        />
        <div className="flex flex-col gap-1">
          <div
            className={`${
              validEmail === false && validEmail !== undefined
                ? "max-h-[50px] h-auto"
                : " max-h-0 h-0"
            } overflow-hidden transition-[max-height] duration-300 flex gap-1 items-center `}
          >
            <Image
              src={icons.iconAlert}
              alt="alert"
              width={0}
              height={0}
              className="size-4"
            />
            <span className="text-red-500 text-sm font-normal leading-normal">
              {errorMassage}!
            </span>
          </div>
          <span className="text-primary-500 text-sm">
            * First 8 character should be unique{" "}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 ">
        <InputFieldPassword
          ImageComponent={Image}
          formData={formData}
          label={""}
          name="cpPassword"
          description={true}
          placeholder="Enter password"
          onChange={handleChange}
          generatePassword={() =>
            setFormData((prev: any) => ({
              ...prev,
              cpPassword: createPassword(12),
            }))
          }
          passwordType="cp"
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
          title="Setup"
          className="w-[100px] h-10"
          type="submit"
          loading={loading}
          disabled={
            valid && formData.domain !== "" && validEmail === true
              ? false
              : true
          }
        />
      </div>
    </form>
  );
};

const ModalAddCPanel: FC = () => {
  const { modalType, closeModal } = useTemplate();

  return (
    <Dialog open={modalType === "add-cPanel"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader>
          <DialogTitle>Add cPanel</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <ModalBody />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddCPanel;
