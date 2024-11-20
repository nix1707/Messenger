import React from "react";
import { Box, Avatar, Typography, Paper, Stack, Icon } from "@mui/material";
import moment from "moment";
import { Message as MessageModel } from "../../models/message";
import { DoneAll } from "@mui/icons-material";
import { generateAvatarColor } from "../../utility/utility";
import { useUserStore } from "../../state/useUserStore";
import { Link } from "react-router-dom";
import MediaRenderer from "./media/MediaRenderer";

interface Props {
  message: MessageModel;
}

const Message: React.FC<Props> = ({ message }) => {
  const { user } = useUserStore();
  const isCurrentUser = message.username === user?.username;

  const containerStyles = {
    display: "flex",
    justifyContent: isCurrentUser ? "flex-end" : "flex-start",
    alignItems: "center", // Align items to the center
    marginY: 1,
    marginRight: isCurrentUser ? 2 : 0,
    gap: "10px", 
  };

  const avatarStyles = {
    marginRight: "10px",
    bgcolor: generateAvatarColor(message.username),
  };

  const paperStyles = {
    maxWidth: { xs: "90%", sm: "70%", md: "60%" },
    padding: 0.5,
    background: isCurrentUser
      ? "linear-gradient(119.6deg, #953eff 11.2%, #7e3eff 91.1%)"
      : "#4b5064",
    color: "white",
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "2px", 
    borderRadius: isCurrentUser ? "15px 0 15px 15px" : "0 15px 15px 15px",
  };

  return (
    <Box sx={containerStyles}>
      {!isCurrentUser && (
        <Avatar sx={avatarStyles}>{message.username.charAt(0)}</Avatar>
      )}
      <Paper sx={paperStyles}>
        {!isCurrentUser && (
          <Typography
            component={Link}
            to={`/profiles/${message.username}`}
            variant="subtitle1"
            color="#73b8d9"
            sx={{ textDecoration: "none" }}
          >
            {message.username}
          </Typography>
        )}
        {message.media && (
          <MediaRenderer type={message.media.type} url={message.media.url} />
        )}

        <Typography sx={{ whiteSpace: "pre-wrap" }}>{message.body}</Typography>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography variant="subtitle2" sx={{ marginTop: 1 }}>
            {moment(message.createdAt).format("LT")}
          </Typography>
          <Icon>
            <DoneAll />
          </Icon>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Message;
