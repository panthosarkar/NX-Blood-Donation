"use client";
import React, { useState } from "react";
import SignInHeaderSection from "./SignInHeaderSection";
import Link from "next/link";
import useApi from "@/library/utils/useApi";
import { TFormEvent } from "@/library/global-types";
import { InputField } from "@bikiran/inputs";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const { post } = useApi();
  const router = useRouter();

  const handleAddReq = (e: TFormEvent) => {
    e.preventDefault();
    post("/auth/registration", formData)
      .then((response) => {
        alert("Registration successful!");
        router.push("/log-in");
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="max-h-full bg-white text-gray-900 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
      <div className="flex flex-col md:flex-row relative">
        <SignInHeaderSection />

        <div className="w-full md:w-2/3 p-6  md:p-12 flex items-center justify-center bg-gray-50 md:bg-white">
          <div className="max-w-full w-full bg-white p-8 md:p-10 rounded-xl form-card">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center md:text-left">
              Register Account
            </h2>
            <p className="text-gray-600 mb-8 text-center md:text-left">
              Get your Blood Donor account now
            </p>

            <form onSubmit={handleAddReq} className="space-y-5">
              <InputField
                label="Phone Number"
                formData={formData}
                name="phone_number"
                type="tel"
                onChange={handleChange}
                placeholder="Type your phone number"
              />

              <InputField
                label="Name"
                formData={formData}
                name="display_name"
                type="text"
                onChange={handleChange}
                placeholder="Type your user name"
              />

              <InputField
                label="Password"
                formData={formData}
                name="password"
                type="password"
                onChange={handleChange}
                placeholder="Type your password"
              />

              <div className="text-xs text-gray-500 pt-1">
                By registering you agree to the &nbsp;
                <Link
                  href="/"
                  className="font-medium text-red-600 hover:text-red-700"
                >
                  Blood Donor Terms of Use
                </Link>
                .
              </div>

              <div className="w-full">
                <Link
                  href={"/sign-in"}
                  type="submit"
                  className="w-full btn_primary"
                >
                  Sign up
                </Link>
              </div>
            </form>

            <div className="mt-8 text-center text-sm flex justify-center text-gray-600">
              <p> Already have an account?</p>
              <Link
                href="/log-in"
                className="font-medium text-red-600 hover:text-red-700"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
