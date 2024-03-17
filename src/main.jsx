import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx";
import StoreContextProvider from "./context/StoreContext.jsx";
import "./index.css";
import AuthContextProvider from "./context/AuthContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StoreContextProvider>
      <AuthContextProvider>
        <GoogleOAuthProvider
          clientId={import.meta.env.VITE_APP_GOOGLE_AUTH_CLIENT_ID}
        >
          <RouterProvider router={router} />
        </GoogleOAuthProvider>
      </AuthContextProvider>
    </StoreContextProvider>
  </React.StrictMode>
);
