import React from "react";
import { Box, Typography } from "@mui/material";

function LobbyTables({ tables }) {
  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Typography
        sx={{
          fontFamily: "Orbiton",
          color: "white",
          textAlign: "center",
          mb: 1,
        }}
      >
        Tables
      </Typography>
      <Box
        sx={{
          flex: 1,
          border: "2px solid #adadad",
          borderRadius: 3,
          padding: 1,
        }}
      >
        {tables.map((table, i) => {
          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Orbiton",
                  color: "white",
                  textAlign: "center",
                  fontSize: 10,
                }}
              >
                {i + 1 + ") "}
                Table {table.uniqueId}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Orbiton",
                  color: "white",
                  textAlign: "center",
                  fontSize: 10,
                }}
              >
                {" "}
                {table.players.length}/{table.maxPlayers}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default LobbyTables;
