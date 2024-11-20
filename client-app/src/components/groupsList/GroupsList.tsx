import React, { useEffect, useCallback, useState } from "react";
import { Box, InputBase, IconButton, Tab } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import GroupsContainer from "./GroupsContainer";
import { useChatGroupStore } from "../../state/useChatGroupsStore";

const GroupsList = () => {
  const {
    chatGroups,
    loadChatGroups,
    exploreList,
    selectedChatGroup,
    loadExploreList,
  } = useChatGroupStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [tabValue, setTabValue] = useState("0");

  const loadGroups = useCallback(() => {
    if (!chatGroups.length) loadChatGroups();
  }, [chatGroups.length, loadChatGroups]);

  const loadExplore = useCallback(() => {
    if (!exploreList.length) loadExploreList();
  }, [exploreList.length, loadExploreList]);

  useEffect(() => {
    loadGroups();
    loadExplore();
  }, [loadGroups, loadExplore]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        top: 0,
        left: 0,
        pt: 3,
        backgroundColor: "#202430",
        minWidth: { xs: "100%", sm: "100%", md: "350px" },
        width: { xs: "100%", sm: "100%", md: "350px" },
        position: { xs: "absolute", sm: "absolute", md: "relative" },
        display: {
          xs: !selectedChatGroup ? "block" : "none",
          sm: !selectedChatGroup ? "block" : "none",
          md: "block",
        },
        height: "100%",
      }}
    >
      <Box sx={{ padding: "0px 10px", position: "relative" }}>
        <InputBase
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search"
          sx={{
            backgroundColor: "#43485b",
            color: "whitesmoke",
            borderRadius: "8px",
            padding: "8px",
            width: "100%",
          }}
        />
        {searchQuery && (
          <IconButton
            onClick={() => setSearchQuery("")}
            sx={{
              position: "absolute",
              right: "16px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <CloseIcon sx={{ color: "whitesmoke" }} />
          </IconButton>
        )}
      </Box>

      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "#43485b", width: "100%" }}>
          <TabList
            variant="fullWidth"
            onChange={handleTabChange}
            aria-label="Groups Tabs"
          >
            <Tab label="Chats" value="0" />
            <Tab label="Explore" value="1" />
          </TabList>
        </Box>
        <TabPanel value="0" sx={{ padding: 0, margin: 0 }}>
          <GroupsContainer chatGroups={chatGroups} searchQuery={searchQuery} />
        </TabPanel>
        <TabPanel value="1" sx={{ padding: 0, margin: 0 }}>
          <GroupsContainer chatGroups={exploreList} searchQuery={searchQuery} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default GroupsList;
