export type TSubMenu = {
  id: string;
  title: string;
  details: string;
  path: string;
  icon: string;
};

export type THeaderNavMenu = {
  id: string;
  title: string;
  path: string;
  icon: string;
  subMenu?: TSubMenu[];
};
