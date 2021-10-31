import React from "react";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  let error = message.split(" ").find(a => a.toLowerCase() === "error")

  return <div className={`${error ? "error" : "success"}`}>{message}</div>;
};

export default Notification;
