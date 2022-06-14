import React from 'react';
import styled from '@emotion/styled';
import Topbar from '@components/Topbar';
import BottomNavBar from '@components/BottomNavBar';
import { Outlet } from 'react-router-dom';

const ContentWrapper = styled.div`
  padding: 1.5rem;
  overflow-y: auto;
`;
const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 56px 1fr 56px;
`;
function Navbar() {
  return (
    <Container>
      <Topbar />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
      <BottomNavBar />
    </Container>
  );
}

export default Navbar;
