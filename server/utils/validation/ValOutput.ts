// Objective: Define the output of the validation functions

export interface ValOutput {
  error: number;
  message: string;
  reference: string;
  skipped: boolean | false;
}

export const ValError = (
  message: string = "",
  reference: string = ""
): ValOutput => {
  return {
    error: 1,
    message,
    reference,
    skipped: false,
  };
};

export const ValOk = (skipped: boolean = false): ValOutput => {
  return {
    error: 0,
    message: "OK",
    reference: "",
    skipped,
  };
};
