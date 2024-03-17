import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx";
import StoreContextProvider from "./context/StoreContext.jsx";
import "./index.css";
import AuthContextProvider from "./context/AuthContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <StoreContextProvider>
        <AuthContextProvider>
          <GoogleOAuthProvider
            clientId={import.meta.env.VITE_APP_GOOGLE_AUTH_CLIENT_ID}
          >
            <RouterProvider router={router} />
          </GoogleOAuthProvider>
        </AuthContextProvider>
      </StoreContextProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
