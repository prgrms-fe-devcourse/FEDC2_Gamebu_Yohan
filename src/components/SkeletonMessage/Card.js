import React from 'react';
import styled from '@emotion/styled';
import Skeleton from '@mui/material/Skeleton';
import PropTypes from 'prop-types';

const SkeletonContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 1rem;
  display: flex;
  gap: 1rem;
`;

const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`;

function Card({ repeat }) {
  const repeatArr = Array.from({ length: repeat }, (_, index) => index);

  return repeatArr.map((num) => (
    <SkeletonContainer key={num}>
      <Skeleton variant="circular" width={40} height={40} />
      <SkeletonWrapper>
        <Skeleton variant="text" width="33%" height="50%" />
        <Skeleton variant="text" height="50%" />
      </SkeletonWrapper>
    </SkeletonContainer>
  ));
}

Card.propTypes = {
  repeat: PropTypes.number,
};

Card.defaultProps = {
  repeat: 3,
};

export default Card;
