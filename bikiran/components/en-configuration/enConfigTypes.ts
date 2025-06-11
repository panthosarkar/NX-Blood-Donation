export type TFilter = {
  type: string[];
  status: string[];
  vendors: string[];
};

export type TVendor = {
  name: string;
  templateId: string;
  templateUrl: string;
};

export type TEnConfig = {
  id: number;
  key: string;
  title: string;
  params: string[];
  vendor: TVendor;
  status: string;
  isTemplateUploaded: boolean;
};

export type TEnConfigResponse = {
  filters: TFilter;
  configs: TEnConfig[];
};

export type TVendorPayload = {
  name: string;
  templateId: string;
  templateUrl: string;
};
