import React from 'react';
import propTypes from 'prop-types';
import styled from '@emotion/styled';

const ThumbnailWrapper = styled.div`
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

function Thumbnail({ image, name, badge, isOnline }) {
  return (
    <ThumbnailWrapper>
      {image || name.substring(0, 1)}
      {badge && <Badge isOnline={isOnline} />}
    </ThumbnailWrapper>
  );
}
Thumbnail.propTypes = {
  image: propTypes.string,
  name: propTypes.string.isRequired,
  badge: propTypes.bool,
  isOnline: propTypes.bool,
};

Thumbnail.defaultProps = {
  image: null,
  badge: false,
  isOnline: false,
};
export default Thumbnail;
