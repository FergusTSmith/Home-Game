import React from "react";
import { Box, Typography } from "@mui/material";
import Chip from "./Chip";

// Example chip colors by denomination
const CHIP_COLORS = {
  1: { background: "#E0E0E0", shadow: "#B0B0B0" },
  5: { background: "#F44336", shadow: "#760505" },
  25: { background: "#4CAF50", shadow: "#1B5E20" },
  100: { background: "#212121", shadow: "#000000" },
  500: { background: "#9C27B0", shadow: "#4A148C" },
  1000: { background: "pink", shadow: "#C51162" },
  5000: { background: "#9E9E9E", shadow: "#444444" },
  20000: { background: "blue", shadow: "#00008B" },
  50000: { background: "orange", shadow: "#FF8C00" },
  100000: { background: "white", shadow: "#C0C0C0" },
};

const getChipBreakdown = (amount) => {
  const denominations = [100000, 50000, 20000, 5000, 1000, 500, 100, 25, 5, 1];
  const breakdown = {};

  for (let denom of denominations) {
    const count = Math.floor(amount / denom);
    if (count > 0) {
      breakdown[denom] = count;
      amount -= count * denom;
    }
  }

  return breakdown;
};

const PokerChips = ({ amount = 0 }) => {
  const chips = getChipBreakdown(amount);

  if (process.env.NODE_ENV === "development") {
    console.log("Chips breakdown:", chips);
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      gap={0}
      flex={1}
    >
      {" "}
      {Object.entries(chips).map(([denom, count], stackIndex) => (
        <Box
          key={denom}
          position="relative"
          width={"1vw"}
          mb={stackIndex % 2 === 0 ? 0.5 : 0}
          zIndex={stackIndex % 2 === 0 ? 0 : 100}
        >
          {Array.from({ length: Math.min(count, 10) }).map((_, i) => (
            <Chip
              key={`${denom}-${i}`}
              backgroundColor={CHIP_COLORS[denom].background}
              shadowColor={CHIP_COLORS[denom].shadow}
              i={i}
              denom={denom}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default PokerChips;
