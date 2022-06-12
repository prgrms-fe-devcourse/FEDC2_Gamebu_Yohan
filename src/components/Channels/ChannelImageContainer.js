/* eslint-disable global-require */
import React from 'react';
import { PropTypes } from 'prop-types';
import styled from '@emotion/styled';

const ImageContainer = styled.div`
  width: 100%;
  height: 7.5rem;
  /* background-image: url('./ChannelImages/leagueoflegends.jpeg'); */
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 7.5rem;
`;

function ChannelImageContainer({ url }) {
  return (
    <ImageContainer>
      <Image src={require('./ChannelImages/leagueoflegends.jpeg')} />
    </ImageContainer>
  );
}

ChannelImageContainer.propTypes = {
  url: PropTypes.string.isRequired,
};

export default ChannelImageContainer;
