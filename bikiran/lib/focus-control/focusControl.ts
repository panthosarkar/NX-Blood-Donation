"use client";
import { useEffect } from "react";
import "./focus-control.css";

const FocusControl = (
  isError: string,
  // eslint-disable-next-line no-unused-vars
  setIsError: (value?: string) => void,
  formData: object
) => {
  // Focus on error
  useEffect(() => {
    document.getElementsByClassName("error")?.[0]?.classList.remove("error");
    if (isError) {
      document.getElementsByName(isError)?.[0]?.focus();
      document.getElementsByName(isError)?.[0]?.classList.add("error");
    }
  }, [isError]);

  // Remove border error
  useEffect(() => {
    setIsError();
  }, [formData, setIsError]);

  return null;
};

export default FocusControl;
