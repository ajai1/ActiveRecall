import React, { useContext, useState } from "react";

import "../../styles/login.css";
import { ENDPOINTS, HEADERS } from "../../constants/apiConstants";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../contexts/app-context";

export const SignUp = () => {
  const navigate = useNavigate();

  const { addToast, setLoading } = useContext(AppContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
      createUser();
      console.log("Form Data Submitted:", formData);
    }
  };

  const createUser = async () => {
    setLoading(true);
    try {
      const url = ENDPOINTS.USERS.CREATE_USER.endpoint();
      const response = await fetch(url, {
        method: ENDPOINTS.USERS.CREATE_USER.method,
        headers: HEADERS,
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });
      const json = await response.json();
      addToast(
        `${formData.username} Registered`,
        "user successfully registed, please sign in to continue",
        "success"
      );
      setLoading(false);
      console.log("USER CREATED !!!");
      navigate("/signin");
    } catch (error) {
      setLoading(false);
      addToast(
        `Not Registered`,
        "Something went wrong, please refresh/relaunch app",
        "error"
      );
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>User Registration</h2>
        <div className="form-group">
          <label htmlFor="username">User name</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            autoComplete={"off"}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete={"off"}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            autoComplete={"off"}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-btn">
          Register
        </button>
      </form>
    </div>
  );
};
