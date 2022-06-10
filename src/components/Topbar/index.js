import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import styled from '@emotion/styled';

const GrowBlank = styled.div`
  flex-grow: 1;
`;

function Topbar() {
  return (
    <AppBar position="relative" color="inherit">
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer">
          <MenuIcon />
        </IconButton>
        <GrowBlank />
        <IconButton color="inherit">
          <NotificationsNoneIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;
