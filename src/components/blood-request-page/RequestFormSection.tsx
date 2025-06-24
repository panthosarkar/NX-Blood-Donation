import React, { useState } from "react";
import { Select, DateInputField, InputField } from "@bikiran/inputs";
import ReqMapSection from "./ReqMapSection";
import useApi from "@/library/utils/useApi";
import { TInputChangeEvent } from "@/library/global-types";
import { useBloodRequest } from "./context/BloodRequestProvider";
import { addOption } from "@/library/utils/option";
import capitalizeFirstLetter from "@/library/utils/capitalizeFirstLetter";

const RequestFormSection = () => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const { post } = useApi();
  const { data } = useBloodRequest();

  const { filters } = data;

  const blood_types = filters?.blood_types || [];
  const conditions = filters?.conditions || [];
  const gender = filters?.gender || [];

  const handleAddRequest = () => {
    post("/blood/request/post", formData)
      .then((res) => {
        alert("Request sent successfully!");
      })
      .catch((err) => {
        console.error("Error sending request:", err);
        alert("Failed to send request. Please try again.");
      });
  };

  const handleChange = (e: TInputChangeEvent) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div>
      <form method="POST" onSubmit={handleAddRequest}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <InputField
            label="Patient Name"
            formData={formData}
            name="name"
            type="text"
            onChange={handleChange}
            placeholder="Type Your Full Name..."
            parentClassName="[&>div>label]:text-[#181830]"
          />
          <InputField
            label="Patient Age"
            formData={formData}
            name="age"
            type="text"
            onChange={handleChange}
            placeholder="Type Patient age..."
            parentClassName="[&>div>label]:text-[#181830]"
          />

          <Select
            label="Gender"
            formData={formData}
            onChange={handleChange}
            name="gender"
            placeholder="Select Gender"
            className="bg-white"
            containerClassname="[&>div>label]:text-[#181830] [&>div>label]:leading-5"
            options={
              gender.map((item) =>
                addOption(item, capitalizeFirstLetter(item), item)
              ) || []
            }
          />
          <Select
            label="Blood Group"
            formData={formData}
            onChange={handleChange}
            name="blood_group"
            className="bg-white"
            placeholder="Select Blood Group"
            containerClassname="[&>div>label]:text-[#181830] [&>div>label]:leading-5"
            options={
              blood_types.map((item) =>
                addOption(item, capitalizeFirstLetter(item), item)
              ) || []
            }
          />
          <InputField
            label="Amount"
            formData={formData}
            onChange={handleChange}
            name="amount"
            className="bg-white"
            parentClassName="[&>div>label]:text-[#181830] [&>div>label]:leading-5"
            placeholder="Type amount"
          />
          <div>
            <label
              htmlFor="donation_date"
              className="block text font-medium text-gray-700 mb-1"
            >
              Date of Donation
            </label>
            <DateInputField
              formData={formData}
              name="donation_date"
              className="w-full h-full [&_.react-datepicker-wrapper]:h-[45px] [&>div_.react-datepicker-input]:text-black"
              onChange={handleChange}
            />
          </div>
          <Select
            label="Condition"
            formData={formData}
            onChange={handleChange}
            name="condition"
            className="bg-white"
            containerClassname="[&>div>label]:text-[#181830]  [&>div>label]:leading-5"
            placeholder="Select Condition"
            options={
              blood_types.map((item) =>
                addOption(item, capitalizeFirstLetter(item), item)
              ) || []
            }
          />
          <InputField
            label="Contact Number"
            formData={formData}
            name="contact_number"
            type="tel"
            onChange={handleChange}
            placeholder="Type Your Contact Number..."
            parentClassName="[&>div>label]:text-[#181830]"
          />
          <div className="md:col-span-2">
            <InputField
              label="Location"
              formData={formData}
              name="location"
              type="text"
              onChange={handleChange}
              placeholder="Type location..."
              parentClassName="[&>div>label]:text-[#181830]"
            />
          </div>
          <ReqMapSection />
          <div className="md:col-span-2">
            <label
              htmlFor="reason"
              className="block font-medium text-gray-700 mb-1"
            >
              Reason
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

export default RequestFormSection;
