import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React from 'react';
import PropTypes from 'prop-types';
import { COLOR_SIGNATURE } from '@utils/color';

const InputContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const InputWrapper = styled(TextField)`
  height: 100%;
  flex-grow: 1;
  box-sizing: border-box;
  & .MuiOutlinedInput-root {
    padding: 0 0.5rem;
    height: 100%;
  }
`;

const InputButton = styled(Button)`
  min-width: 3rem;
  height: 100%;
  background-color: ${COLOR_SIGNATURE};
  &:hover {
    background-color: ${COLOR_SIGNATURE};
  }
`;
function CommentInput({ onPost, inputRef }) {
  const handleKeyDown = (e) => {
    if (e.key !== 'Enter') return;
    onPost && onPost(e);
  };
  const handleClick = (e) => {
    onPost && onPost(e);
  };
  return (
    <InputContainer>
      <InputWrapper
        id="input-with-sx"
        inputRef={inputRef}
        placeholder="가는 말이 고와야 오는 말이 고와요."
        rows={2}
        fullWidth
        multiline
        onKeyDown={handleKeyDown}
      />
      <InputButton onClick={handleClick} variant="contained">
        <SendIcon />
      </InputButton>
    </InputContainer>
  );
}

CommentInput.propTypes = {
  onPost: PropTypes.func.isRequired,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]).isRequired,
};

export default CommentInput;
