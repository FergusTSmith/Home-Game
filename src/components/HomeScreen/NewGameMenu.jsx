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

function NewGameMenu({ socket, setPlayerDetails, playerDetails }) {
  const [formData, setFormData] = useState({
    hostPlayer: playerDetails.playerId,
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
    setPlayerDetails({ ...playerDetails, playerId: formData.hostPlayer });
    socket.emit("create_game", formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: { xs: "95vw", sm: "500px" },
        maxWidth: "98vw",
        minWidth: "320px",
        height: "auto",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "rgba(20,20,20,0.97)",
        border: "1.5px solid #222",
        borderRadius: 6,
        boxShadow: "0 8px 32px 0 rgbrgba(255, 255, 255, 0.1)",
        p: { xs: 2, sm: 4 },
        display: "flex",
        flexDirection: "column",
        gap: 3,
        overflow: "auto",
        fontFamily: "Orbiton, sans-serif",
        backdropFilter: "blur(4px)",
      }}
    >
      <Typography sx={{ color: "white", fontSize: 32, fontWeight: 700, mb: 2 }}>
        New Game
      </Typography>

      {/* Section: Player & Game Type */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <CustomisedTextField
          label="Your Display Name"
          name="hostPlayer"
          value={formData.hostPlayer}
          onChange={handleChange}
        />
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <label style={{ color: "white", fontWeight: 600, minWidth: 90 }}>
            Game Type
          </label>
          <div style={{ display: "flex", gap: "1em" }}>
            {["Cash", "Tournament"].map((elem) => (
              <label key={elem} style={{ color: "white", fontWeight: 500 }}>
                <input
                  type="radio"
                  name="gameType"
                  value={elem}
                  checked={formData.gameType === elem}
                  onChange={handleChange}
                  style={{
                    marginRight: "0.5em",
                    accentColor: "rgba(29, 156, 185, 0.8)",
                  }}
                />
                {elem}
              </label>
            ))}
          </div>
        </Box>
      </Box>

      {/* Section: Player Counts */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <CustomisedTextField
          label="Maximum Players"
          name="maxPlayers"
          value={formData.maxPlayers}
          onChange={handleChange}
          sx={{ flex: 2 }}
        />
        <CustomisedTextField
          label="Players Per Table"
          name="playersPerTable"
          value={formData.playersPerTable}
          onChange={handleChange}
          sx={{ flex: 1 }}
        />
      </Box>

      {/* Section: Blinds & Chips */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <CustomisedTextField
          label="Starting Chips"
          name="startingChips"
          value={formData.startingChips}
          onChange={handleChange}
        />
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

      {/* Section: Options */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <input
          type="checkbox"
          id="allowRebuys"
          name="allowRebuys"
          checked={formData.allowRebuys}
          onChange={handleChange}
          style={{
            marginRight: "0.5em",
            width: "18px",
            height: "18px",
            accentColor: "rgba(29, 156, 185, 0.8)",
          }}
        />
        <label
          htmlFor="allowRebuys"
          style={{ color: "white", fontWeight: 600 }}
        >
          Allow Rebuys
        </label>
        {formData.allowRebuys && (
          <CustomisedTextField
            label="Max Rebuys"
            name="maxRebuys"
            value={formData.maxRebuys}
            onChange={handleChange}
            sx={{ width: "120px" }}
          />
        )}
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <input
          type="checkbox"
          id="showHands"
          name="showHands"
          checked={formData.showHands}
          onChange={handleChange}
          style={{
            marginRight: "0.5em",
            width: "18px",
            height: "18px",
            accentColor: "rgba(29, 156, 185, 0.8)",
          }}
        />
        <label htmlFor="showHands" style={{ color: "white", fontWeight: 600 }}>
          Show Hands on Showdown
        </label>
      </Box>

      {/* Section: Game Speed */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <label style={{ color: "white", fontWeight: 600, minWidth: 90 }}>
          Game Speed
        </label>
        <div style={{ display: "flex", gap: "1em" }}>
          {["Very Slow", "Slow", "Medium", "Fast", "Very Fast"].map((speed) => (
            <label key={speed} style={{ color: "white", fontWeight: 500 }}>
              <input
                type="radio"
                name="gameSpeed"
                value={speed}
                checked={formData.gameSpeed === speed}
                onChange={handleChange}
                style={{
                  marginRight: "0.5em",
                  accentColor: "rgba(29, 156, 185, 0.8)",
                }}
              />
              {speed}
            </label>
          ))}
        </div>
      </Box>

      <Button
        variant="contained"
        type="submit"
        sx={{
          mt: 2,
          background:
            "linear-gradient(90deg,rgb(29, 149, 185) 0%,rgb(30, 141, 215) 100%)",
          color: "white",
          fontWeight: 700,
          fontSize: 18,
          borderRadius: 3,
          boxShadow: "0 2px 8px rgba(30,185,84,0.15)",
          textTransform: "none",
          letterSpacing: "0.03em",
          "&:hover": {
            background:
              "linear-gradient(90deg,rgb(30, 181, 215) 0%,rgb(29, 156, 185) 100%)",
            color: "#fff",
          },
          transition: "background 0.3s, color 0.3s",
        }}
      >
        Create Game
      </Button>
    </Box>
  );
}

export default NewGameMenu;
