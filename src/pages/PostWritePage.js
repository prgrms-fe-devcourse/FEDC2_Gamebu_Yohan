import React from 'react';
import { useLocation } from 'react-router-dom';

function PostWritePage() {
  const location = useLocation();
  console.log(location.state);
  return <div>PostWritePage</div>;
}

export default PostWritePage;
