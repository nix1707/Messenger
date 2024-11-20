import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Tabs,
  Tab,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useUserStore } from "../../state/useUserStore";
import { Navigate } from "react-router";

const LoginRegister = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    displayName: "",
    username: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const { login, register, user } = useUserStore();

  const handleChange = (field: string, value: string) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e: React.FormEvent, isLogin: boolean) => {
    e.preventDefault();
    if (isLogin) {
      await login({ email: credentials.email, password: credentials.password });
    } else {
      await register(credentials);
    }
    window.location.reload();
  };

  const renderTextField = (
    label: string,
    field: string,
    type: string = "text",
    required: boolean = true
  ) => (
    <TextField
      label={label}
      fullWidth
      required={required}
      margin="normal"
      type={field === "password" && !showPassword ? "password" : type}
      value={credentials[field as keyof typeof credentials] || ""}
      onChange={(e) => handleChange(field, e.target.value)}
      InputProps={
        field === "password"
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : undefined
      }
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "10px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          "& fieldset": {
            borderColor: "rgba(255, 255, 255, 0.2)",
          },
          "&:hover fieldset": {
            borderColor: "#7c3aed",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#9f60f5",
          },
        },
        "& .MuiInputLabel-root": {
          color: "rgba(255, 255, 255, 0.8)",
        },
        "& .MuiInputBase-root": {
          color: "white",
        },
      }}
    />
  );

  if (!!user && !!localStorage.getItem("jwt")) return <Navigate to="/" />;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: 4,
      }}
    >
      <Paper
        sx={{
          padding: 5,
          maxWidth: 450,
          width: "100%",
          textAlign: "center",
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          variant="fullWidth"
          sx={{
            mb: 3,
            "& .MuiTab-root": {
              color: "rgba(255, 255, 255, 0.7)",
              fontWeight: "600",
              fontSize: "1rem",
              transition: "all 0.3s ease",
              "&:hover": {
                color: "#9f60f5",
              },
            },
            "& .Mui-selected": {
              color: "#7c3aed",
              fontWeight: "bold",
            },
            "& .MuiTabs-indicator": {
              height: "4px",
              borderRadius: "2px",
              backgroundColor: "#7c3aed",
            },
          }}
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        <Box
          component="form"
          onSubmit={(e) => handleSubmit(e, activeTab === 0)}
        >
          {renderTextField("Email", "email")}
          {renderTextField("Password", "password")}
          {activeTab === 1 && renderTextField("Username", "username")}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 4,
              py: 1.5,
              fontWeight: "bold",
              fontSize: "1rem",
              textTransform: "uppercase",
              background: "linear-gradient(90deg, #7c3aed 0%, #9f60f5 100%)",
              color: "white",
              borderRadius: "12px",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(90deg, #5c27b5 0%, #7c3aed 100%)",
                transform: "scale(1.03)",
              },
            }}
          >
            {activeTab === 0 ? "Login" : "Register"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginRegister;
