import { TFormEvent } from "@/library/global-types";
import useApi from "@/library/utils/useApi";
import { InputField } from "@bikiran/inputs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignUpForm = ({
  setActivePath,
}: {
  setActivePath: (path: string) => void;
}) => {
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
    <div className="max-h-[600px] w-full px-5 md:px-10 flex items-center justify-center">
      <div className="max-w-full w-full form-card">
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

          <div className="text-xs text-gray-500 pt-1 text-nowrap">
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
            <button type="submit" className="w-full btn_primary">
              Sign up
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-sm flex justify-center text-gray-600">
          <p> Already have an account?</p>
          <button
            className="font-medium text-red-600 hover:text-red-700"
            onClick={() => setActivePath("sign-in")}
          >
            &nbsp;Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
