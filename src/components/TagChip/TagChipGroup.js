import { ListItem, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import TagChip from '.';

const ItemStyle = {
  display: 'inline-flex',
  justifyContent: 'center',
};

export default function TagChipGroup({
  list,
  tagSize,
  simple,
  onDelete,
  wrap,
  ...props
}) {
  const adjustedStyle = {
    ...props.sx,
    flexWrap: wrap === 'wrap' ? 'wrap' : 'nowrap',
  };
  return (
    <Stack direction="row" spacing={0} {...props}>
      {list.map((name) => (
        <ListItem key={name} sx={ItemStyle} alignItems="center" disablePadding>
          <TagChip
            label={name}
            size={tagSize}
            simple={simple}
            onDelete={onDelete ? onDelete : false}
          />
        </ListItem>
      ))}
    </Stack>
  );
}

TagChipGroup.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  tagSize: PropTypes.string,
  simple: PropTypes.bool,
  onDelete: PropTypes.func,
  wrap: PropTypes.oneOf(['wrap', 'skip', 'overlap']),
};

TagChipGroup.defaultProps = {
  tagSize: 'normal',
  simple: false,
  onDelete: false,
  wrap: 'wrap',
};
