import { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(import.meta.env.VITE_APP_GOOGLE_AUTH_CLIENT_ID)

  // const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      // const decoded = jwtDecode(token);
      // setUser(decoded);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = (credentialResponse) => {
    const token = credentialResponse?.credential;
    console.log("token: ", token);
    localStorage.setItem("accessToken", token);
    // const decoded = jwtDecode(token);
    // setUser(decoded);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    // setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      )}
    </div>
  );
};

export default Login;
