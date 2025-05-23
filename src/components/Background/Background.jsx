import React from "react";
import "./Background.css";

const Background = () => {
  return (
    <div className="animated-background">
      <div className="rays-container">
        {Array.from({ length: 32 }).map(() => {
          return <div className="ray"></div>;
        })}
      </div>
    </div>
  );
};

export default Background;
