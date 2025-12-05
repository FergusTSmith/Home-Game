import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { useGameState } from './GameStateContext';
import { setupSocketHandlers } from '../services/socketHandlers';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const socketRef = useRef();
  const [socketReady, setSocketReady] = useState(false);
  const gameState = useGameState();

  useEffect(() => {
    socketRef.current = io("http://127.0.0.1:5000", { transports: ["websocket"] });
    
    setupSocketHandlers(socketRef.current, gameState);

    setSocketReady(true);

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const value = {
    socket: socketRef.current,
    socketReady,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};