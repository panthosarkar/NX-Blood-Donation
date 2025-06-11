"use client";
import React, { useEffect, useState } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/src/components/ui/input-otp";
import { useAuth } from "@/src/contexts/AuthProvider";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { useTemplate } from "@/src/contexts/template/TemplateProvider";

const InputOTPWithSeparator = () => {
  const { setFormData } = useAuth();

  const setValue = (value: any) => {
    setFormData((prev: any) => ({ ...prev, otp: value }));
  };
  return (
    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} onChange={setValue}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
  );
};

const OtpModal = () => {
  const { openModal, modalType, closeModal } = useTemplate();
  const [countTime, setCountTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const { formData, confirmOtp, sendOtp: resendOtp } = useAuth();

  const handleSubmit = (ev: any) => {
    ev.preventDefault();
    confirmOtp();
  };

  //countdown timer
  useEffect(() => {
    if (countTime > 0) {
      const timer = setTimeout(() => {
        setCountTime((cuTime) => cuTime - 1);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [countTime]);

  //when modalData changes, set the countTime to 180
  useEffect(() => {
    setCountTime(180);
  }, [formData]);

  const handleResendOtp = () => {
    resendOtp();
    setCountTime(180);
  };

  return (
    <Dialog open={modalType === "otp-verify-modal-open"} onOpenChange={closeModal}>
      <DialogContent className="modal-container max-w-[420px]">
        <DialogHeader>
          <DialogTitle>OTP Verification</DialogTitle>
        </DialogHeader>

        <div>
          <form onSubmit={handleSubmit} className="form_container space-y-4">
            <div>
              <p>We&apos;ve sent a code to {formData?.phone}, Please enter the OTP code.</p>
            </div>

            <div className="flex justify-center">
              <InputOTPWithSeparator />
            </div>

            <Button className="bg-error h-[50px] w-full text-base font-normal text-white" type="submit">
              Confirm
            </Button>
          </form>

          <Button
            variant="outline"
            className="text-error my-4 h-[50px] w-full text-base font-normal"
            type="submit"
            disabled={countTime > 0 || loading}
            onClick={handleResendOtp}
          >
            Send Again{" "}
            {!loading && countTime > 0 ? (
              <span className="ml-1">
                In <b>{countTime}s</b>
              </span>
            ) : null}
            {loading ? <div>Reload</div> : null}
          </Button>

          {/* if change the phone number then open login modal */}
          <div className="text-primary text-base font-normal">
            <button type="button" className="text-error font-medium" onClick={() => openModal("login")}>
              Change Phone Number
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OtpModal;
