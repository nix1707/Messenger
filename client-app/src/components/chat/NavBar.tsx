import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Typography,
  Box,
  Stack,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InfoIcon from "@mui/icons-material/Info";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useChatGroupStore } from "../../state/useChatGroupsStore";
import { red } from "@mui/material/colors";
import { useMessageStore } from "../../state/useMessageStore";
import { AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import router from "../../router/Routes";
import { useUserStore } from "../../state/useUserStore";
import GroupAvatar from "../groupsList/groupsListItem/GroupAvatar";

const NavBar: React.FC<{}> = () => {
  const { user } = useUserStore();
  const { selectedChatGroup, clearSelectedChatGroup } = useChatGroupStore();
  const { clear } = useMessageStore();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewInfo = () => {
    console.log("View Info clicked");
    handleMenuClose();
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{ borderBottom: "1px solid #43485b", boxShadow: "none" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Stack alignItems="center" gap={1} direction="row">
          <IconButton
            color="inherit"
            onClick={() => {
              clearSelectedChatGroup();
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          <GroupAvatar image={selectedChatGroup!.image} name={selectedChatGroup!.name} />

          <Box>
            <Typography color="inherit">{selectedChatGroup?.name}</Typography>
            <Typography variant="body2" color="gray">
              {selectedChatGroup?.members.length}{" "}
              {selectedChatGroup!.members?.length > 1 ? "members" : "member"}
            </Typography>
          </Box>
        </Stack>

        <IconButton
          aria-label="more"
          aria-controls="context-menu"
          aria-haspopup="true"
          onClick={handleMenuClick}
          color="inherit"
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="context-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem
            onClick={() =>
              router.navigate(`/profiles/${user?.username}`, { replace: true })
            }
          >
            <ListItemIcon>
              <AccountCircle fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </MenuItem>
          <MenuItem
            onClick={() => router.navigate(`/groups/${selectedChatGroup!.id}`)}
          >
            <ListItemIcon>
              <InfoIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="View Info" />
          </MenuItem>
          <MenuItem
            sx={{ color: red[500] }}
            onClick={() => clear(selectedChatGroup!.id)}
          >
            <ListItemIcon>
              <ClearAllIcon sx={{ color: red[500] }} fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Clear Chat" />
          </MenuItem>
          <MenuItem sx={{ color: red[500] }} onClick={() => {}}>
            <ListItemIcon>
              <ExitToAppIcon sx={{ color: red[500] }} fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Leave" />
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
