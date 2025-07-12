import { createBrowserRouter } from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Login from "../pages/Login/Login";
import SignUp from "../pages/Signup/Signup";
import Home from "../pages/Home/Home";
import Products from "../pages/Product/Products";
import DashboardLayouts from "../layouts/DashboardLayouts";
import MyProfile from "../pages/DashboardPages/MyProfile/MyProfile";
import AddProduct from "../pages/DashboardPages/AddProduct/AddProduct";
import MyProducts from "../pages/DashboardPages/MyProducts/MyProducts";
import ReviewQueue from "../pages/DashboardPages/ReviewQueue/ReviewQueue";
import ReportedContents from "../pages/DashboardPages/ReportedContents/ReportedContents";
import Statistics from "../pages/DashboardPages/Statistics/Statistics";
import ManageUsers from "../pages/DashboardPages/ManageUsers/ManageUsers";
import ManageCoupons from "../pages/DashboardPages/ManageCoupons/ManageCoupons";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "home",
        Component: Home,
      },
      {
        path: "products",
        Component: Products,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "signup",
        Component: SignUp,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayouts,
    children: [
      {
        path: "myProfile",
        Component: MyProfile,
      },
      {
        path: "add-product",
        Component: AddProduct,
      },
      {
        path: "my-products",
        Component: MyProducts,
      },
      {
        path: "review-queue",
        Component: ReviewQueue,
      },
      {
        path: "reported-contents",
        Component: ReportedContents,
      },
      {
        path: "statistics",
        Component: Statistics,
      },
      {
        path: "manage-users",
        Component: ManageUsers,
      },
      {
        path: "manage-coupons",
        Component: ManageCoupons,
      },
    ],
  },
]);

export default router;
