import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetch } from '@utils/fetch';
import styled from '@emotion/styled';
import { COLOR_BG } from '@utils/color';
import Divider from '@components/Divider';
import ChannelImageContainer from '@components/Channels/ChannelImageContainer';
import ChannelPostCard from '@components/Channels/ChannelPostCard';
import channelImageObject from '@components/Channels/ChannelImages/ChannelImageFiles';
import InfiniteScroll from 'react-infinite-scroll-component';

const ChannelContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
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
  width: 4rem;
  height: 1.5rem;
  position: fixed;
  bottom: 4rem;
  left: 42%;
  border-radius: 0.5rem;
  border: 0.1rem solid black;
  background-color: ${COLOR_BG};
`;

function ChannelPage() {
  const navigate = useNavigate();
  const [start, setStart] = useState(0);
  const [channelData, setChannelData] = useState([]);
  const [isNew, setIsNew] = useState(true);
  const [isPopular, setIsPopular] = useState(false);

  // const { channelId } = useParams('');
  const channelId = '62a817a85517e27ffcab3cce';
  const infiniteChannelId = '62a97c1c6c77714531010109';
  const tagTestChanneld = '62aa146171f64a5582899ae9';
  const limit = 7;

  const getChannelData = async () => {
    const result = await fetch(
      `posts/channel/${tagTestChanneld}?offset=${start}&limit=${limit}`
    );
    setChannelData([...channelData, ...result]);
    setStart(start + limit);
    console.log(result);
  };

  useEffect(() => {
    getChannelData();
  }, []);

  const renderNewList = () => {
    setIsPopular(false);
    setIsNew(true);

    const sortedChannelData = channelData.sort(
      (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt)
    );
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

  const goToWrite = () => {
    //
    navigate('/posts/write', { state: { channelId } });
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
          dataLength={channelData.length}
          hasMore
          next={getChannelData}
          height={600}
        >
          {channelData &&
            channelData.map((item) => (
              <ChannelPostCard
                title={JSON.parse(item.title).dt}
                key={item._id}
                updatedAt={item.updatedAt}
                fullName={item.author.username}
                likes={item.likes}
                tag={JSON.parse(item.title).tg}
                comments={item.comments}
                postId={item._id}
                channelId={item.channel._id}
                content={JSON.parse(item.title).dd}
                authorId={item.author._id}
              />
            ))}
          <div id="scrollableDiv" style={{ width: '100%', height: '2rem' }} />
        </InfiniteScroll>
      </ChannelContainer>
      <LinkButtonContainer>
        <LinkButton type="button" onClick={goToWrite}>
          글쓰기
        </LinkButton>
      </LinkButtonContainer>
    </>
  );
}

export default ChannelPage;
