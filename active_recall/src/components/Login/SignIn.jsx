import React, { useContext, useState } from "react";
import { ENDPOINTS, HEADERS } from "../../constants/apiConstants";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user-context";

export const SignIn = () => {
  const navigate = useNavigate();
  const { userCreds, setUserCreds } = useContext(UserContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
    signInUser();
  };

  const signInUser = async () => {
    try {
      const url = ENDPOINTS.USERS.SIGNIN.endpoint();
      const response = await fetch(url, {
        method: ENDPOINTS.USERS.SIGNIN.method,
        headers: HEADERS,
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });
      const json = await response.text();
      console.log("json is ", json);
      if (json == "User signed in !!!") {
        setUserCreds(formData.username);
        setError("");
        navigate("/");
      } else {
        setError(json);
      }
    } catch (error) {
      setError("something went wrong");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>User Sign In</h2>
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
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-btn">
          Sign In
        </button>
      </form>
    </div>
  );
};
