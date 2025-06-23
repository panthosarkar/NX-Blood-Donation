"use client";
import React, { useState } from "react";
import ReqHeaderSection from "./ReqHeaderSection";
import InputField from "@/src/shared/input/InputField";
import ReqMapSection from "./ReqMapSection";
import SelectField from "@/src/shared/input/SelectField";

const BloodReqPage = () => {
  type TFormData = {
    full_name: string;
    age?: string;
    gender?: string;
    blood_group?: string;
    amount?: string;
    donation?: string;
    contact_number?: string;
    location?: string;
  };

  const [formData, setFormData] = useState<TFormData>({
    full_name: "",
    age: "",
    gender: "",
    blood_group: "",
    amount: "",
    donation: "",
    contact_number: "",
    location: "",
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

  console.log("working");

  return (
    <div className="container mx-auto max-w-4xl p-6 md:p-8 my-10 bg-white shadow-lg rounded-lg">
      <ReqHeaderSection />

      <form method="POST" onSubmit={handleAddReq}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <InputField
            id="full_name"
            label="Full Name"
            value={formData.full_name}
            name="full_name"
            type="text"
            onChange={handleChange}
            placeholder="Type Your Full Name..."
          />
          <InputField
            id="age"
            label="Patient Age"
            value={formData.age}
            name="age"
            type="text"
            onChange={handleChange}
            placeholder="Type Patient age..."
          />

          <SelectField
            id="gender"
            label="Gender"
            name="gender"
            options={["Male", "Female", "Other"]}
          />
          <SelectField
            id="blood_group"
            label="Blood Group"
            name="blood_group"
            options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
          />
          <SelectField
            id="blood_group"
            label="Blood Group"
            name="blood_group"
            options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
          />
          <SelectField
            id="amount"
            label="Amount"
            name="amount"
            options={["1 unit", "2 units", "3 units", "4 units", "5+ units"]}
          />
          <InputField
            id="donation"
            label="Date of donation"
            value={formData.donation}
            name="donation"
            type="date"
            onChange={handleChange}
            placeholder="Type Date of donation..."
          />
          <SelectField
            id="condition"
            label="Condition"
            name="condition"
            options={["Urgent", "Routine", "Emergency"]}
          />
          <InputField
            id="contact_number"
            label="Contact Number"
            value={formData.contact_number}
            name="contact_number"
            type="tel"
            onChange={handleChange}
            placeholder="Type Your Contact Number..."
          />
          <InputField
            id="location"
            label="Location"
            value={formData.location}
            name="location"
            type="text"
            onChange={handleChange}
            placeholder="Type location..."
          />

          <ReqMapSection />
          <div className="md:col-span-2">
            <label
              htmlFor="reason"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Reason:
            </label>
            <textarea
              id="reason"
              name="reason"
              rows={4}
              placeholder="write your reason here"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            ></textarea>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-3">
          <button type="button" className="btn_gray">
            Cancel
          </button>
          <button type="submit" className="btn_primary">
            Send blood request
          </button>
        </div>
      </form>
    </div>
  );
};

export default BloodReqPage;
