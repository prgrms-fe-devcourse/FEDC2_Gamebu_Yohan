import { Box, List } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { red } from '@mui/material/colors';
import TagChip from '.';

const DefaultBodyStyle = {
  alignItems: 'center',
};

const DefaultListStyle = {
  display: 'inline-flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  alignItems: 'center',
};

const HelperStyle = {
  alignItems: 'center',
  color: red[300],
};

export default function TagList({ tags, simple, itemsx, chipsx, ...props }) {
  const BodyStyle = {
    ...DefaultBodyStyle,
    ...props.sx,
  };

  const ListStyle = {
    ...DefaultListStyle,
  };
  const [listItem, setListItem] = useState([]);
  const [tagsIndex, setTagsIndex] = useState(0);
  const [endList, setEndList] = useState(false);
  const bodyRef = useRef();
  const listRef = useRef();
  const tagsLength = tags.length;

  useEffect(() => {
    if (endList) return;
    const boxLength = bodyRef.current.offsetWidth;
    const listLength = listRef.current.offsetWidth;
    if (boxLength - 50 < listLength) {
      const newListItem = listItem.slice(0, -1);
      setListItem(newListItem);
      setTagsIndex(newListItem.length);
      setEndList(true);
      return;
    }
    const newItem = tags[tagsIndex];
    if (typeof newItem === 'string') {
      const newListItem = [...listItem];
      newListItem.push(newItem);
      setListItem(newListItem);
      setTagsIndex(tagsIndex + 1);
      if (tagsIndex >= tagsLength) {
        setEndList(true);
      }
    }
  }, [listItem]);

  return (
    <Box ref={bodyRef} sx={BodyStyle}>
      <List ref={listRef} sx={ListStyle}>
        {listItem.map((name, index) => (
          <TagChip
            label={name}
            key={name}
            index={index}
            simple={simple}
            itemsx={{ ...itemsx, mr: 0 }}
            chipsx={chipsx}
          />
        ))}
      </List>
      {tagsLength > tagsIndex && (
        <span sx={HelperStyle}>+{tagsLength - tagsIndex}</span>
      )}
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
