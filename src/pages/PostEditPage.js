import React from 'react';
import { useLocation } from 'react-router-dom';

function PostEditPage() {
  const { state } = useLocation();
  console.log(state);
  return <div>PostEditPage</div>;
}

export default PostEditPage;
