import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { ChevronLeft, StarRate, Login, Logout } from '@mui/icons-material';
import {
  List,
  ListItem,
  Drawer,
  IconButton,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
} from '@mui/material';
import { Link, useLocation, Route, Navigate } from 'react-router-dom';
import { CATEGORIES, CHANNELS } from '@utils/constants';
import useValueContext from '@hooks/useValueContext';
import Header from '@components/Header';
import Thumbnail from '@components/Thumbnail';
import useActionContext from '@hooks/useActionContext';
import IconImages from '@assets/ChannelIcons';

const DrawerHeader = styled.div`
  display: 'flex';
  align-items: 'center';
  justify-content: 'flex-end';
`;

const HeaderWrapper = styled.div`
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

const ContentWrapper = styled.div`
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.5rem;
  text-align: center;
`;

const AuthContainer = styled.div`
  height: 3rem;
  display: flex;
  position: absolute;
  bottom: 0;
  right: 0;
`;

const ProfileWrapper = styled.div`
  padding: 0.5rem;
  display: flex;
`;

const UserNameWrapper = styled.div`
  padding: 1rem;
`;

const GameIcon = styled.img`
  width: 24px;
  height: 24px;
`;

function Sidebar({ open, onClose }) {
  const { user, isLogin } = useValueContext();
  const { logout } = useActionContext();
  const [userFavorites, setUserFavorites] = useState([]);
  const [channels] = useState(CHANNELS);
  const [isRedirect, setIsRedirect] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (user && user.username) {
      setUserFavorites(JSON.parse(user.username));
    } else {
      setUserFavorites([]);
    }
  }, [user]);

  const setRedirectPaths = useCallback(() => {
    const currentPaths = location.pathname;
    const splitPaths = currentPaths.split('/');
    const checkPaths = splitPaths.some(
      (path) => path === 'alram' || path === 'write' || path === 'edit'
    );

    setIsRedirect(checkPaths);
  }, [location, setIsRedirect]);

  return (
    <Drawer variant="temporary" open={open} onClose={onClose}>
      <DrawerHeader>
        <IconButton onClick={onClose}>
          <ChevronLeft />
          <Header>Gamebu</Header>
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {isLogin && (
          <>
            <Link to={`profile/${user._id}`}>
              <ProfileWrapper>
                <Thumbnail
                  image={user.image || null}
                  name={user.fullName}
                  badge={false}
                  isOnline={user.isOnline}
                />
                <UserNameWrapper>
                  <Header strong>{user.fullName}</Header>
                </UserNameWrapper>
              </ProfileWrapper>
            </Link>
            <Divider />
          </>
        )}
        <HeaderWrapper>
          <Header>즐겨찾기 목록</Header>
        </HeaderWrapper>
        {!isLogin && (
          <ContentWrapper>로그인 후 즐겨찾기를 등록해보세요.</ContentWrapper>
        )}
        {isLogin && userFavorites.length === 0 ? (
          <ContentWrapper>즐겨찾기를 등록해보세요.</ContentWrapper>
        ) : (
          userFavorites.map((item) => {
            return (
              <ListItem onClick={() => onClose()} key={item} disablePadding>
                <Link to={`channel/${item}`}>
                  <ListItemButton>
                    <ListItemIcon>
                      <StarRate sx={{ color: '#f2f20d' }} />
                    </ListItemIcon>
                    <ListItemText primary={CATEGORIES[item]} />
                  </ListItemButton>
                </Link>
              </ListItem>
            );
          })
        )}
        <Divider />
        <HeaderWrapper>
          <Header>채널 카테고리</Header>
        </HeaderWrapper>
        {channels.map((item) => (
          <ListItem onClick={() => onClose()} key={item.id} disablePadding>
            <Link to={`channel/${item.id}`}>
              <ListItemButton>
                <ListItemIcon>
                  <GameIcon src={`${IconImages[item.id]}`} />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <AuthContainer>
        {!isLogin ? (
          <Button
            variant="contained"
            sx={{ color: '#424242', bgcolor: '#eeeeee' }}
          >
            <Link to="/login">
              <Login sx={{ fontSize: 'small', mr: 1 }} />
              로그인
            </Link>
          </Button>
        ) : (
          <Button
            onClick={() => {
              logout();
              onClose();
              setRedirectPaths();
            }}
            variant="contained"
            sx={{ color: '#424242', bgcolor: '#eeeeee' }}
          >
            <Logout sx={{ fontSize: 'small', mr: 1 }} />
            로그아웃
          </Button>
        )}
      </AuthContainer>
      {isRedirect && <Route path="/" element={<Navigate replace to="/" />} />}
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
