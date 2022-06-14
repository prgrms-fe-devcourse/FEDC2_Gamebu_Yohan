import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { authFetch, fetch } from '@utils/fetch';
import styled from '@emotion/styled';
import { COLOR_BG } from '@utils/color';
import Divider from '@components/Divider';
import ChannelImageContainer from '@components/Channels/ChannelImageContainer';
import ChannelPostCard from '@components/Channels/ChannelPostCard';
import channelImageObject from '@components/Channels/ChannelImages/ChannelImageFiles';

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
  width: 100%;
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
    updatedAt: '2022-06-12T08:49:00.655Z',
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
      {
        _id: '62a8496e70c0c925abdd5c06',
        user: '629f07fa7e01ad1cb7250131',
        post: '62a81e635517e27ffcab3d0c',
        createdAt: '2022-06-14T08:40:14.061Z',
        updatedAt: '2022-06-14T08:40:14.061Z',
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
    updatedAt: '2022-06-10T08:49:00.655Z',
  },
];

function ChannelPage() {
  // useState를 통한 리렌더링을 위해서 잠시 DUMMYDATA를 channelData 안에 넣어야함
  // ++ 태그 파싱 문제 때문에 더미데이터 사용
  const [channelData, setChannelData] = useState(CHANNEL_DUUMY_DATA);
  const [isNew, setIsNew] = useState(true);
  const [isPopular, setIsPopular] = useState(false);
  // const { channelId } = useParams('');
  const channelId = '62a817a85517e27ffcab3cce';

  // const getChannelData = async () => {
  //   const result = await fetch(`posts/channel/${channelId}`);
  //   setChannelData(result);
  // };

  // useEffect(() => {
  //   getChannelData();
  // }, [channelId]);

  const renderNewList = () => {
    setIsPopular(false);
    setIsNew(true);
    const sortedChannelData = channelData.sort(
      (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt)
    );
    console.log('sorted: ', sortedChannelData);
    setChannelData([...sortedChannelData]);
  };
  const renderPopularList = () => {
    setIsNew(false);
    setIsPopular(true);
    const sortedChannelData = channelData.sort(
      (a, b) => b.likes.length - a.likes.length
    );
    setChannelData([...sortedChannelData]);
  };

  return (
    <>
      <ChannelContainer>
        <ChannelImageContainer url={channelImageObject[channelId]} />
        <SortBox>
          <Text onClick={renderNewList} isBold={isNew}>
            최신순
          </Text>
          <Divider type="vertical" size={8} />
          <Text onClick={renderPopularList} isBold={isPopular}>
            인기글
          </Text>
        </SortBox>
        {channelData &&
          channelData.map((item) => (
            <ChannelPostCard
              title={item.title}
              key={item._id}
              updatedAt={item.updatedAt}
              fullName={item.author.fullName}
              postId={item._id}
              likes={item.likes}
            />
          ))}
        {/* {CHANNEL_DUUMY_DATA &&
          CHANNEL_DUUMY_DATA.map((item) => (
            <ChannelPostCard
              title={item.title}
              key={item._id}
              createdAt={item.createdAt}
              fullName={item.author.fullName}
              postId={item._id}
              likes={item.likes}
            />
          ))} */}
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
