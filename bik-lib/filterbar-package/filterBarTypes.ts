export type TFilterField = {
  label: string;
  name: string;
  type: "text" | "select" | "dateRange" | "user";
  placeholder?: string;
  options?: string[]; // For select type
  divide?: boolean;
};
