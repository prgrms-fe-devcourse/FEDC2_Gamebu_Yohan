import propTypes from 'prop-types';
import { TextField } from '@mui/material';
import styled from '@emotion/styled';

const InputTitle = styled.div`
  margin-bottom: 3px;
  font-weight: 500;
`;

export default function PostInput({
  name,
  title,
  fieldSize,
  onChange,
  error,
  placeholder,
  rows,
}) {
  const IsMulti = rows > 1;
  return (
    <label htmlFor={name}>
      <InputTitle>{title}</InputTitle>
      <TextField
        id="name"
        size={fieldSize}
        onChange={onChange}
        error={error}
        placeholder={placeholder}
        multiline={IsMulti}
        minRows={rows}
      />
    </label>
  );
}

PostInput.propTypes = {
  name: propTypes.string.isRequired,
  title: propTypes.string,
  fieldSize: propTypes.string,
  onChange: propTypes.func.isRequired,
  error: propTypes.bool,
  placeholder: propTypes.string,
  rows: propTypes.number,
};

PostInput.defaultProps = {
  title: '제목',
  fieldSize: 'normal',
  error: true,
  placeholder: '',
  rows: 1,
};
