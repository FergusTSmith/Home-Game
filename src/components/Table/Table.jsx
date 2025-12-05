import { Box, Dialog, Typography } from "@mui/material";
import React, { useState } from "react";
import Card from "../UIAssets/Card";
import Player from "./Player";
import CommunityCards from "./CommunityCards";
import Pot from "./Pot";
import TableContents from "./TableContents";
import PokerChips from "./Chips";
import LobbyModal from "./Lobby/LobbyModal";
import EmptyPlayer from "./EmptyPlayer";
import PlayerControls from "./PlayerControls/PlayerControls";
import { table } from "framer-motion/client";
import ChatBox from "./PlayerControls/ChatBox";

function Table({
  gameDetails,
  tableDetails,
  playerDetails,
  gameLobbyOpen,
  setGameLobbyOpen,
  playerTurn,
  activePlayer,
  socket,
  resultsText,
  messages,
  newMessage
}) {
  const playerPositionsPerPlayerNumber = [
    [{ bottom: "-10vh" }],
    [
      { bottom: "-5vh", chipPosition: "bottom" },
      { bottom: "45vh", chipPosition: "top" },
    ],
    [
      { bottom: "-5vh", chipPosition: "bottom" },
      { bottom: "40vh", left: "50vw", chipPosition: "bottom" },
      { bottom: "40vh", left: "10vw", chipPosition: "top" },
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
    [
      { bottom: "-5vh", chipPosition: "bottom" },
      { bottom: "20vh", left: "-5vw" },
      { bottom: "45vh", chipPosition: "top" },
      { bottom: "20vh", right: "-5vw" },
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
      { bottom: "45vh", chipPosition: "top" },
      { bottom: "20vh", right: "-5vw" },
    ],
  ];

  const playerPositions =
    playerPositionsPerPlayerNumber[gameDetails.playersPerTable - 1];

  const emptySeats = [];

  const takeSeat = (seatNumber) => {
    socket.emit(
      "takeSeat",
      gameDetails.gameId,
      playerDetails.playerId,
      tableDetails.uniqueID,
      seatNumber
    );
  };

  const joinTable = (tableId) => {
    socket.emit("open_table", {
      gameId: gameDetails.gameId,
      playerId: playerDetails.playerId,
      tableId: tableId,
    });
  };

  console.log("FERGUS TABLEDETAILS", tableDetails);

  const playerSeat = tableDetails
    ? tableDetails.seats.findIndex(
        (seat) => seat && seat.playerId === playerDetails.playerId
      )
    : -1;

  const startIndex = playerSeat >= 0 ? playerSeat : 0;

  const rotatedIndices = Array.from(
    { length: tableDetails ? tableDetails.seats.length : 0 },
    (_, idx) => (startIndex + idx) % tableDetails.seats.length
  );

  return (
    <Box>
      {tableDetails && (
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
          <Box
            sx={{
              position: "absolute",
              top: "35vh",
              left: "50%",
              transform: "translateX(-50%)",
              color: "white",
              fontFamily: "Orbiton",
              opacity: 0.8,
              fontSize: "2vw",
            }}
          >
            {resultsText}
          </Box>
          <Typography
            sx={{
              fontSize: "4vw",
              color: "rgb(11, 162, 18)",
              fontFamily: "Orbiton",
              position: "absolute",
            }}
          >
            HomeGame
          </Typography>
          <CommunityCards
            communityCards={tableDetails.communityCards}
          ></CommunityCards>
          <Pot pot={tableDetails.pot}></Pot>
          {rotatedIndices.map((i) => {
            const player = tableDetails.seats[i];
            return (
              <>
                {player && (
                  <Player
                    name={player.playerId}
                    chips={player.chips}
                    seatNumber={i}
                    position={playerPositions[i]}
                    playerTurn={player.playerId === activePlayer}
                    playerTime={10000}
                    visible={
                      player.playerId === playerDetails.playerId ||
                      tableDetails.showingHands
                    }
                    cards={
                      player.playerId === playerDetails.playerId
                        ? playerDetails.playerCards
                        : tableDetails.showingHands
                        ? tableDetails.playerHands[player?.playerId]
                        : []
                    }
                    bet={player.bet}
                  />
                )}
                {!player && (
                  <EmptyPlayer
                    position={playerPositions[i]}
                    joinable={true}
                    seatNumber={i}
                    takeSeat={takeSeat}
                  ></EmptyPlayer>
                )}
              </>
            );
          })}
          {emptySeats}
        </Box>
      )}
      <Dialog
        open={gameLobbyOpen}
        onClose={() => {
          if (tableDetails) {
            setGameLobbyOpen(false);
          }
        }}
        aria-labelledby="modal-modal-title"
        fullWidth
        aria-describedby="modal-modal-description"
        sx={{
          minWidth: "500px",
          minHeight: "500px",
        }}
        maxWidth={"80vw"}
      >
        <LobbyModal gameDetails={gameDetails} joinTable={joinTable} />
      </Dialog>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          right: 24,
          zIndex: 200,
        }}
      ></Box>{" "}
      <Box sx={{ position: "fixed", right: 0, bottom: 0 }}>
        <PlayerControls
          playerDetails={playerDetails}
          gameDetails={gameDetails}
          tableDetails={tableDetails}
          socket={socket}
          playerTurn={playerTurn}
        />
      </Box>
      <Box sx={{ position: "fixed", left: 0, bottom: 0 }}>
        <ChatBox
          socket={socket}
          gameDetails={gameDetails}
          tableDetails={tableDetails}
          playerDetails={playerDetails}
          messages={messages}
        />
      </Box>
    </Box>
  );
}

export default Table;
