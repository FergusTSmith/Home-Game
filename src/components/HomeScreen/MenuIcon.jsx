import { Box } from "@mui/material";
import React from "react";

const suiteSymbols = {
  s: "♠",
  h: "♥",
  c: "♣",
  d: "♦",
};

function MenuIcon({symbol, iconColour}) {
    const colour = iconColour
  return (
    <Box
      sx={{
        color: iconColour,
        width: "20vw",
        height: "20vw",
        fontSize: "17vw",
        transition: "color 0.5s ease"
      }}
    >
      {symbol}
    </Box>
  );
}

export default MenuIcon;
