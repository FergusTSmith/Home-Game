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

  // Refs
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

  const messagesRef = useRef();
  messagesRef.current = messages;

  // Helper functions
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

    // Refs
    gameDetailsRef,
    tableDetailsRef,
    playerDetailsRef,
    openTableDetailsRef,
    activePlayerRef,
    playerTurnRef,
    resultsTextRef,
    messagesRef,

    // Helper functions
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