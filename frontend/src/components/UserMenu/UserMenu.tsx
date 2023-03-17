import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { User } from "../../types";
import {useAppDispatch} from "../../app/hooks";
import {logout} from "../../features/user/userThunks";

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateClick = () => {
    navigate("/trackHistory");
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const navigateToCreate = (arg: string) => {
    navigate('/add' + arg)
  }

  return (
    <>
      <Button onClick={handleClick} color="inherit">
        Hello, {user.displayName}
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={navigateClick}>Track History</MenuItem>
        <MenuItem onClick={handleLogout}> Logout </MenuItem>
        <MenuItem onClick={() => navigateToCreate('Album')}> Add Album </MenuItem>
        <MenuItem onClick={() => navigateToCreate('Artist')}> Add Artist </MenuItem>
        <MenuItem onClick={() => navigateToCreate('Track')}> Add Track </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
