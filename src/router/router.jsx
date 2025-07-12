import { createBrowserRouter } from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Login from "../pages/Login/Login";
import SignUp from "../pages/Signup/Signup";
import Home from "../pages/Home/Home";
import Products from "../pages/Product/Products";

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
  
]);

export default router;
