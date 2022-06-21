import React from 'react';
import PostForm from '@components/PostForm';
import useCheckAuth from '@hooks/useCheckAuth';
import { useParams } from 'react-router-dom';
import useValueContext from '../hooks/useValueContext';

export default function PostWritePage() {
  const { channelId } = useParams();
  const { initialLoading, isLogin } = useValueContext();
  useCheckAuth();

  const reloadEnd = isLogin ? (
    <PostForm channelId={channelId} />
  ) : (
    '비로그인 유저'
  );
  return <div>{initialLoading ? '로딩 중' : reloadEnd}</div>;
}
