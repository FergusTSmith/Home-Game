// Ranking map for poker hands
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

export const setupSocketHandlers = (socket, gameState) => {
  const {
    setGameDetails,
    setTableDetails,
    setPlayerDetails,
    setPlayerTurn,
    setActivePlayer,
    setResultsText,
    tableDetailsRef,
    playerDetailsRef,
    setMessages,
    messagesRef,
  } = gameState;

  // Connection handlers
  socket.on("connect", () => {
    console.log("Connected to server");
  });

  socket.on("disconnect", () => {
    console.log("client disconnected");
  });

  // Game start/join handlers
  socket.on("gameStartSuccess", (data) => {
    setGameDetails(data.game);
  });

  socket.on("gameJoinSuccess", (data) => {
    setGameDetails(data.game);
  });

  socket.on("gameJoinFailure", (data) => {
    // Handle game join failure if needed
  });

  // Player movement and actions
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
    setTableDetails(data.table);
    setActivePlayer(null);
    console.log("FERGUS PLAYER MOVE !@!@!@!@!@!@!@!@!", data);
  });

  socket.on("player_taken_seat", (data) => {
    setGameDetails(data.game);
    setTableDetails(data.table);
  });

  // Round and game progression
  socket.on("new_round", (data) => {
    console.log("FERGUS NEW ROUND", data);
    setTableDetails(data.table);
    setPlayerTurn(false);
    setActivePlayer(null);
  });

  socket.on('showHands', (data) => {
    console.log("FERGUS SHOW HANDS", data);
    setTableDetails(data.table);
  });

  socket.on("player_seated", (data) => {
    setGameDetails(data.game);
    setTableDetails(data.table);
  });

  // Hand results and winners
  socket.on("hand_results", (data) => {
    console.log("FERGUS HAND RESULTS", data);
    setTableDetails(data.table);
    
    if (data.multipleWinners) {
      const winners =
        data.winners.map((w) => `${w.winnerId}`).join(" & ") +
        " with " + rankingMap[data.winningHandRank];
      const resultsText = `The winners are ${winners}, winning ${data.pot}`;
      setResultsText(resultsText);
    } else {
      const resultsText = `The winner is ${data.winnerId} with ${
        rankingMap[data.winningHandRank]
      }, winning ${data.pot}`;
      setResultsText(resultsText);
    }
  });

  // Blinds and game setup
  socket.on("blindsAssigned", (data) => {
    console.log("FERGUS BLINDS ASSIGNED", data)
    setTableDetails(data.table)
  });

  socket.on("game_started", (data) => {
    console.log("FERGUS GAME STARTED");
    setGameDetails(data.game);
  });

  // Card dealing
  socket.on("preFlopCards", (data) => {
    setPlayerDetails({
      ...playerDetailsRef.current,
      playerCards: data,
    });
  });

  // Player turn management
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

  socket.on("table_opened", (data) => {
    console.log("FERGUS TABLE OPENED", data);
    console.log("FERGUS TABLE OPENED HANDLER", data.table);
    setTableDetails(data.data.table);
  });

  socket.on("new_chat_message", (data) => {
    console.log("FERGUS NEW CHAT MESSAGE", data);
    setMessages([...messagesRef.current, data]);
  });

  return () => {
    socket.off("connect");
    socket.off("disconnect");
    socket.off("gameStartSuccess");
    socket.off("gameJoinSuccess");
    socket.off("gameJoinFailure");
    socket.off("player_joined");
    socket.off("playerMove");
    socket.off("player_taken_seat");
    socket.off("new_round");
    socket.off("showHands");
    socket.off("player_seated");
    socket.off("hand_results");
    socket.off("blindsAssigned");
    socket.off("game_started");
    socket.off("preFlopCards");
    socket.off("playerTurn");
    socket.off("table_opened");
    socket.off("new_chat_message");
  };
};