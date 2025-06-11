import React, { use, useState } from "react";
import { InputDateRange } from "@/bik-lib/lib/InputFields";
import dayjs from "dayjs";
import { cn } from "@/bik-lib/utils/cn";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/bikiran/components/ui/dialog";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/bikiran/components/ui/radio-group";
import { Label } from "@/bikiran/components/ui/label";
import { TInputChangeEvent } from "@/bik-lib/types/event";

const Title: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <h2 className={cn("text-xl font-medium text-primary mb-1", className)}>
      {children}
    </h2>
  );
};

export const filterServices = [
  {
    id: 1,
    title: "Domain",
  },
  {
    id: 2,
    title: "Hosting",
  },
  {
    id: 3,
    title: "Software",
  },
  {
    id: 4,
    title: "SMS",
  },
  {
    id: 5,
    title: "Security",
  },
  {
    id: 6,
    title: "All",
  },
];
const FilterService = ({
  formData,
  setFormData,
}: {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}) => {
  return (
    <div className="mb-3">
      <Title className={""}>Services</Title>
      <div className="flex flex-wrap items-center gap-[5px]">
        {filterServices.map((service: { id: number; title: string }) => {
          return (
            <button
              key={service.id}
              type="button"
              className={cn(
                "text-primary-700 text-base font-medium py-2.5 px-5 border border-[#D0CFD9] rounded-10",
                {
                  "bg-primary text-white border-transparent":
                    formData.services.includes(service),
                }
              )}
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  services: prev.services.includes(service)
                    ? prev.services.filter((s) => s.id !== service.id)
                    : [...prev.services, service],
                }));
              }}
            >
              <span>{service.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const FilterDate = ({
  formData,
  setFormData,
}: {
  formData: FormData;
  setFormData: any;
}) => {
  return (
    <div>
      <Title className={""}>Date Filter</Title>
      <div className="h-11 [&>.flatpickr-wrapper]:!size-full">
        <InputDateRange
          name="date"
          formData={formData}
          className="!bg-primary-50 border-0"
          inpRef={undefined}
          disabled={undefined}
          setFormData={setFormData}
          onChange={function (e: TInputChangeEvent): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
    </div>
  );
};

interface FormData {
  dateStart: string;
  dateEnd: string;
  status: string;
  services: any[];
}

const FilterStatus = ({
  formData,
  setFormData,
}: {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}) => {
  return (
    <div>
      <Title className={""}>Status</Title>
      <RadioGroup
        defaultValue=""
        onValueChange={(value) =>
          setFormData((prev: typeof formData) => ({ ...prev, status: value }))
        }
        className="flex items-center gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="active"
            id="active"
            className="text-primary border-primary"
          />
          <Label
            htmlFor="active"
            className="rounded-10 px-5 h-10 bg-primary text-white flex items-center justify-center"
          >
            Active
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="inactive"
            id="inactive"
            className="text-primary border-primary"
          />
          <Label
            htmlFor="inactive"
            className="rounded-10 px-5 h-10 bg-primary text-white flex items-center justify-center"
          >
            Inactive
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

const ModalFilter = () => {
  const [formData, setFormData] = useState({
    dateStart: dayjs().subtract(90, "day").format("YYYY-MM-DD"),
    dateEnd: dayjs().format("YYYY-MM-DD"),
    status: "",
    services: [filterServices[filterServices?.length - 1]],
  });

  console.log(formData);

  return (
    <DialogContent
      aria-describedby={undefined}
      className="modal-container !rounded-30 max-w-[400px]"
    >
      <DialogHeader>
        <DialogTitle className="text-primary text-2xl font-medium">
          Filter
        </DialogTitle>
      </DialogHeader>

      <div>
        <FilterService formData={formData} setFormData={setFormData} />
        <FilterDate formData={formData} setFormData={setFormData} />
        <FilterStatus formData={formData} setFormData={setFormData} />
      </div>
    </DialogContent>
  );
};

export default ModalFilter;
