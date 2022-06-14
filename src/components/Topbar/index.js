import React, { useState, useCallback } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import styled from '@emotion/styled';
import Sidebar from './Sidebar';

const GrowBlank = styled.div`
  flex-grow: 1;
`;

function Topbar() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <AppBar position="relative" color="inherit">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <GrowBlank />
          <IconButton color="inherit">
            <NotificationsNoneIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Sidebar open={open} onClose={handleDrawerClose} />
    </>
  );
}

export default Topbar;
