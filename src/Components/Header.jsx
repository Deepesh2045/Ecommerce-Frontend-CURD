import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import LogOutConfirmation from "./LogOutConfirmation";
import CustomAvatar from "./CustomAvatat";
import LoginIcon from "./LoginIcon";
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useQuery } from "react-query";
import $axios from "../lib/axios.instance";

const drawerWidth = 240;
const navItems = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    name: "Products",
    path: "/products",
  },
  {
    id: 3,
    name: "About",
    path: "/about",
  },
  {
    id: 4,
    name: "Contact",
    path: "/contact",
  },
];

function Header(props) {

  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => {
                navigate(item.path);
              }}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  // For hide logout button and login

  const userRole = localStorage.getItem("userRole");
  
  const { data } = useQuery({
    queryKey: ["cart-count"],
    queryFn: async () => {
      return await $axios.get("/cart/item/count");
    },
   enabled:userRole ==="buyer"
  });

 const itemCount = data?.data?.itemCount

  return (
    <>
      <CssBaseline />
      <Box sx={{width:"100%",height:"63px",background:"transparent"}}>
      <AppBar component="nav" sx={{ background: "#111111" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h4"
            component="div"
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                sm: "block",
                fontWeight: "bold",
                textAlign: "start",
                color: "#006700",
              },
            }}
          >
            <img src="../logo.PNG" alt="logo" width="60px" />
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item.id}
                sx={{ color: "#fff" }}
                onClick={() => {
                  navigate(item.path);
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>

          
          {(userRole === "buyer" || userRole === "seller") && <CustomAvatar />}

          {(userRole === "buyer" || userRole === "seller") && (<LogOutConfirmation />)}

          {userRole !== "buyer" && userRole !== "seller" && <LoginIcon />}


          {userRole === "buyer" && <Badge badgeContent={itemCount} color="primary" >
            
            <ShoppingCartOutlinedIcon color="action" sx={{color:"#fff",marginRight:"1rem", padding:"0", cursor:"pointer"}} onClick={()=>{
              navigate("/cart")
            }} />
          </Badge> }

          
          
        </Toolbar>
      </AppBar>
      </Box>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
}

Header.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Header;
