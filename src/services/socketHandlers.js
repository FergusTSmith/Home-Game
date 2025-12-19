import { data, table } from "framer-motion/client";

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

// Helper function to get card rank name
const getCardRankName = (card) => {
  const rankMap = {
    A: "Ace",
    K: "King",
    Q: "Queen",
    J: "Jack",
    10: "Ten",
    9: "Nine",
    8: "Eight",
    7: "Seven",
    6: "Six",
    5: "Five",
    4: "Four",
    3: "Three",
    2: "Two",
  };
  const rank = card.slice(0, -1); // Remove suit
  return rankMap[rank] || rank;
};

// Helper function to get detailed hand description
const getDetailedHandDescription = (handRanking) => {
  console.log(
    "FERGUS ********** HAND WINNER DETAILED HAND RANKING ???????",
    handRanking
  );
  if (!handRanking || !handRanking.best_hand) {
    return null;
  }

  const { rank, best_hand } = handRanking;
  const cards = best_hand.map((card) => ({
    rank: card.slice(0, -1),
    suit: card.slice(-1),
    name: getCardRankName(card),
  }));

  console.log("FERGUS ********** HAND WINNER DETAILED HAND CARDS", cards, rank);

  switch (rank) {
    case 10: // Royal Flush
      return "a Royal Flush";

    case 9: // Straight Flush
      return `an ${cards[0].name} high Straight Flush`;

    case 8: {
      // Four of a Kind
      const fourKind = cards.find(
        (c, i, arr) => arr.filter((card) => card.rank === c.rank).length === 4
      );
      return `Four ${fourKind.name}s`;
    }

    case 7: {
      // Full House
      const rankCounts = {};
      cards.forEach(
        (c) => (rankCounts[c.rank] = (rankCounts[c.rank] || 0) + 1)
      );
      const triple = cards.find((c) => rankCounts[c.rank] === 3);
      const pair = cards.find((c) => rankCounts[c.rank] === 2);
      return `${triple.name}s full of ${pair.name}s`;
    }

    case 6: // Flush
      return `an ${cards[0].name} high Flush`;

    case 5: // Straight
      return `an ${cards[0].name} high Straight`;

    case 4: {
      // Three of a Kind
      const threeKind = cards.find(
        (c, i, arr) => arr.filter((card) => card.rank === c.rank).length === 3
      );
      return `Three ${threeKind.name}s`;
    }

    case 3: {
      // Two Pair
      const rankCounts = {};
      cards.forEach(
        (c) => (rankCounts[c.rank] = (rankCounts[c.rank] || 0) + 1)
      );
      const pairs = cards.filter((c) => rankCounts[c.rank] === 2);
      const uniquePairs = [...new Set(pairs.map((p) => p.name))];
      return `${uniquePairs[0]}s and ${uniquePairs[1]}s`;
    }

    case 2: {
      // One Pair
      const pair = cards.find(
        (c, i, arr) => arr.filter((card) => card.rank === c.rank).length === 2
      );
      return `a pair of ${pair.name}s`;
    }

    case 1: // High Card
      return `${cards[0].name} high`;

    default:
      return rankingMap[rank];
  }
};

// Helper function to create game message for hand winner
const createHandWinnerMessage = (data) => {
  const detailedHand = getDetailedHandDescription(data.handRanking);

  console.log(
    "FERGUS ********** HAND WINNER DETAILED MESSAGE",
    detailedHand,
    data
  );

  if (detailedHand) {
    return `${data.playerId} wins the hand with ${detailedHand}, winning ${data.pot}`;
  } else {
    return `${data.playerId} wins the hand, winning ${data.pot}`;
  }
};

