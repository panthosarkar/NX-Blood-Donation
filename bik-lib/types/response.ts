export type TApiResponse<T> = {
  error: number;
  message?: string;
  data?: T;
  referenceName?: string;
};

export type TPagination = {
  currentPage: number;
  contentPerPage: number;
  totalContent: number;
  numberOfPages: number;
  showingFrom: number;
  showingTo: number;
  pages: number[];
};
