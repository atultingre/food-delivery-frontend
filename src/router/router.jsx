import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Cart from "../pages/Cart/Cart";
import PlaceOrder from "../pages/PlaceOrder/PlaceOrder";
import LoginPopup from "../components/LoginPopup/LoginPopup";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/cart", element: <Cart /> },
      { path: "/order", element: <PlaceOrder /> },
      { path: "/login", element: <LoginPopup /> },
    ],
  },
]);

export default router;
