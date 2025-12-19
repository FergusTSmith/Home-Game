import React, { useState } from "react";
import MenuIcon from "./MenuIcon";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

function MenuItem({ symbol, menuText, setInGame, onClick }) {
  const [itemColour, setItemColour] = useState("rgb(93, 93, 93)");
  return (
    <Box
      sx={{
        // m: "1vw",
        position: "relative",
        display: "inline-block",
        cursor: "pointer",
        // background: 'purple',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      onMouseEnter={() => {
        setItemColour("rgb(255,255,255)");
      }}
      onMouseLeave={() => {
        setItemColour("rgb(93, 93, 93)");
      }}
      onClick={onClick}
    >
      <motion.div
        style={{
          perspective: 1000,
          display: "inline-block",
          // background: "pink",
          width: "10vw",
          height: "10vw",
          "@media (max-aspect-ratio: 1/1)": {
            width: "20vw",
            height: "20vw",
          },
        }}
      >
        <motion.div
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{
            transformOrigin: "center",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            // background: 'orange',
            width: "100%",
            height: "100%",
          }}
        >
          {[...Array(10)].map((_, i) => (
            <Box
              key={i}
              sx={{
                position: "absolute",
                left: `${i * 0.1}px`,
                opacity: 1 - i * 0.05,
                transform: `translateZ(-${i * 1}px)`,
                filter: `brightness(${1 - i * 0.05})`,
                border: `5px solid ${itemColour}`,
                borderRadius: "20vw",
                transition: "border 0.5s ease",
                // background: 'yellow',
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "@media (max-aspect-ratio: 1/1)": {
                  borderRadius: "40vw",
                },
              }}
            >
              <MenuIcon iconColour={itemColour} symbol={symbol} />
            </Box>
          ))}

          <Box
            sx={{
              position: "absolute",
              left: `${0.1}px`,
              opacity: 1 * 0.05,
              transform: `translateZ(-${1}px)`,
              filter: `brightness(${1 - 0.05})`,
              border: `5px solid ${itemColour}`,
              borderRadius: "20vw",
              transition: "border 0.5s ease",
              // background: 'yellow',
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "@media (max-aspect-ratio: 1/1)": {
                borderRadius: "40vw",
              },
            }}
          >
            <MenuIcon iconColour={itemColour} symbol={symbol} />
          </Box>
        </motion.div>
      </motion.div>

      <Box
        sx={{
          color: itemColour,
          fontSize: "2vw",
          mt: "4vh",
          fontFamily: "Orbiton",
          transition: "color 0.5s ease",
          "@media (max-aspect-ratio: 1/1)": {
            mt: "2vh",
            mb: 4
          },
        }}
        onMouseEnter={() => setInGame(true)}
      >
        {menuText}
      </Box>
    </Box>
  );
}

export default MenuItem;
