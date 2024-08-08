// import { About } from "../pages/About";
// import { Account } from "../pages/Account";
// import { Home } from "../pages/Home";
// import { Login } from "../pages/Login";
// import { Private } from "../pages/Private";
import { Access } from "../pages/Access";
import { UserManagement } from "../pages/User-Management";
import { Signoz } from "../pages/Signoz";

export const nav = [
  {
    path: "/",
    name: "Access",
    element: <Access />,
    isMenu: true,
    isPrivate: false,
  },
  {
    path: "/signoz",
    name: "Signoz",
    element: <Signoz />,
    isMenu: true,
    isPrivate: false,
  },
  {
    path: "/user-management",
    name: "User Management",
    element: <UserManagement />,
    isMenu: true,
    isPrivate: true,
  },
];
