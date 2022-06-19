import { Chip, Avatar, ListItem } from '@mui/material';
import PropTypes from 'prop-types';
import { blue } from '@mui/material/colors';
import tagdata from './tagdata';

const DefaultItemStyle = {
  width: 'auto',
  padding: 0,
  display: 'inline',
  alignItems: 'center',
  justifyContent: 'center',
};

const DefaultChipStyle = {
  color: blue.A400,
  borderColor: blue.A700,
  backgroundColor: 'white',
};

export default function TagChip({ label, index, simple, itemsx, chipsx }) {
  const ItemStyle = {
    ...DefaultItemStyle,
    ...itemsx,
  };
  const ChipStyle = {
    ...DefaultChipStyle,
    ...chipsx,
  };

  const image = tagdata[label] ? tagdata[label].image : '';

  return (
    <ListItem label={label} name={label} index={index} sx={{ ...ItemStyle }}>
      <Chip
        label={simple ? `#${label}` : label}
        name={label}
        avatar={simple ? false : <Avatar alt={label} src={image} />}
        variant="outlined"
        size={simple ? 'small' : 'medium'}
        sx={ChipStyle}
      />
    </ListItem>
  );
}

TagChip.propTypes = {
  label: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  simple: PropTypes.bool,
  itemsx: PropTypes.object,
  chipsx: PropTypes.object,
};

TagChip.defaultProps = {
  simple: false,
  itemsx: {},
  chipsx: {},
};
