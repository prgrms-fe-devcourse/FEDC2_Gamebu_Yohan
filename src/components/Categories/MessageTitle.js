import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const LargeTitle = styled.div`
  text-align: center;
  font-size: 1rem;
  font-weight: ${(prop) => prop.weight};
  color: ${(prop) => prop.color};
  margin: 1rem 0;
`;

function MessageTitle({ children, color, weight }) {
  return (
    <LargeTitle color={color} weight={weight}>
      {children}
    </LargeTitle>
  );
}

MessageTitle.defaultProps = {
  color: 'black',
  weight: 400,
};

MessageTitle.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  weight: PropTypes.number,
};

export default MessageTitle;
