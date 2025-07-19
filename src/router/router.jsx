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
import ProductDetails from "../pages/DashboardPages/ProductDetails/ProductDetails";
import ProductUpdate from "../pages/DashboardPages/ProductUpdate/ProductUpdate";
import ErrorPages from "../pages/ErrorPages/ErrorPages";
import CouponUpdate from "../Components/CouponUpdate";
import PrivetRoutes from "../pages/PrivetRoutes/PrivetRoutes";

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
        path: "product-details/:id",
        element: (
          <PrivetRoutes>
            <ProductDetails></ProductDetails>
          </PrivetRoutes>
        ),
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "signup",
        Component: SignUp,
      },
      {
        path: "*",
        Component: ErrorPages,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivetRoutes>
        <DashboardLayouts></DashboardLayouts>
      </PrivetRoutes>
    ),
    children: [
      {
        path: "myProfile",
        element: (
          <PrivetRoutes>
            <MyProfile></MyProfile>
          </PrivetRoutes>
        ),
      },
      {
        path: "add-product",
        element: (
          <PrivetRoutes>
            <AddProduct></AddProduct>
          </PrivetRoutes>
        ),
      },
      {
        path: "my-products",
        element: (
          <PrivetRoutes>
            <MyProducts></MyProducts>
          </PrivetRoutes>
        ),
      },
      {
        path: "product-details/:id",
        element: (
          <PrivetRoutes>
            <ProductDetails></ProductDetails>
          </PrivetRoutes>
        ),
      },
      {
        path: "product-update/:id",
        element: (
          <PrivetRoutes>
            <ProductUpdate></ProductUpdate>
          </PrivetRoutes>
        ),
      },
      {
        path: "review-queue",
        element: (
          <PrivetRoutes>
            <ReviewQueue></ReviewQueue>
          </PrivetRoutes>
        ),
      },
      {
        path: "reported-contents",
        element: (
          <PrivetRoutes>
            <ReportedContents></ReportedContents>
          </PrivetRoutes>
        ),
      },
      {
        path: "statistics",
        element: (
          <PrivetRoutes>
            <Statistics></Statistics>
          </PrivetRoutes>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivetRoutes>
            <ManageUsers></ManageUsers>
          </PrivetRoutes>
        ),
      },
      {
        path: "manage-coupons",
        Component: ManageCoupons,
        element: (
          <PrivetRoutes>
            <ManageCoupons></ManageCoupons>
          </PrivetRoutes>
        ),
      },
      {
        path: "manage-coupons/coupon-update/:id",
        Component: CouponUpdate,
        element: (
          <PrivetRoutes>
            <CouponUpdate></CouponUpdate>
          </PrivetRoutes>
        ),
      },
      {
        path: "*",
        Component: ErrorPages,
      },
    ],
  },
  {
    path: "*",
    Component: ErrorPages,
  },
]);

export default router;
