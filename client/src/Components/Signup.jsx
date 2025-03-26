import React, { useState } from "react";
import logo from "../images/logo.png";
import "../Styles/Signup.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const clientID =
  "311238508492-i7o334gljj6h57ped9mdie180691do8e.apps.googleusercontent.com";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userNameRegex = /^[A-Za-z ]+$/;
    const emailRegex = /^[a-z][a-z0-9]*@gmail\.com$/;

    if (!userNameRegex.test(username)) {
      toast.error("Username can only contain alphabets");
    } else if (!emailRegex.test(email)) {
      toast.error("Enter a valid Gmail address");
    } else if (password !== confirmPass) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name: username,
        email: email,
        password: password,
      };

      axios
        .post("http://localhost:3000/register", userData)
        .then((res) => {
          toast.success(res.data);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          toast.error("An error occurred. Please try again.");
        });
    }
  };

  const onSuccess = (res) => {
    toast.success("Google Signup Successful!");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const onFailure = (res) => {
    toast.error("Google Signup Failed. Please try again.");
  };

  return (
    <>
      <div className="signup-header">
        <NavLink to={"/"}>
          <img className="signup-logo" src={logo} alt="Logo" />
        </NavLink>
      </div>

      <form className="signup-container" onSubmit={handleSubmit}>
        <h2 className="signup-title">Create an Account</h2>

        <div className="signup-input-group">
          <label className="signup-label">Username</label>
          <input
            required
            className="signup-input"
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="signup-input-group">
          <label className="signup-label">Email</label>
          <input
            required
            className="signup-input"
            type="email"
            placeholder="Enter valid Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="signup-input-group">
          <label className="signup-label">Password</label>
          <input
            required
            className="signup-input"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="signup-input-group">
          <label className="signup-label">Confirm Password</label>
          <input
            required
            className="signup-input"
            type="password"
            placeholder="Confirm password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
        </div>

        <button className="signup-button">Sign Up</button>

        <p className="signup-login-text">
          Already have an account?{" "}
          <NavLink to="/login" className="signup-login-link">
            Login
          </NavLink>
        </p>

        <div className="google-signup-container">
          <GoogleOAuthProvider clientId={clientID}>
            <GoogleLogin onSuccess={onSuccess} text="signup_with" />
          </GoogleOAuthProvider>
        </div>
      </form>

      <ToastContainer position="top-center" autoClose={1500} />
    </>
  );
}

export default Signup;
