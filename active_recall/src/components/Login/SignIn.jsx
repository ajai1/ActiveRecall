import React, { useContext, useEffect, useState } from "react";
import { encode } from "base-64";
import { ENDPOINTS, HEADERS } from "../../constants/apiConstants";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user-context";
import { AppContext } from "../../contexts/app-context";

export const SignIn = () => {
  const navigate = useNavigate();
  const { userCreds, setUserCreds } = useContext(UserContext);

  const { addToast, setLoading } = useContext(AppContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (userCreds != null) {
      navigate("/");
    }
  }, [userCreds]);

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
    setLoading(true);
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
      console.log("json is ", json, response.status);
      setLoading(false);
      if (response.status == 401) {
        setError("User ID and Password are not matching");
      } else {
        if (
          json == "User successfully signed in !!!" ||
          response.status == 202
        ) {
          setUserCreds(encode(`${formData.username}:${formData.password}`));
          setError("");
          addToast(
            `${formData.username} all set`,
            "user successfully signed in",
            "success"
          );
          navigate("/");
        } else {
          setError(json);
        }
      }
    } catch (error) {
      setLoading(false);
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
