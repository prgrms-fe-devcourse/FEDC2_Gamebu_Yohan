import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

export default function MultiLineTextInput({
  name,
  label,
  value,
  onChange,
  onBlur,
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
      onBlur={onBlur}
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
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
  rows: PropTypes.number.isRequired,
};

MultiLineTextInput.defaultProps = {
  label: '',
  value: '',
  onBlur: () => {},
  error: false,
  helperText: '',
  placeholder: '',
};
