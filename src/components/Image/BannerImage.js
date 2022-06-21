import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Image = styled.img`
  min-width: 100%;
  max-width: 100%;
  height: 10rem;
  object-fit: contain;
`;

function BannerImage({ src }) {
  return <Image src={src} />;
}

BannerImage.propTypes = {
  src: PropTypes.string.isRequired,
};

export default BannerImage;
