/* eslint-disable global-require */
import React from 'react';
import { PropTypes } from 'prop-types';
import styled from '@emotion/styled';
import Image from '@components/Image';

function ChannelImageContainer({ url }) {
  return (
    <Image
      width="100%"
      height="7.5rem"
      src={require('./ChannelImages/leagueoflegends.jpeg')}
      mode="cover"
      block={false}
      lazy={false}
      threshold={0}
      placeholder=""
    />
  );
}

ChannelImageContainer.propTypes = {
  url: PropTypes.string.isRequired,
};

export default ChannelImageContainer;
