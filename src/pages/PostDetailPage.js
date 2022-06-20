import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { COLOR_BG } from '@utils/color';
import useValueContext from '@hooks/useValueContext';
import { authFetch, fetch } from '@utils/fetch';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import Card from '@components/Card';
import Comment from '@components/Comment';

const PageContainer = styled.div`
  box-sizing: border-box;
  background-color: white;
`;

const PostCardContainer = styled(Card.Author)`
  width: 100%;
  height: 7.5rem;
  background-color: ${COLOR_BG};
`;

const PostContentContainer = styled.div`
  box-sizing: border-box;
  background-color: ${COLOR_BG};
  width: 100%;
  height: 14.75rem;
  color: black;
  padding: 1rem 1rem;
  margin: 1rem 0 1rem 0;
  overflow: scroll;
`;

const CommentsContainer = styled.div`
  box-sizing: border-box;
  background-color: white;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem 0.5rem;
`;

const NoneExistingComments = styled.div`
  width: 100%;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #009688;
`;

const Paragraph = styled.p`
  text-align: right;
`;

const NewIcon = styled(FiberNewIcon)`
  width: 4.1rem;
  font-size: 1.7rem;
  color: #f44336;
`;

function PostDetailPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useValueContext();
  const userId = user && user._id;
  const [detailData, setDetailData] = useState(null); // page data
  const [commentValue, setCommentValue] = useState('');
  const [isNew, setIsNew] = useState(false); // new 아이콘을 달아줌

  let needData = {};

  const fetchPostDetail = async () => {
    const res = await fetch(`posts/${state.postId}`);
    needData = {
      authorId: res.author._id,
      isOnline: res.author.isOnline,
      channelId: res.channel._id,
      comments: res.comments,
      content: state.content,
      fullName: state.fullName,
      isLiked: false,
      postId: res._id,
      tag: state.tag,
      title: state.title,
      updatedAt: state.updatedAt,
      likes: state.likes,
    };
    setDetailData(needData);
  };

  useEffect(() => {
    fetchPostDetail();
    if (!state) navigate('/*');
  }, [user]);

  const handleEditClick = () => {
    const { title, tag, content, postId, channelId } = detailData;
    navigate(`/posts/edit/${detailData.postId}`, {
      state: { post: { title, tag, content }, postId, channelId },
    });
  };

  const convertDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

  const handleDeleteClick = async (id) => {
    await authFetch('comments/delete', {
      method: 'DELETE',
      data: {
        id,
      },
    });
    setDetailData({
      ...detailData,
      comments: [...detailData.comments.filter((item) => item._id !== id)],
    });
  };
  const postNotification = async (res) => {
    await authFetch('notifications/create', {
      method: 'POST',
      data: {
        notificationType: 'COMMENT',
        notificationTypeId: res._id,
        userId,
        postId: res.post,
      },
    });
  };
  const handlePostComment = async (e) => {
    if (e.type === 'keydown' && e.key !== 'Enter') return null;
    const res = await authFetch('comments/create', {
      method: 'POST',
      data: {
        comment: commentValue,
        postId: detailData.postId,
      },
    });
    setDetailData({
      ...detailData,
      comments: [res, ...detailData.comments],
    });

    postNotification(res);
    setIsNew(true);
    setCommentValue('');
  };

  return detailData && userId ? (
    <PageContainer>
      <PostCardContainer
        data={{
          ...detailData,
          author: {
            fullName: detailData.fullName,
            isOnline: detailData.isOnline,
            email: 'abcd',
          },
          createdAt: detailData.updatedAt,
          tag: detailData.tag.slice(0, 3),
        }}
        badge
        icon
        simple
      />

      {detailData.authorId === userId ? (
        <Paragraph onClick={handleEditClick}>글 수정</Paragraph>
      ) : null}
      <PostContentContainer>{detailData.content}</PostContentContainer>
      <Comment.Input
        handlePostComment={handlePostComment}
        commentValue={commentValue}
        handleWriteComment={(e) => setCommentValue(e.target.value)}
      />
      <CommentsContainer>
        {detailData.comments.length > 0 || isNew ? (
          detailData.comments.map((item, i) => {
            if (isNew && i === 0) {
              return (
                <Comment
                  key={item._id}
                  commentId={item._id}
                  author={item.author}
                  comment={item.comment}
                  updatedAt={<NewIcon color="inherit" />}
                  userId={userId}
                  handleDeleteClick={handleDeleteClick}
                />
              );
            }
            return (
              <Comment
                key={item._id}
                commentId={item._id}
                author={item.author}
                comment={item.comment}
                updatedAt={convertDate(item.updatedAt)}
                userId={userId}
                handleDeleteClick={handleDeleteClick}
              />
            );
          })
        ) : (
          <NoneExistingComments>댓글이 없습니다</NoneExistingComments>
        )}
      </CommentsContainer>
    </PageContainer>
  ) : null;
}

export default PostDetailPage;
