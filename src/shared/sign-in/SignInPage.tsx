"use client";
import React, { useState } from "react";
import SignInHeaderSection from "./SignInHeaderSection";
import InputField from "../input/InputField";
import Link from "next/link";

const SignInPage = () => {
  type TFormData = {
    email?: string;
    phone?: string;
    name?: string;
    password?: string;
  };

  const [formData, setFormData] = useState<TFormData>({
    email: "",
    phone: "",
    name: "",
    password: "",
  });

  const handleAddReq = async () => {
    try {
    } finally {
    }
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
    <div className="bg-white text-gray-900 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
      <div className="flex flex-col md:flex-row relative">
        <SignInHeaderSection />

        <div className="w-full md:w-2/3 p-6 md:p-12 flex items-center justify-center bg-gray-50 md:bg-white">
          <div className="max-w-full w-full bg-white p-8 md:p-10 rounded-xl form-card">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center md:text-left">
              Register Account
            </h2>
            <p className="text-gray-600 mb-8 text-center md:text-left">
              Get your Blood Donor account now
            </p>

            <form action="#" method="POST" className="space-y-5">
              <InputField
                id="email"
                label="Email"
                value={formData.email}
                name="email"
                type="email"
                onChange={handleChange}
                placeholder="Type your email"
              />

              <InputField
                id="phone"
                label="Phone Number"
                value={formData.phone}
                name="phone"
                type="tel"
                onChange={handleChange}
                placeholder="Type your phone number"
              />

              <InputField
                id="name"
                label="User Name"
                value={formData.name}
                name="name"
                type="text"
                onChange={handleChange}
                placeholder="Type your user name"
              />

              <InputField
                id="password"
                label="Password"
                value={formData.password}
                name="password"
                type="password"
                onChange={handleChange}
                placeholder="Type your password"
              />

              <p className="text-xs text-gray-500 pt-1">
                By registering you agree to the &nbsp;
                <Link
                  href="/"
                  className="font-medium text-red-600 hover:text-red-700"
                >
                  Blood Donor Terms of Use
                </Link>
                .
              </p>

              <button type="submit" className="w-full btn_primary">
                Sign up
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600">
              Already have an account?
              <a
                href="#"
                className="font-medium text-red-600 hover:text-red-700"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>

      <script type="module" src="index.tsx"></script>
    </div>
  );
};

export default SignInPage;
