import Thumbnail from '@components/Thumbnail';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React from 'react';

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 1rem;
  display: flex;
  gap: 1rem;
`;
const InfoWrapper = styled.div`
  width: calc(100% - 4rem);
  display: inline-flex;
  flex-direction: column;
  justify-content: space-evenly;
  & > div {
    line-height: normal;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

function User({ children, ...props }) {
  const { image, fullName, email, isOnline } = children;
  return (
    <Container {...props}>
      <Thumbnail image={image} name={fullName} badge isOnline={isOnline} />
      <InfoWrapper>
        <div>{fullName}</div>
        <div>{email}</div>
      </InfoWrapper>
    </Container>
  );
}

User.propTypes = {
  children: PropTypes.shape({
    isOnline: PropTypes.bool.isRequired,
    fullName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
};

export default User;
