import { TextField } from "@mui/material";
import React from "react";

function CustomisedTextField({ label, name, value, onChange, sx, placeholder}) {
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      sx={{
        input: { color: "white" },
        label: { color: "white" },
        border: "white",
        "& label.Mui-focused": {
          color: "white",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "white",
        },
        "& .MuiInputLabel-root": {
          color: "white",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "white",
          },
          "&:hover fieldset": {
            borderColor: "white",
          },
          "&.Mui-focused fieldset": {
            borderColor: "white",
          },
        },
      }}
      fontColor={"white"}
    />
  );
}

export default CustomisedTextField;
