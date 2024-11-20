import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  ButtonBase,
  Skeleton,
} from "@mui/material";
import { ChatGroup } from "../../../models/chatGroup";
import LastMessage from "./LastMessage";
import GroupAvatar from "./GroupAvatar";
import { useChatGroupStore } from "../../../state/useChatGroupsStore";

interface ItemProps {
  chatGroup: ChatGroup;
  onItemClick: () => void;
}

const GroupsListItem: React.FC<ItemProps> = ({ chatGroup, onItemClick }) => {
  const { selectedChatGroup } = useChatGroupStore();

  const isCurrentSelected = chatGroup.id === selectedChatGroup?.id;

  const lastMessage = chatGroup.lastMessage;

  return (
    <ButtonBase
      onClick={onItemClick}
      sx={{
        width: "100%",
        textAlign: "inherit",
        borderRadius: "4px",
      }}
    >
      <ListItem
        sx={{
          backgroundColor: isCurrentSelected
            ? "rgba(156, 129, 240, 40%)"
            : "#202430",
          padding: "8px",
          "&:hover": {backgroundColor: isCurrentSelected
            ? "rgba(156, 129, 240, 40%)"
            : "#3c3f55"},
        }}
      >
        <ListItemAvatar>
          <GroupAvatar image={chatGroup.image} name={chatGroup.name} />
        </ListItemAvatar>
        <ListItemText
          primary={chatGroup.name}
          secondary={
            lastMessage ? (
              <LastMessage message={chatGroup.lastMessage} />
            ) : (
              <Skeleton variant="text" width="80%" />
            )
          }
        />
      </ListItem>
    </ButtonBase>
  );
};

export default GroupsListItem;
