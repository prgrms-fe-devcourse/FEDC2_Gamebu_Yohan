import { Box, List } from '@mui/material';
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
  itemsx,
  chipsx,
  avatarsx,
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
  sx: PropTypes.object,
  itemsx: PropTypes.object,
  chipsx: PropTypes.object,
};

TagList.defaultProps = {
  simple: false,
  sx: {},
  itemsx: {},
  chipsx: {},
};
