import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import CustomisedTextField from "./NewGameForm/CustomisedTextField";
import { useSocket } from "../../context/SocketContext";

function RegistrationModal() {
  const { socket } = useSocket();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setPlayerDetails({ ...playerDetails, playerId: formData.playerId });
    console.log("FERGUS SUBMIT", formData);
    if (socket) {
      socket.emit("register", formData);
    }
  };
  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit}
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: 13,
        opacity: 0.9,
        boxShadow: 24,
        p: 4,
        display: "flex",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        flexDirection: "column",
        gap: 2,
        overflow: "scroll",
        alignItems: "center", // <-- Center horizontally
        justifyContent: "center", // <-- Center vertically
        textAlign: "center", // <-- Center text
      }}
    >
      <Typography sx={{ color: "white", fontSize: 40, fontFamily: "Orbiton" }}>
        Register
      </Typography>
      <CustomisedTextField
        label="Desired Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <CustomisedTextField
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <CustomisedTextField
        label="Email (Optional, for account recovery)"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <Button variant="contained" type="submit">
        Register
      </Button>
    </Box>
  );
}

export default RegistrationModal;
