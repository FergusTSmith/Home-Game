import React from "react";

function ChatBoxTextEntry({
  label,
  name,
  value,
  onChange,
  sx,
  placeholder,
  sendMessage,
  size,
}) {
  return (
    <div style={{}}>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        style={{
          width: "100%",
          padding: "0.7em 1em",
          paddingLeft: "2em",
          paddingBottom: "1em",
          border: "none",
          backgroundColor: "rgba(30, 32, 36, 0)",
          color: "#fff",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",

          fontSize: "0.5em",
          fontFamily: "Orbiton, sans-serif",
          outline: "none",
          boxSizing: "border-box",
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (sendMessage) {
              sendMessage();
            }
          }
        }}
        // onFocus={(e) =>
        //   (e.target.style.borderColor = "rgba(29, 156, 185, 0.8)")
        // }
        // onBlur={(e) => (e.target.style.borderColor = "rgba(29, 156, 185, 0.8)")}
      />
    </div>
  );
}

export default ChatBoxTextEntry;
