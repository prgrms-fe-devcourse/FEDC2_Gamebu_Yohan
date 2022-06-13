import styled from '@emotion/styled';
import React from 'react';
import { PropTypes } from 'prop-types';

const TagContainer = styled.div``;

function Tag({ backgroundColor, width = '0.2rem', height, content }) {
  const tagStyles = {
    boxSizing: 'borderBox',
    borderRadius: '0.5rem',
    backgroundColor,
    width,
    height,
    padding: '0.1rem 0.25rem',
    fontSize: '0.75rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#eee',
    marginLeft: '0.2rem',
    marginRight: 0,
  };
  return <TagContainer style={tagStyles}>{content}</TagContainer>;
}

Tag.defaultProps = {
  backgroundColor: 'skyblue',
  width: 'auto',
  height: '1rem',
  content: '',
};

Tag.propTypes = {
  backgroundColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  content: PropTypes.string,
};

export default Tag;
