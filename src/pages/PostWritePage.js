import PostForm from '@components/PostForm';
import React from 'react';
import { useLocation } from 'react-router-dom';

export default function PostWritePage() {
  const location = useLocation();
  console.log(location.state);
  return <PostForm />;
}
