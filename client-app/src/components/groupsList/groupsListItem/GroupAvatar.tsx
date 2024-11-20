import React from "react";
import { Avatar } from "@mui/material";
import { generateAvatarColor } from "../../../utility/utility";
import { Media } from "../../../models/media";

interface GroupAvatarProps {
  name: string;
  image: Media | null;
}

const GroupAvatar: React.FC<GroupAvatarProps> = ({ name, image }) =>
  image ? (
    <Avatar src={image.url} />
  ) : (
    <Avatar
      sx={{
        bgcolor: generateAvatarColor(name),
        color: "white",
      }}
    >
      {name[0]}
    </Avatar>
  );

export default GroupAvatar;
