import React, { useState } from "react";
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  Typography,
  Button,
  FormLabel,
} from "@mui/material";
import CustomisedTextField from "./NewGameForm/CustomisedTextField";
import { io } from "socket.io-client";

function NewGameMenu({socket, setPlayerDetails, playerDetails}) {
  const [formData, setFormData] = useState({
    hostPlayer: playerDetails,
    maxPlayers: 10,
    playersPerTable: 2,
    gameType: "Cash",
    startingChips: 10000,
    smallBlind: 50,
    bigBlind: 100,
    allowRebuys: true,
    maxRebuys: 2,
    showHands: true,
    gameSpeed: "Medium",
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
    setPlayerDetails(formData.hostPlayer)
    console.log("FERGUS PLAYERDETAILS", formData.hostPlayer)
    console.log("Sending data to backend:", formData);
    socket.emit("create_game", formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        height: "60vh",
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
        New Game
      </Typography>

      <CustomisedTextField
        label="Your Display Name"
        name="hostPlayer"
        value={formData.hostPlayer}
        onChange={handleChange}
      />
      <CustomisedTextField
        label="Maximum Players"
        name="maxPlayers"
        value={formData.maxPlayers}
        onChange={handleChange}
      />

      <CustomisedTextField
        label="Players Per Table"
        name="playersPerTable"
        value={formData.playersPerTable}
        onChange={handleChange}
      />
      <Box sx={{ display: "flex" }}>
        <FormLabel sx={{ color: "white" }}>Game Type</FormLabel>
        <RadioGroup
          row
          name="gameType"
          value={formData.gameType}
          onChange={handleChange}
        >
          {["Cash", "Tournament"].map((elem) => {
            return (
              <FormControlLabel
                value={elem}
                control={<Radio />}
                label={elem}
                sx={{ color: "white" }}
              />
            );
          })}
        </RadioGroup>
      </Box>

      <CustomisedTextField
        label="Starting Chips"
        name="startingChips"
        value={formData.startingChips}
        onChange={handleChange}
      />

      <Box sx={{ display: "flex", gap: 2 }}>
        <CustomisedTextField
          label="Small Blind"
          name="smallBlind"
          value={formData.smallBlind}
          onChange={handleChange}
        />
        <CustomisedTextField
          label="Big Blind"
          name="bigBlind"
          value={formData.bigBlind}
          onChange={handleChange}
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "70%" }}>
        <FormControlLabel
          control={
            <Switch
              checked={formData.allowRebuys}
              onChange={handleChange}
              name="allowRebuys"
            />
          }
          label="Allow Rebuys"
          sx={{ color: "white" }}
        />
        {formData.allowRebuys && (
          <CustomisedTextField
            label="Max Rebuys"
            name="maxRebuys"
            value={formData.maxRebuys}
            onChange={handleChange}
          />
        )}
      </Box>

      <FormControlLabel
        control={
          <Switch
            checked={formData.showHands}
            onChange={handleChange}
            name="showHands"
          />
        }
        label="Show Hands on Showdown"
        sx={{ color: "white" }}
      />

      <Typography sx={{ color: "white" }}>Game Speed</Typography>
      <RadioGroup
        row
        name="gameSpeed"
        value={formData.gameSpeed}
        onChange={handleChange}
      >
        {["Very Slow", "Slow", "Medium", "Fast", "Very Fast"].map((speed) => (
          <FormControlLabel
            key={speed}
            value={speed}
            control={<Radio />}
            label={speed}
            sx={{ color: "white" }}
          />
        ))}
      </RadioGroup>

      <Button variant="contained" type="submit">
        Create Game
      </Button>
    </Box>
  );
}

export default NewGameMenu;
