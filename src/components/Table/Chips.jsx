import React from "react";
import { Box, Typography } from "@mui/material";
import Chip from "./Chip";

// Example chip colors by denomination
const CHIP_COLORS = {
  1: "#E0E0E0",      // Light gray
  5: "#F44336",      // Red
  25: "#4CAF50",     // Green
  100: "#212121",    // Black
  500: "#9C27B0",    // Purple
  1000: "pink",    // Purple
  5000: "gray",    // Purple
  20000: "blue",    // Purple
  50000: "orange",    // Purple
  100000: "white",    // Purple
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

  return (
    <Box display="flex" alignItems="flex-end" gap={0} mt>
      {Object.entries(chips).map(([denom, count], i) => (
        <Box key={denom} position="relative" width={'1vw'} mb={i % 2 === 0 ? 0.5 : 0}>
          {Array.from({ length: Math.floor(count / 20) }).map((_, i) => (
            <Chip backgroundColor={CHIP_COLORS[denom]} i={i} denom={denom}/>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default PokerChips;
