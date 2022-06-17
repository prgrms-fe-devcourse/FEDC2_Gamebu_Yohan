import { Chip, Avatar } from '@mui/material';
import PropTypes from 'prop-types';
import { blue } from '@mui/material/colors';
import tagdata from './tagdata';

const chipStyle = {
  color: blue.A400,
  borderColor: blue.A700,
  backgroundColor: 'white',
};

export default function TagChip({ label, size, simple, onDelete }) {
  const image = tagdata[label] ? tagdata[label].image : '';
  return (
    <Chip
      sx={chipStyle}
      avatar={simple ? false : <Avatar alt={label} src={image} />}
      label={label}
      size={simple ? 'small' : size}
      variant="outlined"
    />
  );
}

TagChip.propTypes = {
  label: PropTypes.string.isRequired,
  size: PropTypes.string,
  simple: PropTypes.bool,
  onDelete: PropTypes.func,
};

TagChip.defaultProps = {
  size: 'medium',
  simple: false,
  onDelete: false,
};

// TODO: label에 따라 avatar, color 지정: size에 따라 크기 지정
