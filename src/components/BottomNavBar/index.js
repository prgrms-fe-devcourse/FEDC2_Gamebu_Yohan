import { useState, useEffect, useCallback } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import styled from '@emotion/styled';
import HomeIcon from '@mui/icons-material/Home';
import WidgetsIcon from '@mui/icons-material/Widgets';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate, useLocation } from 'react-router-dom';
import useValueContext from '@hooks/useValueContext';
import LoginModal from '@components/LoginModal';

const BottomNavbarWrapper = styled.div`
  width: 100%;
`;

const routingTable = {
  0: '/',
  1: '/channel/categories',
  2: '/search/all',
  3: '/message',
};

function BottomNavBar() {
  const [value, setValue] = useState(0);
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isLogin } = useValueContext();

  const handleCloseModal = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    if (pathname.length === 1) {
      return setValue(0);
    }
    if (pathname.includes('search')) {
      return setValue(2);
    }
    if (pathname.includes('message')) {
      return setValue(3);
    }
    if (pathname.includes('alram')) {
      return setValue(4);
    }
    return setValue(1);
  }, [pathname]);

  return (
    <BottomNavbarWrapper>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_, newValue) => {
          if (newValue === value) return;
          if (newValue === 3 && !isLogin) {
            setVisible(true);
            return;
          }
          setValue(newValue);
          navigate(routingTable[newValue]);
        }}
      >
        <BottomNavigationAction label="홈" icon={<HomeIcon />} />
        <BottomNavigationAction label="채널" icon={<WidgetsIcon />} />
        <BottomNavigationAction label="검색" icon={<SearchIcon />} />
        <BottomNavigationAction label="메시지" icon={<SendIcon />} />
      </BottomNavigation>
      <LoginModal visible={visible} handleCloseModal={handleCloseModal} />
    </BottomNavbarWrapper>
  );
}

export default BottomNavBar;
