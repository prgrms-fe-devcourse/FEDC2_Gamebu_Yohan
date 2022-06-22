import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { COLOR_BG, COLOR_SIGNATURE } from '@utils/color';
import Header from '@components/Header';
import ErrorIcon from '@mui/icons-material/Error';
import { Button } from '@mui/material';

const NotFoundPageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  background-color: ${COLOR_BG};
`;

const ContentContainer = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: ${COLOR_SIGNATURE};
  text-align: center;
  line-height: normal;
`;

function NotFoundPage() {
  return (
    <NotFoundPageContainer>
      <ErrorIcon />
      <Header strong>페이지가 존재하지 않습니다.</Header>
      <ContentContainer>
        요청하신 주소가 잘못되었거나,
        <br />
        페이지가 삭제/이동되었을 수 있습니다.
      </ContentContainer>
      <Button variant="text">
        <Link
          to="/"
          style={{
            color: COLOR_SIGNATURE,
            border: `1px solid ${COLOR_SIGNATURE}`,
            padding: 10,
            borderRadius: 8,
          }}
        >
          Return to Home
        </Link>
      </Button>
    </NotFoundPageContainer>
  );
}

export default NotFoundPage;
