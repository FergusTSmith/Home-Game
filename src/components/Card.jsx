import { Box, Typography } from "@mui/material";
import React from "react";

const hiddenBackground = "gray";

const suiteColours = {
  s: "#a8a7a7",
  h: "#96081b",
  c: "#05ad02",
  d: "#0286f2",
};

const suiteSymbols = {
  s: "♠",
  h: "♥",
  c: "♣",
  d: "♦",
};

function Card({ visible, value }) {
  const numeric = value.slice(0, value.length - 1);
  const suite = value.slice(-1);

  return (
    <Box>
      <Box sx={{ position: "absolute" }}>
        {visible && (
          <Typography
            sx={{
              color: "white",
              ml: numeric === "10" ? 0.8 : 0.8,
              opacity: 1,
              fontSize: 27,
              fontFamily: 'Josefin-Sans'
            }}
          >
            {numeric}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          minWidth: "50px",
          width: "95%",
          height: "90%",
          flex: "1",
          background: visible ? suiteColours[suite] : "gray",
          borderRadius: "0.8vw",
          mr: "0.1vw",
          ml: "0.1vw",
          boxShadow:
            "inset 0px 1.5px 3px rgba(0, 0, 0, 0.5), 0px 5px 15px rgba(0, 0, 0, 0.7)",
          textSize: "large",
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: visible ? " " : "border-box",
          border: visible ? "" : "2.5px solid #b3b4b5",
        }}
      >
        {!visible && (
          <Typography
            sx={{ fontSize: "50px", position: "absolute", color: "darkgray" }}
          ></Typography>
        )}
        {visible && (
          <Typography
            sx={{
              fontSize: "50px",
              position: "absolute",
              mt: 2,
              color: "white",

              opacity: 0.3,
            }}
          >
            {suiteSymbols[suite]}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default Card;
