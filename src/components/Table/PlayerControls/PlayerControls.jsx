import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomButton from "../../ComponentAssets/CustomButton";
import CustomSlider from "../../ComponentAssets/CustomSlider";

function PlayerControls({
  gameDetails,
  playerDetails,
  tableDetails,
  socket,
  playerTurn,
}) {
  const [betSize, setBetSize] = useState(0);

  const handleReadyUp = () => {
    socket.emit("ready_up", {
      gameId: gameDetails.gameId,
      playerId: playerDetails.playerId,
      tableId: tableDetails.uniqueID,
    });
  };

  const handleFold = () => {
    socket.emit("player_move", { move: "FOLD", }, gameDetails.gameId, playerDetails.playerId)
    console.log("player foldering!!!!!", playerDetails, gameDetails);
  }

  const handleCall = () => {
    socket.emit("player_move", { move: "CALL" }, gameDetails.gameId, playerDetails.playerId)
    console.log("player calling!!!!!", playerDetails);
  }

  const handleBet = () => {
    socket.emit("player_move", { move: "BET", amount: betSize }, gameDetails.gameId, playerDetails.playerId)
    console.log("player raising!!!!!", playerDetails);
  }

  const playerDetailsUpdated = tableDetails?.players.find(p => p.playerId === playerDetails.playerId)

  console.log("fergus tableDetails", tableDetails, playerDetailsUpdated);

  useEffect(() => {
    console.log("FERGUS BETSIZE", betSize)
  }, [betSize])

  return (
    <>
      {tableDetails && (
        <Box
          sx={{
            width: "40vw",
            height: "17vh",
            background:
              "radial-gradient(circle at top,rgb(84, 102, 119) 0%,rgb(40, 51, 62) 60%)",
            minWidth: "300px",
            opacity: 0.5,
            borderRadius: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 2,
            mr: 2,
            opacity: playerTurn ? 1 : 0.2,
          }}
        >
          {gameDetails.gameState === "WAITING" && tableDetails && (
            <Button variant="contained" onClick={handleReadyUp}>
              Ready Up
            </Button>
          )}
          {!(gameDetails.gameState === "WAITING") && tableDetails && (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                // background: "green",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                  padding: 2,
                  width: "90%",
                  flex: 1,
                  // background: "white",
                }}
              >
                <CustomButton text="Fold" onClick={handleFold}></CustomButton>
                <CustomButton
                  text="Check/Call"
                  onClick={handleCall}
                ></CustomButton>
                <CustomButton text="BET" onClick={handleBet}></CustomButton>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                  pl: 2,
                  pr: 2,
                  width: "90%",
                  flex: 1,
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    gap: 1,
                  }}
                >
                  <CustomButton
                    text="1/3"
                    size="sm"
                    onClick={() =>
                      setBetSize(Math.round(tableDetails?.pot / 3))
                    }
                  ></CustomButton>
                  <CustomButton
                    text="2/3"
                    size="sm"
                    onClick={() =>
                      setBetSize(Math.round((tableDetails?.pot / 3) * 2))
                    }
                  ></CustomButton>
                  <CustomButton
                    text="All In"
                    size="sm"
                    onClick={() =>
                      setBetSize(Math.round(playerDetailsUpdated?.chips))
                    }
                  ></CustomButton>
                </Box>
                <Box
                  sx={{ flex: 2, display: "flex", justifyContent: "center" }}
                >
                  <CustomSlider
                    playerChips={playerDetailsUpdated?.chips}
                    betSize={betSize}
                    setBetSize={setBetSize}
                  />
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </>
  );
}

export default PlayerControls;
