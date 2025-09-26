import {
  Box,
  Dialog,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MenuItem from "./MenuItem";
import Chip from "../Table/Chip";
import NewGameMenu from "./NewGameMenu";
import JoinGameModal from "./JoinGameModal";

function HomeScreen({ setInGame, socket, setPlayerDetails, playerDetails }) {
  const [newGameModal, setNewGameModal] = useState(false);
  const [joinGameModal, setJoinGameModal] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        textAlign: "center",
        position: "fixed",
        // background: "blue",
        // gap: '1vw'
      }}
    >
      <Box
        sx={{
          width: "50%",
          display: "flex",
          height: "30vh",
          // background: "pink",
          position: "fixed",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          flexDirection: "row",
          mt: 12,
          gap: '3vw',
          "@media (max-aspect-ratio: 1/1)": {
            flexDirection: "column",
            width: "100%",
            height: "30vh",
            mt: -4,
          },
        }}
      >
        <MenuItem
          symbol={"♠"}
          menuText={"New Game"}
          setInGame={setInGame}
          onClick={() => setNewGameModal(true)}
        ></MenuItem>
        <MenuItem
          symbol={"♣"}
          menuText={"Join Game"}
          setInGame={setInGame}
          onClick={() => setJoinGameModal(true)}
        ></MenuItem>
        <MenuItem
          symbol={"♥"}
          menuText={"Saved Games"}
          setInGame={setInGame}
        ></MenuItem>
        <MenuItem
          symbol={"♦"}
          menuText={"Settings"}
          setInGame={setInGame}
        ></MenuItem>
        <Dialog
          open={newGameModal}
          onClose={() => setNewGameModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <NewGameMenu
            socket={socket}
            setPlayerDetails={setPlayerDetails}
            playerDetails={playerDetails}
          />
        </Dialog>{" "}
        <Dialog
          open={joinGameModal}
          onClose={() => setJoinGameModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <JoinGameModal
            socket={socket}
            setPlayerDetails={setPlayerDetails}
            playerDetails={playerDetails}
          />
        </Dialog>{" "}
      </Box>
    </Box>
  );
}

export default HomeScreen;
