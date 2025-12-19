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
    socketRef.current = io("http://127.0.0.1:5000", {
      withCredentials: true,
      transports: ["websocket"],
    });
    
    setupSocketHandlers(socketRef.current, gameState);

    setSocketReady(true);

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

   const reconnectSocket = () => {
     return new Promise((resolve, reject) => {
       try {
         if (socketRef.current) {
           socketRef.current.disconnect();
         }

         const newSocket = io("http://127.0.0.1:5000", {
           withCredentials: true,
           transports: ["websocket"],
         });

         // Replace ref immediately so consumers get the new socket reference
         socketRef.current = newSocket;

         // Set up handlers for the new socket
         setupSocketHandlers(socketRef.current, gameState);
         setSocketReady(true);

         // Resolve when the socket connects, or reject on connection error
         const onConnect = () => {
           newSocket.off("connect_error", onConnectError);
           resolve(newSocket);
         };

         const onConnectError = (err) => {
           newSocket.off("connect", onConnect);
           reject(err);
         };

         newSocket.once("connect", onConnect);
         newSocket.once("connect_error", onConnectError);
       } catch (err) {
         reject(err);
       }
     });
   };

  const value = {
    socket: socketRef.current,
    socketReady,
    reconnectSocket
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};