type HostingPackage = {
  id: number;
  vendor: string;
  title: string;
  price: number;
};

type Vendor = {
  // Define the properties if vendors array contains objects in the future
};

type Location = {
  key: string;
  title: string;
  defaultValue: string | null;
  isPublic: boolean;
};

type DiskType = {
  key: string;
  title: string;
  defaultValue: string | null;
  isPublic: boolean;
};

type SubType = {
  key: string;
  title: string;
  defaultValue: string | null;
  isPublic: boolean;
};

export type THostingStatus = {
  status: string;
};

export type THostingPkg = {
  id: number;
  title: string;
  minDuration: number;
  selectedDuration: number;
  price: number;
  pricePromotion: number;
  priceSetup: number;
  priceRestore: number;
  subType: string;
  disk: number;
  bandwidth: number;
  cpu: number;
  ram: number;
  diskType: string;
  ep: number;
  io: number;
  location: string;
  status: string;
  vendor: string;
  serverHost: string;
  vendorPackageName: string;
  currency: string;
};
export type TTypes = [
  {
    key: string;
    title: string;
  },
];
