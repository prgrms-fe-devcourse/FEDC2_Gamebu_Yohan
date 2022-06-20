import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetch, authFetch } from '@utils/fetch';
import styled from '@emotion/styled';
import { COLOR_BG } from '@utils/color';
import Divider from '@components/Divider';
import ChannelImageContainer from '@components/Channels/ChannelImageContainer';
import ChannelPostCard from '@components/Channels/ChannelPostCard';
import channelImageObject from '@assets/ChannelImages/ChannelImageFiles';
import InfiniteScroll from 'react-infinite-scroll-component';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import useValueContext from '@hooks/useValueContext';
import useActionContext from '@hooks/useActionContext';

const ChannelContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  height: 42rem;
`;

const FavoriteIcon = styled(StarIcon)`
  color: #cddc39;
  font-size: 32px;
  position: absolute;
  right: 2rem;
  top: 6rem;
`;
const NotFavoriteIcon = styled(StarOutlineIcon)`
  font-size: 32px;
  position: absolute;
  right: 2rem;
  top: 6rem;
  color: #cddc39;
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
  const { user, isLogin } = useValueContext();
  const userId = user && user._id;
  const { favorites } = useActionContext();
  const navigate = useNavigate();
  const [start, setStart] = useState(0);
  const [channelData, setChannelData] = useState([]);
  const [isNew, setIsNew] = useState(true);
  const [isPopular, setIsPopular] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // const { channelId } = useParams('');
  const channelId = '62a817a85517e27ffcab3cce';
  const infiniteChannelId = '62a97c1c6c77714531010109';
  const tagTestChanneld = '62aa146171f64a5582899ae9';
  const limit = 7;

  const getChannelData = async () => {
    const result = await fetch(
      `posts/channel/${tagTestChanneld}?offset=${start}&limit=${limit}`
    );
    if (result.length > 0) {
      setChannelData([...channelData, ...result]);
      setStart(start + limit);
    }
  };

  // useEffect 시 채널을 즐겨찾기 해놓았는지 확인하는 로직
  const findChannel = async () => {
    const parsing = JSON.parse(user.username);
    const found = parsing.find((id) => tagTestChanneld === id);
    if (!found) return null;
    setIsFavorite(true);
  };

  useEffect(() => {
    getChannelData(); // 채널의 포스트 목록 조회 함수
    user && findChannel(); // 채널 즐겨찾기 확인 함수
  }, [user]);

  // 사용자 정보 수정 api
  const modifyUserInfo = async () => {
    await authFetch('settings/update-user', {
      method: 'PUT',
      data: {
        fullName: 'EonDongKim',
        username: JSON.stringify(['62aa146171f64a5582899ae9']),
      },
    });
  };

  const favoriteClick = async (boolean) => {
    if (!user) {
      alert('로그인을 해야 사용할수 있는 기능입니다.');
      return;
    }
    setIsFavorite(!isFavorite);

    if (boolean) {
      // 구독 취소 액션
      // 사용자 정보 수정 api로 channelId 를 지운다
      const modifiedChannelArray = JSON.parse(user.username).filter(
        (id) => tagTestChanneld !== id // 채널이 있다면 지우기
      );
      const res = await authFetch('settings/update-user', {
        method: 'PUT',
        data: {
          fullName: user.fullName,
          username: JSON.stringify(modifiedChannelArray),
        },
      });
      favorites(res);
    } else {
      const res = await authFetch('settings/update-user', {
        method: 'PUT',
        data: {
          fullName: user.fullName,
          username: JSON.stringify(
            [...JSON.parse(user.username), tagTestChanneld].sort()
          ),
        },
      });
      favorites(res);
    }
  };

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

  const changeLikeCount = (bool, postId, likeId) => {
    // 좋아요가 바뀌었을때 인기순을 바꿔주는 함수
    if (bool) {
      setChannelData([
        ...channelData.map((item) => {
          if (item._id === postId) {
            return {
              ...item,
              likes: [
                ...item.likes,
                { _id: likeId, post: postId, user: userId },
              ],
            };
          }
          return item;
        }),
      ]);
    } else {
      setChannelData([
        ...channelData.map((item) => {
          if (item._id === postId) {
            return {
              ...item,
              likes: [...item.likes.filter((i) => i.user !== userId)],
            };
          }
          return item;
        }),
      ]);
    }
  };

  const goToWrite = () => {
    if (isLogin)
      return navigate('/posts/write', { state: { channelId, postId: false } });
    navigate('/');
  };

  return (
    <>
      <ChannelContainer>
        <ChannelImageContainer src={channelImageObject[channelId]} />
        {isFavorite ? (
          <FavoriteIcon
            fontSize="inherit"
            color="inherit"
            onClick={() => favoriteClick(isFavorite)}
          />
        ) : (
          <NotFavoriteIcon
            fontSize="inherit"
            color="inherit"
            onClick={() => favoriteClick(isFavorite)}
          />
        )}
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
                fullName={item.author.fullName}
                likes={item.likes}
                tag={JSON.parse(item.title).tg}
                comments={item.comments}
                postId={item._id}
                channelId={item.channel._id}
                content={JSON.parse(item.title).dd}
                authorId={item.author._id}
                changeLikeCount={(bool, id, likeId) =>
                  changeLikeCount(bool, id, likeId)
                }
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
