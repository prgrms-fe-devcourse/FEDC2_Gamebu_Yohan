import { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import styled from '@emotion/styled';
import HomeIcon from '@mui/icons-material/Home';
import WidgetsIcon from '@mui/icons-material/Widgets';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const BottomNavbarWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

function BottomNavBar() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const routeTable = {
    0: '/',
    1: '/categories',
    2: '/search/all',
  };
  return (
    <BottomNavbarWrapper>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_, newValue) => {
          if (newValue === value) return;
          setValue(newValue);
          navigate(routeTable[newValue]);
        }}
      >
        <BottomNavigationAction label="홈" icon={<HomeIcon />} />
        <BottomNavigationAction label="채널" icon={<WidgetsIcon />} />
        <BottomNavigationAction label="검색" icon={<SearchIcon />} />
      </BottomNavigation>
    </BottomNavbarWrapper>
  );
}

export default BottomNavBar;
