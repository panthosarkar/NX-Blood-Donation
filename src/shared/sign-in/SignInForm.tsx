import React, { useState } from "react";
import { InputField } from "@bikiran/inputs";
import useApi from "@/library/utils/useApi";
import { useRouter } from "next/navigation";
import { TFormEvent } from "@/library/global-types";

const SignInForm = ({
  setActivePath,
}: {
  setActivePath: (path: string) => void;
}) => {
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
    <div className="max-h-[600px] w-full px-5 md:px-10 flex items-center justify-center">
      <div className="max-w-full w-full form-card">
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
          <p>Don't have and account?</p>
          <button
            className="font-medium text-red-600 hover:text-red-700"
            onClick={() => setActivePath("sign-up")}
          >
            &nbsp;Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
