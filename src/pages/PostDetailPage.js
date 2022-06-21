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
import FiberNewIcon from '@mui/icons-material/FiberNew';
import Card from '@components/Card';
import Comment from '@components/Card/Comment';
import CommentInput from '@components/CommentInput';
import useOurSnackbar from '@hooks/useOurSnackbar';
import LoginModal from '@components/LoginModal';

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
  margin: 1rem 0;
  overflow: scroll;
`;

const CommentsContainer = styled.div`
  box-sizing: border-box;
  background-color: white;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
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
  const [detailData, setDetailData] = useState(null); // page data
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

  const fetchPostDetail = useCallback(async () => {
    const postDetail = await fetch(`posts/${postId}`);
    // FIXME: 이름이 null 인 경우를 대비한 임시 수정. 이후 삭제가 필요하다.
    // postDetail.author.fullName = '';
    setDetailData(postDetail);
  }, [postId]);

  useEffect(() => {
    fetchPostDetail();
  }, [fetchPostDetail]);

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

  const handleDelete = async (id) => {
    // TODO: error 발생시 별도 처리 추가 (낙관적 업데이트만 적용중)
    const res = await authFetch('comments/delete', {
      method: 'DELETE',
      data: {
        id,
      },
    });
    const newComments = detailData.comments.filter((item) => item._id !== id);
    if (res._id) {
      setDetailData({
        ...detailData,
        comments: [...newComments],
      });
      return renderSnackbar('댓글삭제', true);
    }
    return renderSnackbar('댓글삭제', false);
  };

  const postNotification = async (res) => {
    await authFetch('notifications/create', {
      method: 'POST',
      data: {
        notificationType: 'COMMENT',
        notificationTypeId: res._id,
        userId: user._id,
        postId: res.post,
      },
    });
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
    if (res._id) {
      setDetailData({
        ...detailData,
        comments: [res, ...detailData.comments],
      });
      if (user._id) postNotification(res);
      inputRef.current.value = '';
      return renderSnackbar('댓글작성', true);
    }
    inputRef.current.value = '';
    return renderSnackbar('댓글작성', false);
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
          <PostContentContainer>{content}</PostContentContainer>
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
                  onDelete={handleDelete}
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
