import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import CustomisedTextField from "../../HomeScreen/NewGameForm/CustomisedTextField";
import ChatBoxTextEntry from "../../ComponentAssets/ChatBoxTextEntry";
import PokerHandEvaluator from "../../../services/handEvaluator";

function ChatBox({
  messages,
  socket,
  gameDetails,
  tableDetails,
  playerDetails,
}) {
  const [userMessage, setUserMessage] = useState("");

  useEffect(() => {
    console.log("User message changed:", userMessage);
  }, [userMessage]);

  const sendMessage = () => {
    console.log("FERGUS SENDING MESSAGE", userMessage);
    if (userMessage.trim() === "") return;

    console.log("FERGUS MESSAGES", messages);

    socket.emit("chat_message", {
      message: userMessage,
      gameDetails,
      playerId: playerDetails.playerId,
      tableId: tableDetails.uniqueID,
      gameId: gameDetails.gameId,
    });
    setUserMessage("");
  };

  const evaluator = PokerHandEvaluator;

  console.log("fergus teheeheheheehehe", tableDetails, playerDetails);
  return (
    <>
      <Box
        sx={{
          color: "white",
          textAlign: "left",
          fontFamily: "Orbiton",
          fontSize: "10px",
          mb: 0.5,
          ml: 1,
          opacity: 0.9,
        }}
      >
        You have: Royal Flush
      </Box>
      <Box
        sx={{
          position: "relative",
          width: "40vw",
          height: "23vh",
          // minWidth: "300px",
          borderRadius: 1,
          backdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          mb: 2,
          mr: 2,
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ml: 2,
          zIndex: 2000,
        }}
      >
        <Box
          sx={{
            overflow: "scroll",
            width: "100%",
            height: "calc(100% - 3vh)",
            position: "absolute",
            top: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          {messages?.map((msg, index) => (
            <Box
              key={index}
              sx={{
                color: "white",
                fontSize: "0.7em",
                width: "100%",
                display: "grid",
                gridTemplateColumns:
                  "minmax(10px, auto) 1fr minmax(60px, auto)",
                gap: 1,
                alignItems: "center",
                px: 1,
                py: 0.5,
                background:
                  index % 2 === 0 ? "rgba(255, 255, 255, 0.03)" : "transparent",
              }}
            >
              <Box
                sx={{
                  fontWeight: "bold",
                  color: "#4fc3f7",
                  textAlign: "left",
                  width: "1em",
                }}
              >
                {msg.playerId}
              </Box>
              <Box sx={{ background: "pifnk", textAlign: "left", ml: 4 }}>
                {msg.message}
              </Box>
              <Box
                sx={{ fontSize: "0.6em", color: "rgba(255, 255, 255, 0.6)" }}
              >
                {msg.timestamp}
              </Box>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "100%",
            height: "3vh",
          }}
        >
          <ChatBoxTextEntry
            sendMessage={sendMessage}
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder={"Press Enter to Chat..."}
          />
        </Box>
      </Box>
    </>
  );
}

export default ChatBox;
