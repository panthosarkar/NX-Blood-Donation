export type TTicketData = {
  id: number;
  subject: string;
  lastMessage: string;
  project: string;
  projectId: string;
  status: string;
  department: string;
  timeCreated: number;
  user: TSupportTicketUser;
};

export type TProject = {
  id: number;
  title: string;
  faviconUrl: string; // Assuming this can be an empty string
  contactName: string;
  email: string;
  phone: string;
  note: string;
  domain: string; // Assuming this can be an empty string
  projectOwner: boolean;
  permissionRole: string;
  status: string;
  permissionStatus: string;
  scopes: string[];
};
// TCreateTicket Type
export type TCreateTicket = {
  project: number;
  subject: string;
  department: string;
  message: string;
};

export type TSupportTicketInfo = {
  invoice: TSupportInvoice;
  messages: TSupportMessage;
};

export type TSupportInvoice = {
  id: number;
  subject: string;
  projectId: number;
  lastMessage: string;
  status: string;
  department: string;
  timeCreated: number;
};

export type TSupportMessage = {
  id: number;
  content: string;
  contentFormat: string;
  status: string;
  timeCreated: number;
  user: TSupportTicketUser;
};

export type TSupportTicketUser = {
  id: number;
  displayName: string;
  email: string;
  phone: string;
  photoUrl: string;
  status: string;
  userProfile: string | null;
  primaryIds: number[];
  primaryProjectId: number;
};

export type TSupportReply = {
  message: string;
  files?: File[];
};
