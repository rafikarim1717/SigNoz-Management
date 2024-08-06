// import { About } from "../pages/About";
// import { Account } from "../pages/Account";
// import { Home } from "../pages/Home";
// import { Login } from "../pages/Login";
// import { Private } from "../pages/Private";
import { Access } from "../pages/Access";
import { UserManagement } from "../pages/User-Management";

export const nav = [
  {
    path: "/",
    name: "Access",
    element: <Access />,
    isMenu: true,
    isPrivate: false,
  },
  //   {
  //     path: "/access",
  //     name: "Access",
  //     element: <Access />,
  //     isMenu: true,
  //     isPrivate: true,
  //   },
  {
    path: "/user-management",
    name: "User Management",
    element: <UserManagement />,
    isMenu: true,
    isPrivate: true,
  },
  //   {
  //     path: "/about",
  //     name: "About",
  //     element: <About />,
  //     isMenu: true,
  //     isPrivate: false,
  //   },
  //   {
  //     path: "/login",
  //     name: "Login",
  //     element: <Login />,
  //     isMenu: false,
  //     isPrivate: false,
  //   },
  //   {
  //     path: "/private",
  //     name: "Private",
  //     element: <Private />,
  //     isMenu: true,
  //     isPrivate: true,
  //   },
  //   {
  //     path: "/account",
  //     name: "Account",
  //     element: <Account />,
  //     isMenu: true,
  //     isPrivate: true,
  //   },
];
