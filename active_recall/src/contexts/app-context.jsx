import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [pageInfo, setPageInfo] = useState({
    header: "Active Recall",
    info: "",
  });

  return (
    <AppContext.Provider value={{ pageInfo, setPageInfo }}>
      {children}
    </AppContext.Provider>
  );
};
