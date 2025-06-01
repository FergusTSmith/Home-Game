import { Box, Dialog, Typography } from "@mui/material";
import React, { useState } from "react";
import Card from "../Card";
import Player from "./Player";
import CommunityCards from "./CommunityCards";
import Pot from "./Pot";
import TableContents from "./TableContents";
import PokerChips from "./Chips";
import LobbyModal from "./Lobby/LobbyModal";
import EmptyPlayer from "./EmptyPlayer";

function Table({ gameDetails, tableDetails, playerDetails, gameLobbyOpen, setGameLobbyOpen }) {
  const playerPositionsPerPlayerNumber = [
    [{ bottom: "-10vh" }],
    [
      { bottom: "-5vh", chipPosition: "bottom" },
      { bottom: "45vh", chipPosition: "top" },
    ],
    [
      { bottom: "-5vh", chipPosition: "bottom" },
      { bottom: "50vh", left: "80vw" },
      { bottom: "45vh", chipPosition: "top" },
      { bottom: "50vh", left: "80vw" },
    ],
    [
      { bottom: "-5vh", chipPosition: "bottom" },
      { bottom: "20vh", left: "-5vw" },
      { bottom: "45vh", chipPosition: "top" },
      { bottom: "20vh", right: "-5vw" },
    ],
    [
      { bottom: "-5vh", chipPosition: "bottom" },
      { bottom: "20vh", left: "-5vw" },
      // { bottom: "45vh", chipPosition: "top" },
      { bottom: "20vh", right: "-5vw" },
      { bottom: "42vh", right: "10vw", chipPosition: "top" },
      { bottom: "42vh", left: "10vw", chipPosition: "top" },
    ],
    [
      { bottom: "-5vh", chipPosition: "bottom" },
      { bottom: "20vh", left: "-5vw" },
      { bottom: "45vh", chipPosition: "top" },
      { bottom: "20vh", right: "-5vw" },
    ],
    {},
    {},
    {},
  ];

  const playerPositions =
    playerPositionsPerPlayerNumber[gameDetails.playersPerTable - 1];

  const emptySeats = [];

  console.log("FERGUS PLAYER POSITIONS", playerPositions, tableDetails);

  for (
    let i = tableDetails.players.length;
    i < gameDetails.playersPerTable;
    i++
  ) {
    console.log("FERGUS EMPTY SEATS", i, playerPositions[i]);
    emptySeats.push(<EmptyPlayer position={playerPositions[i]}></EmptyPlayer>);
  }

  return (
    <Box
      sx={{
        width: "65vw",
        height: "45vh",
        background:
          "radial-gradient(circle at top, rgb(28, 163, 35) 0%, rgb(3, 94, 17) 90%)",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: "50%",
        zIndex: "100",
        left: "50%",
        transform: "translate(-50%, -50%)",
        border: "solid 8px rgb(24, 24, 25)",
        boxShadow:
          "inset 0px 7px 10px rgba(0, 0, 0, 0.5), 0px 5px 15px rgba(0, 0, 0, 0.7)",
      }}
    >
      <Typography
        sx={{
          fontSize: "4vw",
          color: "rgb(11, 162, 18)",
          fontFamily: "Orbiton",
        }}
      >
        HomeGame
      </Typography>
      {tableDetails.players.map((player, i) => {
        return (
          <Player
            name={player.playerId}
            chips={player.chips}
            position={playerPositions[i]}
            visible={player.playerId === playerDetails}
          />
        );
      })}
      {emptySeats}

      <Dialog
        open={gameLobbyOpen}
        onClose={() => setGameLobbyOpen(false)}
        aria-labelledby="modal-modal-title"
        fullWidth
        aria-describedby="modal-modal-description"
        sx={{
          minWidth: "500px",
          minHeight: "500px",
        }}
        maxWidth={"80vw"}
      >
        <LobbyModal gameDetails={gameDetails} />
      </Dialog>
    </Box>
  );
}

export default Table;
