import { Box, List } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import PropTypes, { array } from 'prop-types';
import { blue } from '@mui/material/colors';
import TagChip from '.';

const defaultBoxStyle = {
  alignItems: 'center',
};

const defaultListStyle = {
  ListStyle: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  flexDirection: 'row',
};

const helperTextBoxStyle = {
  color: blue[500],
  display: 'inline-block',
  width: 100,
  alignItems: 'center',
};

export default function ShortTagList({
  list,
  simple,
  onDelete,
  wrap,
  itemsx,
  chipsx,
  ...props
}) {
  const BoxStyle = {
    ...defaultBoxStyle,
    ...props.sx,
  };

  const ListStyle = {
    ...defaultListStyle,
    flexWrap: wrap === 'wrap' ? 'wrap' : 'nowrap',
  };
  const [listItem, setListItem] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const BoxRef = useRef();
  const listRef = useRef();

  useEffect(() => {
    const boxLength = BoxRef.current.offsetWidth;
    const listLength = listRef.current.offsetWidth;
    if (boxLength - 150 < listLength) {
      setIsEnd(true);
      const newListItem = listItem.slice(0, -1);
      setCurrentIndex(newListItem.length);
      setListItem(newListItem);
    }
    if (isEnd) return;
    const newListItem = [...listItem];
    if (list[currentIndex]) newListItem.push(list[currentIndex]);
    setCurrentIndex(currentIndex + 1);

    if (currentIndex >= list.length) {
      setIsEnd(true);
    }
    setListItem(newListItem);
  }, [listItem]);

  const onRender = () => {};
  return (
    <Box
      ref={BoxRef}
      sx={BoxStyle}
      onClick={() => {
        console.log(currentIndex);
      }}
    >
      <List ref={listRef} sx={ListStyle}>
        {listItem.map((name, index) => (
          <TagChip
            label={name}
            key={name}
            index={index}
            simple={simple}
            onRender={onRender}
            onDelete={onDelete}
            itemsx={props.itemsx}
            chipsx={props.chipsx}
          />
        ))}
      </List>
      {list.length > currentIndex && (
        <Box sx={helperTextBoxStyle}>+{list.length - currentIndex}</Box>
      )}
    </Box>
  );
}

ShortTagList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  simple: PropTypes.bool,
  onDelete: PropTypes.func,
  wrap: PropTypes.oneOf(['wrap', 'skip']),
  sx: PropTypes.object,
  itemsx: PropTypes.object,
  chipsx: PropTypes.object,
};

ShortTagList.defaultProps = {
  simple: false,
  onDelete: false,
  wrap: 'wrap',
  sx: {},
  itemsx: {},
  chipsx: {},
};
