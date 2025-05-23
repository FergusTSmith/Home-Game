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
        // display: 'flex',
        // textAlign: 'center'
      }}
    >
      {symbol}
    </Box>
  );
}

export default MenuIcon;
