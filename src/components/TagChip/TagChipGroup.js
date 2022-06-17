import PropTypes from 'prop-types';
import { ListItem } from '@mui/material';
import TagChip from '.';

export default function TagChipGroup({ tagList, size, simple, onDelete }) {
  const [chipList, setChipList] = useState(tagList);
  useEffect(() => {}, [chipList]);
  return (
    <Box>
      {tagList.map((name) => (
        <ListItem key={name}>
          <TagChip size={size} simple={simple} onDelete={} />
        </ListItem>
      ))}
    </Box>
  );
}

TagChipGroup.propTypes = {
  tagList: PropTypes.string.isRequired,
  size: PropTypes.string,
  simple: PropTypes.bool,
};

TagChipGroup.defaultProps = {
  size: 'medium',
  simple: false,
};
