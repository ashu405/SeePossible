import React, { useState } from "react";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    state: "",
    city: "",
    country: "", // Default to empty
  });
  const [errors, setErrors] = useState({});
  const [selectedCountry, setSelectedCountry] = useState("India"); // Default selected country

  // Define state and city options based on selected country and state
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  // Mock data for states and cities based on country
  const countryData = [
    {
      name: "India",
      states: ["Maharashtra", "Delhi", "Karnataka"],
      cities: {
        Maharashtra: ["Mumbai", "Pune", "Nagpur"],
        Delhi: ["New Delhi", "Noida", "Gurgaon"],
        Karnataka: ["Bangalore", "Mysore", "Hubli"],
      },
    },
    // Add data for other countries as needed
  ];

  const handleChangeCountry = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    const selectedCountryData = countryData.find((c) => c.name === country);
    setStateOptions(selectedCountryData ? selectedCountryData.states : []);
    setCityOptions([]); // Reset city options when country changes
    setFormData({
      ...formData,
      country: country,
      state: "",
      city: "",
    });
    setErrors({ ...errors, country: "" }); // Clear country error
  };

  const handleChangeState = (e) => {
    const state = e.target.value;
    const selectedCountryData = countryData.find(
      (c) => c.name === selectedCountry
    );
    const cities = selectedCountryData
      ? selectedCountryData.cities[state] || []
      : [];
    setCityOptions(cities); // Set city options based on selected state
    setFormData({
      ...formData,
      state: state,
      city: "",
    });
    setErrors({ ...errors, state: "" }); // Clear state error
  };

  // Define the validation schema
  const registrationSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    gender: yup.string().required("Gender is required"),
    state: yup.string().required("State is required"),
    city: yup.string().required("City is required"),
    country: yup.string().required("Country is required"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error message for the current field when changed
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registrationSchema.validate(formData, { abortEarly: false });
      // Handle successful registration
      console.log("Registration successful");
      setErrors({});
    } catch (err) {
      const fieldErrors = {};
      err.inner.forEach((e) => {
        fieldErrors[e.path] = e.message;
      });
      setErrors(fieldErrors);
    }
  };

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="">
          <div className="">
            <h3 className="title" style={{ marginTop: "20px" }}>
              Register
            </h3>
            <form className="singin-form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    {errors.firstName && (
                      <div className="text-danger">{errors.firstName}</div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                    {errors.lastName && (
                      <div className="text-danger">{errors.lastName}</div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <div className="text-danger">{errors.email}</div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Gender</label>
                    <select
                      className="form-control"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && (
                      <div className="text-danger">{errors.gender}</div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Country</label>
                    <select
                      className="form-control"
                      name="country"
                      value={formData.country}
                      onChange={handleChangeCountry}
                    >
                      <option value="">Select Country</option>
                      {countryData.map((country) => (
                        <option key={country.name} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                    {errors.country && (
                      <div className="text-danger">{errors.country}</div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>State</label>
                    <select
                      className="form-control"
                      name="state"
                      value={formData.state}
                      onChange={handleChangeState}
                    >
                      <option value="">Select State</option>
                      {stateOptions.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    {errors.state && (
                      <div className="text-danger">{errors.state}</div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>City</label>
                    <select
                      className="form-control"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    >
                      <option value="">Select City</option>
                      {cityOptions.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    {errors.city && (
                      <div className="text-danger">{errors.city}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="form-group align-items-center justify-content-between">
                <button
                  type="submit"
                  className="axil-btn btn-bg-primary submit-btn"
                  style={{ marginBottom: "20px" }}
                >
                  Register
                </button>
                <Link className="forgot-btn" to="/login">
                  Already a Member? Sign In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
