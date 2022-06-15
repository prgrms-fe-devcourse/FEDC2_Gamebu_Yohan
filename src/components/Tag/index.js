import styled from '@emotion/styled';
import React from 'react';
import { PropTypes } from 'prop-types';

const TagContainer = styled.div``;

function Tag({ backgroundColor, width = '0.2rem', height, content, ...props }) {
  const tagStyles = {
    backgroundColor,
    width,
    height,
  };
  return (
    <TagContainer style={{ ...tagStyles, ...props.style }}>
      {content}
    </TagContainer>
  );
}

Tag.defaultProps = {
  backgroundColor: 'skyblue',
  width: 'auto',
  height: '1rem',
  content: '',
  style: {},
};

Tag.propTypes = {
  backgroundColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  content: PropTypes.string,
  style: PropTypes.object,
};

export default Tag;
