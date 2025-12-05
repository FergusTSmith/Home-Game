import { Box, Typography } from "@mui/material";
import React from "react";

function Chip({ i, backgroundColor, denom, shadowColor }) {
  return (
    <>

      <Box
        key={i}
        sx={{
          width: 16,
          height: 10,
          borderRadius: "50%",
          border: `0.5px solid ${shadowColor}99`,
          
          position: "absolute",
          bottom: `${i * 1.75 + 3.25}px`,
          zIndex: i,
        }}
      />
      <Box
        key={i}
        sx={{
          width: 16,
          height: 10,
          borderRadius: "50%",
          border: `0.5px solid ${shadowColor}99`,
          backgroundColor: backgroundColor,
          position: "absolute",
          bottom: `${i * 1.75 + 3.5}px`,
          zIndex: i,
        }}
      />
      <Box
        key={i}
        sx={{
          width: 16,
          height: 10,
          borderRadius: "50%",
          border: `0.5px solid ${shadowColor}99`,
          backgroundColor: backgroundColor,
          position: "absolute",
          bottom: `${i * 1.75 + 3.75}px`,
          zIndex: i,
        }}
      />
      <Box
        key={i}
        sx={{
          width: 16,
          height: 10,
          borderRadius: "50%",
          border: `0.5px solid ${shadowColor}99`,
          backgroundColor: backgroundColor,
          position: "absolute",
          bottom: `${i * 1.75 + 4}px`,
          zIndex: i,
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: 4,
            fontWeight: "bold",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "Orbiton",
          }}
        >
          {denom}
        </Typography>
      </Box>
    </>
  );
}

export default Chip;
