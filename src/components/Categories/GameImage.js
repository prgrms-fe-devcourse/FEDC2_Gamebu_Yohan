import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Image = styled.img`
  min-width: 100%;
  max-width: 100%;
  height: 100px;
  object-fit: contain;
`;

function GameImage({ src }) {
  return <Image src={src} />;
}

GameImage.propTypes = {
  src: PropTypes.string.isRequired,
};

export default GameImage;
