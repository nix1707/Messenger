import React, { useState, useRef } from "react";
import { Box, IconButton } from "@mui/material";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

const Video: React.FC<{ src: string }> = ({ src }) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    videoRef.current?.requestFullscreen();
  };

  return (
    <Box
      position="relative"
      sx={{ borderRadius: "12px", overflow: "hidden", backgroundColor: "black" }}
    >
      <video
        ref={videoRef}
        src={src}
        style={{ width: "100%", height: "auto", objectFit: "cover" }}
        autoPlay
        loop
        muted={isMuted}
      />
      <IconButton
        onClick={toggleMute}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
        }}
      >
        {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
      </IconButton>
      <IconButton
        onClick={handleFullscreen}
        sx={{
          position: "absolute",
          bottom: 8,
          right: 8,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
        }}
      >
        <FullscreenIcon />
      </IconButton>
    </Box>
  );
};

export default Video;
