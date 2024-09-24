import React, { createContext, useState } from "react";

// Create the UserContext
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userCreds, setUserCreds] = useState("YWphaTp6b29t");

  return (
    <UserContext.Provider value={{ userCreds, setUserCreds }}>
      {children}
    </UserContext.Provider>
  );
};
