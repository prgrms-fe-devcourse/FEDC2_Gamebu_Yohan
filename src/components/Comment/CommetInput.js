import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import styled from '@emotion/styled';

const CommentInputContainer = styled.div`
  width: 100%;
  height: 2.5rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const InputComment = styled(TextField)`
  display: inline-block;
`;

const InputButton = styled(Button)`
  width: 6.5rem;
  margin-left: 0.8rem;
  height: 2rem;
`;
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
  commentValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default CommentInput;
