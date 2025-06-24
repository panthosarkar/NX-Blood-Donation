import { TInputChangeEvent } from "@/library/global-types";
import React, { useState } from "react";
import { DateInputField } from "@bikiran/inputs";
import { bloodGroup } from "@/public/assets/constant/BloodGroup";
import { Button } from "@bikiran/button";
import Select from "@/src/shared/select-field/Select";

const SearchDonorForm = () => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleChange = (e: TInputChangeEvent) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="w-full bg-white px-5 py-7.5 rounded-10 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
      <h3 className="text-2xl leading-5 font-medium text-center">
        Please Enter the required Field
      </h3>
      <form className="flex flex-col gap-[50px] mt-7.5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Select
            formData={formData}
            label="Blood Group"
            name="bloodGroup"
            onChange={handleChange}
            placeholder="Select Blood Group"
            className="bg-white"
            containerClassname="[&>div>label]:text-[#181830] [&>div>label]:text-lg &>div>label]:leading-5"
            options={bloodGroup}
          />

          <Select
            formData={formData}
            label="Donor Type"
            name="donorType"
            onChange={handleChange}
            placeholder="Select Donor Type"
            className="bg-white"
            containerClassname="[&>div>label]:text-[#181830] [&>div>label]:text-lg &>div>label]:leading-5"
            options={bloodGroup}
          />
          <Select
            formData={formData}
            label="City"
            name="city"
            onChange={handleChange}
            placeholder="Select Blood Group"
            className="bg-white"
            containerClassname="[&>div>label]:text-[#181830] [&>div>label]:text-lg &>div>label]:leading-5"
            options={[
              {
                id: 1,
                title: "Khulna",
                value: "khulna",
              },
            ]}
          />
          <div className="">
            <label htmlFor="" className="text-[#181830] font-medium text-lg">
              Date of blood donation
            </label>
            <DateInputField
              formData={formData}
              name="dateIssued"
              className="w-full h-full [&_.react-datepicker-wrapper]:h-[45px] [&>div_.react-datepicker-input]:text-black"
              onChange={handleChange}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="bg-primary text-white px-7.5 py-3 rounded-8 hover:bg-primary-50 hover:text-primary transition-all duration-300 ease-in-out self-center"
        >
          Search Available Donor
        </Button>
      </form>
    </div>
  );
};

export default SearchDonorForm;
