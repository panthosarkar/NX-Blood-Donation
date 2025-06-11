import { InputDate } from "@/bik-lib/lib/InputFields";

import { TInputChangeEvent } from "@/bik-lib/types/event";

const SetDateModalComp = ({
  formData,
  handleOnChange,
}: {
  formData: any;
  handleOnChange: (ev: TInputChangeEvent) => void;
}) => {
  return (
    <div className="flex gap-2 ">
      <div className="flex flex-col gap-1 w-full">
        <label className="text-base text-primary font-medium">
          Subscription Start
        </label>
        <InputDate
          formData={formData}
          name="dateIssue"
          onChange={handleOnChange}
          className="h-10"
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label className="text-base text-primary font-medium">
          Subscription End
        </label>
        <InputDate
          formData={formData}
          name="dateExpire"
          onChange={handleOnChange}
          className="h-10"
        />
      </div>
    </div>
  );
};

export default SetDateModalComp;
