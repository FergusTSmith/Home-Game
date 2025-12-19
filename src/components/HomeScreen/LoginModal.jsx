import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import CustomisedTextField from "./NewGameForm/CustomisedTextField";
import { useSocket } from "../../context/SocketContext";
import { io } from "socket.io-client";

function LoginModal({ setPlayerDetails, playerDetails }) {
  const { socket, reconnectSocket } = useSocket();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setPlayerDetails({ ...playerDetails, playerId: formData.playerId });
    console.log("FERGUS SUBMIT", formData);

    await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
    }).then((response) => {
      if (response.status === 200) {
        setPlayerDetails({ ...playerDetails, playerId: formData.username });
        socket.emit('identify', { username: formData.username });
      }
      console.log("FERGUS LOGIN RESPONSE", response);
    });

    try {
      if (reconnectSocket) {
        const newSocket = await reconnectSocket();
        if (newSocket && newSocket.connected) {
          console.log("Socket reconnected (promise), emitting login");
          newSocket.emit("login", formData);
        } else if (socket && socket.connected) {
          console.log("Existing socket connected, emitting login");
          socket.emit("login", formData);
        } else if (socket) {
          // As a final fallback, wait for connect then emit
          socket.once("connect", () => {
            console.log("Socket connected (fallback), emitting login");
            socket.emit("login", formData);
          });
        }
      } else if (socket) {
        if (socket.connected) {
          socket.emit("login", formData);
        } else {
          socket.once("connect", () => socket.emit("login", formData));
        }
      }
    } catch (err) {
      console.error("Error while reconnecting/emitting login", err);
      // If reconnect failed, try to emit on existing socket when it connects
      if (socket) {
        socket.once("connect", () => socket.emit("login", formData));
      }
    }
  };
  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit}
      sx={{
        height: "40vh",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: 13,
        opacity: 0.9,
        boxShadow: 24,
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        overflow: "scroll",
        alignItems: "center", // <-- Center horizontally
        justifyContent: "center", // <-- Center vertically
        textAlign: "center", // <-- Center text
      }}
    >
      <Typography sx={{ color: "white", fontSize: 40, fontFamily: "Orbiton" }}>
        Login
      </Typography>
      <CustomisedTextField
        label="Desired Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <CustomisedTextField
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <Button variant="contained" type="submit">
        Login
      </Button>
    </Box>
  );
}

export default LoginModal;
