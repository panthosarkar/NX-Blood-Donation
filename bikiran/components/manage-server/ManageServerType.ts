export type TServerData = {
  id: number;
  title: string;
  hostname: string;
  primaryIp: string;
  type: string;
  cpu: string;
  ram: string;
  storage: string;
  network: string;
  raid: string;
  os: string;
  bandwidth: string;
  timeCreated: number;
  status: string;
  environment: string;
};
export type TEnvUpdate = {
  key: string;
  title: string;
};

export type TServerCreatePayload = {
  type: string;
  hostname: string;
  primaryIp: string;
  title: string;
  cpu: string;
  ram: string;
  storage: string;
  raid: string;
  network: string;
  os: string;
  bandwidth: string;
  status?: string;
  note?: string;
};

export const raidLevels = [
  {
    id: 0,
    title: "RAID 0 - Soft",
    value: "RAID0-SOFT",
  },
  {
    id: 1,
    title: "RAID 0 - Hardware",
    value: "RAID0-HARDWARE",
  },
  {
    id: 2,
    title: "RAID 1 - Soft",
    value: "RAID1-SOFT",
  },
  {
    id: 3,
    title: "RAID 1 - Hardware",
    value: "RAID1-HARDWARE",
  },
  {
    id: 4,
    title: "RAID 5 - Soft",
    value: "RAID5-SOFT",
  },
  {
    id: 5,
    title: "RAID 5 - Hardware",
    value: "RAID5-HARDWARE",
  },
  {
    id: 6,
    title: "RAID 6 - Soft",
    value: "RAID6-SOFT",
  },
  {
    id: 7,
    title: "RAID 6 - Hardware",
    value: "RAID6-HARDWARE",
  },
  {
    id: 8,
    title: "RAID 10 - Soft",
    value: "RAID10-SOFT",
  },
  {
    id: 9,
    title: "RAID 10 - Hardware",
    value: "RAID10-HARDWARE",
  },
  {
    id: 10,
    title: "NO RAID",
    value: "NO-RAID",
  },
];
