import { Box, Typography } from "@mui/material";
import React from "react";
import LobbySettings from "./LobbyComponents/LobbySettings";
import LobbyPlayers from "./LobbyComponents/LobbyPlayers";
import LobbyTables from "./LobbyComponents/LobbyTables";

function LobbyModal({ gameDetails, joinTable }) {
  return (
    <Box
      sx={{
        position: "fixed",
        width: "60vw",
        height: "60vh",
        top: "50%",
        left: "50%",
        minWidth: "400px",
        minHeight: "500px",
        transform: "translate(-50%, -50%)",
        opacity: 0.9,
        borderRadius: 5,
        // display: 'flex',
        // flexDirection: 'column',
        justifyContent: "center",
        background:
          "radial-gradient(circle at top, #3a4753 0%,rgb(21, 27, 33) 60%)",
        padding: 3,
      }}
    >
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          color: "white",
          fontFamily: "Orbiton",
          fontSize: 40,
        }}
      >
        Game {gameDetails.gameId}
      </Box>
      <Box
        sx={{
          textAlign: "center",
          color: "white",
          fontFamily: "Orbiton",
          fontSize: 20,
        }}
      >
        Hosted By {gameDetails.hostPlayer.playerId}
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          //   background: "pink",
          height: "50%",
          marginTop: 4,
          gap: 2,
        }}
      >
        <LobbyPlayers players={gameDetails.players} />
        <LobbyTables tables={gameDetails.tables} joinTable={joinTable} />
        <LobbySettings gameDetails={gameDetails} />
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          //   background: "orange",
          height: "30%",
          marginTop: 2,
          gap: 1,
        }}
      >
        <Box
          sx={{ flex: "2", border: "2px solid #adadad", borderRadius: 3 }}
        ></Box>
        <Box sx={{ flex: "1" }}></Box>
      </Box>
    </Box>
  );
}

export default LobbyModal;
