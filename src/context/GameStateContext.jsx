import React, { createContext, useContext, useState, useRef } from 'react';

const GameStateContext = createContext();

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
};

export const GameStateProvider = ({ children }) => {
  // State variables
  const [messages, setMessages] = useState([]);
  const [inGame, setInGame] = useState(false);
  const [gameLobbyOpen, setGameLobbyOpen] = useState(true);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  const [gameDetails, setGameDetails] = useState({});
  const [storedGameDetails, setStoredGameDetails] = useState([]);
  const [playerDetails, setPlayerDetails] = useState({
    playerId: null,
    playerCards: [],
  });
  const [tableDetails, setTableDetails] = useState();
  const [playerTurn, setPlayerTurn] = useState(false);
  const [activePlayer, setActivePlayer] = useState(null);

  const [openTableDetails, setOpenTableDetails] = useState({});
  const [resultsText, setResultsText] = useState("");

  const [playerMessage, setPlayerMessage] = useState({});

  // Refs
  const gameDetailsRef = useRef();
  gameDetailsRef.current = gameDetails;

  const tableDetailsRef = useRef();
  tableDetailsRef.current = tableDetails;

  const playerDetailsRef = useRef();
  playerDetailsRef.current = playerDetails;

  const playerMessageRef = useRef();
  playerMessageRef.current = playerMessage;

  const openTableDetailsRef = useRef();
  openTableDetailsRef.current = openTableDetails;

  const activePlayerRef = useRef();
  activePlayerRef.current = activePlayer;

  const playerTurnRef = useRef();
  playerTurnRef.current = playerTurn;

  const resultsTextRef = useRef();
  resultsTextRef.current = resultsText;

  const messagesRef = useRef();
  messagesRef.current = messages;

  // Helper functions
  const handleHomeButton = () => {
    setStoredGameDetails([...storedGameDetails, gameDetailsRef.current]);
    setGameDetails({});
  };

  

  const settingsModalOpenRef = useRef();
  settingsModalOpenRef.current = settingsModalOpen;

  const rejoinGame = (gameId) => {
    console.log(
      "FERGUS REJOIN GAME ID @@@@@@@@@@@@@@",
      gameId,
      storedGameDetails[storedGameDetails.findIndex((g) => g.gameId === gameId)]
    );
    setGameDetails(storedGameDetails[storedGameDetails.findIndex(g => g.gameId === gameId)]);
    setStoredGameDetails({});
  };

  const isInGame = () => {
    return gameDetailsRef.current
      ? Object.keys(gameDetailsRef.current).length > 0
      : false;
  };

  const value = {
    // State
    messages,
    setMessages,
    inGame,
    setInGame,
    gameLobbyOpen,
    setGameLobbyOpen,
    gameDetails,
    setGameDetails,
    storedGameDetails,
    setStoredGameDetails,
    playerDetails,
    setPlayerDetails,
    tableDetails,
    setTableDetails,
    playerTurn,
    setPlayerTurn,
    activePlayer,
    setActivePlayer,
    openTableDetails,
    setOpenTableDetails,
    resultsText,
    setResultsText,
    setPlayerMessage,
    playerMessage,

    // Refs
    gameDetailsRef,
    tableDetailsRef,
    playerDetailsRef,
    openTableDetailsRef,
    activePlayerRef,
    playerTurnRef,
    resultsTextRef,
    messagesRef,
    playerMessageRef,

  
    settingsModalOpen,
    setSettingsModalOpen,  // Helper functions
    handleHomeButton,
    rejoinGame,
    isInGame,
  };

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
};