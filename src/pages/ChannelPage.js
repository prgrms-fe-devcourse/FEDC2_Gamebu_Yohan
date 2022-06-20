import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { authFetch, fetch } from '@utils/fetch';
import styled from '@emotion/styled';
import { COLOR_BG } from '@utils/color';
import Divider from '@components/Divider';
import ChannelImageContainer from '@components/Channels/ChannelImageContainer';
import ChannelPostCard from '@components/Channels/ChannelPostCard';
import channelImageObject from '@components/Channels/ChannelImages/ChannelImageFiles';
import InfiniteScroll from 'react-infinite-scroll-component';
import CHANNEL_DUUMY_DATA from '@components/Channels/channelDummy';

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
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
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

function ChannelPage() {
  const ref = useRef(null);
  const [start, setStart] = useState(0);
  const [channelData, setChannelData] = useState([]);
  const [isNew, setIsNew] = useState(true);
  const [isPopular, setIsPopular] = useState(false);

  // const { channelId } = useParams('');
  const channelId = '62a817a85517e27ffcab3cce';
  const infiniteChannelId = '62a97c1c6c77714531010109';

  const limit = 8;

  const getChannelData = async () => {
    const result = await fetch(
      `posts/channel/${infiniteChannelId}?offset=${start}&limit=${limit}`
    );
    console.log(result);
    setChannelData([...channelData, ...result]);
    // setChannelData(result);
    setStart(start + limit);
  };

  useEffect(() => {
    getChannelData();
  }, [infiniteChannelId]);

  useEffect(() => {});

  console.log('channelData:', channelData.length);

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
        <InfiniteScroll
          scrollableTarget="scrollableDiv"
          scrollThreshold={0.01}
          dataLength={channelData.length}
          hasMore
          next={getChannelData}
        >
          {channelData &&
            channelData.map((item) => (
              <ChannelPostCard
                title={JSON.parse(item.title).tt}
                key={item._id}
                updatedAt={item.updatedAt}
                fullName={item.author.username}
                postId={item._id}
                likes={item.likes}
              />
            ))}
          <div id="scrollableDiv" style={{ width: '100px', height: '1px' }} />
        </InfiniteScroll>
      </ChannelContainer>
      <LinkButtonContainer>
        <LinkButton type="button">
          <Link
            to="/posts/write"
            style={{ textDecoration: 'none', color: 'black' }}
          >
            글쓰기
          </Link>
        </LinkButton>
      </LinkButtonContainer>
    </>
  );
}

export default ChannelPage;
