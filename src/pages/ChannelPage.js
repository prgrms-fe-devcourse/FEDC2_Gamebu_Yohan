import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { authFetch, fetch } from '@utils/fetch';
import styled from '@emotion/styled';
import { COLOR_BG } from '@utils/color';
import Divider from '@components/Divider';
import ChannelImageContainer from '@components/Channels/ChannelImageContainer';
import ChannelPostCard from '@components/Channels/ChannelPostCard';

const ChannelContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${COLOR_BG};
  height: 42rem;
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

const LinkButtonContainer = styled.div`
  background-color: ${COLOR_BG};
  width: 100%;
  height: 2.2rem;
`;

const LinkButton = styled.button`
  position: fixed;
  bottom: 4rem;
  left: 44%;
  border-radius: 0.5rem;
  border: 0.1rem solid black;
  background-color: ${COLOR_BG};
`;

const CHANNEL_DUUMY_DATA = [
  {
    likes: [
      {
        _id: '62a829c05517e27ffcab3dec',
        user: '629e29cc7e80a91c96fdf2d5',
        post: '62a81e635517e27ffcab3d0c',
        createdAt: '2022-06-14T06:25:04.916Z',
        updatedAt: '2022-06-14T06:25:04.916Z',
        __v: 0,
      },
    ],
    comments: [],
    _id: 1,
    // "image": Optional<String>,
    // "imagePublicId": Optional<String>,
    title: '듀오 구합니다',
    // channel: Channel,
    author: {
      _id: '629e29cc7e80a91c96fdf2d5',
      fullName: 'Admin',
    },
    createdAt: '2022-06-07T08:40:53.565Z',
    updatedAt: '2022-06-10T08:49:00.655Z',
  },
  {
    likes: [
      {
        _id: '62a829c05517e27ffcab3dec',
        user: '629e29cc7e80a91c96fdf2d5',
        post: '62a81e635517e27ffcab3d0c',
        createdAt: '2022-06-14T06:25:04.916Z',
        updatedAt: '2022-06-14T06:25:04.916Z',
        __v: 0,
      },
    ],
    comments: [],
    _id: 2,
    // "image": Optional<String>,
    // "imagePublicId": Optional<String>,
    title: '자랭 할 사람 라스트1명',
    // channel: Channel,
    author: {
      _id: '629f20f37e01ad1cb72501c5',
      fullName: 'sang2',
    },
    createdAt: '2022-06-12T08:49:00.655Z',
    updatedAt: '2022-06-12T08:49:00.655Z',
  },
];

function ChannelPage() {
  const [channelData, setChannelData] = useState([]);
  const [isNew, setIsNew] = useState(true);
  const [isPopular, setIsPopular] = useState(false);
  // const { channelId } = useParams('');
  const channelId = '62a817a85517e27ffcab3cce';

  const channelImages = {
    '62a817a85517e27ffcab3cce': './ChannelImages/leagueoflegends.jpeg',
    2: '피파온라인url',
    3: '메이플스토리url',
    4: '서든어택url',
  };

  const getChannelData = async () => {
    const result = await fetch(`/posts/channel/${channelId}`);
    setChannelData(result);
  };

  useEffect(() => {
    getChannelData();
  }, [channelId]);

  useEffect(() => {
    console.log(channelData[0]);
  });

  const renderNewList = () => {
    setIsPopular(false);
    setIsNew(true);
  };
  const renderPopularList = () => {
    setIsNew(false);
    setIsPopular(true);
  };

  return (
    <>
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
        {/* {channelData &&
          channelData.map((item) => (
            <ChannelPostCard
              title={item.title}
              key={item._id}
              createdAt={item.createdAt}
              fullName={item.author.fullName}
              _id={item.author._id}
            />
          ))} */}
        {CHANNEL_DUUMY_DATA &&
          CHANNEL_DUUMY_DATA.map((item) => (
            <ChannelPostCard
              title={item.title}
              key={item._id}
              createdAt={item.createdAt}
              fullName={item.author.fullName}
              postId={item._id}
              likes={item.likes}
            />
          ))}
      </ChannelContainer>
      <LinkButtonContainer>
        <LinkButton type="button">
          <Link to="/posts" style={{ textDecoration: 'none', color: 'black' }}>
            글쓰기
          </Link>
        </LinkButton>
      </LinkButtonContainer>
    </>
  );
}

export default ChannelPage;
