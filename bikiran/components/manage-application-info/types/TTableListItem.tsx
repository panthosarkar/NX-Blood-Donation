export type TTableListItem = {
  id: number;
  title: string;
  fullPermalink: string;
  priority: number;
  status: string;
  appKey: string;
  parentId: number;
  permalink: string;
  isPublic: boolean;
  isContent: boolean;
  children: TTableListItem[];
};

export interface ITableContentBtn {
  item: TTableListItem;
  isMenuReorder?: boolean;
  subMenuitemArr?: TTableListItem[];
  isSubMenu?: boolean;
}
