import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import moment from "moment";
import { useChatGroupStore } from "../../state/useChatGroupsStore";
import { useMessageStore } from "../../state/useMessageStore";
import Message from "./Message";

const MessagesContainer: React.FC = () => {
  const messageRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const { groupMessagesByDate, isLoading, loadMessages, messages, } =
    useMessageStore();
  const { selectedChatGroup, setLastMessage } = useChatGroupStore();

  useEffect(() => {
    if (selectedChatGroup) loadMessages(selectedChatGroup.id);
  }, [selectedChatGroup]);

  useEffect(() => {
    if (isAtBottom && messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "instant" });
    }

    setLastMessage(selectedChatGroup!.id, messages[messages.length - 1] )

  }, [messages]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      setIsAtBottom(scrollHeight - scrollTop - clientHeight <= 50);
    };

    const container = containerRef.current;
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <Box
      ref={containerRef}
      sx={{
        flex: 1,
        overflowY: "auto",
        backgroundColor: "#181b25",
        position: "relative",
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100%",
          }}
        >
          <Typography variant="h6" color="white">
            Loading...
          </Typography>
        </Box>
      ) : messages.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            gap: 2,
          }}
        >
          <Box
            component="img"
            src="/conversation.png"
            draggable={false}
            sx={{ width: "150px" }}
          />
          <Typography variant="h5" color="whitesmoke">
            No messages yet. Start chatting!
          </Typography>
        </Box>
      ) : (
        Object.keys(groupedMessages).map((date) => (
          <Box key={date}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 2,
              }}
            >
              <Box
                sx={{
                  paddingX: 2,
                  paddingY: 1,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                  borderRadius: "16px",
                  textAlign: "center",
                }}
              >
                <Typography sx={{userSelect: 'none'}} variant="body2" fontWeight="bold">
                  {moment(date, "DD/MM/YYYY").format("MMMM D")}
                </Typography>
              </Box>
            </Box>
            {groupedMessages[date].map((message, index) => (
              <Message message={message} key={index} />
            ))}
          </Box>
        ))
      )}

      {!isAtBottom && (
        <Box
          sx={{
            position: "sticky",
            bottom: "16px",
            right: "16px",
            zIndex: 10,
            marginRight: 2,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            color="inherit"
            onClick={() => {
              messageRef.current?.scrollIntoView({ behavior: "instant" });
              setIsAtBottom(true);
            }}
            sx={{
              borderRadius: "50%",
              minWidth: 40,
              width: 40,
              height: 40,
              padding: 0,
            }}
          >
            <ArrowDownwardIcon />
          </Button>
        </Box>
      )}

      <span ref={messageRef} />
    </Box>
  );
};

export default MessagesContainer;
