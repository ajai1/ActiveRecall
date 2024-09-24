import React, { createContext, useState } from "react";
import { debounce } from "../utils/Utilities";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [pageInfo, setPageInfo] = useState({
    header: "Active Recall",
    info: "",
  });

  const [toasts, setToasts] = useState();
  const [isLoading, setLoading] = useState(false);
  const [lastToast, setLastToast] = useState({
    header: null,
    info: null,
    time: null,
  });

  const addToast = debounce((header, info, type) => {
    const currentTime = Date.now();
    const debounceDelay = 150;

    if (
      lastToast.header == header &&
      lastToast.time &&
      currentTime - lastToast.time < debounceDelay
    ) {
      return;
    }

    const newToast = {
      id: Date.now,
      header,
      info,
      type,
      time: Date.now,
    };
    setToasts(newToast);
    setLastToast(newToast);
  }, 150);

  const removeToast = (id) => {
    setToasts(null);
  };

  return (
    <AppContext.Provider
      value={{
        pageInfo,
        setPageInfo,
        toasts,
        addToast,
        removeToast,
        isLoading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
