import React, { useState } from "react";
import { TextField, Box, IconButton } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Send } from "@mui/icons-material";
import { v4 as guid } from "uuid";
import { useChatGroupStore } from "../../state/useChatGroupsStore";
import { useMessageStore } from "../../state/useMessageStore";
import { useUserStore } from "../../state/useUserStore";
import FileUploadDialog from "../fileUpload/FileUploadDialog";

const MessageInput = () => {
  const [message, setMessage] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { sendMessage } = useMessageStore();
  const { selectedChatGroup } = useChatGroupStore();
  const { user } = useUserStore();
  const { isSending } = useMessageStore();

  const handleSendMessage = async (message: string, file: File | null) => {
    if (!message.trim() && !file) return;

    const messageData = {
      chatGroupId: selectedChatGroup!.id,
      body: message,
      username: user!.username,
      createdAt: new Date(),
      media: null,
      messageId: guid(),
    };

    setMessage("");
    setUploadedFile(null);

    await sendMessage(messageData, file);
  };

  return (
    <Box
      pt={1}
      gap={1}
      borderTop={2}
      borderColor="#43485b"
      display="flex"
      alignItems="center"
    >
      <FileUploadDialog handleSendMessage={handleSendMessage} textareaContent={message}/>
      <TextField
        fullWidth
        multiline
        minRows={1}
        maxRows={4}
        variant="outlined"
        disabled={isSending}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        InputProps={{
          style: {
            maxHeight: "120px",
            overflowY: "auto",
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#43485b",
            color: "#e5e3e5",
            borderRadius: "12px",
            padding: "10px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#43485b",
          },
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#9370e0",
          },
        }}
      />
      <LoadingButton
        onClick={() => handleSendMessage(message, uploadedFile)}
        loading={isSending}
        variant="contained"
        sx={{
          alignSelf: "flex-end",
          borderRadius: "12px",
          width: 45,
          minWidth: 45,
          height: 45,
        }}
      >
        <Send />
      </LoadingButton>
    </Box>
  );
};

export default MessageInput;
