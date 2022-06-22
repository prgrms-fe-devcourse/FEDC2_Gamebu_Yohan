import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import { getAllUserList } from '@utils/user';
import Thumbnail from '@components/Thumbnail';
import useValueContext from '@hooks/useValueContext';
import Header from '@components/Header';

const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paperAnchorRight {
    max-width: 50%;
    word-wrap: break-word;
  }
`;

const UserSiderbarHeader = styled(IconButton)`
  width: 100%;
  justify-content: space-between;
`;

function UserSidebar({ open, onClose }) {
  const { user } = useValueContext();
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      getAllUserList().then((response) => setUserList(response));
    }
  }, [open]);
  return (
    <StyledDrawer
      variant="temporary"
      open={open}
      onClose={onClose}
      anchor="right"
    >
      <UserSiderbarHeader onClick={onClose}>
        <Header level={1} strong fontSize="1.25rem">
          유저 목록
        </Header>
        <ChevronRightIcon />
      </UserSiderbarHeader>
      <Divider />
      <List>
        {userList
          .filter((item) => item._id !== user._id && item.role !== 'SuperAdmin')
          .sort((a, b) => b.isOnline - a.isOnline)
          .map(({ _id, fullName, isOnline }) => {
            return (
              <ListItem key={_id} disablePadding>
                <ListItemButton>
                  <ListItemIcon onClick={() => navigate(`/profile/${_id}`)}>
                    <Thumbnail name={fullName} badge isOnline={isOnline} />
                  </ListItemIcon>
                  <ListItemText
                    primary={fullName}
                    onClick={() => {
                      onClose();
                      navigate(`/message/${_id}`);
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
    </StyledDrawer>
  );
}

UserSidebar.defaultProps = {
  open: false,
  onClose: () => {},
};

UserSidebar.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default UserSidebar;
