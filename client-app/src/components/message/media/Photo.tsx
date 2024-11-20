import React from "react";
import { Box } from "@mui/material";

interface Props {
  src: string;
}

const Photo: React.FC<Props> = ({ src }) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-block",
        borderRadius: "12px",
        overflow: "hidden",
        backgroundImage: `
          linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc),
          linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc)
        `,
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 10px 10px",
      }}
    >
      <Box
        component="img"
        src={src}
        alt="Photo Message"
        draggable="false"
        sx={{
          display: "block",
          width: '100%',
          maxHeight:'360px',
          objectFit: "cover",
          userSelect: "none",
        }}
      />
    </Box>
  );
};

export default Photo;
