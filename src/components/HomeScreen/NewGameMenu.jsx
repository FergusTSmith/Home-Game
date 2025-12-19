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
import { useSocket } from "../../context/SocketContext";

const speeds = ["Very Slow", "Slow", "Normal", "Fast", "Very Fast"];

function NewGameMenu({ setPlayerDetails, playerDetails }) {
  const { socket } = useSocket();
  const [formData, setFormData] = useState({
    hostPlayer: playerDetails.playerId,
    maxPlayers: 10,
    playersPerTable: 2,
    gameType: "Cash",
    startingChips: 10000,
    smallBlind: 50,
    bigBlind: 100,
    ante: 20,
    allowRebuys: true,
    maxRebuys: 2,
    showHands: true,
    gameSpeed: "Normal",
  });
  const [advancedOptionsDisplayed, setAdvancedOptionsDisplayed] =
    useState(false);

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

    console.log("FERGUS CREATE GAME SUBMIT", formData);
    if (socket) {
      socket.emit("create_game", formData);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: { xs: "95vw", sm: "500px" },
        maxWidth: "98vw",
        minWidth: "320px",
        height: "80vh",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        padding: 3,
        borderRadius: 3,
        boxShadow: "0 8px 32px 0 rgbrgba(255, 255, 255, 0.1)",
        p: { xs: 2, sm: 4 },
        display: "flex",
        flexDirection: "column",
        // gap: 3,
        overflow: "auto",
        fontFamily: "Orbiton, sans-serif",
      }}
    >
      <Typography
        sx={{
          color: "white",
          fontSize: 32,
          fontWeight: 700,
          mb: 2,
          textAlign: "center",
          fontFamily: "Orbiton",
        }}
      >
        New Game
      </Typography>

      {/* Section: Player & Game Type */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 10 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            // background: "pink",
            justifyContent: "space-between",
          }}
        >
          <label
            style={{
              color: "white",
              fontWeight: 600,
              minWidth: 90,
              fontSize: "0.8em",
            }}
          >
            Game Type
          </label>
          <div style={{ display: "flex", gap: "1em" }}>
            {["Cash", "Tournament"].map((elem) => (
              <label
                key={elem}
                style={{ color: "white", fontWeight: 500, fontSize: "0.8em" }}
              >
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
      <hr style={{ width: "80%", margin: "25px auto", opacity: 0.2 }} />

      {/* Section: Player Counts */}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <label
            style={{
              color: "white",
              fontWeight: 600,
              minWidth: 90,
              fontSize: "0.8em",
            }}
          >
            Maximum Players
          </label>
          <CustomisedTextField
            // label="Maximum Players"
            name="maxPlayers"
            value={formData.maxPlayers}
            onChange={handleChange}
            style={{ height: "0.5vh", width: "15%" }}
            // color={"yellow"}
            bodyStyle={{ height: "vh", width: "50%", fontSize: "0.8em" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <label
            style={{
              color: "white",
              fontWeight: 600,
              minWidth: 90,
              fontSize: "0.8em",
            }}
          >
            Players Per Table
          </label>
          <CustomisedTextField
            // label="Players Per Table"
            name="playersPerTable"
            value={formData.playersPerTable}
            onChange={handleChange}
            style={{ height: "0.5vh", width: "15%" }}
            // color={"yellow"}
            bodyStyle={{ height: "10%", width: "50%" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <label
            style={{
              color: "white",
              fontWeight: 600,
              minWidth: 90,
              fontSize: "0.8em",
            }}
          >
            Number of Tables
          </label>
          <CustomisedTextField
            // label="Players Per Table"
            name="playersPerTable"
            value={formData.playersPerTable}
            onChange={handleChange}
            style={{ height: "0.5vh", width: "15%" }}
            // color={"yellow"}
            bodyStyle={{ height: "10%", width: "50%" }}
          />
        </Box>
      </Box>

      <hr style={{ width: "80%", margin: "25px auto", opacity: 0.2 }} />

      {/* Section: Blinds & Chips */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <CustomisedTextField
            label="Starting Chips"
            name="startingChips"
            value={formData.startingChips}
            onChange={handleChange}
            // color={"orange"}
            style={{ height: "1vh", backgroundColor: "purple" }}
            // bodyStyle={{ width: "4vw" }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
            // background: "pink",
          }}
        >
          <CustomisedTextField
            label="Small Blind"
            name="smallBlind"
            value={formData.smallBlind}
            onChange={handleChange}
            // color={"cyan"}
          />
          <CustomisedTextField
            label="Big Blind"
            name="bigBlind"
            value={formData.bigBlind}
            onChange={handleChange}
            // color={"grey"}
          />
          <CustomisedTextField
            label="Ante"
            name="ante"
            value={formData.ante}
            onChange={handleChange}
            // color={"grey"}
          />
        </Box>
      </Box>

      <hr style={{ width: "80%", margin: "25px auto", opacity: 0.2 }} />

      {/* Section: Options */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          // background: "magenta",
          justifyContent: "space-between",
          fontSize: "0.8em",
        }}
      >
        <Box>
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
            style={{
              color: "white",
              fontWeight: 600,
              justifyContent: "center",
              fontSize: 12,
            }}
          >
            Allow Rebuys
          </label>
        </Box>

        {formData.allowRebuys && (
          <CustomisedTextField
            style={{ height: "1vh", width: "20%" }}
            label="Max Rebuys"
            name="maxRebuys"
            value={formData.maxRebuys}
            onChange={handleChange}
            // color={"purple"}
            bodyStyle={{ height: "20%" }}
          />
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          // background: "lightgreen",
        }}
      >
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
        <label
          htmlFor="showHands"
          style={{ color: "white", fontWeight: 600, fontSize: 12 }}
        >
          Show Hands on Showdown
        </label>
      </Box>
      <hr style={{ width: "80%", margin: "25px auto", opacity: 0.2 }} />

      {/* Section: Game Speed */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexDirection: "row",
          // background: "lightblue",
        }}
      >
        <label
          style={{
            color: "white",
            fontWeight: 600,
            minWidth: 100,
            fontSize: "0.8em",
          }}
        >
          Game Speed
        </label>
        <div style={{ display: "flex", gap: "1em" }}>
          {speeds.map((speed) => (
            <label
              key={speed}
              style={{ color: "white", fontWeight: 500, fontSize: "0.7em" }}
            >
              <input
                type="radio"
                name="gameSpeed"
                value={speed}
                checked={formData.gameSpeed === speed}
                onChange={handleChange}
                style={{
                  marginRight: "0.5em",
                  accentColor: "rgba(29, 156, 185, 0.8)",
                  fontSize: "0.2em",
                }}
              />
              {speed}
            </label>
          ))}
        </div>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <hr style={{ width: "80%", margin: "25px auto", opacity: 0.2 }} />
        <Typography
          sx={{
            color: "white",
            fontFamily: "Orbiton",
            fontSize: 10,
            textAlign: "center",
            cursor: "pointer",
            opacity: 0.4,
            ":hover": {
              opacity: 0.9,
            },
            transition: "opacity ease 0.5s",
          }}
          onClick={() =>
            advancedOptionsDisplayed
              ? setAdvancedOptionsDisplayed(false)
              : setAdvancedOptionsDisplayed(true)
          }
        >
          Advanced Options
        </Typography>
        {advancedOptionsDisplayed && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mt: 2,
              color: "white",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                // background: "lightgreen",
              }}
            ></Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <label
                style={{
                  color: "white",
                  fontWeight: 600,
                  minWidth: 90,
                  fontSize: "0.8em",
                }}
              >
                Seconds Between Rounds
              </label>
              <CustomisedTextField
                // label="Maximum Players"
                name="maxPlayers"
                value={formData.maxPlayers}
                onChange={handleChange}
                style={{ height: "1vh", width: "20%" }}
                // color={"yellow"}
                bodyStyle={{ height: "20%" }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <label
                style={{
                  color: "white",
                  fontWeight: 600,
                  minWidth: 90,
                  fontSize: "0.8em",
                }}
              >
                Seconds waited on Showdown
              </label>
              <CustomisedTextField
                // label="Maximum Players"
                name="maxPlayers"
                value={formData.maxPlayers}
                onChange={handleChange}
                style={{ height: "1vh", width: "20%" }}
                // color={"yellow"}
                bodyStyle={{ height: "20%" }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <label
                style={{
                  color: "white",
                  fontWeight: 600,
                  minWidth: 90,
                  fontSize: "0.8em",
                }}
              >
                Seconds Per Turn
              </label>
              <CustomisedTextField
                // label="Maximum Players"
                name="maxPlayers"
                value={formData.maxPlayers}
                onChange={handleChange}
                style={{ height: "1vh", width: "20%" }}
                // color={"yellow"}
                bodyStyle={{ height: "20%" }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                // background: "lightgreen",
              }}
            >
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
              <label
                htmlFor="showHands"
                style={{ color: "white", fontWeight: 600, fontSize: 12 }}
              >
                Optional Show Hand on Last Fold
              </label>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                // background: "lightgreen",
              }}
            >
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
              <label
                htmlFor="showHands"
                style={{ color: "white", fontWeight: 600, fontSize: 12 }}
              >
                Allow Late Joiners
              </label>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                // background: "lightgreen",
              }}
            >
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
              <label
                htmlFor="showHands"
                style={{ color: "white", fontWeight: 600, fontSize: 12 }}
              >
                Run it twice on All-in Showdown
              </label>
            </Box>
          </Box>
        )}
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
