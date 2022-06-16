/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import styled from '@emotion/styled';
import Image from '@components/Image';
import { authFetch, fetch } from '@utils/fetch';
import axios from 'axios';

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
