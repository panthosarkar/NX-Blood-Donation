export type TExecutionData = {
  id: number;
  referenceKey: string;
  referenceId: number;
  domain: string;
  timeFailed: number;
  timeSuccess: number;
  status: string;
  timeCreated: number;
  projectName: string;
  user: {
    id: number;
    displayName: string;
    email: string;
    phone: string;
    photoUrl: string;
  };
};
