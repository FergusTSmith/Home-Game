import { Box, Typography } from "@mui/material";
import React from "react";

function Chip({ i, backgroundColor, denom }) {
  return (
    <>
      <Box
        key={i}
        sx={{
          width: 22,
          height: 10,
          borderRadius: "50%",
          border: `0.5px solid darkgray`,
          backgroundColor: backgroundColor,
          position: "absolute",
          bottom: `${i * 1.75 + 3}px`,
          zIndex: i,
        }}
      />
      <Box
        key={i}
        sx={{
          width: 22,
          height: 10,
          borderRadius: "50%",
          border: `0.5px solid darkgray`,
          backgroundColor: backgroundColor,
          position: "absolute",
          bottom: `${i * 1.75 + 3.25}px`,
          zIndex: i,
        }}
      />
      <Box
        key={i}
        sx={{
          width: 22,
          height: 10,
          borderRadius: "50%",
          border: `0.5px solid darkgray`,
          backgroundColor: backgroundColor,
          position: "absolute",
          bottom: `${i * 1.75 + 3.5}px`,
          zIndex: i,
        }}
      />
      <Box
        key={i}
        sx={{
          width: 22,
          height: 10,
          borderRadius: "50%",
          border: `0.5px solid darkgray`,
          backgroundColor: backgroundColor,
          position: "absolute",
          bottom: `${i * 1.75 + 3.75}px`,
          zIndex: i,
        }}
      />
      <Box
        key={i}
        sx={{
          width: 22,
          height: 10,
          borderRadius: "50%",
          border: `0.5px solid white`,
          backgroundColor: backgroundColor,
          position: "absolute",
          bottom: `${i * 1.75 + 4}px`,
          zIndex: i,
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: 5,
            fontWeight: 'bold',
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {denom}
        </Typography>
      </Box>
    </>
  );
}

export default Chip;
