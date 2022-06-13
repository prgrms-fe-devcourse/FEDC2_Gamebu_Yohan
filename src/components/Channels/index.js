import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetch } from '@utils/fetch';
import styled from '@emotion/styled';
import { COLOR_BG } from '@utils/color';
import Divider from '@components/Divider';
import ChannelImageContainer from './ChannelImageContainer';
import ChannelPostCard from './ChannelPostCard';

const ChannelContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${COLOR_BG};
  height: 44rem;
`;

const SortBox = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 2rem;
  align-items: center;
`;

const Text = styled.span`
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  font-weight: ${(props) => (props.isBold ? 'bold' : 'normal')};
`;

const CHANNEL_DUUMY_DATA = [
  {
    likes: [],
    comments: [],
    _id: 1,
    // "image": Optional<String>,
    // "imagePublicId": Optional<String>,
    title: '듀오 구합니다',
    // channel: Channel,
    // author: User,
    createdAt: '2022-06-07T08:29:48.623Z',
    updatedAt: '2022-06-10T08:49:00.655Z',
  },
  {
    likes: [],
    comments: [],
    _id: 2,
    // "image": Optional<String>,
    // "imagePublicId": Optional<String>,
    title: '자랭 할 사람 라스트1명',
    // channel: Channel,
    // author: User,
    createdAt: '2022-06-12T08:49:00.655Z',
    updatedAt: '2022-06-12T08:49:00.655Z',
  },
];

function Channel() {
  const [channelData, setChannelData] = useState([]);
  const [isNew, setIsNew] = useState(true);
  const [isPopular, setIsPopular] = useState(false);
  const { channelId } = useParams('');

  const channelImages = {
    1: '리그오브레전드url',
    2: '피파온라인url',
    3: '메이플스토리url',
    4: '서든어택url',
  };

  useEffect(() => {
    // const result = fetch(`/posts/channel/${channelId}`);
    // setChannelData(result);
  }, [channelId]);

  const renderNewList = () => {
    setIsPopular(false);
    setIsNew(true);
  };
  const renderPopularList = () => {
    setIsNew(false);
    setIsPopular(true);
  };

  return (
    <ChannelContainer>
      <ChannelImageContainer url={channelImages[channelId]} />
      <SortBox>
        <Text onClick={renderNewList} isBold={isNew}>
          최신순
        </Text>
        <Divider type="vertical" size={8} />
        <Text onClick={renderPopularList} isBold={isPopular}>
          인기글
        </Text>
      </SortBox>
      {CHANNEL_DUUMY_DATA.map((item) => (
        <ChannelPostCard
          title={item.title}
          key={item._id}
          createdAt={item.createdAt}
        />
      ))}
      <button
        type="button"
        style={{
          position: 'fixed',
          bottom: '4rem',
          zIndex: 1,
          left: '44%',
        }}
      >
        글쓰기
      </button>
    </ChannelContainer>
  );
}

export default Channel;
