"use client";
import React, { FormEvent, useState } from "react";
import { Dialog, DialogBody, DialogContent, DialogHeader, DialogTitle } from "@/src/components/ui/dialog";
import { useTemplate } from "@/src/contexts/template/TemplateProvider";
import { InputField } from "@/src/lib/InputFields";
import { Button } from "@/src/lib/bik-button";

const FormContainer = () => {
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const { openModal } = useTemplate();
  const [formData, setFormData] = useState({
    phone: "",
    otp: "",
    password: "",
    tnc: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
  };

  const handleSentOTP = () => {
    setOtpSent(true);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form flex flex-col gap-2 pt-3">
      <InputField
        name="phone"
        label="Phone"
        type="number"
        placeholder="Enter your phone number"
        formData={formData}
        onChange={handleChange}
        className="appearance-none"
      />
      <InputField
        name="password"
        label="Password"
        type="password"
        placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
        formData={formData}
        onChange={handleChange}
      />
      <InputField name="otp" label="OTP" type="number" placeholder="Enter OTP" formData={formData} onChange={handleChange} className="appearance-none" />
      {otpSent === false ? (
        <Button variant="secondary" type="button" className="h-10" loading={loading} title="Send OTP" onClick={handleSentOTP} />
      ) : (
        <Button variant="secondary" type="submit" className="h-10" loading={loading} title="Submit" />
      )}

      {/* line */}
      <div className="flex items-center gap-2">
        <div className="mt-1 flex-1 border-b border-gray-300"></div>
        <div className="text-base text-gray-500">or</div>
        <div className="mt-1 flex-1 border-b border-gray-300"></div>
      </div>

      <div className="mt-2 text-center text-base text-gray-500">
        Already have an account?{" "}
        <button type="button" className="text-secondary cursor-pointer hover:underline" onClick={() => openModal("user-login-required-modal")}>
          Login
        </button>
      </div>
    </form>
  );
};

export const ModalRegistration = () => {
  const { modalType, closeModal } = useTemplate();

  return (
    <Dialog onOpenChange={closeModal} open={modalType === "user-registration-modal"}>
      <DialogContent className="max-w-100">
        <DialogHeader>
          <DialogTitle>Registration</DialogTitle>
        </DialogHeader>

        <DialogBody>
          <FormContainer />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};
