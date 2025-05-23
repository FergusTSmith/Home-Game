import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import CustomisedTextField from "./NewGameForm/CustomisedTextField";

function JoinGameModal({socket, setPlayerDetails, playerDetails}) {
  const [formData, setFormData] = useState({
    playerId: playerDetails,
    gameId: "",
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlayerDetails(formData.playerId)
    console.log("FERGUS PLAYERDETAILS 2222", formData.playerId)

    console.log("Sending data to backend:", formData);
    socket.emit("join_game", formData);
  };
  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit}
      sx={{
        height: "30vh",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "black",
        border: "2px solid #000000",
        borderRadius: 13,
        opacity: 0.9,
        boxShadow: 24,
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        overflow: "scroll",
      }}
    >
      <Typography sx={{ color: "white", fontSize: 40, fontFamily: "Orbiton" }}>
        Join Game
      </Typography>
      <CustomisedTextField
        label="Your Display Name"
        name="playerId"
        value={formData.playerId}
        onChange={handleChange}
      />
      <CustomisedTextField
        label="Game ID"
        name="gameId"
        value={formData.gameId}
        onChange={handleChange}
      />
      <Button variant="contained" type="submit">
        Join Game
      </Button>
    </Box>
  );
}

export default JoinGameModal;
