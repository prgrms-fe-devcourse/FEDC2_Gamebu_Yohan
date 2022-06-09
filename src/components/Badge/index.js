import { PropTypes } from 'prop-types';
import styled from '@emotion/styled';

const BadgeContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const Super = styled.sup`
  position: absolute;
  top: 0;
  right: 0;
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 0 8px;
  font-size: 12px;
  border-radius: 20px;
  color: white;
  background-color: #f44;
  transform: translate(50%, -50%);

  &.dot {
    padding: 0;
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }
`;

function Badge({
  children,
  count,
  maxCount,
  showZero,
  backgroundColor,
  textColor,
  ...props
}) {
  const colorStyle = {
    backgroundColor,
    color: textColor,
  };

  let badge = null;
  if (count) {
    badge = (
      <Super style={colorStyle}>
        {maxCount && count > maxCount ? `${maxCount}+` : `${count}`}
      </Super>
    );
  } else if (count !== undefined) {
    badge = showZero ? <Super style={colorStyle}>0</Super> : null;
  }

  return (
    <BadgeContainer>
      {children}
      {badge}
    </BadgeContainer>
  );
}

Badge.defaultProps = {
  count: 0,
  maxCount: 100,
  showZero: false,
  backgroundColor: '#FF0000',
  textColor: '#fff',
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  count: PropTypes.number,
  maxCount: PropTypes.number,
  showZero: PropTypes.bool,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default Badge;
