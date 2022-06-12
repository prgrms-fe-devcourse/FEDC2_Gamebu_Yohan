import React from 'react';
import styled from '@emotion/styled';

const ContentWrapper = styled.div`
  padding: 1.5rem;
`;

const LoginHeader = styled.h1`
  font-size: 2rem;
  text-align: center;
  padding: 1.5rem;
`;

function LoginPage() {
  return (
    <ContentWrapper>
      <LoginHeader>Login</LoginHeader>
    </ContentWrapper>
  );
}

export default LoginPage;
