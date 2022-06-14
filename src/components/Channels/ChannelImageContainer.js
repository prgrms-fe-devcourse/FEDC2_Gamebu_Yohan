/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import styled from '@emotion/styled';
import Image from '@components/Image';
import { authFetch, fetch } from '@utils/fetch';

function ChannelImageContainer({ url }) {
  const channelId = '62a817a85517e27ffcab3cce';
  const getChannelData = async () => {
    const result = await fetch(`posts/channel/62a817a85517e27ffcab3cce`);
    console.log(result[0].author.fullName);
    console.log(JSON.parse(result[0].author.fullName));
  };

  useEffect(() => {
    getChannelData();
  }, []);
  console.log(url);
  return (
    <Image
      width="100%"
      height="7.5rem"
      src={require(`${url}`)}
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
