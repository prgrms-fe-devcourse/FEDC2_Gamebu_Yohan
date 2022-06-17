import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const UnorderedList = styled.ul`
  list-style: none;
  & > li:not(:first-of-type) {
    margin-top: ${({ gap }) => (typeof gap === 'string' ? gap : `${gap}px`)};
  }
`;
function List({ frame, items, keyName, limit, offset, alt, gap }) {
  return (
    <UnorderedList gap={gap}>
      {items.length === 0
        ? alt
        : items
            .slice(offset * limit, offset * limit + limit)
            .map((item) => (
              <li key={item[keyName]}>
                {React.cloneElement(frame, { children: item })}
              </li>
            ))}
    </UnorderedList>
  );
}

List.propTypes = {
  frame: PropTypes.node.isRequired,
  items: PropTypes.array.isRequired,
  keyName: PropTypes.string.isRequired,
  limit: PropTypes.number,
  offset: PropTypes.number,
  alt: PropTypes.string,
  gap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

List.defaultProps = {
  limit: 5,
  offset: 0,
  alt: '',
  gap: 0,
};
export default List;
