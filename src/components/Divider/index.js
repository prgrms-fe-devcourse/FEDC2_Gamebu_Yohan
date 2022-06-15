import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Line = styled.hr`
  border: none;
  background-color: #aaa;

  &.vertical {
    position: relative;
    top: -1;
    display: inline-block;
    width: 1px;
    height: 13px;
    vertical-align: middle;
  }

  &.horizontal {
    display: block;
    width: 100%;
    height: 1px;
  }
`;

function Divider({ type = 'horizontal', size = 8, ...props }) {
  const dividerStyle = {
    margin: type === 'vertical' ? `0 ${size}px` : `${size}px 0`,
  };
  return (
    <Line {...props} className={type} style={{ ...dividerStyle, ...props }} />
  );
}

Divider.defaultProps = {
  type: 'horizontal',
  size: 8,
};

Divider.propTypes = {
  type: PropTypes.string,
  size: PropTypes.number,
};

export default Divider;
