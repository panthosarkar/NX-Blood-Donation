export type TBloodRequest = {
  sl: number;
  user_sl: number;
  name: string;
  age: number;
  gender: string;
  blood_type: string;
  amount: number;
  location: string;
  contact_number: number;
  donation_date: number;
  patient_condition: string;
  reason: string;
  status: string;
  time_created: number;
  time_deleted: number;
  time_updated: number;
};

export type TFilters = {
  gender: string[];
  status: string[];
  blood_types: string[];
  conditions: string[];
};

export type TBloodRequestResponse = {
  filters: TFilters;
  total_count: number;
  blood_requests: TBloodRequest[];
};
