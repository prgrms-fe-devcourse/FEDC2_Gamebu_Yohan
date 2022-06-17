import styled from '@emotion/styled';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Chip from '@mui/material/Chip';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
`;

const PostCardContainer = styled.div`
  background-color: royalblue;
  width: 100%;
  height: 10rem;
`;

const PostContent = styled.div`
  background-color: darkblue;
  width: 100%;
  height: 10rem;
`;

const CommentsContainer = styled.div`
  background-color: saddlebrown;
  width: 100%;
  height: 10rem;
`;

const CommentInput = styled.div`
  background-color: yellowgreen;
  width: 100%;
  height: 10rem;
`;

function PostDetailPage() {
  const location = useLocation();
  console.log(location.state);
  return (
    <PageContainer>
      <PostCardContainer />
      <PostContent />
      <CommentsContainer />
      <CommentInput />
    </PageContainer>
  );
}

export default PostDetailPage;
