import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Table from "./Table/Table";
import HomeScreen from "./HomeScreen/HomeScreen";
import { io } from "socket.io-client";
import Background from "./Background/Background";

const socket = io("http://127.0.0.1:5000", { transports: ["websocket"] });
// Adjust URL to match Flask server

const rankingMap = {
  1: "High Card",
  2: "One Pair",
  3: "Two Pair",
  4: "Three of a Kind",
  5: "Straight",
  6: "Flush",
  7: "Full House",
  8: "Four of a Kind",
  9: "Straight Flush",
  10: "Royal Flush",
};

function Home() {
  const [message, setMessage] = useState("");
  const [messageSubject, setMessageSubject] = useState("message");
  const [messages, setMessages] = useState([]);
  const [inGame, setInGame] = useState(false);
  const [gameLobbyOpen, setGameLobbyOpen] = useState(true);

  const [gameDetails, setGameDetails] = useState({});
  const [storedGameDetails, setStoredGameDetails] = useState();
  const [playerDetails, setPlayerDetails] = useState({
    playerId: null,
    playerCards: [],
  });
  const [tableDetails, setTableDetails] = useState();
  const [playerTurn, setPlayerTurn] = useState(false);
  const [activePlayer, setActivePlayer] = useState(null);

  const [openTableDetails, setOpenTableDetails] = useState({});

  const [resultsText, setResultsText] = useState("");

  const gameDetailsRef = useRef();
  gameDetailsRef.current = gameDetails;

  const tableDetailsRef = useRef();
  tableDetailsRef.current = tableDetails;

  const playerDetailsRef = useRef();
  playerDetailsRef.current = playerDetails;

  const openTableDetailsRef = useRef();
  openTableDetailsRef.current = openTableDetails;

  const activePlayerRef = useRef();
  activePlayerRef.current = activePlayer;

  const playerTurnRef = useRef();
  playerTurnRef.current = playerTurn;

  const resultsTextRef = useRef();
  resultsTextRef.current = resultsText;

  const handleHomeButton = () => {
    setStoredGameDetails(gameDetailsRef.current);
    setGameDetails({});
  };

  const rejoinGame = () => {
    setGameDetails(storedGameDetails);
    setStoredGameDetails({});
  };

  const isInGame = () => {
    return gameDetailsRef.current
      ? Object.keys(gameDetailsRef.current).length > 0
      : false;
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("client disconnected");
    });

    socket.on("gameStartSuccess", (data) => {
      setGameDetails(data.game);
      // setTableDetails(data.table);
      // setPlayerDetails(data.hostPlayer);
    });

    socket.on("gameJoinSuccess", (data) => {
      setGameDetails(data.game);
      // setTableDetails(data.table);
      // setPlayerDetails(data.hostPlayer);
    });

    socket.on("gameJoinFailure", (data) => {
      // setGameDetails(data.game);
      // setTableDetails(data.table);
      // setPlayerDetails(data.hostPlayer);
    });
    socket.on("player_joined", (data) => {
      setGameDetails(data.game);

      if (
        tableDetailsRef.current &&
        tableDetailsRef.current.uniqueID === data.table.uniqueID
      ) {
        setTableDetails(data.table);
      }
    });
    socket.on("playerMove", (data) => {
      console.log("FERGUS PLAYER MOVE", data);
      // if (playerDetailsRef.current.playerId === data.player.playerId) {
      //   setPlayerTurn(false);
      // }
      setTableDetails(data.table);
      setActivePlayer(null);
      console.log("FERGUS PLAYER MOVE !@!@!@!@!@!@!@!@!", data);
    });
    socket.on("player_taken_seat", (data) => {
      setGameDetails(data.game);
      setTableDetails(data.table);
    });

    socket.on("new_round", (data) => {
      console.log("FERGUS NEW ROUND", data);
      // setGameDetails(data.game) ;
      setTableDetails(data.table);
      setPlayerTurn(false);
      setActivePlayer(null);
    });
    socket.on("player_seated", (data) => {
      setGameDetails(data.game);
      setTableDetails(data.table);
    });

    socket.on("hand_results", (data) => {
      console.log("FERGUS HAND RESULTS", data);
      setTableDetails(data.table);
      if (data.multipleWinners) {
        const winners =
          data.winners.map((w) => `${w.winnerId}`).join(" & ") +
          " with " + rankingMap[data.winningHandRank];
        const resultsText = `The winners are ${winners}, winning ${data.pot}`;
        setResultsText(resultsText);
        return;
      } else {
        const resultsText = `The winner is ${data.winnerId} with ${
          rankingMap[data.winningHandRank]
        }, winning ${data.pot}`;
        setResultsText(resultsText);

      }
    });

    socket.on("blindsAssigned", (data) => {
      console.log("FERGUS BLINDS ASSIGNED", data);
    });

    socket.on("game_started", (data) => {
      console.log("FERGUS GAME STARTED");
      setGameDetails(data.game);
    });

    socket.on("preFlopCards", (data) => {
      setPlayerDetails({
        ...playerDetailsRef.current,
        playerCards: data,
      });
    });
    socket.on("playerTurn", (data) => {
      console.log(
        "FERGUS PLAYERTURN fwqgoperjngierkqngeitgnetkgn",
        playerDetailsRef.current.playerId,
        data,
        playerDetailsRef.current.playerId === data
      );
      if (playerDetailsRef.current.playerId === data.playerId) {
        console.log(
          "FERGUS SETTING PLAYER TUURN @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
        );
        setPlayerTurn(true);
      } else {
        setPlayerTurn(false);
      }
      setActivePlayer(data.playerId);
      setTableDetails(data.game);

      console.log("FERGUS GAMEDETAILS", data.game);

      console.log("FERGUS PLAYERTURN DATA", data);
    });

    socket.on("player_seated", (data) => {
      console.log("FERGUS PLAYER SEATED", data);
      setGameDetails(data.game);
      if (data.table.uniqueID === tableDetailsRef.current.uniqueID) {
        setTableDetails(data.table);
      }
    });
    socket.on("table_opened", (data) => {
      console.log("FERGUS TABLE OPENED", data);
      console.log("FERGUS TABLE OPENED HANDLER", data.table);

      //  setOpenTableDetails(data.table);
      setTableDetails(data.data.table);
    });
    return () => {
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    console.log("FERGUS TABLE DETAILS", tableDetails);
  }, [tableDetails]);

  useEffect(() => {
    if (resultsText) {
      const timer = setTimeout(() => {
        setResultsText("");
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [resultsText]);

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
            top: 0,
            right: 0,
            fontSize: 15,
            color: "gray",
            cursor: "pointer",
            pt: 1.5,
            pb: 1.5,
            pl: 2,
            pr: 2,
            right: 20,
            top: 10,
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
          socket={socket}
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
