import React from 'react';
import { useLocation } from 'react-router-dom';

function PostDetailPage() {
  const location = useLocation();
  console.log(location.state);
  return (
    <>
      <div />
      <div />
      <div />
      <div />
    </>
  );
}

export default PostDetailPage;
