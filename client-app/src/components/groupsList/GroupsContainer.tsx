import React from "react";
import { Box, List, CircularProgress } from "@mui/material";
import GroupsListItem from "./groupsListItem/GroupsListItem";
import { ChatGroup } from "../../models/chatGroup";
import { useChatGroupStore } from "../../state/useChatGroupsStore";

const GroupsContainer: React.FC<{
  chatGroups: ChatGroup[];
  searchQuery: string;
}> = ({ chatGroups, searchQuery }) => {
  const { selectChatGroup, loading } = useChatGroupStore();

  const handleGroupClick = (groupId: string) => {
    selectChatGroup(groupId);
  };

  const filteredGroups = chatGroups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      sx={{ overflowY: "auto", maxHeight: "calc(100vh - 111px)", padding: 0 }}
    >
      {loading ? (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <List>
          {filteredGroups.length ? (
            filteredGroups.map((group) => (
              <GroupsListItem
                key={group.id}
                chatGroup={group}
                onItemClick={() => handleGroupClick(group.id)}
              />
            ))
          ) : (
            <Box
              component="div" 
              sx={{
                textAlign: "center",
                color: "gray.400",
                marginTop: "16px",
                fontSize: "14px",
              }}
            >
              No groups found.
            </Box>
          )}
        </List>
      )}
    </Box>
  );
};

export default GroupsContainer;
