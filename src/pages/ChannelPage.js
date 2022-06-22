import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetch, authFetch } from '@utils/fetch';
import styled from '@emotion/styled';
import { COLOR_SIGNATURE } from '@utils/color';
import Divider from '@components/Divider';
import ChannelImage from '@components/Channels/ChannelImageContainer';
import ChannelPostCard from '@components/Channels/ChannelPostCard';
import PostCardContainer from 'react-infinite-scroll-component';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import useValueContext from '@hooks/useValueContext';
import useActionContext from '@hooks/useActionContext';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import { IconButton } from '@mui/material';
import useOurSnackbar from '@hooks/useOurSnackbar';
import bannerImages from '@assets/ChannelImages';
import LoginModal from '@components/LoginModal';
import SkeletonMessage from '@components/SkeletonMessage';

const ChannelContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  height: 100%;
`;

const IconWrapper = styled(IconButton)`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  &.MuiIconButton-root {
    width: 1.75rem;
    height: 1.75rem;
    background-color: white;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
      0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  }
  &.MuiIconButton-root:hover {
    background-color: white;
  }
  & .MuiSvgIcon-root {
    color: gold;
    font-size: 2rem;
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
  &.MuiIconButton-root {
    border-radius: 50%;
    background-color: ${COLOR_SIGNATURE};
  }
  & .MuiSvgIcon-root {
    color: white;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
`;

const SkeletonWrapper = styled.div`
  & div {
    margin-bottom: 8px;
  }
`;

function ChannelPage() {
  const renderSnackbar = useOurSnackbar();
  const { user, isLogin } = useValueContext();
  const { favorites: setUserObject } = useActionContext();
  const navigate = useNavigate();
  const { channelId } = useParams('');
  const [channelData, setChannelData] = useState(null);
  const [offset, setOffset] = useState(0);
  const [order, setOrder] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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
    if (!user.username) return [];
    return JSON.parse(user.username);
  }, [user]);

  const initChannelData = useCallback(async () => {
    const result = await fetch(`posts/channel/${channelId}`, {
      params: {
        offset: 0,
        limit,
      },
    });
    setChannelData(result);
    setOffset(limit);
  }, [channelId]);

  const fetchChannelData = useCallback(async () => {
    const result = await fetch(`posts/channel/${channelId}`, {
      params: {
        offset,
        limit,
      },
    });
    if (result.length > 0) {
      setChannelData((prevData) => [...prevData, ...result]);
      setOffset((prevOffset) => prevOffset + limit);
    }
  }, [channelId, offset]);

  const setFavoriteInfo = useCallback(async () => {
    if (!isLogin) {
      setIsFavorite(false);
      return;
    }
    const isFavoriteChannel = favoriteList.includes(channelId);
    setIsFavorite(isFavoriteChannel);
  }, [channelId, favoriteList, isLogin]);

  useEffect(() => {
    initChannelData();
    setFavoriteInfo();
  }, [initChannelData, setFavoriteInfo]);

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
      return navigate(`/posts/write/${channelId}`, {
        state: { channelId, postId: false },
      });
    setModalVisible(true);
  };

  return (
    <>
      <ChannelContainer>
        <ImageContainer>
          <ChannelImage src={bannerImages[channelId]} />
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
        {channelData ? (
          <PostCardContainer
            scrollableTarget="scroll-threshold"
            dataLength={channelData.length + 2}
            hasMore
            next={fetchChannelData}
            height="calc(100vh - 18.5rem)"
          >
            {channelData.length &&
              channelData.map((item) => {
                // FIXME: DB 초기화 이후 수정
                let isJson = true;
                try {
                  JSON.parse(item.title);
                } catch {
                  isJson = false;
                }
                const { dt: title, tg: tag } = isJson
                  ? JSON.parse(item.title)
                  : { dt: item.title, tg: [] };
                const isLikedPost =
                  user && item.likes.find((item) => item.user === user._id);
                return (
                  <ChannelPostCard
                    title={title}
                    tag={tag}
                    key={item._id}
                    updatedAt={item.updatedAt}
                    fullName={item.author.fullName}
                    numberOfLike={item.likes.length}
                    isLiked={Boolean(isLikedPost)}
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
        ) : (
          <SkeletonWrapper>
            <SkeletonMessage.Card repeat={5} />
          </SkeletonWrapper>
        )}
      </ChannelContainer>
      <LoginModal
        visible={modalVisible}
        handleCloseModal={() => setModalVisible(false)}
      />
      <LinkButton type="button" onClick={handleWriteClick}>
        <CreateRoundedIcon fontSize="large" />
      </LinkButton>
    </>
  );
}

export default ChannelPage;
