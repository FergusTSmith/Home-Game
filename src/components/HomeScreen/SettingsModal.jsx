import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import CustomisedTextField from "./NewGameForm/CustomisedTextField";
import { useSocket } from "../../context/SocketContext";
import { io } from "socket.io-client";

function SettingsModal({ setPlayerDetails, playerDetails }) {
  const { socket, reconnectSocket } = useSocket();
  const [formData, setFormData] = useState({
    username: playerDetails.playerId,
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
    console.log("FERGUS logout SUBMIT", formData);

    // if (socket) {
    //   socket.emit("logout", { username: playerDetails.playerId });
    // }
    await fetch("http://127.0.0.1:5000/logout", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.username,
      }),
    }).then((response) => {
      if (response.status === 200) {
        setPlayerDetails({ playerId: null, playerCards: [] });
      }
    });
  };
  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit}
      sx={{
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
        justifyContent: "space-between", // <-- Center vertically
        textAlign: "center", // <-- Center text
      }}
    >
      <Typography sx={{ color: "white", fontSize: 30, fontFamily: "Orbiton" }}>
        Settings
      </Typography>
      <Button variant="contained" type="submit">
        Logout
      </Button>
    </Box>
  );
}

export default SettingsModal;
