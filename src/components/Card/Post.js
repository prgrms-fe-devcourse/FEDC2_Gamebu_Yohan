import React from 'react';
import propTypes from 'prop-types';
import styled from '@emotion/styled';
import Divider from '@components/Divider';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  & > div {
    line-height: normal;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  & .MuiSvgIcon-root {
    fill: gray;
    font-size: 1rem;
  }
`;
const AccountIcon = styled(AccountBoxIcon)`
  fill: gray;
  font-size: 1.5rem;
  cursor: pointer;
`;
function Post({ children }) {
  const { title, createdAt, comments, likes } = children;
  return (
    <Container>
      <div>{title}</div>
      <InfoWrapper>
        <AccountIcon />
        <div style={{ flexGrow: 1 }}>{createdAt.substring(0, 10)}</div>
        <IconWrapper>
          <CommentIcon />
          <div>{comments.length}</div>
        </IconWrapper>
        <Divider type="vertical" size={4} />
        <IconWrapper>
          <ThumbUpIcon />
          <div>{likes.length}</div>
        </IconWrapper>
      </InfoWrapper>
    </Container>
  );
}

Post.propTypes = {
  children: propTypes.shape({
    title: propTypes.string.isRequired,
    createdAt: propTypes.string.isRequired,
    author: propTypes.string.isRequired,
    comments: propTypes.array.isRequired,
    likes: propTypes.array.isRequired,
  }).isRequired,
};

export default Post;
