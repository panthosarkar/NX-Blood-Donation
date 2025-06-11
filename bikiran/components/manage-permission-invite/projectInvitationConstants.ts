import { TProjectInvGuideline } from "./projectInvitationTypes";

export const rolesMap = [
  {
    id: 1,
    title: "Developer",
    value: "developer",
  },
  {
    id: 2,
    title: "Tester",
    value: "tester",
  },
  {
    id: 3,
    title: "Admin",
    value: "admin",
  },
  {
    id: 4,
    title: "Manager",
    value: "manager",
  },
  {
    id: 5,
    title: "Viewer",
    value: "viewer",
  },
];

export const guidelines: TProjectInvGuideline[] = [
  {
    id: 1,
    title: "Select Asset",
    description: [
      "Choose the asset you’d like to grant permission for. This can be a domain, hosting package, or any other asset under the project.",
      "If multiple packages are available, select either one specific package or choose All Packages if you want to grant access to all.",
    ],
  },
  {
    id: 2,
    title: "Choose Role",
    description: [
      "Next, assign the role for the selected asset. The available roles are:",
      "Admin: Full control, including modifying settings and managing all users.",
      "Developer: Access to technical features and development resources.",
      "Manager: Manages project resources and coordinates tasks.",
      "Tester: Access for testing purposes, limited to necessary features.",
      "Viewer: Read-only access to the asset without modification rights.",
    ],
  },
  {
    id: 3,
    title: "Enter Email Addresses",
    description: [
      "Input the email address of the user you wish to invite.",
      "You can invite multiple users at once by separating their email addresses with a comma. Each user will receive the same role for the selected asset.",
    ],
  },
  {
    id: 4,
    title: "Send Invitation",
    description: [
      "Once you’ve selected the asset, chosen the role, and added the email(s), click the Send Invitation button.",
      "The invitation will be sent to the provided email address(es) for access to the project with the assigned role.",
    ],
  },
];
