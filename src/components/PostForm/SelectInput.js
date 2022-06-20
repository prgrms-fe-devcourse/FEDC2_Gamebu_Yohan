import {
  FormControl,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from '@mui/material';
import PropTypes from 'prop-types';
import TagList from '@components/TagChip/TagList';

export default function SelectInput({
  name,
  label,
  options,
  value,
  onBlur,
  onChange,
  error,
  helperText,
}) {
  const HelperTextStyle = {
    color: 'red',
    display: error ? 'block' : 'none',
  };
  return (
    <FormControl variant="outlined">
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        label={label}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        error={error}
        multiple
        input={<OutlinedInput id="select-multiple-chip" label="name" />}
        renderValue={(selected) => <TagList tags={selected} />}
        helperText={error ? helperText : ''}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText sx={HelperTextStyle}>{helperText}</FormHelperText>
    </FormControl>
  );
}

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  value: PropTypes.array,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
};

SelectInput.defaultProps = {
  label: '',
  value: [],
  onBlur: () => {},
  error: false,
  helperText: '',
};
