import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "./Table";
import HomeScreen from "./HomeScreen/HomeScreen";
import { io } from "socket.io-client";

const socket = io("http://127.0.0.1:5000", { transports: ["websocket"] });
 // Adjust URL to match Flask server

function Home() {
  const players = [
    {
      name: "Goose",
      chips: 10000,
      playerId: "43r5uf",
    },
    {
      name: "Goose1",
      chips: 10000,
      playerId: "gwrtgq",
    },
    {
      name: "Goose2",
      chips: 10000,
      playerId: "34t1gw",
    },
    {
      name: "Goose3",
      chips: 10000,
      playerId: "vpekvt",
    },
  ];
  const [message, setMessage] = useState("");
  const [messageSubject, setMessageSubject] = useState("message");
  const [messages, setMessages] = useState([]);

  const testPlayers = [
    {
      playerId: "test",
      chips: 1234,
    },
    {
      playerId: "test2",
      chips: 1234,
    },
    {
      playerId: "test3",
      chips: 1234,
    },
    {
      playerId: "test4",
      chips: 1234,
    },
    {
      playerId: "test5",
      chips: 1234,
    },
  ];

  const gameStartParams = {
    hostPlayer: "HOST_ID_TEST",
    maxPlayers: 18,
    type: "CASH",
    startingChips: 20000,
    smallBlind: 100,
    bigBlind: 200,
    allowRebuys: true,
    showHands: true,
    showWinningHand: true,
    gameSpeed: "SLOW",
    pauseToShowWinningHand: 4,
    blindIncreaseInterval: null,
    hourlyBreaks: false,
    breakInterval: 300,
  };

  const gameStartParamsTourny = {
    hostPlayer: "HOST_ID_TEST",
    maxPlayers: 18,
    type: "CASH",
    startingChips: 20000,
    smallBlind: 100,
    bigBlind: 200,
    allowRebuys: true,
    showHands: true,
    showWinningHand: true,
    gameSpeed: "FAST",
    pauseToShowWinningHand: 5,
    blindIncreaseInterval: "FAST",
    hourlyBreaks: false,
    breakInterval: 300,
  };

  const gameJoinParams = {
    playerId: "JOINING_PLAYER",
    gameId: "testId",
  };

  const sendTestMessage = () => {
    socket.emit("create_game", gameStartParams);
  };

  const sendJoinMessage = () => {
    socket.emit("join_game", gameJoinParams);
  };

  const sendMessage = () => {
    socket.emit(messageSubject, message);
    setMessage("");
    setMessageSubject("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    // socket.on("message", (data) => {
    //   setMessages((prevMessages) => [...prevMessages, data]);
    // });

    socket.on('disconnect', () => {
      console.log("client disconnected")
    })
    return () => {
      socket.off("message");
    };
  }, []);

  const [inGame, setInGame] = useState(false);

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
        position: 'fixed'
      }}
    >
      {!inGame &&<Box
        sx={{
          fontFamily: "Orbiton",
          position: "absolute",
          width: "100%",
          top: 40,
          fontSize: 70,
          color: "rgb(205, 205, 205)",
        }}
      >
        HomeGame
      </Box>}

      {!inGame && <HomeScreen setInGame={setInGame}></HomeScreen>}
      {inGame && <Table players={players}></Table>}
      <div>
      <h2>Flask-SocketIO Test</h2>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />{" "}
      <input
        type="text"
        value={messageSubject}
        onChange={(e) => setMessageSubject(e.target.value)}
        placeholder="Type a header"
      />
      <button onClick={sendMessage}>Send</button>
      <button onClick={sendTestMessage}>Send Test</button>
      <button onClick={sendJoinMessage}>Join Test</button>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
    </Box>
  );
}

export default Home;
