import { useEffect, useState } from "react";
import "./LoginPopup.scss";
import { assets } from "../../assets/assets";
import Login from "./Login";
import { useStore } from "../../context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useStore();
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const onLogin = async (e) => {
    e.preventDefault();
    let newUrl = url;

    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={onLogin}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <>
              <input
                type="email"
                placeholder="Your email"
                value={data.email}
                name="email"
                onChange={onChangeHandler}
                required
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={data.password}
                onChange={onChangeHandler}
                required
              />
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Your name"
                value={data.name}
                name="name"
                onChange={onChangeHandler}
                required
              />
              <input
                type="email"
                placeholder="Your email"
                value={data.email}
                name="email"
                onChange={onChangeHandler}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={data.password}
                name="password"
                onChange={onChangeHandler}
                required
              />
            </>
          )}
        </div>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>I agree to the terms & privacy policy.</p>
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        {/* <Login setShowLogin={setShowLogin} /> */}
        <div className="login-popup-navigation">
          {currState === "Login" ? (
            <p>
              Create a new account?
              <span onClick={() => setCurrState("Sign Up")}>Click here</span>
            </p>
          ) : (
            <p>
              Already have an account?
              <span onClick={() => setCurrState("Login")}>Login here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPopup;
