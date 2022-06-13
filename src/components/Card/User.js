import styled from '@emotion/styled';
import propTypes from 'prop-types';
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
const Thumbnail = styled.div`
  position: relative;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  background-color: orange;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  flex-shrink: 0;
`;
const Badge = styled.div`
  position: absolute;
  box-sizing: border-box;
  width: 1rem;
  height: 1rem;
  bottom: 0;
  right: 0;
  border: 2px solid white;
  border-radius: 50%;
  background-color: ${({ isOnline }) => (isOnline ? '#9ad756' : 'lightgray')};
`;

function User({ children, ...props }) {
  const { image, fullName, email, isOnline } = children;
  return (
    <Container {...props}>
      <Thumbnail>
        {image || fullName.substring(0, 1)}
        <Badge isOnline={isOnline} />
        {/* <Badge isOnline="true" /> */}
      </Thumbnail>
      <InfoWrapper>
        <div>{fullName}</div>
        <div>{email}</div>
      </InfoWrapper>
    </Container>
  );
}

User.propTypes = {
  children: propTypes.shape({
    isOnline: propTypes.bool.isRequired,
    fullName: propTypes.string.isRequired,
    email: propTypes.string.isRequired,
    image: propTypes.string,
  }).isRequired,
};

export default User;
