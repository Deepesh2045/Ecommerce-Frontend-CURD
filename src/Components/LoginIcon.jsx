import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const LoginIcon = () => {
  const navigate = useNavigate();
  return (
    <>
    <Box sx={{background:"", marginRight:{xs:"0px",md:"2rem"}, width:{xs:"100%",md:"0"},textAlign:{xs:"end"}}}>
      <IconButton
        sx={{ color: "white",background:"" }}
        onClick={() => {
          navigate("/login");
        }}
      >
        <Tooltip title="Login">
          <AccountCircleIcon sx={{margin:"",background:""}} />
        </Tooltip>
      </IconButton>
      </Box>
    </>

  );
};

export default LoginIcon;
