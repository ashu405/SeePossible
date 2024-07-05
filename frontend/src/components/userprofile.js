import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import service from "../services/service";

const UserProfile = () => {
  const [token, setToken] = useState("");
  const [userID, setUserID] = useState("");
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userProfileLoaded, setUserProfileLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userID = localStorage.getItem("userID");
    if (token && userID) {
      setToken(token);
      setUserID(userID);
      fetchUserProfile(token, userID);
    }
  }, []);
  const fetchUserProfile = async (token, userID) => {
    try {
      debugger;
      setLoading(true);
      service
        .getUser(token, localStorage.getItem("userID"))
        .then((response) => {
          if (response.data.status) {
            setFullName(response.data.data[0].FullName);
            setUserName(response.data.data[0].UserName);
          } else {
            console.error("Failed to fetch products:", response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      // Handle error as per your application's requirements
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required("New Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 5 characters long."
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { newPassword } = values;
      try {
        debugger
        const token = localStorage.getItem("token");
        const userID = localStorage.getItem("userID");
        if (token && userID) {
          service
            .updatePassword(
              token,
              localStorage.getItem("userID"),
              fullName,
              userName,
              newPassword
            )
            .then((response) => {
              if (response.data.status) {
                toast.success("Profile Updated Successfully");
                navigate("/");
                setTimeout(() => {
                  window.location.reload();
                }, 2000);
              } else {
                console.error(
                  "Failed to add product to cart:",
                  response.data.message
                );
              }
            })
            .catch((error) => {
              console.error("Error adding product to cart:", error);
            });
        }
      } catch (error) {
        console.error("Error updating profile:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    navigate("/");
    toast.success("Logout Successfully");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <main className="main-wrapper">
      <div className="axil-dashboard-area axil-section-gap">
        <div className="container">
          <div className="axil-dashboard-warp">
            <div className="row">
              <div className="col-xl-3 col-md-4">
                <aside className="axil-dashboard-aside">
                  <nav className="axil-dashboard-nav">
                    <div className="nav nav-tabs" role="tablist">
                      <a
                        className="nav-item nav-link active"
                        data-bs-toggle="tab"
                        href="#nav-account"
                        role="tab"
                        aria-selected="false"
                      >
                        <i className="fas fa-user" />
                        Account Details
                      </a>
                      <a
                        className="nav-item nav-link"
                        href="#"
                        onClick={handleLogout}
                      >
                        <i className="fal fa-sign-out" />
                        Logout
                      </a>
                    </div>
                  </nav>
                </aside>
              </div>
              <div className="col-xl-9 col-md-8">
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="nav-account"
                    role="tabpanel"
                  >
                    <div className="col-lg-9">
                      <div className="axil-dashboard-account">
                        <form
                          className="account-details-form"
                          onSubmit={formik.handleSubmit}
                        >
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label>Full Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={fullName}
                                  onChange={(e) => setFullName(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label>User Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={userName}
                                  onChange={(e) => setUserName(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-12">
                              <h5 className="title">Password Change</h5>
                              <div className="form-group">
                                <label>New Password</label>
                                <input
                                  type="password"
                                  className="form-control"
                                  {...formik.getFieldProps("newPassword")}
                                />
                                {formik.touched.newPassword &&
                                formik.errors.newPassword ? (
                                  <div className="text-danger">
                                    {formik.errors.newPassword}
                                  </div>
                                ) : null}
                              </div>
                              <div className="form-group">
                                <label>Confirm New Password</label>
                                <input
                                  type="password"
                                  className="form-control"
                                  {...formik.getFieldProps("confirmPassword")}
                                />
                                {formik.touched.confirmPassword &&
                                formik.errors.confirmPassword ? (
                                  <div className="text-danger">
                                    {formik.errors.confirmPassword}
                                  </div>
                                ) : null}
                              </div>
                              <div className="form-group mb--0">
                                <input
                                  type="submit"
                                  className="axil-btn"
                                  value="Save Changes"
                                  disabled={loading}
                                />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default UserProfile;
