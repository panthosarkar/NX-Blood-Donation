import { ValOutput } from "./ValOutput";

export const ValidateAll = (parameters: ValOutput[]): ValOutput => {
  for (let i = 0; i < parameters.length; i++) {
    if (parameters[i].error !== 0) {
      return parameters[i];
    }
  }

  return { error: 0, message: "OK", reference: "", skipped: false };
};
