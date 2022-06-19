import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
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
import Card from '@components/Card';

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
  font-size: 0.8rem;
`;
const DeleteBox = styled.div`
  margin-left: 0.5rem;
`;

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

Edit.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const CommentInputContainer = styled.div`
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

PostContent.propTypes = {
  content: PropTypes.string.isRequired,
};

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
Comment.propTypes = {
  commentId: PropTypes.string.isRequired,
  author: PropTypes.shape({
    fullName: PropTypes.array.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  comment: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

function CommentInput({ handlePostComment, commentValue, handleWriteComment }) {
  return (
    <CommentInputContainer>
      <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      <InputComment
        id="input-with-sx"
        placeholder="가는 말이 고와야 오는 말이 고와요."
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

CommentInput.propTypes = {
  handlePostComment: PropTypes.func.isRequired,
  handleWriteComment: PropTypes.func.isRequired,
  commentValue: PropTypes.oneOf([PropTypes.string, PropTypes.number])
    .isRequired,
};

function CommentModal({
  title,
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
        <DialogTitle>{title}</DialogTitle>
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

CommentModal.propTypes = {
  title: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired,
  isNew: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

function PostDetailPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useValueContext();
  const userId = user && user._id;
  const [detailData, setDetailData] = useState(null); // page data
  const [commentValue, setCommentValue] = useState('');
  const [isNew, setIsNew] = useState(false); // new 아이콘을 달아줌
  const [modalVisible, setModalVisble] = useState(false); // modal 활성화

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
    res &&
      setDetailData({
        ...detailData,
        comments: [res, ...detailData.comments],
      });
    setIsNew(true);
    setCommentValue('');
  };

  return (
    <PageContainer>
      {detailData && (
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
        />
      )}
      {detailData && detailData.authorId === userId ? (
        <Edit onClick={handleEditClick} />
      ) : null}
      <PostContent content={detailData && detailData.content} />
      {detailData && (
        <CommentModal
          title="댓글목록"
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
