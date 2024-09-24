import React, { useContext, useEffect, useState } from "react";
import "../styles/toast.css";
import DeleteIcon from "../static/icons/delete.png";
import { AppContext } from "../contexts/app-context";

export const Toast = () => {
  const {
    toasts: { type, header, info, id },
    removeToast,
  } = useContext(AppContext);
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [id, removeToast]);

  const getToastStyles = (type) => {
    if (type == "success") {
      return "toast_success";
    }
    if (type == "warn") {
      return "toast_warn";
    }
    if (type == "error") {
      return "toast_error";
    }
  };

  return (
    <div>
      <div key={id} className="toast_container">
        <div className="toast_text_container">
          <p className={`toast_header ${getToastStyles(type)}`}>{header}</p>
          <p className="toast_info">{info}</p>
        </div>
        <div className="toast_remove" onClick={() => removeToast(id)}>
          <img src={DeleteIcon} width={"25rem"} />
        </div>
      </div>
    </div>
  );
};
