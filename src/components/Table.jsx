import { Box, Typography } from "@mui/material";
import React from "react";
import Card from "./Card";
import Player from "./Player";

function Table({ players }) {
  console.log("PLAYERS", players);
  const playerPositionsPerPlayerNumber = [
    [{ bottom: "15vh", left: "45vw" }],
    [
      { bottom: "15vh", left: "45vw" },
      { bottom: "70vh", left: "45vw" },
    ],
    [
      { bottom: "15vh", left: "45vw" },
        { bottom: "50vh", left: "10vw" },
        { bottom: "50vh", left: "80vw" },
    ],
    [
      { bottom: "15vh", left: "45vw" },
      { bottom: "42vh", left: "10vw" },
      { bottom: "42vh", left: "80vw" },
      { bottom: "70vh", left: "45vw" },
    ],
    {},
    {},
    {},
    {},
    {},
  ];

  const playerPositions = playerPositionsPerPlayerNumber[3];

  return (
    <Box
      sx={{
        margin: "auto",
        width: "70vw",
        height: "50vh",
        // background: "radial-gradient(circle at top, #7d34c2 0%, #3f0e6e 90%)",
        background: "radial-gradient(circle at top,rgb(28, 163, 35) 0%,rgb(3, 94, 17) 90%)",

        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "solid 8px rgb(24, 24, 25)",
        boxShadow:
          "inset 0px 7px 10px rgba(0, 0, 0, 0.5), 0px 5px 15px rgba(0, 0, 0, 0.7)",
      }}
    >
      <Typography sx={{fontSize: '4vw', color: 'rgb(11, 162, 18)', fontFamily: 'Orbiton'}}>HomeGame</Typography>
      <Player name="Goose" chips="10000" position={playerPositions[0]} visible={true}></Player>
       <Player
        name="Goose1"
        chips="10000"
        position={playerPositions[1]}
        visible={false}
      ></Player>
     <Player
        name="Goose3"
        chips="10000"
        position={playerPositions[2]}
        visible={false}
      ></Player>
       <Player
        name="Goose4"
        chips="10000"
        position={playerPositions[3]}
      ></Player> 
    {/* //    <Player
    //     name="Goose5"
    //     chips="10000"
    //     position={playerPositions[1]}
    //   ></Player>
    //    <Player
    //     name="Goose6"
    //     chips="10000"
    //     position={playerPositions[1]}
    //   ></Player>  */}
    </Box>
  );
}

export default Table;
