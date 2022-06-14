import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

export default function TextInput({
  name,
  label,
  value,
  onChange,
  error,
  placeholder,
}) {
  return (
    <TextField
      variant="outlined"
      fieldSize="small"
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      placeholder={placeholder}
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
};

TextInput.defaultProps = {
  label: '',
  value: '',
  error: false,
  placeholder: '',
};
