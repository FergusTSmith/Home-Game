import { Box } from "@mui/material";
import React from "react";

const suiteSymbols = {
  s: "♠",
  h: "♥",
  c: "♣",
  d: "♦",
};

function MenuIcon({ symbol, iconColour }) {
  const colour = iconColour;
  return (
    <Box
      sx={{
        color: iconColour,

        fontSize: "8vw",
        transition: "color 0.5s ease",
        "@media (max-aspect-ratio: 1/1)": {
          fontSize: "10vw",
        },
        // display: 'flex',
        // textAlign: 'center'
      }}
    >
      {symbol}
    </Box>
  );
}

export default MenuIcon;
