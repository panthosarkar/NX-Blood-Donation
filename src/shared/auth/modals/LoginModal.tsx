"use client";
import { Dialog, DialogBody, DialogContent, DialogHeader, DialogTitle } from "@/src/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import React, { FormEvent, useEffect, useState } from "react";
import { useTemplate } from "@/src/contexts/template/TemplateProvider";
import { InputField } from "@/src/lib/InputFields";
import { Button } from "@/src/lib/bik-button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { ApiLoginWithPassword } from "../AuthOperation";
import { handleAxiosError } from "@/src/utils/handleAxiosError";
import { useInit } from "@/src/contexts/InitProvider";
import useApi from "@/src/utils/useApi";
import Cookie from "@/src/utils/Cookie";
import Link from "next/link";

const PhoneOTPComp = () => {
  const { setAuthReloadKey } = useInit();
  const [loading, setLoading] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [countTime, setCountTime] = useState(120);
  const [step, setStep] = useState(1);
  const { setMessage, closeModal } = useTemplate();
  const { post } = useApi();
  const [formData, setFormData] = useState({
    phone: "",
    otp: "",
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleOTP = async () => {
    setLoading(true);
    try {
      const { message } = await post<{ otp: string }>("/send/otp", {
        phone: formData.phone,
      });
      setStep(2);
      setMessage("success", message);
      setFormData((prev) => ({ ...prev, otp: "" }));
    } catch (ex) {
      setMessage("error", handleAxiosError(ex));
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setLoadingVerify(true);
    try {
      const { data } = await post<{ token: string }>("/login/otp", formData);
      new Cookie("token").setCookie(data?.token || "", 30);
      setAuthReloadKey(-1);
      closeModal();
    } catch (ex) {
      setMessage("error", handleAxiosError(ex));
    } finally {
      setLoadingVerify(false);
    }
  };

  useEffect(() => {
    if (countTime > 0) {
      const timer = setTimeout(() => {
        setCountTime((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [countTime]);

  return (
    <div className="flex flex-col gap-4 pt-3">
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
        name="otp"
        label="OTP"
        type="number"
        placeholder="Enter OTP"
        formData={formData}
        onChange={handleChange}
        className="disabled:bg-primary-50/50 appearance-none"
        disabled={step === 1}
      />

      <div className="flex justify-end gap-2">
        {step === 1 && <Button variant="secondary" className="w-full" onClick={handleOTP} title="Send OTP" loading={loading} />}

        {step === 2 && (
          <div className="flex w-full gap-2">
            <Button
              variant="secondary-line"
              title={countTime > 0 && step === 2 ? `Resend OTP in ${countTime}s` : "Resend OTP"}
              onClick={() => {
                handleOTP();
                setCountTime(180);
              }}
              className="w-full flex-1"
              disabled={countTime > 0}
              loading={loading}
            />
            <Button variant="secondary" className="w-full flex-1" onClick={handleVerifyOTP} title="Verify OTP" loading={loadingVerify} disabled={loading} />
          </div>
        )}
      </div>
    </div>
  );
};

const LoginComp = () => {
  const { setAuthReloadKey } = useInit();
  const { openModal, setMessage, closeModal } = useTemplate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    remember_me: false,
  });
  const handleFormChange = (e: any) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await ApiLoginWithPassword<{ token: string }>(formData);
      new Cookie("token").setCookie(data?.token || "", 30);
      setAuthReloadKey(-1);
      closeModal();
    } catch (error) {
      setMessage("error", handleAxiosError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-form flex flex-col gap-2 pt-3">
      <InputField
        name="phone"
        label="Phone"
        type="number"
        placeholder="Enter your phone number"
        formData={formData}
        onChange={handleFormChange}
        className="appearance-none"
      />
      <InputField
        name="password"
        label="Password"
        type="password"
        placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
        formData={formData}
        onChange={handleFormChange}
      />

      <div className="my-3 flex items-center justify-between gap-2">
        <label htmlFor="remember_me" className="flex cursor-pointer items-center gap-2">
          <Checkbox
            id="remember_me"
            className="focus:ring-secondary focus-visible:ring-secondary data-[state=checked]:border-secondary data-[state=checked]:bg-secondary cursor-pointer font-medium text-white"
            name=""
            checked={formData.remember_me}
            onCheckedChange={(e) =>
              handleFormChange({
                target: { name: "remember_me", value: e },
              })
            }
          />
          <span className="select-none">Remember me</span>
        </label>
        <div className="text-sm text-gray-500">
          <Link href="/forgot-password" onClick={() => closeModal()} className="text-secondary">
            Forgot password?
          </Link>
        </div>
      </div>

      <Button variant="secondary" type="submit" className="h-10" loading={loading} title="Login" />

      {/* line */}
      <div className="flex items-center gap-2">
        <div className="mt-1 flex-1 border-b border-gray-300"></div>
        <div className="text-base text-gray-500">or</div>
        <div className="mt-1 flex-1 border-b border-gray-300"></div>
      </div>

      <div className="mt-2 text-center text-base text-gray-500">
        Don't have an account?{" "}
        <button type="button" className="text-secondary cursor-pointer hover:underline" onClick={() => openModal("user-registration-modal")}>
          Register Now
        </button>
      </div>
    </form>
  );
};

export const LoginTabComp = () => {
  return (
    <Tabs defaultValue="otp" className="size-full">
      <TabsList className="flex w-full gap-2 rounded-none border-b bg-transparent p-2">
        <TabsTrigger className="cursor-pointer text-base shadow-none data-[state=active]:!shadow-none" value="otp">
          Phone Number
        </TabsTrigger>
        <hr className="bg-primary-300 h-full w-px" />
        <TabsTrigger className="cursor-pointer text-base shadow-none data-[state=active]:!shadow-none" value="password">
          Password
        </TabsTrigger>
      </TabsList>
      <TabsContent value="otp">
        <PhoneOTPComp />
      </TabsContent>
      <TabsContent value="password">
        <LoginComp />
      </TabsContent>
    </Tabs>
  );
};

const LoginModal = () => {
  const { closeModal, modalType } = useTemplate();

  return (
    <Dialog onOpenChange={closeModal} open={modalType === "user-login-required-modal"}>
      <DialogContent className="max-w-100">
        <DialogHeader>
          <DialogTitle>User Login</DialogTitle>
        </DialogHeader>

        <DialogBody>
          <LoginTabComp />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
