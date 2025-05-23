import React from "react";
import CommunityCards from "./CommunityCards";
import Pot from "./Pot";
import { Box } from "@mui/material";
import PokerChips from "./Chips";

function TableContents() {
  return (
    <Box
      sx={{
        position: "fixed",
        height: "15vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {" "}
      <CommunityCards />
      <Pot /> 
      <Box sx={{display: 'flex', width: '100%', justifyContent: 'center'}}> 
      <PokerChips amount={100000} />

      </Box>
    </Box>
  );
}

export default TableContents;
