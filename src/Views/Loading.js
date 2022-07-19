import React from "react";
import "../App.css";

const Loading = () => {
  return (
    <>
      <h3 className="loading">Loading...</h3>
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
    </>
  );
};

export default Loading;
