import { Box, List, ListItem, Typography } from "@mui/material";
import React from "react";

function LobbySettings({ gameDetails }) {
  const {
    playersPerTable,
    showHands,
    gameParameters,
  } = gameDetails;

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
        Settings
      </Typography>
      <Box
        sx={{
          flex: 1,
          border: "2px solid #adadad",
          borderRadius: 3,
          padding: 1,
          fontSize: 10,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: 10, flex: 3, color: "white" }}>
            Game Type
          </Typography>
          <Typography
            sx={{
              fontSize: 10,
              float: "right",
              flex: 1,
              color: "white",
              textAlign: "right",
            }}
          >
            {gameParameters.type}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: 10, flex: 3, color: "white" }}>
            Starting Chips
          </Typography>
          <Typography
            sx={{
              fontSize: 10,
              float: "right",
              flex: 1,
              color: "white",
              textAlign: "right",
            }}
          >
            {gameParameters.startingChips}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: 10, flex: 3, color: "white" }}>
            Big Blind
          </Typography>
          <Typography
            sx={{
              fontSize: 10,
              float: "right",
              flex: 1,
              color: "white",
              textAlign: "right",
            }}
          >
            {gameParameters.bigBlind}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: 10, flex: 3, color: "white" }}>
            Small Blind
          </Typography>
          <Typography
            sx={{
              fontSize: 10,
              float: "right",
              flex: 1,
              color: "white",
              textAlign: "right",
            }}
          >
            {gameParameters.smallBlind}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: 10, flex: 3, color: "white" }}>
            Game Speed
          </Typography>
          <Typography
            sx={{
              fontSize: 10,
              float: "right",
              flex: 1,
              color: "white",
              textAlign: "right",
            }}
          >
            {gameParameters.gameSpeed}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: 10, flex: 3, color: "white" }}>
            Max Players
          </Typography>
          <Typography
            sx={{
              fontSize: 10,
              float: "right",
              flex: 1,
              color: "white",
              textAlign: "right",
            }}
          >
            {gameParameters.maxPlayers}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: 10, flex: 3, color: "white" }}>
            Players Per Table
          </Typography>
          <Typography
            sx={{
              fontSize: 10,
              float: "right",
              flex: 1,
              color: "white",
              textAlign: "right",
            }}
          >
            {playersPerTable}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: 10, flex: 3, color: "white" }}>
            Show Hands
          </Typography>
          <Typography
            sx={{
              fontSize: 10,
              float: "right",
              flex: 1,
              color: "white",
              textAlign: "right",
            }}
          >
            {showHands ? "Enabled" : "Disabled"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default LobbySettings;
