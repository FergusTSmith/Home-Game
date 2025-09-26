import React, { useRef, useState } from "react";

function CustomButton({ text, size, onClick }) {
  const [ripples, setRipples] = useState([]);
  const buttonRef = useRef(null);

  const handleClick = (e) => {
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const sizePx = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - sizePx / 2;
    const y = e.clientY - rect.top - sizePx / 2;
    const newRipple = {
      key: Date.now(),
      style: {
        position: "absolute",
        borderRadius: "50%",
        pointerEvents: "none",
        width: sizePx,
        height: sizePx,
        left: x,
        top: y,
        background: "rgba(0,0,0,0.15)",
        transform: "scale(0)",
        animation: "ripple 0.6s linear",
      },
    };
    setRipples((old) => [...old, newRipple]);
    if (onClick) onClick(e);
  };

  React.useEffect(() => {
    if (ripples.length > 0) {
      const timeout = setTimeout(() => {
        setRipples((old) => old.slice(1));
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [ripples]);

  return (
    <button
      ref={buttonRef}
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "10px",
        background: "rgb(255, 255, 255)",
        color: "rgb(53, 53, 53)",
        border: "none",
        borderRadius: "5px",
        boxShadow: "0 2px 4px rgba(0,0,0,1)",
        fontFamily: "Orbiton",
        width: "100%",
        height: size === "sm" ? "50%" : "100%",
        fontWeight: "bold",
        fontSize: size === "sm" ? "0.6rem" : "1rem",
        transition: "background ease 0.2s, color 0.2s",
        cursor: "pointer",
        outline: "none",
      }}
      onClick={handleClick}
      className="custom-btn"
    >
      {text}
      {ripples.map((ripple) => (
        <span key={ripple.key} style={ripple.style} />
      ))}
      <style>
        {`
          @keyframes ripple {
            to {
              opacity: 0;
              transform: scale(2.5);
            }
          }
          .custom-btn:hover {
            background: rgb(85, 186, 240) !important;
            color: white !important;
          }
        `}
      </style>
    </button>
  );
}

export default CustomButton;
