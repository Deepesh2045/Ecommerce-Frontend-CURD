import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const LoginIcon = () => {
  const navigate = useNavigate();
  return (
    <>
      <IconButton
        sx={{ color: "white" }}
        onClick={() => {
          navigate("/login");
        }}
      >
        <Tooltip title="Login">
          <AccountCircleIcon />
        </Tooltip>
      </IconButton>
    </>
  );
};

export default LoginIcon;
