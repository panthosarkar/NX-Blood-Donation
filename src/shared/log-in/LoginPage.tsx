"use client";
import { TFormEvent } from "@/library/global-types";
import useApi from "@/library/utils/useApi";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SignInHeaderSection from "../sign-in/SignInHeaderSection";
import { InputField } from "@bikiran/inputs";
import Link from "next/link";

const LoginPage = () => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const { post } = useApi();
  const router = useRouter();

  const handleAddReq = (e: TFormEvent) => {
    e.preventDefault();
    post("/auth/login", formData)
      .then((response) => {
        alert("Login successful!");
        router.push("/");
      })
      .catch((error) => {
        console.error("Error during login:", error);
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
    <div className="max-h-fit bg-white text-gray-900 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
      <div className="flex flex-col md:flex-row relative">
        <SignInHeaderSection />

        <div className="w-full md:w-2/3 p-6  md:p-12 flex items-center justify-center bg-gray-50 md:bg-white">
          <div className="max-w-full w-full bg-white p-8 md:p-10 rounded-xl form-card">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center md:text-left">
              Log In Account
            </h2>
            <p className="text-gray-600 mb-8 text-center md:text-left">
              Welcome back! Please log in to your account.
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
                label="Password"
                formData={formData}
                name="password"
                type="password"
                onChange={handleChange}
                placeholder="Type your password"
              />

              <div className="w-full">
                <button type="submit" className="w-full btn_primary">
                  Sign In
                </button>
              </div>
            </form>

            <div className="mt-8 text-center text-sm flex justify-center text-gray-600">
              <p> You Don't Have Account </p>

              <Link
                href="/sign-in"
                className="font-medium text-red-600 hover:text-red-700"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
