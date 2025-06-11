export interface MenuItem {
  id: number;
  label: string;
  path: string;
}

export const menuList: MenuItem[] = [
  { id: 1, label: "Home", path: "/" },
  { id: 2, label: "Find Donor", path: "/find-donor" },
  { id: 3, label: "Blood Request", path: "/blood-request" },
  { id: 4, label: "About", path: "/about" },
  { id: 5, label: "Contact", path: "/contact" },
  // { id: 6, label: " Gallery", path: "/gallery" },
  // { id: 7, label: " Files", path: "/files" },
];
