import { ValError, ValOk, ValOutput } from "./ValOutput";

class Validation {
  chkString(
    obj: object,
    title: string,
    min: number = 0,
    max: number | null = null,
    required: boolean = true
  ): ValOutput {
    const name = Object.keys(obj)[0];
    const value = Object.values(obj)[0] || "";

    if (typeof value !== "string") {
      return ValError(`Invalid input of ${title}`, name);
    }

    if (!required && !value) {
      return ValOk(true);
    }

    if (!value) {
      return ValError(title + " is required", name);
    }

    if (value && value.length < min) {
      return ValError(`${title} must be at least ${min} characters`, name);
    }

    if (max && value.length > max) {
      return ValError(`${title} must be at most ${max} characters`, name);
    }

    return ValOk();
  }

  chkNumber(
    obj: object,
    title: string,
    min: number | null = null,
    max: number | null = null,
    required: boolean = true
  ): ValOutput {
    const name = Object.keys(obj)[0];
    const value = Object.values(obj)[0] || 0;

    if (typeof value !== "number") {
      return ValError(`Invalid input of ${title}`, name);
    }

    if (!required && !value) {
      return ValOk(true);
    }

    if (!value) {
      return ValError(title + " is required", name);
    }

    if (min && value < min) {
      return ValError(`${title} must be at least ${min}`, name);
    }

    if (max && value > max) {
      return ValError(`${title} must be at most ${max}`, name);
    }

    return ValOk();
  }

  chkEmail(obj: object, title: string, required: boolean = true): ValOutput {
    const name = Object.keys(obj)[0];
    const value = Object.values(obj)[0]?.trim() || "";

    if (typeof value !== "string") {
      return ValError(`Invalid input of ${title}`, name);
    }

    if (!required && !value) {
      return ValOk(true);
    }

    if (!value) {
      return ValError(title + " is required", name);
    }

    const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,8}$/;
    if (!emailRegEx.test(value)) {
      return ValError("Invalid email address", name);
    }

    return ValOk();
  }

  chkPhone(obj: object, title = "", required = false): ValOutput {
    const name = Object.keys(obj)[0];
    const value = Object.values(obj)[0]?.trim() || "";
    const min = 9;
    const max = 15;

    if (typeof value !== "string") {
      return ValError(`Invalid input of ${title}`, name);
    }

    if (!required && !value) {
      return ValOk(true);
    }

    if (!value) {
      return ValError(`${title} is required`, name);
    }

    if (value && value.length < min) {
      return ValError(`${title} must be at least ${min} characters`, name);
    }

    if (max && value.length > max) {
      return ValError(`${title} must be at most ${max} characters`, name);
    }

    // validate start with + or 0, and only digits if not start + or 0 then return invalid phone number
    const phoneRegEx = /^[+0-9]+$/;
    if (!phoneRegEx.test(value)) {
      return ValError(`Invalid ${title}`, name);
    }

    return ValOk();
  }

  chkSelect(
    obj: object,
    title: string,
    values: string[] = [],
    required: boolean = false
  ): ValOutput {
    const name = Object.keys(obj)[0] || "";
    const value = Object.values(obj)[0]?.trim() || "";

    if (typeof value !== "string") {
      return ValError(`Invalid input of ${title}`, name);
    }

    if (!required && !value) {
      return ValOk(true);
    }

    if (!value) {
      return ValError(`${title} is required`, name);
    }

    if (!values.includes(value)) {
      return ValError(`Invalid ${title}`, name);
    }

    return ValOk();
  }

  chkDomain(obj: object, title: string, required = true): ValOutput {
    const name = Object.keys(obj)[0];
    const value = Object.values(obj)[0]?.trim() || "";

    if (typeof value !== "string") {
      return ValError(`Invalid input of ${title}`, name);
    }

    if (!required && !value) {
      return ValOk(true);
    }

    if (!value) {
      return ValError(`${title} is required`, name);
    }

    const domainRegEx = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!domainRegEx.test(value)) {
      return ValError(`Invalid ${title}`, name);
    }

    return ValOk();
  }

  chkUrl(obj: object, title: string, required = false): ValOutput {
    const name = Object.keys(obj)[0];
    const value = Object.values(obj)[0]?.trim() || "";

    if (typeof value !== "string") {
      return ValError(`Invalid input of ${title}`, name);
    }

    if (!required && !value) {
      return ValOk(true);
    }

    if (!value) {
      return ValError(`${title} is required`, name);
    }

    const urlRegEx = /^(http|https):\/\/[^ "]+$/;
    if (!urlRegEx.test(value)) {
      return ValError(`Invalid ${title}`, name);
    }

    return ValOk();
  }

  chkTrue(obj: object, title: string): ValOutput {
    const name = Object.keys(obj)[0];
    const value = Object.values(obj)[0];

    if (!value) {
      return ValError(`${title} is required`, name);
    }

    return ValOk();
  }
}

//export default Validation;
const validation = new Validation();

export default validation;
