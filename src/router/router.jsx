import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Cart from "../pages/Cart/Cart";
import PlaceOrder from "../pages/PlaceOrder/PlaceOrder";
import LoginPopup from "../components/LoginPopup/LoginPopup";
import NotFound from "../components/NotFound/NotFound.jsx";
import Verify from "../pages/Verify/Verify.jsx";
import MyOrders from "../pages/MyOrders/MyOrders.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/cart", element: <Cart /> },
      { path: "/order", element: <PlaceOrder /> },
      { path: "/login", element: <LoginPopup /> },
      { path: "/verify", element: <Verify /> },
      { path: "/myorders", element: <MyOrders /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
