import React, { useState } from "react";
import MenuIcon from "./MenuIcon";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

function MenuItem({ symbol, menuText, setInGame }) {
    const [itemColour, setItemColour] = useState("rgb(93, 93, 93)")
  return (
    <Box
      sx={{
        // m: "1vw",
        position: "relative",
        display: "inline-block",
        // background: "pink",
        width: '100%',
      }}
      onMouseEnter={() => {setItemColour('rgb(255,255,255)')}}
      onMouseLeave={() => {setItemColour('rgb(93, 93, 93)')}}
      onClick={() => setInGame(true)}
    >
      <motion.div
        style={{
          perspective: 1000, 
          display: "inline-block", 
        }}
      >
        <motion.div
          animate={{ rotateY: [0, 360]}} 
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }} 
          style={{
            transformOrigin: "center",
            transformStyle: "preserve-3d", 
            backfaceVisibility: "hidden", 
          }}
        >
          {[...Array(10)].map((_, i) => (
            <Box
              key={i}
              sx={{
                position: "absolute",
                left: `${i * 0.1}px`,
                opacity: 1 - i * 0.05, 
                transform: `translateZ(-${i*1}px)`, 
                filter: `brightness(${1 - i * 0.05})`, 
                border: `5px solid ${itemColour}`,
                borderRadius: '20vw',
                transition: "border 0.5s ease"
              }}
            >
              <MenuIcon iconColour={itemColour} symbol={symbol} />
            </Box>
          ))}

          <Box sx={{ position: "relative" }}>
            <MenuIcon iconColour={itemColour} symbol={symbol} />
          </Box>
        </motion.div>
      </motion.div>

      <Box sx={{ color: itemColour, fontSize: 30, mt: "4vh", fontFamily: "Orbiton", transition: "color 0.5s ease" }}       onMouseEnter={() => setInGame(true)}
      >
        {menuText}
      </Box>
    </Box>
  );
}

export default MenuItem;
