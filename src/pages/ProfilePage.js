import React from 'react';
import styled from '@emotion/styled';
import GoBack from '@components/GoBack';

const ContentWrapper = styled.div`
  padding: 1.5rem;
`;

function ProfilePage() {
  return (
    <ContentWrapper>
      <GoBack />
      ProfilePage
    </ContentWrapper>
  );
}

export default ProfilePage;
