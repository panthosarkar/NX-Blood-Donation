export type TSupportInvoiceInfo = {
  id: number;
  subject: string;
  projectId: number;
  lastMessage: string;
  status: string;
  department: string;
  timeCreated: number;
};

export type TSupportUser = {
  id: number;
  displayName: string;
  email: string;
  phone: string;
  photoUrl: string;
  userProfile: any;
};

export type TMessage = {
  id: number;
  content: string;
  contentFormat: string;
  status: string;
  timeCreated: number;
  user: TSupportUser;
};

export type TSupportResponse = {
  invoiceInfo: TSupportInvoiceInfo;
  messages: TMessage[];
};
