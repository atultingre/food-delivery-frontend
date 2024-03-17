import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { useAuth } from "./context/AuthContext";
import LoginPopup from "./components/LoginPopup/LoginPopup";

const App = () => {
  const { showLogin, setShowLogin } = useAuth();
  console.log("showLogin: ", showLogin);
  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : ""}
      <Navbar setShowLogin={setShowLogin} />
      <div className="app">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default App;
