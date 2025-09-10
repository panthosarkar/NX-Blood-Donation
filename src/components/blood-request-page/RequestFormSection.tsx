import React, { useState } from "react";
import { Select, DateInputField, InputField } from "@bikiran/inputs";
import ReqMapSection from "./ReqMapSection";
import useApi from "@/library/utils/useApi";
import {
  TInputChangeEvent,
  TTextAreaChangeEvent,
} from "@/library/global-types";
import { useBloodRequest } from "./context/BloodRequestProvider";
import { addOption } from "@/library/utils/option";
import capitalizeFirstLetter from "@/library/utils/capitalizeFirstLetter";
import ChronoPickDate from "@/src/shared/chronopick/ChronoPickDate";
import { ChronoPickMode } from "@bikiran/chronopick";

const RequestFormSection = () => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const { post } = useApi();
  const { data } = useBloodRequest();

  const { filters } = data;

  const blood_types = filters?.blood_types || [];
  const conditions = filters?.conditions || [];
  const gender = filters?.gender || [];

  const handleAddRequest = (e: React.FormEvent<HTMLFormElement>) => {
    const payload = { ...formData, donation_date: formData.date };

    e.preventDefault();
    post("/blood/request/post", payload)
      .then((res) => {
        alert("Request sent successfully!");
        setFormData({});
      })
      .catch((err) => {
        console.error("Error sending request:", err);
        alert(`Failed to send request. Please try again. ${err.message}`);
      });
  };

  const handleChange = (e: TInputChangeEvent | TTextAreaChangeEvent) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  console.log(formData);

  return (
    <div>
      <form onSubmit={handleAddRequest}>
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
            name="blood_type"
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
          <ChronoPickDate
            formData={formData}
            setFormData={setFormData}
            mode={ChronoPickMode.Single}
            label="Date of Donation"
            classname="[&>div>div>input]:!h-[45px] [&>div>div>input]:!mt-1 [&>label]:!text-[#181830] [&>label]:text-base"
          />
          <Select
            label="Condition"
            formData={formData}
            onChange={handleChange}
            name="patient_condition"
            className="bg-white"
            containerClassname="[&>div>label]:text-[#181830] [&>.container]:!mt-1 [&>div>label]:leading-5"
            placeholder="Select Condition"
            options={
              conditions.map((item) =>
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
              value={formData.reason || ""}
              onChange={handleChange}
              rows={4}
              placeholder="write your reason here"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            ></textarea>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-3">
          <button
            type="button"
            className="btn_gray"
            onClick={() => setFormData({})}
          >
            Reset
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
