import React, { useEffect, useState } from "react";
import Card from "../UIAssets/Card";
import { Box, Typography } from "@mui/material";
import PokerChips from "./Chips";

function Player({
  name,
  cards,
  chips,
  position,
  visible,
  playerTurn,
  messages,
  message,
  playerTime = 10000,
  bet,
}) {
  const sortedCards = cards
    ? [...cards].sort((a, b) => a.localeCompare(b))
    : [];

  const [playerMessage, setPlayerMessage] = useState(message);

  // useEffect(() => {
  //   setPlayerMessage();
  // });

  console.log("FERGUS UGHGUGGHGHGHGHG PLAYER MESSAGE @@@@@", message);

  // Timer state for animation
  const [progress, setProgress] = useState(1); // 1 = full, 0 = empty

  // useEffect(() => {
  //   if (!playerTurn) {
  //     setProgress(1);
  //     return;
  //   }
  //   let start = Date.now();
  //   let frame;
  //   const animate = () => {
  //     const elapsed = Date.now() - start;
  //     const newProgress = Math.max(0, 1 - elapsed / playerTime);
  //     setProgress(newProgress);
  //     if (newProgress > 0) {
  //       frame = requestAnimationFrame(animate);
  //     }
  //   };
  //   animate();
  //   return () => {
  //     cancelAnimationFrame(frame);
  //     setProgress(1);
  //   };
  // }, [playerTurn, playerTime]);

  // Calculate border color based on progress
  let borderColor = "#1db954"; // green
  if (progress < 0.5 && progress > 0.2) borderColor = "#ffe066"; // yellow
  if (progress <= 0.2) borderColor = "#ff4d4f"; // red

  // SVG border dimensions
  const borderWidth = 3;
  const boxWidth = 150;
  const boxHeight = 44;
  const borderRadius = 16;
  const rectWidth = boxWidth - borderWidth;
  const rectHeight = boxHeight - borderWidth + 10;
  const perimeter = 2 * (rectWidth + rectHeight);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "fixed",
          bottom: position.bottom,
          left: position.left,
          minWidth: "80px",
          width: "9vw",
        }}
      >
        <Box
          sx={{
            display: "flex",
            // width: "100%",
            justifyContent: "center",
            height: "10vh",
            position: "absolute",
            zIndex: -100,
            top: "-4.5vh",
            flexDirection: "column",
            // background: "green",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              color: "yellow",
              position: "fixed",
              zIndex: 10000000,
              mb: 12,
              // background: "pink",
              fontFamily: "osrs",
            }}
          >
            {message}
          </Box>
          <Box sx={{ display: "flex" }}>
            {sortedCards &&
              sortedCards.map((card) => (
                <Card
                  key={card}
                  visible={visible}
                  community={false}
                  value={card}
                />
              ))}
            {sortedCards &&
              sortedCards.length < 1 &&
              Array.from({ length: 2 }, (_, i) => (
                <Card key={i} visible={false} community={false} value={null} />
              ))}
          </Box>
        </Box>
        <Box
          sx={{
            width: `${boxWidth}px`,
            height: `${boxHeight}px`,
            background:
              "radial-gradient(circle at top, #3a4753 0%, #181b1f 60%)",
            display: "flex",
            color: "white",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            opacity: 0.97,
            backdropFilter: "blur(13px)",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            pt: "0.5vw",
            pb: "0.5vw",
            borderRadius: `${borderRadius}px`,
            // boxShadow:
            //   "inset 0px 1.5px 3px rgba(0, 0, 0, 0.5), 0px 5px 15px rgba(0, 0, 0, 0.7)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Timer border overlay using SVG */}
          {playerTurn && (
            <svg
              width={boxWidth}
              height={boxHeight}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 2,
                pointerEvents: "none",
                display: "block",
              }}
            >
              <rect
                x={borderWidth / 2}
                y={borderWidth / 2}
                width={boxWidth - borderWidth}
                height={boxHeight - borderWidth}
                rx={borderRadius - borderWidth / 2}
                ry={borderRadius - borderWidth / 2}
                fill="none"
                stroke={borderColor}
                strokeWidth={borderWidth}
                strokeDasharray={perimeter}
                strokeDashoffset={perimeter * (1 - progress)}
                style={{
                  transition: "stroke 0.2s",
                }}
              />
            </svg>
          )}
          <Typography sx={{ fontSize: "15px", zIndex: 3 }}>{name}</Typography>
          <Typography sx={{ fontSize: "11px", color: "gray", zIndex: 3 }}>
            {chips}
          </Typography>
        </Box>
        {bet !== 0 && (
          <Box
            sx={{
              position: "absolute",
              top: position.chipPosition === "top" ? "10vh" : "-6vh",
              bottom: position.chipPosition === "bottom" ? 120 : 0,
              color: "white",
              fontFamily: "Orbiton",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <PokerChips amount={bet} />
            <Box sx={{ flex: 1, fontSize: 10 }}>{bet}</Box>
          </Box>
        )}
      </Box>
    </>
  );
}

export default Player;
