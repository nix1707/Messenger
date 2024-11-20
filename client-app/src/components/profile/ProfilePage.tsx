import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Paper,
  Button,
  Grid,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import { useParams } from "react-router";
import LoadingComponent from "../LoadingComponent";
import useProfileStore from "../../state/useProfileStore";
import { useUserStore } from "../../state/useUserStore";
import QrCodeIcon from "@mui/icons-material/QrCode";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import router from "../../router/Routes";

const ProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { loading, loadProfile, profile } = useProfileStore();
  const { user } = useUserStore();
  const [qrVisible, setQrVisible] = useState(false);

  useEffect(() => {
    if (username) loadProfile(username);
  }, [loadProfile, username]);

  if (loading) return <LoadingComponent />;

  const isOwner = user?.username === username;
  const profileUrl = window.location.href;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile?.displayName}'s Profile`,
          text: "Check out this profile!",
          url: profileUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Sharing is not supported on your device.");
    }
  };

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
      }}
    >
      <Box>
        <Tooltip title='Back to Chat' arrow>
          <IconButton
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              color: "white",
            }}
            onClick={() => router.navigate("/")}
          >
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Paper
        elevation={5}
        sx={{
          width: "100%",
          maxWidth: 500,
          p: 4,
          borderRadius: "15px",
          textAlign: "center",
          backgroundColor: "#1e1e2f",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
          color: "white",
          mt: 2,
          position: "relative",
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            background: qrVisible
              ? "linear-gradient(135deg, #f44336, #e53935)"
              : "linear-gradient(135deg, #7b42f6, #634bfb)",
            color: "white",
            "&:hover": {
              background: qrVisible
                ? "linear-gradient(135deg, #e53935, #f44336)"
                : "linear-gradient(135deg, #634bfb, #7b42f6)",
            },
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
          }}
          onClick={() => setQrVisible(!qrVisible)}
        >
          {qrVisible ? <CloseIcon /> : <QrCodeIcon />}
        </IconButton>

        {qrVisible ? (
          <Stack gap={3} alignItems="center">
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Scan this QR Code
            </Typography>
            <Box
              sx={{
                p: 1,
                bgcolor: "white",
                borderRadius: "20px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                display: "inline-block",
                margin: "0 auto",
              }}
            >
              <QRCodeSVG
                value={profileUrl}
                size={200}
                bgColor="#ffffff"
                fgColor="#7b42f6"
                level="Q"
                style={{ borderRadius: "15px" }}
              />
            </Box>
          </Stack>
        ) : (
          <>
            <Avatar
              src={profile?.image?.url || "/user.png"}
              alt={profile?.displayName}
              sx={{
                width: 120,
                height: 120,
                margin: "0 auto",
                mb: 3,
                background: "linear-gradient(135deg, #7b42f6, #634bfb)",
                border: "4px solid transparent",
                borderRadius: "50%",
                display: "inline-block",
                position: "relative",
              }}
            />

            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                mb: 1,
                color: "white",
              }}
            >
              {profile?.displayName || "No Name"}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontStyle: "italic",
                mb: 3,
                color: "#b0b3c0",
              }}
            >
              @{profile?.username || "No Username"}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: "#b0b3c0" }}>
              {profile?.bio || "No bio available"}
            </Typography>

            <Grid container spacing={2} justifyContent="center">
              {isOwner && (
                <Grid item>
                  <Button
                    variant="contained"
                    sx={{
                      px: 3,
                      background: "linear-gradient(135deg, #f2994a, #f2c94c)",
                      color: "white",
                      "&:hover": {
                        background: "linear-gradient(135deg, #f2c94c, #f2994a)",
                      },
                    }}
                    onClick={() => {
                      window.location.href = `/edit-profile/${username}`;
                    }}
                  >
                    Edit Profile
                  </Button>
                </Grid>
              )}

              <Grid item>
                <Button
                  variant="contained"
                  sx={{
                    px: 3,
                    background: "linear-gradient(135deg, #7b42f6, #634bfb)",
                    color: "white",
                    "&:hover": {
                      background: "linear-gradient(135deg, #634bfb, #7b42f6)",
                    },
                  }}
                  onClick={handleShare}
                >
                  Share Profile
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default ProfilePage;
