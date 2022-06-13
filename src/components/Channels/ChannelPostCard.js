import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import styled from '@emotion/styled';
import { COLOR_MAIN } from '@utils/color';

const PostCardContainer = styled.div`
  box-sizing: border-box;
  background-color: ${COLOR_MAIN};
  width: 100%;
  height: 5rem;
  margin-bottom: 0.5rem;
  padding: 1rem 0.5rem;
  border-radius: 0.5rem;
`;

const PostCardInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Title = styled.div`
  font-size: 0.75rem;
`;

function ChannelPostCard({ title, createdAt }) {
  useEffect(() => {
    console.log(title);
  }, []);
  return (
    <PostCardContainer>
      <PostCardInfo>
        <Title>{title}</Title>
      </PostCardInfo>
    </PostCardContainer>
  );
}

ChannelPostCard.propTypes = {
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default ChannelPostCard;
