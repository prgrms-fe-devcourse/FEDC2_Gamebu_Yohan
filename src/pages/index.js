import React from 'react';
import styled from '@emotion/styled';
import Topbar from '@components/Topbar';
import BottomNavBar from '@components/BottomNavBar';
import { Outlet } from 'react-router-dom';

const ContentWrapper = styled.div`
  padding: 1.5rem;
`;

function Home() {
  return (
    <>
      <Topbar />
      <ContentWrapper>
        {/* FIXME home 페이지 */}
        <div style={{ height: '400px' }}>
          <Outlet />
        </div>
      </ContentWrapper>
      <BottomNavBar />
    </>
  );
}

export default Home;
