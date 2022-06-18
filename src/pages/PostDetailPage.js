/* eslint-disable react/prop-types */
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { COLOR_BG } from '@utils/color';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import useValueContext from '@hooks/useValueContext';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { authFetch, fetch } from '@utils/fetch';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Modal from '@mui/material/Modal';

const DUMMY_DATA = {
  authorId: '629f07fa7e01ad1cb7250131',
  channelId: '62aa146171f64a5582899ae9',
  comments: [
    {
      _id: '코멘트 id',
      comment:
        '이샛기 개몬함 ㄹㅇ 이샛기 개몬함 ㄹㅇ 이샛기 개몬함 ㄹㅇ 이샛기 개몬함 ㄹㅇ',
      updatedAt: '2022-06-17',
      author: { _id: '댓글작성자id', fullName: '하단동네이마르' },
    },
    {
      _id: '코멘트 id2',
      comment: 'ㅈㄹ ㄴㄴ',
      updatedAt: '2022-06-17',
      author: { _id: '629f07fa7e01ad1cb7250131', fullName: 'EonDongKim' },
    },
  ],
  content:
    '시프트 삼 인생은 원래 원래 혼자	시프트 사 너 땜에 남아도는 거 시프트 오 널 다시 만날 수는 몇 시프트 육 육 이거 하려고 내가 이 짓 하는 거야 시프트 칠까진 갈 수 없으니까 팔베개를 하고 별을 바라보던 우린 9, 0처럼 그저 괄호 속 안에 묶인 그냥 컴퓨터 화면 속 데이터 뿐 당최 알 수가 없는 물질 시프트 삼 인생은 원래 원래 혼자	시프트 사 너 땜에 남아도는 거 시프트 오 널 다시 만날 수는 몇 시프트 육 육 이거 하려고 내가 이 짓 하는 거야 시프트 칠까진 갈 수 없으니까 팔베개를 하고 별을 바라보던 우린 9, 0처럼 그저 괄호 속 안에 묶인 그냥 컴퓨터 화면 속 데이터 뿐 당최 알 수가 없는 물질 시프트 삼 인생은 원래 원래 혼자	시프트 사 너 땜에 남아도는 거 시프트 오 널 다시 만날 수는 몇 시프트 육 육 이거 하려고 내가 이 짓 하는 거야 시프트 칠까진 갈 수 없으니까 팔베개를 하고 별을 바라보던 우린 9, 0처럼 그저 괄호 속 안에 묶인 그냥 컴퓨터 화면 속 데이터 뿐 당최 알 수가 없는 물질 시프트 삼 인생은 원래 원래 혼자	시프트 사 너 땜에 남아도는 거 시프트 오 널 다시 만날 수는 몇 시프트 육 육 이거 하려고 내가 이 짓 하는 거야 시프트 칠까진 갈 수 없으니까 팔베개를 하고 별을 바라보던 우린 9, 0처럼 그저 괄호 속 안에 묶인 그냥 컴퓨터 화면 속 데이터 뿐 당최 알 수가 없는 물질 ',
  fullName: 'EonDongKim',
  isLiked: false,
  postId: '62aa1d0f71f64a558289a3aa',
  tag: ['칼바람', '파티모집'],
  title: '칼바람 할사람',
};

const PageContainer = styled.div`
  box-sizing: border-box;
  background-color: white;
`;

const PostCardContainer = styled.div`
  background-color: royalblue;
  width: 100%;
  height: 7.5rem;
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
  background-color: ${COLOR_BG};
  width: 100%;
  height: 14rem;
  margin-bottom: 1rem;
  padding: 0.5rem 0.5rem;
  overflow: scroll;
`;

const CommentBox = styled.div`
  width: 100%;
  height: 2rem;
  /* background-color: aqua; */
  display: flex;
  align-items: center;
  overflow: scroll;
  margin-bottom: 1rem;
`;

const AvatarIcon = styled(Avatar)`
  height: 2rem;
  width: 2rem;
`;
const TextBox = styled.div`
  /* background-color: gray; */
  display: flex;
  align-items: center;
  width: 11rem;
  height: 2rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const DateBox = styled.div`
  /* background-color: beige; */
  font-size: 0.8rem;
`;
const DeleteBox = styled.div`
  margin-left: 0.5rem;
`;
// eslint-disable-next-line no-unused-vars

const Paragraph = styled.p`
  text-align: right;
`;

const NewIcon = styled(FiberNewIcon)`
  width: 4.1rem;
  font-size: 1.7rem;
  color: #f44336;
