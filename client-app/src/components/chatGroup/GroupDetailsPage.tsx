import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Paper,
  IconButton,
  Grid,
  Stack,
} from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import { useParams, useNavigate } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { useChatGroupStore } from "../../state/useChatGroupsStore";
import { ChatGroup } from "../../models/chatGroup";
import GroupAvatar from "../groupsList/groupsListItem/GroupAvatar";

const GroupDetailsPage: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const [group, setGroup] = useState<ChatGroup | null>(null);
  const [qrVisible, setQrVisible] = useState(false);
  const navigate = useNavigate();
  const { loadDetails } = useChatGroupStore();

  const groupUrl = window.location.href;

  useEffect(() => {
    // setGroup({
    //   id: groupId || "1",
    //   name: "Sample Group",
    //   description: "A sample group description",
    //   members: [
    //     {
    //       id: "1",
    //       username: "john_doe",
    //       displayName: "John Doe",
    //       image: { url: "/default-avatar.png" },
    //     },
    //     {
    //       id: "2",
    //       username: "jane_doe",
    //       displayName: "Jane Doe",
    //       image: { url: "/default-avatar.png" },
    //     },
    //   ],
    // });
    const getDetails = async () => {
      const details = await loadDetails(groupId!);
      setGroup(details);
    };

    getDetails();
  }, [groupId]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1e1e30, #2a3b5c, #432659)",
        p: 2,
        position: "relative",
      }}
    >
      <IconButton
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          color: "white",
        }}
        onClick={() => navigate("/")}
      >
        <ArrowBackIcon />
      </IconButton>

      <Paper
        elevation={5}
        sx={{
          width: "100%",
          maxWidth: 800,
          p: 4,
          borderRadius: "15px",
          backgroundColor: "#1e1e2f",
          color: "white",
          position: "relative",
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            },
          }}
          onClick={() => setQrVisible(!qrVisible)}
        >
          <QrCodeIcon />
        </IconButton>

        {qrVisible ? (
          <Stack alignItems="center">
            <Typography variant="h6" sx={{ mb: 2 }}>
              Scan this QR Code to Join
            </Typography>
            <Box
              sx={{
                p: 1,
                bgcolor: "white",
                borderRadius: "10px",
                display: "inline-block",
              }}
            >
              <QRCodeSVG
                value={groupUrl}
                size={200}
                bgColor="#ffffff"
                fgColor="#7b42f6"
                level="Q"
              />
            </Box>
          </Stack>
        ) : (
          <>
            <Avatar
              src="/group-placeholder.png"
              alt={group?.name}
              sx={{
                width: 120,
                height: 120,
                margin: "0 auto",
                mb: 3,
                background: "linear-gradient(135deg, #7b42f6, #634bfb)",
                borderRadius: "50%",
              }}
            />
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
              {group?.name || "Group Name"}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: "#b0b3c0" }}>
              {group?.description || "No description available"}
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    p: 2,
                    border: "1px solid whitesmoke",
                    borderRadius: "8px",
                    height: "100%",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", mb: 2, color: "white" }}
                  >
                    Members
                  </Typography>
                  <Stack spacing={2}>
                    {group?.members.map((member, idx) => (
                      <Box key={idx} display="flex" gap={1} alignItems="center">
                        <GroupAvatar
                          image={member.image}
                          name={member.displayName}
                        />
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: "bold", color: "white" }}
                          >
                            {member.displayName}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: "#b0b3c0" }}
                          >
                            @{member.username}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    p: 2,
                    border: "1px solid whitesmoke",
                    borderRadius: "8px",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", mb: 2, color: "white" }}
                  >
                    Settings
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#b0b3c0" }}>
                    Settings panel placeholder. Add settings here.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default GroupDetailsPage;
