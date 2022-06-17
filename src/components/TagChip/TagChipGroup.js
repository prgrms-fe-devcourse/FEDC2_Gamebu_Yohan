import { Box } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import TagChip from '.';

const defaultListStyle = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
};

export default function TagChipGroup({
  list,
  simple,
  onDelete,
  wrap,
  itemsx,
  chipsx,
  ...props
}) {
  const ListStyle = {
    ...defaultListStyle,
    ...props.sx,
    flexWrap: wrap === 'wrap' ? 'wrap' : 'nowrap',
  };
  const [tagsLength, setTagsLength] = useState(0);
  const [skipIndex, setSkipIndex] = useState(-1);
  const ref = useRef();

  return (
    <Box
      ref={ref}
      sx={ListStyle}
      onClick={() => {
        console.log(
          `ListLength: ${ref.current.offsetWidth} TagsLength: ${tagsLength}`
        );
      }}
    >
      {list.map((name, index) => (
        <TagChip
          label={name}
          key={index}
          index={index}
          simple={simple}
          onDelete={onDelete}
          itemsx={props.itemsx}
          chipsx={props.chipsx}
          display={skipIndex !== -1 && skipIndex <= index ? 'none' : 'block'}
        />
      ))}
    </Box>
  );
}

TagChipGroup.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  simple: PropTypes.bool,
  onDelete: PropTypes.func,
  wrap: PropTypes.oneOf(['wrap', 'skip']),
  sx: PropTypes.object,
  itemsx: PropTypes.object,
  chipsx: PropTypes.object,
};

TagChipGroup.defaultProps = {
  simple: false,
  onDelete: false,
  wrap: 'wrap',
  sx: {},
  itemsx: {},
  chipsx: {},
};
