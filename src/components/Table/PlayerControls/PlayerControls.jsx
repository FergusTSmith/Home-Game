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
  const [betSize, setBetSize] = useState(tableDetails?.currentBetAmount);
  const betRef = React.useRef();
  betRef.current = betSize;

  const handleReadyUp = () => {
    socket.emit("ready_up", {
      gameId: gameDetails.gameId,
      playerId: playerDetails.playerId,
      tableId: tableDetails.uniqueID,
    });
  };

  const handleFold = () => {
    if (playerTurn) {
      socket.emit(
        "player_move",
        { move: "FOLD" },
        gameDetails.gameId,
        playerDetails.playerId
      );
      console.log("player foldering!!!!!", playerDetails, gameDetails);
    }
  };

  const handleCall = () => {
    if (playerTurn) {
      socket.emit(
        "player_move",
        { move: "CALL" },
        gameDetails.gameId,
        playerDetails.playerId
      );
      console.log("player calling!!!!!", playerDetails);
    }
  };

  const handleBet = () => {
    if (playerTurn) {
      if (
        betSize < tableDetails?.bigBlind ||
        betSize > playerDetails.chips ||
        betSize < tableDetails.currentBetAmount
      ) {
        console.log("Invalid bet size!!!!!", betSize);
        return;
      }

      socket.emit(
        "player_move",
        { move: "BET", amount: betSize },
        gameDetails.gameId,
        playerDetails.playerId
      );
    }
    console.log("player raising!!!!!", playerDetails);
  };

  const handleRejoinGame = () => {
    socket.emit("player_rejoining_table", {
      gameId: gameDetails.gameId,
      playerId: playerDetails.playerId,
      tableId: tableDetails.uniqueID,
    });
  };

  const playerDetailsUpdated = tableDetails?.players?.find(
    (p) => p.playerId === playerDetails.playerId
  );

  console.log("fergus tableDetails", tableDetails, playerDetailsUpdated);

  useEffect(() => {
    console.log("FERGUS BETSIZE 111111111", betSize, betRef.current);
  }, [betSize]);

  console.log(
    "FERGUS TABLEDETAILS 22222222221111111",
    tableDetails,
    playerDetails,
    gameDetails
  );

  const sittingOut = tableDetails?.players?.find(
    (id) => id.playerId === playerDetails.playerId
  )?.sittingOut;

  return (
    <>
      {tableDetails && (
        <Box
          sx={{
            width: "40vw",
            height: "20vh",
            // background:
            //   "radial-gradient(circle at top,rgb(84, 102, 119) 0%,rgb(40, 51, 62) 60%)",
            minWidth: "300px",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 5,
            mr: 2,

            transition: "opacity 0.4s ease-in-out",
          }}
        >
          {gameDetails.gameState === "WAITING" && tableDetails && (
            <Box
              sx={{
                opacity:
                  !playerTurn && !(gameDetails.gameState === "WAITING")
                    ? 0.2
                    : 0.8,
              }}
            >
              <CustomButton
                text="Ready Up"
                variant="contained"
                onClick={handleReadyUp}
              />
            </Box>
          )}
          {sittingOut && (
            <Box
              sx={{
                opacity: sittingOut ? 1 : 0.8,
              }}
            >
              <CustomButton
                text="Rejoin Game"
                variant="contained"
                onClick={handleRejoinGame}
              />
            </Box>
          )}
          {!(gameDetails.gameState === "WAITING") &&
            tableDetails &&
            !sittingOut && (
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  opacity:
                    !playerTurn && !(gameDetails.gameState === "WAITING")
                      ? 0.2
                      : 0.8,
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
                    text={
                      tableDetails?.currentBetAmount > 0 &&
                      !(
                        playerDetails?.betSize ===
                        tableDetails?.currentBetAmount
                      )
                        ? "Call"
                        : "Check"
                    }
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
                    {tableDetails.roundNumber > 0 && (
                      <>
                        <CustomButton
                          text="1/3"
                          size="sm"
                          onClick={() =>
                            setBetSize(
                              Math.max(
                                Math.round(tableDetails?.potentialPot / 3),
                                tableDetails?.bigBlind
                              )
                            )
                          }
                        ></CustomButton>
                        <CustomButton
                          text="2/3"
                          size="sm"
                          onClick={() =>
                            setBetSize(
                              Math.max(
                                Math.round(
                                  (tableDetails?.potentialPot / 3) * 2
                                ),
                                tableDetails?.bigBlind
                              )
                            )
                          }
                        ></CustomButton>
                        <CustomButton
                          text="All In"
                          size="sm"
                          onClick={() =>
                            setBetSize(Math.round(playerDetailsUpdated?.chips))
                          }
                        ></CustomButton>
                      </>
                    )}
                    {tableDetails.roundNumber === 0 && (
                      <>
                        <CustomButton
                          text="2 BB"
                          size="sm"
                          onClick={() =>
                            setBetSize(
                              Math.max(
                                Math.round(tableDetails?.bigBlind * 2),
                                tableDetails?.bigBlind
                              )
                            )
                          }
                        ></CustomButton>
                        <CustomButton
                          text="3 BB"
                          size="sm"
                          onClick={() =>
                            setBetSize(
                              Math.max(
                                Math.round(tableDetails?.bigBlind * 3),
                                tableDetails?.bigBlind
                              )
                            )
                          }
                        ></CustomButton>
                        <CustomButton
                          text="All In"
                          size="sm"
                          onClick={() =>
                            setBetSize(Math.round(playerDetailsUpdated?.chips))
                          }
                        ></CustomButton>
                      </>
                    )}
                  </Box>
                  <Box
                    sx={{ flex: 2, display: "flex", justifyContent: "center" }}
                  >
                    <CustomSlider
                      playerChips={playerDetailsUpdated?.chips}
                      betSize={betRef.current}
                      setBetSize={setBetSize}
                      minimumBet={Math.max(
                        tableDetails?.currentBetAmount,
                        tableDetails?.bigBlind + tableDetails?.smallBlind
                      )}
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
