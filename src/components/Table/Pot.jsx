import { Box } from "@mui/material";
import React from "react";

function Pot({pot}) {
  return (
    <Box sx={{ flex: "1", color: "white", height: "50%" }}>Pot: {pot}</Box>
  );
}

export default Pot;
