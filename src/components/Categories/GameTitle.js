import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const BasicTitle = styled.div`
  text-align: center;
  font-size: 0.75rem;
  font-weight: ${(prop) => prop.weight};
  color: ${(prop) => prop.color};
  margin-top: 0.1rem;
`;

function GameTitle({ children, color, weight }) {
  return (
    <BasicTitle color={color} weight={weight}>
      {children}
    </BasicTitle>
  );
}

GameTitle.defaultProps = {
  color: 'black',
  weight: 400,
};

GameTitle.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  weight: PropTypes.number,
};

export default GameTitle;
