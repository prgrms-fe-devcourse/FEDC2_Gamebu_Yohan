import { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import styled from '@emotion/styled';
import HomeIcon from '@mui/icons-material/Home';
import WidgetsIcon from '@mui/icons-material/Widgets';
import SearchIcon from '@mui/icons-material/Search';

const BottomNavbarWrapper = styled.div`
  width: 100%;
`;

function BottomNavBar() {
  const [value, setValue] = useState(0);

  return (
    <BottomNavbarWrapper>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
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
