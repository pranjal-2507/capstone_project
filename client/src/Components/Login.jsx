import React, { useState, useEffect } from "react";
import "../Styles/Login.css";
import logo from "../images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [userInput, setUserInput] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userInput.trim() === "") {
      toast.error("Username is required");
      return;
    }
    if (password.trim() === "") {
      toast.error("Password is required");
      return;
    }

    const loginData = {
      name: userInput,
      password: password,
    };
    axios
      .post("http://localhost:3000/login", loginData)
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", loginData.name);
          localStorage.setItem("id", res.data.id);
          localStorage.setItem("profile", res.data.profile);
          toast.success("Login successful");
          setIsLoggedIn(true);
          setTimeout(() => {
            navigate("/");
          }, 1500);
        } else {
          toast.error("User not found. Please create an account.");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("An error occurred. Please try again.");
      });
  };

  return (
    <>
      <div className="login-header">
        <NavLink to={"/"}>
          <img className="login-logo" src={logo} alt="Logo" />
        </NavLink>
      </div>
      {!isLoggedIn && (
        <form className="login-container" onSubmit={handleSubmit}>
          <h2 className="login-title">Login</h2>
          <div className="login-form-group">
            <label className="login-label">Username:</label>
            <input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="login-input"
              type="text"
              placeholder="Enter your username"
            />
          </div>
          <div className="login-form-group">
            <label className="login-label">Password:</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <button className="login-button">Login</button>
          <p className="login-register-link">
            Don't have an account? {" "}
            <NavLink to="/signup" className="login-nav-signup">
              Register
            </NavLink>
          </p>
        </form>
      )}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default Login;
