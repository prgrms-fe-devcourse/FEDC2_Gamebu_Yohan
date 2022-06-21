import PropTypes from 'prop-types';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import styled from '@emotion/styled';
import CommentInput from './CommetInput';

const CommentBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const NameBox = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
`;

const UserInfoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NameAndDate = styled.div`
  display: flex;
  align-items: center;
`;

const TextBox = styled.div`
  display: block;
  margin: 0.2rem 0 0.2rem;
  white-space: normal;
  word-break: break-all;
  max-width: 300px;
`;

const DateBox = styled.div`
  font-size: 0.6rem;
  margin-left: 1rem;
`;

const DeleteBox = styled.div`
  margin-left: 0.5rem;
`;

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
      <UserInfoBox>
        <NameAndDate>
          <NameBox>{author.fullName}</NameBox>
          <DateBox>{updatedAt}</DateBox>
        </NameAndDate>
        {userId && userId === author._id ? (
          <DeleteBox onClick={() => handleDeleteClick(commentId)}>
            <DeleteForeverIcon />
          </DeleteBox>
        ) : null}
      </UserInfoBox>
      <TextBox>{comment}</TextBox>
    </CommentBox>
  );
}
Comment.propTypes = {
  commentId: PropTypes.string.isRequired,
  author: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  comment: PropTypes.string.isRequired,
  updatedAt: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  userId: PropTypes.string.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

Comment.Input = CommentInput;

export default Comment;
