import React from 'react';
import PostForm from '@components/PostForm';
import useCheckAuth from '@hooks/useCheckAuth';
import { useParams, useLocation } from 'react-router-dom';
import useValueContext from '../hooks/useValueContext';

export default function PostEditPage() {
  const { postId } = useParams();
  const { state } = useLocation();
  const { channelId, post } = state;
  const modifiedPost = { ...post, tags: post.tag, tag: undefined };
  const { initialLoading, isLogin } = useValueContext();
  useCheckAuth();
  const reloadEnd = isLogin ? (
    <PostForm channelId={channelId} postId={postId} post={modifiedPost} />
  ) : (
    '비로그인 유저'
  );
  return <div>{initialLoading ? '로딩 중' : reloadEnd}</div>;
}
