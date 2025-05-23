import React from "react";
import Card from "../Card";
import { Box, Typography } from "@mui/material";
import PokerChips from "./Chips";

function EmptyPlayer({ position }) {
  console.log("position", position);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "fixed",
        bottom: position.bottom,
        left: position.left,
        right: position.right,
        // background: "gray",
        minWidth: "100px",
        width: "10vw",
        // background: 'pink'
      }}
    >
      <Box
        sx={{
          width: "100%",
          background: "radial-gradient(circle at top, #3a4753 0%, #181b1f 60%)",
          display: "flex",
          color: "white",
          alignText: "center",
          alignItems: "center",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          pt: "0.5vw",
          pb: "0.5vw",
          borderRadius: "2vw",
          boxShadow:
            "inset 0px 1.5px 3px rgba(0, 0, 0, 0.5), 0px 5px 15px rgba(0, 0, 0, 0.7)",
        }}
      >
        <Typography sx={{ fontSize: "17px" }}>Take Seat</Typography>
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: position.chipPosition === "top" ? 80 : -50,
          bottom: position.chipPosition === "bottom" ? 100 : 0,
        }}
      >
        <PokerChips amount={13145} />
      </Box>
    </Box>
  );
}

export default EmptyPlayer;
