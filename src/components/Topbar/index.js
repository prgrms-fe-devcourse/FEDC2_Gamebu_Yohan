import React, { useState, useCallback } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import styled from '@emotion/styled';
import ClickAwayPopper from '@components/ClickAwayPopper';
import PeopleIcon from '@mui/icons-material/People';
import Sidebar from './Sidebar';
import UserSidebar from './UserSidebar';

const GrowBlank = styled.div`
  flex-grow: 1;
`;

function Topbar() {
  const [open, setOpen] = useState(false);
  const [userDrawerOpen, setUserDrawerOpen] = useState(false);

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleUserDrawerOpen = useCallback(() => {
    setUserDrawerOpen(true);
  }, []);

  const handleUserDrawerClose = useCallback(() => {
    setUserDrawerOpen(false);
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
          <IconButton
            color="inherit"
            aria-label="open userDrawer"
            onClick={handleUserDrawerOpen}
          >
            <PeopleIcon />
          </IconButton>
          <ClickAwayPopper
            id="alarm-popper"
            placement="auto-end"
            contentProps={{
              style: {
                width: 200,
                height: 180,
                backgroundColor: 'white',
                borderRadius: 8,
                border: '1px solid black',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
            }}
          >
            <IconButton color="inherit">
              <NotificationsNoneIcon />
            </IconButton>
            <div>POP!!</div>
            <div>POP!!</div>
          </ClickAwayPopper>
        </Toolbar>
      </AppBar>
      <Sidebar open={open} onClose={handleDrawerClose} />
      <UserSidebar open={userDrawerOpen} onClose={handleUserDrawerClose} />
    </>
  );
}

export default Topbar;
