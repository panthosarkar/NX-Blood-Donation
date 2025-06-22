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
    <div className="bg-white text-gray-900">
      <div className="min-h-screen flex flex-col md:flex-row relative">
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

            {/* <div className="mt-6">
              <div className="relative">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Sign up using
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                  With Google
                </button>

                <button
                  type="button"
                  className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-gray-800 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.699-2.782.602-3.369-1.34-3.369-1.34-.455-1.156-1.11-1.465-1.11-1.465-.909-.62.069-.608.069-.608 1.004.071 1.532 1.03 1.532 1.03.891 1.529 2.341 1.089 2.91.833.091-.647.349-1.086.635-1.337-2.22-.252-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.682-.103-.253-.446-1.27.098-2.642 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.82c.85.004 1.705.114 2.505.336 1.909-1.295 2.748-1.026 2.748-1.026.546 1.372.202 2.389.1 2.642.64.698 1.028 1.591 1.028 2.682 0 3.842-2.338 4.687-4.566 4.935.359.309.679.92.679 1.852 0 1.336-.012 2.415-.012 2.741 0 .268.18.578.688.48C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                    />
                  </svg>
                  Sign With Github
                </button>
              </div>
            </div> */}

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
