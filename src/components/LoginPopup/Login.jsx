import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../context/AuthContext";
// import { jwtDecode } from "jwt-decode";

const Login = ({ setShowLogin }) => {
  const { setIsLoggedIn } = useAuth();
  console.log(import.meta.env.VITE_APP_GOOGLE_AUTH_CLIENT_ID);

  // const [user, setUser] = useState(null);

  const handleLoginSuccess = (credentialResponse) => {
    const token = credentialResponse?.credential;
    console.log("token: ", token);
    localStorage.setItem("accessToken", token);
    // const decoded = jwtDecode(token);
    // setUser(decoded);
    setShowLogin(false);
    setIsLoggedIn(true);
  };

  return (
    <GoogleLogin
      onSuccess={handleLoginSuccess}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};

export default Login;
