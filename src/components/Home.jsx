import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "./Table/Table";
import HomeScreen from "./HomeScreen/HomeScreen";
import { io } from "socket.io-client";
import Background from "./Background/Background";

const socket = io("http://127.0.0.1:5000", { transports: ["websocket"] });
// Adjust URL to match Flask server

function Home() {
  const [message, setMessage] = useState("");
  const [messageSubject, setMessageSubject] = useState("message");
  const [messages, setMessages] = useState([]);
  const [inGame, setInGame] = useState(false);
  const [gameLobbyOpen, setGameLobbyOpen] = useState(true);

  const [gameDetails, setGameDetails] = useState({});
  const [storedGameDetails, setStoredGameDetails] = useState();
  const [playerDetails, setPlayerDetails] = useState();
  const [tableDetails, setTableDetails] = useState();

  console.log("STORED GAME DETIALS", storedGameDetails);

  const handleHomeButton = () => {
    setStoredGameDetails(gameDetails);
    setGameDetails({});
  };

  const rejoinGame = () => {
    setGameDetails(storedGameDetails);
    setStoredGameDetails({});
  };

  const isInGame = () => {
    return Object.keys(gameDetails).length > 0;
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("message", (data) => {
      console.log("data", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("disconnect", () => {
      console.log("client disconnected");
    });

    socket.on("gameStartSuccess", (data) => {
      setGameDetails(data.game);
      setTableDetails(data.table);
      // setPlayerDetails(data.hostPlayer);
    });

    socket.on("gameJoinSuccess", (data) => {
      console.log("BOMBACLAAT");
      console.log("fergus join  success", data);
      setGameDetails(data.game);
      setTableDetails(data.table);
      // setPlayerDetails(data.hostPlayer);
    });
    return () => {
      socket.off("message");
    };
  }, []);

  console.log("playerDetails", playerDetails);

  return (
    <Box
      sx={{
        margin: 0,
        width: "100%",
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #3a4753 0%, #0f1317 60%)",
        display: "flex",
        justifyContent: "centre",
        alignItems: "centre",
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
            top: 0,
            right: 0,
            fontSize: 15,
            color: "gray",

            cursor: "pointer",
            pt: 1.5,
            pb: 1.5,
            pl: 2,
            pr: 2,
            gap: 1,
            background:
              "radial-gradient(circle at top, #3a4753 0%, #181b1f 60%)",
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
          socket={socket}
          setPlayerDetails={setPlayerDetails}
          playerDetails={playerDetails}
        ></HomeScreen>
      )}
      {isInGame() && (
        <Table
          gameDetails={gameDetails}
          tableDetails={tableDetails}
          playerDetails={playerDetails}
          setGameLobbyOpen={setGameLobbyOpen}
          gameLobbyOpen={gameLobbyOpen}
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
          Current Username: {playerDetails}
        </Box>
      )}
    </Box>
  );
}

export default Home;
