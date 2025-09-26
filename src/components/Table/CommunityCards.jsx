import { Box } from "@mui/material";
import React from "react";
import Card from "../UIAssets/Card";

function CommunityCards({ communityCards }) {
  return (
    <Box
      sx={{
        height: "10vh",
        position: "fixed",
        display: "flex",
      }}
    >
      {communityCards && communityCards.length > 0 && (
        <>
          {communityCards.map((card, index) => (
            <Card key={index} visible={true} value={card}></Card>
          ))}
        </>
      )}
    </Box>
  );
}

export default CommunityCards;
