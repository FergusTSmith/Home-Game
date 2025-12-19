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
import RegistrationModal from "./RegistrationModal";
import LoginModal from "./LoginModal";
import SettingsModal from "./SettingsModal";
import { useGameState } from "../../context/GameStateContext";

function HomeScreen({ setInGame, setPlayerDetails, playerDetails }) {
  const [newGameModal, setNewGameModal] = useState(false);
  const [joinGameModal, setJoinGameModal] = useState(false);
  const [registrationModal, setRegistrationModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  const { settingsModalOpen, setSettingsModalOpen } = useGameState();
  console.log("FERGUS >>>>>>>>>>>>>>>>>>>>>", playerDetails)

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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: "3vw",
          "@media (max-aspect-ratio: 1/1)": {
            flexDirection: "column",
          },
        }}
      >
        {playerDetails.playerId && (
          <>
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
          </>
        )}
        {!playerDetails.playerId && (
          <>
            <MenuItem
              symbol={"♠"}
              menuText={"Register"}
              setInGame={setInGame}
              onClick={() => setRegistrationModal(true)}
            ></MenuItem>
            <MenuItem
              symbol={"♣"}
              menuText={"Login"}
              setInGame={setInGame}
              onClick={() => setLoginModal(true)}
            ></MenuItem>
          </>
        )}
        <MenuItem
          symbol={"♦"}
          menuText={"Settings"}
          setInGame={setInGame}
          onClick={() => setSettingsModalOpen(true)}
        ></MenuItem>
        <Dialog
          open={newGameModal}
          onClose={() => setNewGameModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <NewGameMenu
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
            setPlayerDetails={setPlayerDetails}
            playerDetails={playerDetails}
          />
        </Dialog>{" "}
        <Dialog
          open={registrationModal && !playerDetails.playerId}
          onClose={() => setRegistrationModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <RegistrationModal />
        </Dialog>{" "}
        <Dialog
          open={loginModal && !playerDetails.playerId}
          onClose={() => setLoginModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <LoginModal
            setPlayerDetails={setPlayerDetails}
            playerDetails={playerDetails}
          />
        </Dialog>{" "}
        <Dialog
          open={settingsModalOpen}
          onClose={() => setSettingsModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <SettingsModal
            setPlayerDetails={setPlayerDetails}
            playerDetails={playerDetails}
          />
        </Dialog>{" "}
      </Box>
    </Box>
  );
}

export default HomeScreen;
