import React from "react";

function CustomisedTextField({
  label,
  name,
  value,
  onChange,
  sx,
  placeholder,
  size
}) {
  return (
    <div style={{ width: "50%", marginBottom: "1.5em" }}>
      {label && (
        <label
          htmlFor={name}
          style={{
            display: "block",
            marginBottom: "0.5em",
            color: "#e0e0e0",
            fontFamily: "Orbiton, sans-serif",
            fontWeight: 600,
            letterSpacing: "0.03em",
            fontSize: "0.5em",
          }}
        >
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        style={{
          width: "80%",
          padding: "0.7em 1em",
          border: "1.5px solid #b3b4b5",
          borderRadius: "7px",
          backgroundColor: "rgba(30, 32, 36, 0.95)",
          color: "#fff",
          fontSize: "1em",
          fontFamily: "Orbiton, sans-serif",
          outline: "none",
          transition: "border-color 0.2s, box-shadow 0.2s",
          boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        }}
        onFocus={(e) =>
          (e.target.style.borderColor = "rgba(29, 156, 185, 0.8)")
        }
        onBlur={(e) => (e.target.style.borderColor = "rgba(29, 156, 185, 0.8)")}
      />
    </div>
  );
}

export default CustomisedTextField;
