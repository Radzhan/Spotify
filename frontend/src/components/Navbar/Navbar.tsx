import { AppBar, IconButton, Link, Toolbar } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";

const Navbar = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Link component={RouterLink} to="/" variant="body1" color="inherit">
            Spotify
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
