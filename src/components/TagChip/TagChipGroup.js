import { ListItem, Box } from '@mui/material';
import PropTypes from 'prop-types';
import TagChip from '.';

const defaultListStyle = {
  display: 'inline-flex',
  flexDirection: 'row',
};

const defaultItemStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  disablePadding: true,
};

export default function TagChipGroup({
  list,
  simple,
  onDelete,
  wrap,
  ...props
}) {
  const ListStyle = {
    ...defaultListStyle,
    ...props.sx,
    flexWrap: wrap === 'wrap' ? 'wrap' : 'nowrap',
  };

  const ItemStyle = {
    ...defaultItemStyle,
    ...props.tagsx,
  };

  return (
    <Box direction="row" spacing={0} sx={ListStyle} {...props}>
      {list.map((name) => (
        <ListItem key={name}>
          <TagChip
            label={name}
            sx={ItemStyle}
            simple={simple}
            onDelete={onDelete ? onDelete : false}
          />
        </ListItem>
      ))}
    </Box>
  );
}

TagChipGroup.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  simple: PropTypes.bool,
  onDelete: PropTypes.func,
  wrap: PropTypes.oneOf(['wrap', 'skip']),
};

TagChipGroup.defaultProps = {
  simple: false,
  onDelete: false,
  wrap: 'wrap',
};
