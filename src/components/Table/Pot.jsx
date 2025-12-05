import { Box } from "@mui/material";
import React from "react";
import PokerChips from "./Chips";

function Pot({ pot }) {
  return (
    <>
      {!!pot && (
        <Box
          sx={{
            flex: "1",
            color: "white",
            height: "5vh",
            fontFamily: "Orbiton",
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            top: "12vh",
          }}
        >
          <Box sx={{ flex: 1, opacity: 0.8 }}>Pot: {pot}</Box>
          <PokerChips amount={pot} />
        </Box>
      )}
    </>
  );
}

export default Pot;
