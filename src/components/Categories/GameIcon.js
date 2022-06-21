import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const TopRightIconWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

function GameIcon({ children, ...prop }) {
  return <TopRightIconWrapper {...prop}>{children}</TopRightIconWrapper>;
}

GameIcon.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GameIcon;
