import { Box } from "@mui/material";
import React from "react";
import MenuItem from "./MenuItem";

function HomeScreen({setInGame}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          width: "90%",
          display: "flex",
          height: "30vh",
        //   background: "purple",
          gap: 1,
        }}
      >
        <MenuItem symbol={"♠"} menuText={'New Game'} setInGame={setInGame}></MenuItem>
        <MenuItem symbol={"♣"} menuText={'Join Game'} setInGame={setInGame}></MenuItem>
        <MenuItem symbol={"♥"} menuText={'Saved Games'} setInGame={setInGame}></MenuItem>
        <MenuItem symbol={"♦"} menuText={'Settings'} setInGame={setInGame}></MenuItem>
      </Box>
    </Box>
  );
}

export default HomeScreen;
