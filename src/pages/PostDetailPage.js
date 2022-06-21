import styled from '@emotion/styled';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { COLOR_BG } from '@utils/color';
import useValueContext from '@hooks/useValueContext';
import { authFetch, fetch } from '@utils/fetch';
import Card from '@components/Card';
import Comment from '@components/Card/Comment';
import CommentInput from '@components/CommentInput';
import useOurSnackbar from '@hooks/useOurSnackbar';
import LoginModal from '@components/LoginModal';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { IconButton } from '@mui/material';
import { createLikes, deleteLikes } from '@utils/likes';

const PageContainer = styled.div`
  box-sizing: border-box;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PostCardContainer = styled(Card.Author)`
  width: 100%;
  height: 7.5rem;
  border-radius: 0.5rem;
  background-color: ${COLOR_BG};
`;

const PostContentContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  min-height: 15rem;
  border-radius: 0.5rem;
  color: black;
  padding: 1rem;
  background-color: ${COLOR_BG};
`;

const CommentsContainer = styled.div`
  box-sizing: border-box;
  background-color: white;
  width: 100%;
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

const ContentWrapper = styled.div`
  flex-grow: 1;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & .MuiIconButton-root {
    background-color: white;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
      0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  }
  & .MuiIconButton-root:hover {
    background-color: white;
  }
`;
const LikeIcon = styled(FavoriteRoundedIcon)`
  &.MuiSvgIcon-root {
    transition: color 0.3s ease-out;
    color: ${({ like }) => like};
  }
`;

const convertDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

function PostDetailPage() {
  const renderSnackbar = useOurSnackbar();
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user, isLogin } = useValueContext();
  const inputRef = useRef(null);
  const [detailData, setDetailData] = useState(null);
  const [isLoding, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { title, content, tag } = useMemo(() => {
    // TODO: 작성방식 수립 이후 try-catch 삭제
    try {
      const { dt: title, dd: content, tg: tag } = JSON.parse(detailData.title);
      return { title, content, tag };
    } catch (e) {
      return { title: 'error', content: '', tag: [] };
    }
  }, [detailData]);

  const isOwnPost = useMemo(() => {
    if (!user) return false;
    if (!detailData) return false;
    return user._id && detailData.author._id === user._id;
  }, [detailData, user]);

  const likeInfo = useMemo(() => {
    if (!user) return false;
    if (!detailData) return false;
    return detailData.likes.find((item) => item.user === user._id);
  }, [detailData, user]);

  const fetchPostDetail = useCallback(async () => {
    const postDetail = await fetch(`posts/${postId}`);
    setDetailData(postDetail);
  }, [postId]);

  useEffect(() => {
    fetchPostDetail();
  }, [fetchPostDetail]);

  const postNotification = async (type, infoObject) => {
    await authFetch('notifications/create', {
      method: 'POST',
      data: {
        notificationType: type,
        notificationTypeId: infoObject._id,
        userId: user._id,
        postId: infoObject.post,
      },
    });
  };

  const handleEditClick = () => {
    const { _id, channel } = detailData;
    navigate(`/posts/edit/${_id}`, {
      state: {
        post: { title, tag, content },
        postId: _id,
        channelId: channel._id,
      },
    });
  };

  const handleDeleteComment = async (id) => {
    // TODO: error 발생시 별도 처리 추가 (낙관적 업데이트만 적용중)
    const res = await authFetch('comments/delete', {
      method: 'DELETE',
      data: {
        id,
      },
    });
    // TODO: axios error 처리 관련 확인 후 수정 여부 논의
    const isSuccessful = Object.prototype.hasOwnProperty.call(res, '_id');
    if (isSuccessful) {
      const newComments = detailData.comments.filter((item) => item._id !== id);
      setDetailData({
        ...detailData,
        comments: [...newComments],
      });
    }
    return renderSnackbar('댓글삭제', isSuccessful);
  };

  const handlePostComment = async () => {
    if (!isLogin) {
      setModalVisible(true);
      return;
    }
    if (inputRef.current.value === '') {
      // TODO: snackbar custom message
      alert('1글자 이상 입력해주세요!');
      return;
    }
    const res = await authFetch('comments/create', {
      method: 'POST',
      data: {
        comment: inputRef.current.value,
        postId: detailData._id,
      },
    });
    // TODO: axios error 처리 관련 확인 후 수정 여부 논의
    const isSuccessful = Object.prototype.hasOwnProperty.call(res, '_id');
    if (isSuccessful) {
      setDetailData({
        ...detailData,
        comments: [...detailData.comments, res],
      });
      postNotification('COMMENT', res);
    }
    inputRef.current.value = '';
    return renderSnackbar('댓글작성', isSuccessful);
  };

  const onLike = async () => {
    setIsLoading(true);
    const res = await createLikes(detailData._id);
    const isSuccessful = Object.prototype.hasOwnProperty.call(res, '_id');
    if (isSuccessful) {
      const changedLikes = [...detailData.likes, res];
      setDetailData({ ...detailData, likes: changedLikes });
      postNotification('LIKE', res);
    }
    renderSnackbar('좋아요', isSuccessful);
    setIsLoading(false);
  };

  const onUnlike = async () => {
    setIsLoading(true);
    const res = await deleteLikes(likeInfo._id);
    const isSuccessful = Object.prototype.hasOwnProperty.call(res, '_id');
    if (isSuccessful) {
      const changedLikes = detailData.likes.filter(
        (item) => item._id !== res._id
      );
      setDetailData({ ...detailData, likes: changedLikes });
    }
    renderSnackbar('좋아요 취소', isSuccessful);
    setIsLoading(false);
  };
  const handleClickLike = () => {
    if (isLoding) return;
    if (!isLogin) return setModalVisible(true);
    if (likeInfo) {
      onUnlike();
    } else {
      onLike();
    }
  };
  return (
    <PageContainer>
      {detailData && (
        <>
          <PostCardContainer data={detailData} badge={!isOwnPost} icon simple />
          {isOwnPost && (
            <Paragraph onClick={handleEditClick}>글 수정</Paragraph>
          )}
          <LoginModal
            visible={modalVisible}
            handleCloseModal={() => setModalVisible(false)}
          />
          <PostContentContainer>
            <ContentWrapper>{content}</ContentWrapper>
            <ButtonWrapper>
              <IconButton onClick={handleClickLike}>
                <LikeIcon like={likeInfo ? 'red' : 'black'} />
              </IconButton>
            </ButtonWrapper>
          </PostContentContainer>
          <CommentInput onPost={handlePostComment} inputRef={inputRef} />
          <CommentsContainer>
            {detailData.comments.length > 0 ? (
              detailData.comments.map((item) => (
                <Comment
                  key={item._id}
                  commentId={item._id}
                  author={item.author}
                  comment={item.comment}
                  updatedAt={convertDate(item.updatedAt)}
                  deletable={user && item.author._id === user._id}
                  onDelete={handleDeleteComment}
                />
              ))
            ) : (
              <NoneExistingComments>댓글이 없습니다</NoneExistingComments>
            )}
          </CommentsContainer>
        </>
      )}
    </PageContainer>
  );
}

export default PostDetailPage;
