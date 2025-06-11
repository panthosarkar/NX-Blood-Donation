import { ValidateAll } from "@/server/utils/validation/ValOperation";
import { ValOutput } from "@/server/utils/validation/ValOutput";
import validation from "@/server/utils/validation/Validation";

export interface SiteData {
  id?: number;
  appKey: string;
  activityKey: string;
  description: string;
  currentValues: object;
  newValues: object;
  weight: string;
  ip: string;
  status: string;
}

export const ValidateActivityPost = (formData: SiteData): ValOutput => {
  const st = ValidateAll([
    validation.chkTrue({ website: formData.appKey }, "App Key"),
    validation.chkTrue({ activity: formData.activityKey }, "Activity Key"),
    validation.chkTrue({ description: formData.description }, "Description"),
    // validation.chkTrue(
    //   { currentValues: formData.currentValues },
    //   "Current Values"
    // ),
    // validation.chkTrue({ newValues: formData.newValues }, "New Values"),
    validation.chkTrue({ weight: formData.weight }, "Weight"),
    validation.chkString({ status: formData.status }, "Status"),
  ]);

  return {
    error: st.error,
    message: st.message,
    reference: st.reference,
    skipped: false,
  };
};
