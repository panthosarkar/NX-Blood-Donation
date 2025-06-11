"use client";
import { useTemplate } from "@/src/contexts/template/TemplateProvider";
import { Button } from "@/src/lib/bik-button";
import { InputField } from "@/src/lib/InputFields";
import { handleAxiosError } from "@/src/utils/handleAxiosError";
import useApi from "@/src/utils/useApi";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";

const PhoneOTPComp: FC<{ setOtpVerify: (value: boolean) => void; setFormData: any; formData: any }> = ({ setOtpVerify, setFormData, formData }) => {
  const [loading, setLoading] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [countTime, setCountTime] = useState(120);
  const [step, setStep] = useState(1);

  const { setMessage } = useTemplate();
  const { post } = useApi();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleOTP = async () => {
    setLoading(true);
    try {
      const { message } = await post<{ otp: string }>("forgot/otp/send", {
        phone: formData.phone,
      });
      setStep(2);
      setMessage("success", message);
      setFormData((prev: any) => ({ ...prev, otp: "" }));
    } catch (ex) {
      setMessage("error", handleAxiosError(ex));
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setLoadingVerify(true);
    try {
      const { data, message } = await post<{ token: string }>("forgot/otp/verify", formData);
      setMessage("success", message);
      setOtpVerify(true);
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
      <div className="w-full border-b pb-3 text-center font-medium">Forgot Password? </div>
      <h3 className="my-5 text-sm">Enter the phone number associated with your account. We'll send you a verification code to reset your password.</h3>
      <InputField
        name="phone"
        label="Phone"
        type="number"
        placeholder="Enter your phone number"
        formData={formData}
        onChange={handleChange}
        className="appearance-none"
      />
      {step === 2 && (
        <InputField
          name="otp"
          label="OTP"
          type="number"
          placeholder="Enter OTP"
          formData={formData}
          onChange={handleChange}
          className="disabled:bg-primary-50/50 appearance-none"
        />
      )}

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

const NewPassComp: FC<{ setFormData: any; formData: any }> = ({ setFormData, formData }) => {
  const [loading, setLoading] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);

  const { setMessage } = useTemplate();
  const { post } = useApi();
  const router = useRouter();
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };
  const handleNewPassword = async () => {
    setLoadingVerify(true);
    try {
      const { message } = await post<{ token: string }>("password/reset", formData);
      setMessage("success", message);
      setLoading(true);
      router.push("/login");
    } catch (ex) {
      setMessage("error", handleAxiosError(ex));
    } finally {
      setLoadingVerify(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 pt-3">
      <div className="w-full border-b pb-3 text-center font-medium">Set New Password </div>
      <h3 className="my-5 text-sm">Create a new strong password for your account. </h3>
      <InputField
        name="password"
        label="New Password"
        type="password"
        placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
        formData={formData}
        onChange={handleChange}
      />
      <span className="-mt-3 text-xs text-gray-400">Password must be 8 character.</span>
      <InputField
        name="re_password"
        label="Confirm New Password "
        type="password"
        placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
        formData={formData}
        onChange={handleChange}
      />
      <div className="flex justify-end gap-2">
        <Button
          variant="secondary"
          className="w-full flex-1"
          onClick={handleNewPassword}
          title="Submit"
          loading={loadingVerify}
          disabled={loading || formData.password !== formData.re_password || formData.password.length < 8}
        />
      </div>
    </div>
  );
};

const ForgotPassSection = () => {
  const [otpVerify, setOtpVerify] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    otp: "",
    password: "",
    re_password: "",
  });

  return (
    <div className="page_wrapper">
      <div className="container mx-auto">
        <div className="border-primary-100 mx-auto my-10 h-full items-center justify-center rounded-lg border p-8 md:w-106">
          {!otpVerify ? (
            <PhoneOTPComp setOtpVerify={setOtpVerify} setFormData={setFormData} formData={formData} />
          ) : (
            <NewPassComp setFormData={setFormData} formData={formData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassSection;
