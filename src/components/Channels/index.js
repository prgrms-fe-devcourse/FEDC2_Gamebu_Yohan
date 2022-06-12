import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetch } from '@utils/fetch';
import styled from '@emotion/styled';
import { COLOR_BG } from '@utils/color';
import ChannelImageContainer from './ChannelImageContainer';
import ChannelPostCard from './ChannelPostCard';

const ChannelContainer = styled.div`
  background-color: ${COLOR_BG};
  height: 90rem;
`;

function Channel() {
  const [channelData, setChannelData] = useState([]);
  const { channelId } = useParams('');

  const channelImages = {
    1: '리그오브레전드url',
    2: '피파온라인url',
    3: '메이플스토리url',
    4: '서든어택url',
  };

  useEffect(() => {
    const result = fetch(`/posts/channels/${channelId}`);
    setChannelData(result);
  }, [channelId]);

  return (
    <ChannelContainer>
      <ChannelImageContainer url={channelImages[channelId]} />
      <span>최신순</span>
      <span>인기글</span>
      <ChannelPostCard />
    </ChannelContainer>
  );
}

export default Channel;
