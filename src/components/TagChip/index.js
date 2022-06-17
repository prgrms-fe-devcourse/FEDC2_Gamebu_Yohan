import { Chip, Avatar, ListItem } from '@mui/material';
import PropTypes from 'prop-types';
import { blue } from '@mui/material/colors';
import { useRef, useEffect } from 'react';
import tagdata from './tagdata';

const DefaultItemStyle = {
  display: 'inline',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
};

const DefaultchipStyle = {
  color: blue.A400,
  borderColor: blue.A700,
  backgroundColor: 'white',
};

export default function TagChip({
  label,
  index,
  simple,
  onDelete,
  chipsx,
  tagsx,
}) {
  const ItemStyle = {
    ...DefaultItemStyle,
    ...chipsx,
  };
  const TagStyle = {
    ...DefaultchipStyle,
    ...tagsx,
  };
  const image = tagdata[label] ? tagdata[label].image : '';
  const ref = useRef();

  return (
    <ListItem label={label} index={index} sx={ItemStyle}>
      <Chip
        ref={ref}
        label={simple ? `#${label}` : label}
        name={label}
        avatar={simple ? false : <Avatar alt={label} src={image} />}
        onDelete={onDelete}
        variant="outlined"
        size={simple ? 'small' : 'medium'}
        sx={TagStyle}
      />
    </ListItem>
  );
}

TagChip.propTypes = {
  label: PropTypes.string.isRequired,
  simple: PropTypes.bool,
  onDelete: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  chipsx: PropTypes.object,
  tagsx: PropTypes.object,
};

TagChip.defaultProps = {
  simple: false,
  onDelete: false,
  chipsx: {},
  tagsx: {},
};

// TODO: label에 따라 avatar, color 지정: size에 따라 크기 지정
