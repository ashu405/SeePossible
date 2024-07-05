import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import service from "../services/service";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Import useHistory from react-router-dom

  const loginSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup
      .string()
      .min(5, "Password must be at least 5 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one digit")
      .required("Password is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginSchema.validate({ username, password });
      setError("");

      // Make API call to login endpoint
      var data = JSON.stringify({
        username: username,
        password: password,
      });
      var config = {
        method: "post",
        url: service.API_URL + "auth/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      service.setLogin(config).then(
        (response) => {
          if (response.data.status) {
            debugger
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userID", response.data.data[0].UserID);
            toast.success("Login successful");
            navigate("/");
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            toast.error("Invalid credentials");
          }
        },
        (error) => {}
      );
    } catch (err) {
      setError(err.errors[0]);
    }
  };

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="axil-signin-form-wrap">
          <div className="axil-signin-form">
            <h3 className="title">Sign in</h3>

            <form className="singin-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="form-group d-flex align-items-center justify-content-between">
                <button
                  type="submit"
                  className="axil-btn btn-bg-primary submit-btn"
                >
                  Sign In
                </button>
                <Link className="forgot-btn" to="/register">
                  Not a Member? Click Here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
