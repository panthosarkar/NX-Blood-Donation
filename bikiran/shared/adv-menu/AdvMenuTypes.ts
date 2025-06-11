interface TSubLink {
  id: string;
  title: string;
  iconL: string;
  iconF: string;
  active?: boolean;
}
export type TLink = {
  id: string;
  miniTitle: string;
  title: string;
  location?: any;
  iconFill: string;
  iconLine: string;
  show?: boolean;
  subMenu: TSubLink[];
};
