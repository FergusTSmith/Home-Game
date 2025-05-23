import { Box } from "@mui/material";
import React from "react";
import Card from "../Card";

function CommunityCards() {
  return (
    <Box
      sx={{
        height: "10vh",
        flex: "1",
        display: "flex",
      }}
    >
      <Card visible={true} value="As"></Card>
      <Card visible={true} value="10h"></Card>
      <Card visible={true} value="9c"></Card>
      <Card visible={true} value="2d"></Card>
      <Card visible={true} value="10h"></Card>
    </Box>
  );
}

export default CommunityCards;
