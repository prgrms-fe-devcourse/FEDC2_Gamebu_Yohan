import React, { useState, useCallback, useMemo } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import styled from '@emotion/styled';
import ClickAwayPopper from '@components/ClickAwayPopper';
import PeopleIcon from '@mui/icons-material/People';
import useValueContext from '@hooks/useValueContext';
import AlarmMenu from '@components/AlarmMenu';
import { Badge } from '@mui/material';
import Sidebar from './Sidebar';
import UserSidebar from './UserSidebar';

const GrowBlank = styled.div`
  flex-grow: 1;
`;

function Topbar() {
  const [open, setOpen] = useState(false);
  const [userDrawerOpen, setUserDrawerOpen] = useState(false);
  const { user, isLogin } = useValueContext();
  const numberOfAlarms = useMemo(
    () => (user ? user.notifications.length : 0),
    [user]
  );
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
          {isLogin && (
            <ClickAwayPopper id="alarm-popper" placement="auto-end">
              <IconButton color="inherit">
                <Badge badgeContent={numberOfAlarms} color="error" max={99}>
                  <NotificationsRoundedIcon />
                </Badge>
              </IconButton>
              <AlarmMenu />
            </ClickAwayPopper>
          )}
          <IconButton
            color="inherit"
            aria-label="open userDrawer"
            onClick={handleUserDrawerOpen}
          >
            <PeopleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Sidebar open={open} onClose={handleDrawerClose} />
      <UserSidebar open={userDrawerOpen} onClose={handleUserDrawerClose} />
    </>
  );
}

export default Topbar;
