import React, { useEffect } from "react";
import { Grid2 } from "@mui/material";

import NoChatSelected from "./NoChatSelected";
import { useChatGroupStore } from "../../state/useChatGroupsStore";
import { useMessageStore } from "../../state/useMessageStore";
import GroupsList from "../groupsList/GroupsList";
import MessagesContainer from "../message/MessagesContainer";
import NavBar from "./NavBar";
import MessageInput from "./MessageInput";

const Chat: React.FC = () => {
  const { selectedChatGroup } = useChatGroupStore();
  const { createHubConnection, stopHubConnection } = useMessageStore();

  useEffect(() => {
    if (selectedChatGroup?.id) {
      stopHubConnection();
      createHubConnection(selectedChatGroup.id, localStorage.getItem("jwt")!);
    }
  }, [selectedChatGroup?.id]);

  return (
    <Grid2 sx={{ display: "flex", width: "100%", height: "100vh" }}>
      <GroupsList></GroupsList>

      <Grid2
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          padding: 1,
          height: "100%",
        }}
      >
        {selectedChatGroup ? (
          <>
            <NavBar />
            <MessagesContainer />
            <MessageInput />
          </>
        ) : (
          <NoChatSelected />
        )}
      </Grid2>
    </Grid2>
  );
};

export default Chat;
