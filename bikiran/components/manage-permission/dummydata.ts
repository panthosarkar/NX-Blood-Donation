export type TProjectPermissionItem = {
  id: number;
  email: string;
  role: string;
  asset: string;
  assetId: number;
  inviteEmail: string;
  status: string;
  perms: string[];
  scopes: string[];
  user: TProjectPermissionUser;
  expiredDate?: number;
  createDate?: number;
};

export type TProjectPermissionUser = {
  id: number;
  displayName: string;
  email: string;
  phone: string;
  photoUrl: string;
};
export type TPermissionChangeStatusPayload = {
  status: string;
  note: string;
};
export const dummyData: TProjectPermissionItem[] = [
  {
    id: 1,
    email: "user1@example.com",
    role: "admin",
    asset: "project",
    assetId: 101,
    inviteEmail: "invite1@example.com",
    status: "active",
    perms: ["read", "write", "delete"],
    scopes: ["owner", "project:write"],
    user: {
      id: 1,
      displayName: "User One",
      email: "user1@example.com",
      phone: "123-456-7890",
      photoUrl: "",
    },
    expiredDate: 1672531199000,
    createDate: 1630995199000,
  },
  {
    id: 2,
    email: "user2@example.com",
    role: "editor",
    asset: "project",
    assetId: 102,
    inviteEmail: "invite2@example.com",
    status: "pending",
    perms: ["read", "write"],
    scopes: ["project:read"],
    user: {
      id: 2,
      displayName: "User Two",
      email: "user2@example.com",
      phone: "987-654-3210",
      photoUrl: "",
    },
    expiredDate: 1672531199000,
    createDate: 1630995199000,
  },
  {
    id: 3,
    email: "pantho.sarkar.7@gmail.com",
    role: "owner",
    asset: "PROJECT",
    assetId: 11,
    inviteEmail: "",
    status: "active",
    perms: [],
    scopes: ["owner"],
    user: {
      id: 10000003,
      displayName: "Pantho Sarkar",
      email: "pantho.sarkar.7@gmail.com",
      phone: "",
      photoUrl:
        "https://lh3.googleusercontent.com/a/ACg8ocIBjZgodFmdAvtZquHHrnDPhyvkx9uk2iyebOSGUrvZUI_D9Rui=s96-c",
    },
  },
  {
    id: 4,
    email: "",
    role: "tester",
    asset: "DOMAIN",
    assetId: -1,
    inviteEmail: "anindoroy112@gmail.com",
    status: "pending",
    perms: [
      "domain.contact",
      "domain.contact.view",
      "domain.nameserver",
      "domain.nameserver.view",
      "domain.cns",
      "domain.cns.view",
      "domain.overview",
    ],
    user: {
      id: 0,
      displayName: "",
      email: "",
      phone: "",
      photoUrl: "",
    },
    scopes: ["resend", "revoke"],
  },
];
