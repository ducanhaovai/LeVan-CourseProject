import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import ManagerCourse from "layouts/course";
import CourseListing from "layouts/CourseStudent";
import CoursePageDetail from "layouts/CourseDetail/CoursePageDetail";
import CourseCheckout from "layouts/checkout/CourseCheckout";
import CourseContent from "layouts/courseContents";
import Chat from "layouts/Chat";
import Student from "layouts/student";

import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/CreditCard";
import { Book } from "lucide-react";
import ProtectedRoute from "./hook/ProtectedRoute";

const routes = [
  // {
  //   type: "collapse",
  //   name: "Dashboard",
  //   key: "dashboard",
  //   route: "/dashboard",
  //   icon: <Shop size="12px" />,
  //   element: <ProtectedRoute element={<Dashboard />} role={1} />,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "Home",
    key: "home",
    route: "/home",
    icon: <Cube size="12px" />,
    component: <Student />,
    element: <Student />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    route: "/tables",
    icon: <Office size="12px" />,
    component: <Tables />,
    element: <ProtectedRoute element={<Tables />} role={1} />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    route: "/billing",
    icon: <CreditCard size="12px" />,
    component: <Billing />,
    element: <ProtectedRoute element={<Billing />} role={1} />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Manager Course",
    key: "mcourse",
    route: "/mcourse",
    icon: <Book size="12px" />,
    component: <ManagerCourse />,
    element: <ManagerCourse />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Course",
    key: "course",
    route: "/course",
    icon: <Book size="12px" />,
    component: <CourseListing />,
    element: <CourseListing />,
    noCollapse: true,
  },
  { type: "title", title: "Account Pages", key: "account-pages" },

  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    element: <ProtectedRoute element={<Profile />} role={1} />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: <SignIn />,
    element: <SignIn />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <SpaceShip size="12px" />,
    component: <SignUp />,
    element: <SignUp />,
    noCollapse: true,
  },
  {
    name: "Course Detail",
    key: "coursedetail",
    route: "/courses/:slug",
    icon: <SpaceShip size="12px" />,
    component: <CoursePageDetail />,
    element: <CoursePageDetail />,
    noCollapse: true,
  },
  {
    name: "Course Checkout",
    key: "coursecheckout",
    route: "/checkout/:slug",
    icon: <SpaceShip size="12px" />,
    component: <CourseCheckout />,
    element: <CourseCheckout />,
    noCollapse: true,
  },
  {
    name: "Course Checkoutt",
    key: "coursecheckoutt",
    route: "/checkout",
    icon: <SpaceShip size="12px" />,
    component: <CourseCheckout />,
    element: <CourseCheckout />,
    noCollapse: true,
  },
  {
    name: "Course contents",
    key: "coursecontent",
    route: "/learn/:slug",
    icon: <SpaceShip size="12px" />,
    component: <CourseContent />,
    element: <CourseContent />,
    noCollapse: true,
  },
  {
    name: "ChatUser",
    key: "ChatUser",
    route: "/chat/:roomId",
    icon: <SpaceShip size="12px" />,
    component: <Chat />,
    element: <Chat />,
    noCollapse: true,
  },
];

export default routes;
