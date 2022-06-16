import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

export default function TextInput({
  name,
  label,
  value,
  onChange,
  error,
  placeholder,
  helperText,
}) {
  return (
    <TextField
      variant="outlined"
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      placeholder={placeholder}
      helperText={error ? helperText : ''}
    />
  );
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
};

TextInput.defaultProps = {
  label: '',
  value: '',
  error: false,
  placeholder: '',
  helperText: '',
};
