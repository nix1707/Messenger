import React from "react";
import {  Typography, Icon, Stack } from "@mui/material";
import { DoneAll } from "@mui/icons-material";
import moment from "moment";

interface TimestampProps {
  createdAt: Date;
}

const Timestamp: React.FC<TimestampProps> = ({ createdAt }) => (
  <Stack direction="column" sx={{ color: "gray.300" }}>
    <Typography noWrap variant="body2">{moment(createdAt).format("LT")}</Typography>
    <Icon>
      <DoneAll />
    </Icon>
  </Stack>
);

export default Timestamp;
