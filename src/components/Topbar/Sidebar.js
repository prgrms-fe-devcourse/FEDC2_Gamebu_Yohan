import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import GamesIcon from '@mui/icons-material/Games';
import StarRateIcon from '@mui/icons-material/StarRate';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from 'react-router-dom';
import { CATEGORIES, CHANNELS } from '@utils/constants';
import { useState, useEffect } from 'react';
import useValueContext from '@hooks/useValueContext';
import Header from '@components/Header';

const DrawerHeader = styled.div`
  display: 'flex';
  align-items: 'center';
  justify-content: 'flex-end';
`;

const HeaderWrapper = styled.div`
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

function Sidebar({ open, onClose }) {
  const { user } = useValueContext();
  const [userFavorites, setUserFavorites] = useState([]);
  const [channels] = useState(CHANNELS);

  useEffect(() => {
    if (user && user.username) {
      setUserFavorites(JSON.parse(user.username));
    }
  }, [user]);
  console.log(user, userFavorites);
  return (
    <Drawer variant="temporary" open={open} onClose={onClose}>
      <DrawerHeader>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
          <Header>Gamebu</Header>
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary={<Link to="/login">로그인</Link>} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <HeaderWrapper>
          <Header>즐겨찾기 목록</Header>
        </HeaderWrapper>
        {user &&
          userFavorites.map((item) => {
            if (item === '') return;

            return (
              <ListItem key={item} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <StarRateIcon sx={{ color: '#f2f20d' }} />
                  </ListItemIcon>
                  <ListItemText primary={CATEGORIES[item]} />
                </ListItemButton>
              </ListItem>
            );
          })}
        <Divider />
        <HeaderWrapper>
          <Header>채널 카테고리</Header>
        </HeaderWrapper>
        {channels.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <GamesIcon />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

Sidebar.defaultProps = {
  open: false,
  onClose: () => {},
};

Sidebar.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Sidebar;
