import React from "react";
import { Box, Typography } from "@mui/material";

function LobbyTables({ tables, joinTable }) {
  // console.log("FERGUS TABLEs", tables, "actualPlayers", tables.players);

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
          border: "2px solid rgb(148, 148, 148)",
          borderRadius: 1,
          padding: 1,
        }}
      >
        {tables.map((table, i) => {
          const actualPlayers = table.players?.filter(Boolean) || [];
          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                opacity: 0.7,
                cursor: "pointer",
                ":hover": {
                  opacity: 1,
                },
                transition: "opacity ease 0.5s",
              }}
              onClick={() => {
                joinTable(table.uniqueID);
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
                Table {table.uniqueID}
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
                {actualPlayers.length}/{table.playersPerTable} players
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default LobbyTables;
