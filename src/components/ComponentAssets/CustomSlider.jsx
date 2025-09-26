import { Box } from "@mui/material";
import React from "react";

function CustomSlider({ playerChips, betSize, setBetSize }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
        gap: 2,
        mb: 2,
        height: "40px",
      }}
    >
      <Box sx={{ flex: 8, display: "flex", alignItems: "center" }}>
        <input
          type="range"
          min="1"
          max={playerChips}
          value={betSize}
          onChange={(e) => setBetSize(Number(e.target.value))}
          style={{
            width: "100%",
            accentColor: "white",
            background: "white",
            height: "4px",
            borderRadius: "2px",
            outline: "none",
            verticalAlign: "middle",
            margin: 0,
            padding: 0,
            display: "block",
            // Add transition for Webkit browsers (Chrome, Safari, Edge)
            transition: "background 0.3s, accent-color 0.3s",
          }}
        />
      </Box>
      <Box sx={{ color: "white", width: "32px", flex: 1, textAlign: "center" }}>
        {betSize}
      </Box>
      <style>
        {`
          input[type="range"]::-webkit-slider-thumb {
            background: white;
            border: 2px solid #ccc;
            transition: left 0.3s cubic-bezier(0.4,0,0.2,1), background 0.3s;
          }
          input[type="range"]::-moz-range-thumb {
            background: white;
            border: 2px solid #ccc;
            transition: background 0.3s;
          }
          input[type="range"]::-ms-thumb {
            background: white;
            border: 2px solid #ccc;
            transition: background 0.3s;
          }
          input[type="range"] {
            transition: background 0.3s;
          }
        `}
      </style>
    </Box>
  );
}

export default CustomSlider;
