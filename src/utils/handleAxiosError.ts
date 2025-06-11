import axios from "axios";

export const handleAxiosError = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    if (err.response?.status !== 200) {
      return err.message;
    }
    return err.response?.data?.message || "An unexpected error occurred.";
  }
  if (err instanceof Error) {
    return err.message;
  }
  return "An unexpected error occurred.";
};
