import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

export default function MultiLineTextInput({
  name,
  label,
  value,
  onChange,
  error,
  placeholder,
  rows,
  helperText,
}) {
  return (
    <TextField
      variant="outlined"
      multiline
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      placeholder={placeholder}
      helperText={error ? helperText : ''}
      minRows={rows}
    />
  );
}

MultiLineTextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
  rows: PropTypes.number.isRequired,
};

MultiLineTextInput.defaultProps = {
  label: '',
  value: '',
  error: false,
  helperText: '',
  placeholder: '',
};
