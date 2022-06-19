import { Box, List } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import TagChip from '.';

const DefaultBodyStyle = {
  alignItems: 'center',
};

const DefaultListStyle = {
  display: 'inline-flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
};

export default function TagList({
  tags,
  simple,
  onDelete,
  itemsx,
  chipsx,
  ...props
}) {
  const BodyStyle = {
    ...DefaultBodyStyle,
    ...props.sx,
  };

  const ListStyle = {
    ...DefaultListStyle,
  };

  return (
    <Box sx={BodyStyle}>
      <List sx={ListStyle}>
        {tags.map((name, index) => (
          <TagChip
            label={name}
            key={name}
            index={index}
            simple={simple}
            onDelete={onDelete}
            itemsx={itemsx}
            chipsx={chipsx}
          />
        ))}
      </List>
    </Box>
  );
}

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  simple: PropTypes.bool,
  onDelete: PropTypes.func,
  sx: PropTypes.object,
  itemsx: PropTypes.object,
  chipsx: PropTypes.object,
};

TagList.defaultProps = {
  simple: false,
  onDelete: false,
  sx: {},
  itemsx: {},
  chipsx: {},
};
