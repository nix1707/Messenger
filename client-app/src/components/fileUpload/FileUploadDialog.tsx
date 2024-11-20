import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box,
  TextField,
  Stack,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useMessageStore } from "../../state/useMessageStore";

const FileUploadDialog: React.FC<{
  textareaContent: string;
  handleSendMessage: (message: string, file: File | null) => Promise<void>;
}> = ({ handleSendMessage, textareaContent }) => {
  const { isSending } = useMessageStore();
  const [open, setOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileURL, setFileURL] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileURL(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [file]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setFile(event.dataTransfer.files[0]);
    }
  };

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        disabled={isSending}
        aria-label="Attach file"
      >
        <AttachFileIcon style={{ color: "#bb86fc" }} />
      </IconButton>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            borderRadius: 16,
            backgroundColor: "#202430",
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            color: "#fff",
            padding: "16px",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          Upload File
        </DialogTitle>
        <DialogContent sx={{ padding: "24px", textAlign: "center" }}>
          {!file && (
            <Box
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              border="2px dashed whitesmoke"
              borderRadius="16px"
              padding="24px"
              textAlign="center"
              sx={{
                transition: "all 0.3s",
                "&:hover": {
                  borderColor: "#ce93d8",
                },
              }}
              onClick={() => document.getElementById("file-input")?.click()}
            >
              <CloudUploadIcon style={{ fontSize: 64, color: "#bb86fc" }} />
              <Typography
                variant="subtitle1"
                mt={2}
                style={{ color: "#fff", fontSize: "16px" }}
              >
                Drag and drop a file here or click to select
              </Typography>
              <input
                type="file"
                id="file-input"
                onChange={handleFileChange}
                style={{ display: "none" }}
                accept="image/*,video/*"
              />
            </Box>
          )}

          {file && fileURL && (
            <Box sx={{ width: "100%", bgcolor: "#BE90D4" }}>
              <IconButton
                onClick={() => {
                  setFile(null);
                  setCaption("");
                }}
                sx={{
                  position: "absolute",
                  right: "30px",
                  zIndex: 10,
                }}
              >
                <DeleteIcon />
              </IconButton>
              {file.type.startsWith("image/") ? (
                <Box
                  component="img"
                  src={fileURL}
                  alt="Uploaded Preview"
                  sx={{
                    width: "100%",
                    height: "250px",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <Box
                  component="video"
                  src={fileURL}
                  muted
                  autoPlay
                  sx={{
                    width: "100%",
                    height: "250px",
                  }}
                />
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions
          sx={{
            padding: "16px",
            justifyContent: "space-between",
          }}
        >
          <Stack direction="column" width="100%" gap={1}>
            {file && (
              <TextField
                label="Add a Caption"
                variant="standard"
                color="secondary"
                fullWidth
                defaultValue={textareaContent}
                onChange={(e) => setCaption(e.target.value)}
              />
            )}
            <Stack direction="row" justifyContent="space-between">
              <Button
                variant="text"
                color="secondary"
                onClick={() => {
                  setFile(null);
                  setFileURL(null);
                  setCaption("");
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              {file && (
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={async () => {
                    await handleSendMessage(caption, file);
                    setOpen(false);
                    setFile(null);
                    setFileURL(null);
                  }}
                >
                  Send
                </Button>
              )}
            </Stack>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FileUploadDialog;
