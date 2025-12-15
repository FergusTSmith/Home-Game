import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "./Table/Table";
import HomeScreen from "./HomeScreen/HomeScreen";
import Background from "./Background/Background";
import { useGameState } from "../context/GameStateContext";
import { useSocket } from "../context/SocketContext";

function Home() {
  // Get all state and functions from contexts
  const {
    gameLobbyOpen,
    setGameLobbyOpen,
    storedGameDetails,
    playerDetails,
    tableDetails,
    resultsText,
    gameDetailsRef,
    tableDetailsRef,
    playerDetailsRef,
    openTableDetailsRef,
    activePlayerRef,
    playerTurnRef,
    resultsTextRef,
    handleHomeButton,
    rejoinGame,
    isInGame,
    setInGame,
    setPlayerDetails,
    setResultsText,
    messagesRef,
    playerMessageRef,
  } = useGameState();

  const { socket } = useSocket();

  // Effect for table details logging
  useEffect(() => {
    console.log("FERGUS TABLE DETAILS", tableDetails);
  }, [tableDetails]);

  // Effect for results text timer
  useEffect(() => {
    if (resultsText) {
      const timer = setTimeout(() => {
        setResultsText("");
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [resultsText, setResultsText]);

  console.log("FERGUS PLAYERSTURN?!?!!", playerTurnRef.current);

  return (
    <Box
      sx={{
        margin: 0,
        width: "100%",
        height: "100vh",
        background: "radial-gradient(circle at top, #3a4753 0%, #0f1317 60%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        textAlign: "center",
        position: "fixed",
      }}
    >
      <Background />
      {!isInGame() && (
        <Box
          sx={{
            fontFamily: "Orbiton",
            position: "absolute",
            width: "100%",
            top: 40,
            fontSize: "6.5vw",
            color: "rgb(205, 205, 205)",
          }}
        >
          HomeGame
        </Box>
      )}
      {isInGame() && (
        <Box
          sx={{
            position: "fixed",
            top: 10,
            left: 20,
            fontSize: 50,
            color: "gray",
            ":hover": {
              color: "white",
            },
            transition: "color ease 0.5s",
            cursor: "pointer",
          }}
          onClick={() => handleHomeButton()}
        >
          ⌂
        </Box>
      )}

      {isInGame() && (
        <Box
          sx={{
            position: "fixed",
            display: "flex",
            top: 10,
            right: 20,
            fontSize: 15,
            color: "gray",
            cursor: "pointer",
            pt: 1.5,
            pb: 1.5,
            pl: 2,
            pr: 2,
            gap: 1,
            borderRadius: 2,
          }}
        >
          <Box
            onClick={(e) => setGameLobbyOpen(true)}
            sx={{
              ":hover": {
                color: "white",
              },
              transition: "color ease 0.5s",
            }}
          >
            Lobby
          </Box>
          <Box>|</Box>
          <Box
            sx={{
              ":hover": {
                color: "white",
              },
              transition: "color ease 0.5s",
            }}
          >
            Settings
          </Box>
        </Box>
      )}
      {storedGameDetails && !isInGame() && (
        <Box
          sx={{
            position: "fixed",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "Orbiton",
            color: "white",
            opacity: 0.2,
            zIndex: 100,
            ":hover": {
              opacity: 0.6,
            },
            transition: "opacity ease 1s",
            cursor: "pointer",
          }}
          onClick={() => rejoinGame()}
        >
          Rejoin Game? {storedGameDetails.gameId}
        </Box>
      )}

      {!isInGame() && (
        <HomeScreen
          setInGame={setInGame}
          setPlayerDetails={setPlayerDetails}
          playerDetails={playerDetailsRef.current}
        ></HomeScreen>
      )}
      {isInGame() && (
        <Table
          gameDetails={gameDetailsRef.current}
          tableDetails={tableDetailsRef.current}
          openTableDetails={openTableDetailsRef.current}
          playerDetails={playerDetailsRef.current}
          playerTurn={
            playerDetailsRef.current.playerId === activePlayerRef.current
          }
          setGameLobbyOpen={setGameLobbyOpen}
          activePlayer={activePlayerRef.current}
          gameLobbyOpen={gameLobbyOpen}
          socket={socket}
          resultsText={resultsTextRef.current}
          messages={messagesRef.current}
          playerMessages={playerMessageRef.current}
        ></Table>
      )}
      {playerDetails && (
        <Box
          sx={{
            position: "fixed",
            bottom: 2,
            left: 5,
            fontFamily: "Orbiton",
            color: "white",
            fontSize: 10,
            opacity: 0.2,
            zIndex: 100,
            transition: "opacity ease 1s",
          }}
        >
          Current Username: {playerDetailsRef.current.playerId}
        </Box>
      )}
    </Box>
  );
}

export default Home;
