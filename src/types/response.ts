export type TApiResponse<T = any> = {
  error: number;
  message?: string;
  data?: T;
  referenceName?: string;
};

export type TPagination = {
  cpp: number;
  offset: number;
  page: number;
};