export const setupSocketHandlers = (socket, gameState) => {
  const {
    setGameDetails,
    setTableDetails,
    storedGameDetails,
    setStoredGameDetails,
    setPlayerDetails,
    setPlayerTurn,
    setActivePlayer,
    setResultsText,
    tableDetailsRef,
    playerDetailsRef,
    setMessages,
    messagesRef,
    setPlayerMessage,
    playerMessageRef,
  } = gameState;

  // Connection handlers
  socket.on("connect", () => {
    console.log("Connected to server", socket.id);
  });

  // Debug: log every incoming event to help trace missing events (e.g. showHands)
  socket.onAny((event, ...args) => {
    console.log("Fergus ******************* ONANY RECEIVED", event, args);
  });

  socket.on("disconnect", () => {
    console.log("client disconnected");
  });

  // Game start/join handlers
  socket.on("gameStartSuccess", (data) => {
    console.log(
      "Fergus setGameDetails setting data",
      data.game,
      "event: gameStartSuccess"
    );
    setGameDetails(data.game);
  });

  socket.on("gameJoinSuccess", (data) => {
    console.log(
      "Fergus setGameDetails setting data",
      data.game,
      "event: gameJoinSuccess"
    );
    setGameDetails(data.game);
  });

  socket.on("gameJoinFailure", (data) => {
    // Handle game join failure if needed
  });

  socket.on("logout_response", (data) => {
    console.log("FERGUS LOGOUT RESPONSE", data);
    setPlayerDetails({ playerId: null, playerCards: [] });
  });

  // Player movement and actions
  socket.on("player_joined", (data) => {
    console.log(
      "Fergus setGameDetails setting data",
      data.game,
      "event: player_joined"
    );
    setGameDetails(data.game);

    if (
      tableDetailsRef.current &&
      tableDetailsRef.current.uniqueID === data.table.uniqueID
    ) {
      console.log(
        "Fergus setTableDetails setting data",
        data.table,
        "event: player_joined"
      );
      setTableDetails(data.table);
    }
  });

  socket.on("playerMove", (data) => {
    try {
      console.log("FERGUS ********** PLAYER MOVE", data);
      console.log(
        "Fergus setTableDetails setting data",
        data.table,
        "event: playerMove"
      );
      setTableDetails(data.table);
      console.log(
        "Fergus setActivePlayer setting data",
        null,
        "event: playerMove"
      );
      setActivePlayer(null);
      console.log("FERGUS ********** PLAYER MOVE !@!@!@!@!@!@!@!@!", data);
    } catch (err) {
      console.error("Error in playerMove handler", err, data);
    }
  });

  socket.on("player_taken_seat", (data) => {
    console.log("FERGUS ********** PLAYER TAKEN SEAT", data);
    console.log(
      "Fergus setGameDetails setting data",
      data.game,
      "event: player_taken_seat"
    );
    setGameDetails(data.game);
    console.log(
      "Fergus setTableDetails setting data",
      data.table,
      "event: player_taken_seat"
    );
    setTableDetails(data.table);
  });

  // Round and game progression
  socket.on("new_round", (data) => {
    try {
      console.log("FERGUS ********** NEW ROUND", data);
      console.log(
        "Fergus setTableDetails setting data",
        data.table,
        "event: new_round"
      );
      setTableDetails(data.table);
      console.log(
        "Fergus setPlayerTurn setting data",
        false,
        "event: new_round"
      );
      setPlayerTurn(false);
      console.log(
        "Fergus setActivePlayer setting data",
        null,
        "event: new_round"
      );
      setActivePlayer(null);
    } catch (err) {
      console.error("Error in new_round handler", err, data);
    }
  });

  socket.on("showHands", (data) => {
    try {
      console.log("FERGUS ********** SHOW HANDS", data);
      const table =
        data && (data.table || (data.data && data.data.table))
          ? data.table || data.data.table
          : data;
      console.log(
        "Fergus setTableDetails setting data",
        table,
        "event: showHands"
      );
      setTableDetails(table);
    } catch (err) {
      console.error("Error in showHands handler", err, data);
    }
  });

  socket.on("player_seated", (data) => {
    console.log(
      "Fergus setGameDetails setting data",
      data.game,
      "event: player_seated"
    );
    setGameDetails(data.game);
    console.log(
      "Fergus setTableDetails setting data",
      data.table,
      "event: player_seated"
    );
    setTableDetails(data.table);
  });

  // Hand results and winners
  socket.on("hand_results", (data) => {
    console.log("FERGUS ********** HAND RESULTS", data);
    console.log(
      "Fergus setTableDetails setting data",
      data.table,
      "event: hand_results"
    );
    setTableDetails(data.table);

    if (data.multipleWinners) {
      const winners =
        data.winners.map((w) => `${w.winnerId}`).join(" & ") +
        " with " +
        rankingMap[data.winningHandRank];
      const resultsText = `The winners are ${winners}, winning ${data.pot}`;
      console.log(
        "Fergus setResultsText setting data",
        resultsText,
        "event: hand_results"
      );
      setResultsText(resultsText);
    } else {
      const resultsText = `The winner is ${data.winnerId} with ${
        rankingMap[data.winningHandRank]
      }, winning ${data.pot}`;
      console.log(
        "Fergus setResultsText setting data",
        resultsText,
        "event: hand_results"
      );
      setResultsText(resultsText);
    }
  });

  // Blinds and game setup
  socket.on("blindsAssigned", (data) => {
    console.log("FERGUS ********** BLINDS ASSIGNED", data);
    console.log(
      "Fergus setTableDetails setting data",
      data.table,
      "event: blindsAssigned"
    );

    if (
      tableDetailsRef.current &&
      playerDetailsRef.current === data.smallBlind
    ) {
      setPlayerDetails({
        ...playerDetailsRef.current,
        playerBet: data.table.smallBlind,
      });
    }

    if (tableDetailsRef.current && playerDetailsRef.current === data.bigBlind) {
      setPlayerDetails({
        ...playerDetailsRef.current,
        playerBet: data.table.bigBlind,
      });
    }
    setTableDetails(data.table);
  });

  socket.on("game_started", (data) => {
    console.log("FERGUS ********** GAME STARTED", data);
    console.log(
      "Fergus setGameDetails setting data",
      data.game,
      "event: game_started"
    );
    setGameDetails(data.game);
  });

  // Card dealing
  socket.on("preFlopCards", (data) => {
    try {
      console.log("FERGUS ********** PREFLOP CARDS", data);
      const newPlayerDetails = {
        ...playerDetailsRef.current,
        playerCards: data.cards,
        playerBet: data.bet,
      };
      console.log(
        "Fergus setPlayerDetails setting data",
        newPlayerDetails,
        "event: preFlopCards"
      );
      setPlayerDetails(newPlayerDetails);
    } catch (err) {
      console.error("Error in preFlopCards handler", err, data);
    }
  });

  socket.on("player_rejoined_table", (data) => {
    console.log("FERGUS ********** PLAYER REJOINED TABLE", data);
    console.log(
      "Fergus setTableDetails setting data",
      data.table,
      "event: player_rejoined_table"
    );
    setTableDetails(data.table);
  })

  // Player turn management
  socket.on("playerTurn", (data) => {
    try {
      console.log(
        "FERGUS ********* PLAYERTURN fwqgoperjngierkqngeitgnetkgn",
        playerDetailsRef.current.playerId,
        data,
        playerDetailsRef.current.playerId === data
      );

      if (playerDetailsRef.current.playerId === data.playerId) {
        console.log(
          "FERGUS ********* SETTING PLAYER TUURN @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
        );
        console.log(
          "Fergus setPlayerTurn setting data",
          true,
          "event: playerTurn"
        );
        setPlayerTurn(true);
      } else {
        console.log(
          "Fergus setPlayerTurn setting data",
          false,
          "event: playerTurn"
        );
        setPlayerTurn(false);
      }

      console.log(
        "Fergus setActivePlayer setting data",
        data.playerId,
        "event: playerTurn"
      );
      setActivePlayer(data.playerId);

      console.log(
        "Fergus setTableDetails setting data",
        data.game,
        "event: playerTurn"
      );
      setTableDetails(data.game);

      console.log("FERGUS ********** GAMEDETAILS", data.game);
      console.log("FERGUS ********** PLAYERTURN DATA", data);
    } catch (err) {
      console.error("Error in playerTurn handler", err, data);
    }
  });

  socket.on("table_opened", (data) => {
    console.log("FERGUS ********** TABLE OPENED", data);
    console.log("FERGUS ********** TABLE OPENED HANDLER", data.table);
    const table =
      data && (data.table || (data.data && data.data.table))
        ? data.table || data.data.table
        : data;
    console.log(
      "Fergus setTableDetails setting data",
      table,
      "event: table_opened"
    );
    setTableDetails(table);
  });

  socket.on("new_chat_message", (data) => {
    console.log("FERGUS ********** NEW CHAT MESSAGE", data);
    const newMessages = [...messagesRef.current, data];
    console.log(
      "Fergus setMessages setting data",
      newMessages,
      "event: new_chat_message"
    );
    setMessages(newMessages);
    const newPlayerMessage = {
      ...playerMessageRef.current,
      [data.playerId]: data.message,
    };
    console.log(
      "Fergus setPlayerMessage setting data",
      newPlayerMessage,
      "event: new_chat_message"
    );
    setPlayerMessage(newPlayerMessage);

    setTimeout(() => {
      const clearedMessage = {
        ...playerMessageRef.current,
        [data.playerId]: "",
      };
      console.log(
        "Fergus setPlayerMessage setting data",
        clearedMessage,
        "event: new_chat_message"
      );
      setPlayerMessage(clearedMessage);
    }, [3000]);
    // if (
    //   playerDetailsRef &&
    //   data.playerId === playerDetailsRef.current.playerId
    // ) {
    //   setPlayerMessage(data.message);
    //   console.log("fergus test passed");
    //   setTimeout(() => {
    //     setPlayerMessage();
    //   }, [5000]);
    // }
  });

  socket.on("reconnect_sync", (payload) => {
    console.log(
      "FERGUS RECONNECT SYNC PAYLOAD ********************************************************",
      payload
    );
    setStoredGameDetails([...storedGameDetails, payload.game]);
    // payload: { game: {...}, playerId: 'Fergus' }
    // Replace local game state with payload.game and set current player
  });

  socket.on("hand_winner", (data) => {
    console.log("FERGUS ********** HAND WINNER", data);

    const gameMessage = createHandWinnerMessage(data);

    const dataWithMessage = {
      ...data,
      message: gameMessage,
      gameMessage: true,
    };

    const newMessagesWithWinner = [...messagesRef.current, dataWithMessage];
    console.log(
      "Fergus setMessages setting data",
      newMessagesWithWinner,
      "event: hand_winner"
    );
    setMessages(newMessagesWithWinner);
    // setTableDetails(data.table);
  });

  socket.on("register_response", (data) => {
    console.log("FERGUS ********** REGISTER RESPONSE", data);

    if (data.success) {
      const pd = { ...playerDetailsRef.current, playerId: data.user.username };
      console.log(
        "Fergus setPlayerDetails setting data",
        pd,
        "event: register_response"
      );
      setPlayerDetails(pd);
    } else {
    }
    // Handle registration response if needed
  });

  socket.on("login_response", (data) => {
    console.log(
      "FERGUS ********** ***************************** LOGIN RESPONSE",
      data
    );

    if (data.success) {
      const pd = { ...playerDetailsRef.current, playerId: data.user.username };
      console.log(
        "Fergus setPlayerDetails setting data",
        pd,
        "event: login_response"
      );
      setPlayerDetails(pd);
    } else {
    }
    // Handle login response if needed
  });

  socket.on("auto_login_response", (data) => {
    console.log("FERGUS AUTO LOGIN RESPONSE", data);
    if (data.success) {
      console.log(
        "FERGUS AUTO LOGIN SUCCESS SETTING PLAYER DETAILS",
        data.username
      );
      const pd = { ...playerDetailsRef.current, playerId: data?.username };
      if (data?.username) socket.emit("identify", { username: data.username });

      console.log(
        "Fergus setPlayerDetails setting data",
        pd,
        "event: auto_login_response"
      );
      setPlayerDetails(pd);
    }
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
