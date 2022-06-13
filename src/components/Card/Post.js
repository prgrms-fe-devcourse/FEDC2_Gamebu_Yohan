import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import useAsyncFn from '@hooks/useAsyncFn';
import { fetchUserById } from '@utils/search';
import styled from '@emotion/styled';
import Divider from '@components/Divider';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

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
`;
function Post({ children }) {
  const { title, createdAt, author, comments, likes } = children;
  const [state, callback] = useAsyncFn(async () => {
    return fetchUserById(author);
  }, []);
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <div>{title}</div>
      <InfoWrapper>
        <div>{state.value && state.value.fullName}</div>
        <Divider type="vertical" size={4} />
        <div style={{ flexGrow: 1 }}>{createdAt.substring(0, 10)}</div>
        <IconWrapper>
          <CommentIcon fontSize="1rem" sx={{ fill: 'gray' }} />
          <div>{comments.length}</div>
        </IconWrapper>
        <Divider type="vertical" size={4} />
        <IconWrapper>
          <ThumbUpIcon fontSize="1rem" sx={{ fill: 'gray' }} />
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
