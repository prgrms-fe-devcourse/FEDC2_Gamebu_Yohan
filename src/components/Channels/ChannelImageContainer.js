import React from 'react';
import { PropTypes } from 'prop-types';
import Image from '@components/Image';

function ChannelImageContainer({ src }) {
  return (
    <Image
      width="100%"
      height="7.5rem"
      src={src}
      mode="cover"
      block={false}
      lazy={false}
      threshold={0}
      placeholder=""
    />
  );
}

ChannelImageContainer.propTypes = {
  src: PropTypes.string.isRequired,
};

export default ChannelImageContainer;
