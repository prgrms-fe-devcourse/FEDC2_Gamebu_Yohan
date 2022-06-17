import Box from '@mui/material/Box';
import {
  FormControl,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import PropTypes from 'prop-types';
import TagChip from '@components/TagChip';

export default function SelectInput({
  name,
  label,
  options,
  value,
  onChange,
  error,
}) {
  return (
    <FormControl variant="outlined">
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        error={error}
        multiple
        input={<OutlinedInput id="select-multiple-chip" label="name" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <TagChip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  value: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
};

SelectInput.defaultProps = {
  label: '',
  value: [],
  error: false,
};
