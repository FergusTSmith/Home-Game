import React from "react";
import { Box, Typography } from "@mui/material";

function LobbyPlayers({ players }) {
  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Typography
        sx={{
          fontFamily: "Orbiton",
          color: "white",
          textAlign: "center",
          mb: 1,
        }}
      >
        Players
      </Typography>
      <Box
        sx={{
          flex: 1,
          border: "2px solid #adadad",
          borderRadius: 2,
          padding: 1,
        }}
      >
        {players.map((player, i) => {
          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Orbiton",
                  color: "white",
                  textAlign: "center",
                  fontSize: 10,
                }}
              >
                {i + 1 + ") "}
                {player.playerId}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Orbiton",
                  color: "white",
                  textAlign: "right",
                  fontSize: 10,
                }}
              >
                {" "}
                {player.chips}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default LobbyPlayers;
