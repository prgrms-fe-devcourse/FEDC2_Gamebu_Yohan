import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetch, authFetch } from '@utils/fetch';
import styled from '@emotion/styled';
import { COLOR_SIGNATURE } from '@utils/color';
import Divider from '@components/Divider';
import ChannelImage from '@components/Channels/ChannelImageContainer';
import ChannelPostCard from '@components/Channels/ChannelPostCard';
import channelImageObject from '@assets/ChannelImages/ChannelImageFiles';
import PostCardContainer from 'react-infinite-scroll-component';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import useValueContext from '@hooks/useValueContext';
import useActionContext from '@hooks/useActionContext';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import { IconButton } from '@mui/material';

const ChannelContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  height: 42rem;
`;

const IconWrapper = styled(IconButton)`
  position: absolute;
  right: 0;
  top: 0;
  & .MuiSvgIcon-root {
    color: #c89f23;
    font-size: 32px;
  }
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

const LinkButton = styled(IconButton)`
  width: 4rem;
  height: 4rem;
  position: fixed;
  bottom: 5rem;
  right: 2rem;
  border-radius: 50%;
  background-color: ${COLOR_SIGNATURE};
  & .MuiSvgIcon-root {
    color: white;
  }
`;

const ImageContainer = styled.div`
  position: relative;
`;

function ChannelPage() {
  const { user, isLogin } = useValueContext();
  const { favorites: setUserObject } = useActionContext();
  const navigate = useNavigate();
  const { channelId } = useParams('');
  const [channelData, setChannelData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [order, setOrder] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const limit = 8;

  const latestOrder = useCallback(
    (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt),
    []
  );
  const popularityOrder = useCallback(
    (a, b) => b.likes.length - a.likes.length,
    []
  );

  const orderCompareFunc = {
    true: latestOrder,
    false: popularityOrder,
  };
  const favoriteList = useMemo(() => {
    if (!user) return [];
    return JSON.parse(user.username);
  }, [user]);

  const fetchChannelData = useCallback(async () => {
    const result = await fetch(`posts/channel/${channelId}`, {
      params: {
        offset,
        limit,
      },
    });
    if (result.length > 0) {
      setChannelData([...channelData, ...result]);
      setOffset(offset + limit);
    }
  }, [channelData, channelId, offset]);

  const setFavoriteInfo = useCallback(async () => {
    if (!isLogin) {
      setIsFavorite(false);
      return;
    }
    const isFavoriteChannel = favoriteList.includes(channelId);
    setIsFavorite(isFavoriteChannel);
  }, [channelId, favoriteList, isLogin]);

  useEffect(() => {
    fetchChannelData();
    setFavoriteInfo();
  }, [fetchChannelData, setFavoriteInfo]);

  const addFavorite = async () => {
    const changedFavoriteList = [...favoriteList, channelId].sort();
    const res = await authFetch('settings/update-user', {
      method: 'PUT',
      data: {
        fullName: user.fullName,
        username: JSON.stringify(changedFavoriteList),
      },
    });
    setUserObject(res);
  };

  const cancelFavorite = async () => {
    const changedFavoriteList = favoriteList.filter(
      (favoriteId) => favoriteId !== channelId
    );
    const res = await authFetch('settings/update-user', {
      method: 'PUT',
      data: {
        fullName: user.fullName,
        username: JSON.stringify(changedFavoriteList),
      },
    });
    setUserObject(res);
  };

  const handleFavoriteClick = () => {
    if (favoriteList.includes(channelId)) {
      cancelFavorite();
    } else {
      addFavorite();
    }
  };

  const handleOrderClick = () => {
    setOrder((previous) => !previous);
    const orderedPosts = channelData.sort(orderCompareFunc[order]);
    setChannelData(orderedPosts);
  };

  const handleWriteClick = () => {
    if (isLogin)
      return navigate('/posts/write', { state: { channelId, postId: false } });
    navigate('/');
  };

  return (
    <>
      <ChannelContainer>
        <ImageContainer>
          <ChannelImage src={channelImageObject[channelId]} />
          {isLogin && (
            <IconWrapper onClick={handleFavoriteClick}>
              {isFavorite ? <StarRoundedIcon /> : <StarBorderRoundedIcon />}
            </IconWrapper>
          )}
        </ImageContainer>
        <SortBox>
          <Text onClick={handleOrderClick} isBold={order}>
            최신순
          </Text>
          <Divider type="vertical" size={8} />
          <Text onClick={handleOrderClick} isBold={!order}>
            인기글
          </Text>
        </SortBox>
        <PostCardContainer
          scrollableTarget="scroll-threshold"
          dataLength={channelData.length}
          hasMore
          next={fetchChannelData}
          height={600}
        >
          {channelData &&
            channelData.map((item) => {
              const { dt: title, tg: tag } = JSON.parse(item.title);
              const isLikedPost =
                user && item.likes.find((item) => item._id === user._id);
              return (
                <ChannelPostCard
                  title={title}
                  tag={tag}
                  key={item._id}
                  updatedAt={item.updatedAt}
                  fullName={item.author.fullName}
                  numberOfLike={item.likes.length}
                  isLiked={isLikedPost}
                  numberOfComment={item.comments.length}
                  postId={item._id}
                />
              );
            })}
          <div
            id="scroll-threshold"
            style={{ width: '100%', height: '2rem' }}
          />
        </PostCardContainer>
      </ChannelContainer>
      <LinkButton type="button" onClick={handleWriteClick}>
        <CreateRoundedIcon fontSize="large" />
      </LinkButton>
    </>
  );
}

export default ChannelPage;
