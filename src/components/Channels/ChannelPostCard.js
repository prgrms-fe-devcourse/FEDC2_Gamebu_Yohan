import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import styled from '@emotion/styled';
import CardActionArea from '@mui/material/CardActionArea';
import { COLOR_MAIN } from '@utils/color';

const PostCardInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Title = styled.div`
  font-size: 0.75rem;
`;

const cardStyles = {
  boxSizing: 'border-box',
  backgroundColor: `${COLOR_MAIN}`,
  width: '100%',
  height: '5rem',
  marginBottom: '0.5rem',
  padding: '1rem 0.5rem',
  borderRadius: '0.5rem',
};

function ChannelPostCard({ title, createdAt }) {
  useEffect(() => {
    console.log(title);
  }, []);
  return (
    <CardActionArea sx={cardStyles}>
      <PostCardInfo>
        <Title>{title}</Title>
      </PostCardInfo>
    </CardActionArea>
  );
}

ChannelPostCard.propTypes = {
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default ChannelPostCard;