`;

function Edit({ onClick }) {
  return <Paragraph onClick={onClick}>글 수정</Paragraph>;
}

const CommentInputContainer = styled.div`
  /* background-color: yellowgreen; */
  width: 100%;
  height: 2.5rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const InputComment = styled(TextField)`
  display: inline-block;
`;

const InputButton = styled(Button)`
  width: 6.5rem;
  margin-left: 1rem;
  height: 2rem;
`;

function PostContent({ content }) {
  return <PostContentContainer>{content}</PostContentContainer>;
}

// PostContent.propTypes = {
//   content: PropTypes.string.isRequired,
// };

function Comment({
  commentId,
  author,
  comment,
  updatedAt,
  userId,
  handleDeleteClick,
}) {
  return (
    <CommentBox>
      <AvatarIcon>{author.fullName[0]}</AvatarIcon>
      <TextBox>{comment}</TextBox>
      <DateBox>{updatedAt}</DateBox>
      {userId && userId === author._id ? (
        <DeleteBox onClick={() => handleDeleteClick(commentId)}>
          <DeleteForeverIcon />
        </DeleteBox>
      ) : null}
    </CommentBox>
  );
}

function CommentInput({ handlePostComment, commentValue, handleWriteComment }) {
  return (
    <CommentInputContainer>
      <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      <InputComment
        id="input-with-sx"
        placeholder="가는 말이 고와야 오는 말이 곱다."
        variant="standard"
        fullWidth
        value={commentValue}
        onChange={handleWriteComment}
        onKeyDown={handlePostComment}
      />
      <InputButton
        onClick={handlePostComment}
        variant="contained"
        endIcon={<SendIcon />}
      >
        Send
      </InputButton>
    </CommentInputContainer>
  );
}

function CommentModal({
  isVisible,
  onClose,
  comments,
  isNew,
  userId,
  handleDeleteClick,
}) {
  return (
    <div>
      <Dialog open={isVisible} onClose={onClose} scroll="paper" fullScreen>
        <DialogTitle>댓글목록</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            {comments &&
              comments.map((item, i) => {
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
                    updatedAt={item.updatedAt.slice(0, 10)}
                    userId={userId}
                    handleDeleteClick={handleDeleteClick}
                  />
                );
              })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function PostDetailPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useValueContext();
  const userId = user && user._id;
  const [detailData, setDetailData] = useState(null);
  const [commentValue, setCommentValue] = useState('');
  const [isNew, setIsNew] = useState(false);
  const [modalVisible, setModalVisble] = useState(false);

  let needData = {};

  const fetchPostDetail = async () => {
    const res = await fetch(`posts/${state.postId}`);
    needData = {
      authorId: res.author._id,
      channelId: res.channel._id,
      comments: res.comments,
      content: state.content,
      fullName: state.fullName,
      isLiked: false,
      postId: res._id,
      tag: state.tag,
      title: state.title,
    };
    setDetailData(needData);
  };

  useEffect(() => {
    state && fetchPostDetail();
  }, [state, user]);

  const handleEditClick = () => {
    const { title, tag, content, postId, channelId } = detailData;
    navigate(`/posts/edit/${detailData.postId}`, {
      state: { title, tag, content, postId, channelId },
    });
  };

  const handleDeleteClick = async (id) => {
    const res = await authFetch('comments/delete', {
      method: 'DELETE',
      data: {
        id,
      },
    });
    console.log('delete res:', res);
    res &&
      setDetailData({
        ...detailData,
        comments: [...detailData.comments.filter((item) => item._id !== id)],
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
    console.log('post res: ', res);
    res &&
      setDetailData({
        ...detailData,
        comments: [res, ...detailData.comments],
      });
    setIsNew(true); // new 아이콘을 달아줌
    setCommentValue('');
  };

  return (
    <PageContainer>
      <PostCardContainer />
      {detailData && detailData.authorId === userId ? (
        <Edit onClick={handleEditClick} />
      ) : null}
      <PostContent content={detailData && detailData.content} />
      {detailData && (
        <CommentModal
          isVisible={modalVisible}
          onClose={() => setModalVisble(false)}
          comments={detailData.comments}
          isNew={isNew}
          userId={userId}
          handleDeleteClick={handleDeleteClick}
        />
      )}
      <CommentsContainer onClick={() => setModalVisble(true)}>
        {detailData &&
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
                updatedAt={item.updatedAt.slice(0, 10)}
                userId={userId}
                handleDeleteClick={handleDeleteClick}
              />
            );
          })}
      </CommentsContainer>
      <CommentInput
        handlePostComment={handlePostComment}
        commentValue={commentValue}
        handleWriteComment={(e) => setCommentValue(e.target.value)}
      />
    </PageContainer>
  );
}

export default PostDetailPage;
