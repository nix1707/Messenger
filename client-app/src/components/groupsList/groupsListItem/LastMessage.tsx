import React from "react";
import { Typography, Icon, Box } from "@mui/material";
import { Image, KeyboardVoice, VideoFile } from "@mui/icons-material";
import { MediaType } from "../../../models/media";
import { Message } from "../../../models/message";


interface LastMessageProps {
  message: Message;
}

const LastMessage: React.FC<LastMessageProps> = ({ message }) => (
  <Box sx={{ display: "flex", gap: "3px", alignItems: "center" }}>
    <Typography component="div" fontWeight="bold">
      {`${message.username}: `}
    </Typography>
    <Typography component="span" noWrap>
      {message.body}
    </Typography>

    {message.media && (
      <>
        <Icon>
          {message.media.type === MediaType.Image && <Image />}
          {message.media.type === MediaType.Video && <VideoFile />}
          {message.media.type === MediaType.Audio && <KeyboardVoice />}
        </Icon>
        {!message.body && (
          <Typography component="span">
            {MediaType[message.media.type]}
          </Typography>
        )}
      </>
    )}

  </Box>
);

export default LastMessage;
