import React from "react";
import Card from "../Card";
import { Box, Typography } from "@mui/material";
import PokerChips from "./Chips";

function Player({ name, chips, position, visible }) {
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
        // background: "gray",
        minWidth: "100px",
        width: "10vw",
        // background: 'pink'
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          height: "10vh",
          // background: 'yellow',
          position: "absolute",
          zIndex: -100,
          top: "-3.5vh",
        }}
      >
        <Card visible={visible} community={false} value="As"></Card>
        <Card visible={visible} community={false} value="10h"></Card>
      </Box>
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
        <Typography sx={{ fontSize: "17px" }}>{name}</Typography>
        <Typography sx={{ fontSize: "12px", color: "gray" }}>
          {chips}
        </Typography>
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

export default Player;
