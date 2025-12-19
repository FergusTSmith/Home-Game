import React, { useEffect, useState, useRef } from "react";
import Card from "../UIAssets/Card";
import { Box, Typography } from "@mui/material";
import PokerChips from "./Chips";

const playerTurnTimeouts = {
  "Very Fast": 7,
  Fast: 10,
  Normal: 20,
  Slow: 30,
  "Very Slow": 40,
};
function Player({
  name,
  cards,
  chips,
  position,
  visible,
  playerTurn,
  messages,
  message,
  bet,
  sittingOut,
  gameSpeed,
}) {
  const sortedCards = cards
    ? [...cards].sort((a, b) => a.localeCompare(b))
    : [];

  // SVG border dimensions
  const borderWidth = 3;
  const boxWidth = 150;
  const boxHeight = 50;
  const borderRadius = 16;
  // inner rectangle dimensions used for stroke dash calculations
  const rectWidth = boxWidth - borderWidth;
  const rectHeight = boxHeight - borderWidth -2;
  const perimeter = 2 * (rectWidth + rectHeight);

 

  const playerTime = (playerTurnTimeouts[gameSpeed] || 10) * 1000;

   console.log(
     "FERGUS GAMESPEEDS 000000000000",
     gameSpeed,
     playerTurnTimeouts[gameSpeed],
     playerTime
   );

  // Keep a debug log only when `message` changes to avoid flooding the console
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("FERGUS PLAYER MESSAGE UPDATED", message);
    }
  }, [message]);

  // Timer animation: use refs and direct DOM updates to avoid React rerenders
  const progressRef = useRef(1); // 1 = full, 0 = empty
  const rectRef = useRef(null);

  useEffect(() => {
    let frameId = null;

    const setRectProgress = (p) => {
      if (!rectRef.current) return;
      const clamped = Math.max(0, Math.min(1, p));
      const dashLen = perimeter * clamped;
      // Make the visible dash length proportional to progress
      rectRef.current.style.strokeDasharray = `${perimeter} ${perimeter}`;
      // Offset controls which part is visible - negative offset to deplete counter-clockwise
      rectRef.current.style.strokeDashoffset = `-${perimeter * (1 - clamped)}`;
      // Update stroke gradient based on thresholds without causing rerenders
      let gradient = "url(#greenGradient)";
      if (clamped < 0.5 && clamped > 0.2) gradient = "url(#yellowGradient)";
      if (clamped <= 0.2) gradient = "url(#redGradient)";
      rectRef.current.style.stroke = gradient;
    };

    if (!playerTurn) {
      progressRef.current = 1;
      setRectProgress(1);
      return;
    }

    const start = performance.now();

    const animate = (now) => {
      const elapsed = now - start;
      const newProgress = Math.max(0, 1 - elapsed / playerTime);
      progressRef.current = newProgress;
      setRectProgress(newProgress);
      if (newProgress > 0) {
        frameId = requestAnimationFrame(animate);
      }
    };

    // Kick off animation (use RAF timestamp)
    frameId = requestAnimationFrame(animate);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      progressRef.current = 1;
      setRectProgress(1);
    };
  }, [playerTurn]);

  // Calculate border color based on progress
  let borderColor = "#1db954"; // green
  if (progressRef.current < 0.5 && progressRef.current > 0.2)
    borderColor = "#ffe066"; // yellow
  if (progressRef.current <= 0.2) borderColor = "#ff4d4f"; // red

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
          opacity: sittingOut ? 0.5 : 1,
          minWidth: "80px",
          height: boxHeight,
          width: boxWidth,
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
                <Card
                  key={`${name || position.left}-placeholder-${i}`}
                  visible={false}
                  community={false}
                  value={null}
                />
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
            pt: "0.8vw",
            pb: "0.5vw",
            borderRadius: `${borderRadius}px`,
            // boxShadow:
            //   "inset 0px 1.5px 3px rgba(0, 0, 0, 0.5), 0px 5px 15px rgba(0, 0, 0, 0.7)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Timer border overlay using SVG */}
          {playerTurn &&
            (() => {
              // Build a rounded rectangle path starting at the top-center
              const r = borderRadius - borderWidth / 2; // corner radius
              const x0 = borderWidth / 2;
              const y0 = borderWidth / 2;
              const x1 = boxWidth - borderWidth / 2;
              const y1 = boxHeight - borderWidth / 2;
              const mx = boxWidth / 2;

              // Start at top center, trace clockwise with rounded corners
              const d = `
              M ${mx} ${y0}
              L ${x1 - r} ${y0}
              A ${r} ${r} 0 0 1 ${x1} ${y0 + r}
              L ${x1} ${y1 - r}
              A ${r} ${r} 0 0 1 ${x1 - r} ${y1}
              L ${x0 + r} ${y1}
              A ${r} ${r} 0 0 1 ${x0} ${y1 - r}
              L ${x0} ${y0 + r}
              A ${r} ${r} 0 0 1 ${x0 + r} ${y0}
              L ${mx} ${y0}
              Z
            `;

              return (
                <svg
                  width={boxWidth}
                  height={boxHeight}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1000000,
                    pointerEvents: "none",
                    display: "block",
                    filter: "drop-shadow(0 0 0.5px currentColor)",
                  }}
                >
                  <defs>
                    <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00ff5f" stopOpacity="1" />
                      <stop offset="50%" stopColor="#009b36" stopOpacity="1" />
                      <stop offset="100%" stopColor="#009a33ff" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffd93d" stopOpacity="1" />
                      <stop offset="50%" stopColor="#e5ba0c" stopOpacity="1" />
                      <stop offset="100%" stopColor="#c99a00" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#cd2023ff" stopOpacity="1" />
                      <stop offset="50%" stopColor="#a10204" stopOpacity="1" />
                      <stop offset="100%" stopColor="#6b0002" stopOpacity="1" />
                    </linearGradient>
                  </defs>
                  <path
                    d={d}
                    fill="none"
                    strokeWidth={borderWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    ref={rectRef}
                    strokeDasharray={`${perimeter} ${perimeter}`}
                    strokeDashoffset="0"
                    style={{
                      zIndex: 1000000,
                      stroke: "url(#greenGradient)",
                      transition: "stroke 0.2s",
                    }}
                  />
                </svg>
              );
            })()}
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
