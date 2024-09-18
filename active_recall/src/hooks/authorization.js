import { useContext } from "react";
import { UserContext } from "../contexts/user-context";

export const useAuthFetch = () => {
  const { userCreds } = useContext(UserContext);

  const authFetch = (url, options = {}) => {
    // Set default headers and include user credentials if available
    const headers = {
      ...options.headers,
      "Content-Type": "application/json",
      username: userCreds,
    };

    return fetch(url, {
      ...options,
      headers,
    });
  };

  return authFetch;
};
