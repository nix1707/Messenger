import React from "react";
import { Box, Typography } from "@mui/material";

const NoChatSelected: React.FC = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      textAlign: "center",
      padding: 2,
      borderRadius: "8px",
    }}
  >
    <Typography
      variant="h6"
      sx={{
        backgroundColor: "gray",
        padding: 2,
        borderRadius: "16px",
        userSelect: "none",
        color: "white",
        fontWeight: "bold",
      }}
    >
      Select a chat to start messaging
    </Typography>
  </Box>
);

export default NoChatSelected;
