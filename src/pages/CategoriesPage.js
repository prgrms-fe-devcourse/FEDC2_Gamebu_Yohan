import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import ContextProvider from '@contexts/ContextProvider';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { COLOR_MAIN, COLOR_SIGNATURE } from '@utils/color';
import Header from '@components/Header';
import Divider from '@components/Divider';
import { CATEGORIES, CHANNELS, IMAGES } from '@utils/constants';
import useValueContext from '@hooks/useValueContext';
import { authFetch } from '@utils/fetch';
import useActionContext from '@hooks/useActionContext';

import {
  GameIcon,
  GameImage,
  GameTitle,
  MessageTitle,
} from '@components/Categories';
import Toast from '@components/Toast';

const CategoriesPageContainer = styled.div`
  position: relative;
`;

const GameItem = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
  border: 1px solid ${COLOR_MAIN};
  border-radius: 0.4rem;
  display: grid;
  overflow: hidden;
  grid-template-rows: repeat(2, 1fr);
`;

const CategoriesContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const MessageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1rem 0;
`;

function CategoriesPage() {
  const { user } = useValueContext();
  const { favorites } = useActionContext();
  const [userFavorites, setUserFavorites] = useState([]);
  const [channels] = useState(CHANNELS);
  const [images] = useState(IMAGES);
  const [toastState, setToastState] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleToastState = useCallback((message) => {
    setToastMessage(message);
    setToastState(true);
  }, []);

  useEffect(() => {
    if (toastState) {
      setTimeout(() => setToastState(false), 2000);
    }
  }, [toastState]);

  useEffect(() => {
    if (user && user.username) {
      setUserFavorites(JSON.parse(user.username));
    }
  }, [user]);

  const updateFavorites = useCallback(
    async (e, id, name) => {
      e.preventDefault();
      if (!user) {
        handleToastState('로그인 후 즐겨찾기를 할 수 있습니다.');
        return;
      }

      const likes = user.username ? JSON.parse(user.username) : [];

      if (likes.includes(id)) {
        handleToastState('이미 추가된 채널입니다.');
        return;
      }

      likes.push(id);
      likes.sort();
      setUserFavorites([...userFavorites, likes]);

      handleToastState(`즐겨찾기에 ${name} 채널을 추가합니다.`);

      const res = await authFetch('settings/update-user', {
        method: 'PUT',
        data: {
          fullName: user.fullName,
          username: JSON.stringify(likes),
        },
      });
      favorites(res);
    },
    [userFavorites, favorites, user, handleToastState]
  );

  const deleteFavorites = useCallback(
    async (e, id) => {
      e.preventDefault();

      const newFavorites = userFavorites.filter(
        (item) => item !== id && item !== ''
      );
      const favoritesData =
        newFavorites.length < 1
          ? JSON.stringify([])
          : JSON.stringify(newFavorites);

      setUserFavorites(newFavorites);

      handleToastState(`즐겨찾기에서 ${CATEGORIES[id]} 채널을 삭제합니다.`);

      const res = await authFetch('settings/update-user', {
        method: 'PUT',
        data: {
          username: favoritesData,
        },
      });
      favorites(res);
    },
    [userFavorites, favorites, handleToastState]
  );

  return (
    <CategoriesPageContainer>
      {toastState && (
        <Toast>
          <span>{toastMessage}</span>
        </Toast>
      )}
      <ContextProvider>
        <Header strong>즐겨찾기 목록</Header>
        <Divider />
        {userFavorites.length === 1 && userFavorites[0] === '' ? (
          <MessageContainer>
            <MessageTitle color={COLOR_MAIN} weight={400}>
              즐겨찾기를 등록해보세요.
            </MessageTitle>
          </MessageContainer>
        ) : (
          <CategoriesContainer>
            {userFavorites.map((item) => {
              if (item === '') return;
              return (
                <Link to={`/channel/${item}`} key={`${item}`}>
                  <GameItem>
                    <GameImage src={images[item]} />
                    <GameIcon onClick={(e) => deleteFavorites(e, item)}>
                      <StarBorderIcon fontSize="small" sx={{ color: 'blue' }} />
                    </GameIcon>
                  </GameItem>
                  <GameTitle
                    color={COLOR_SIGNATURE}
                    weight={700}
                  >{`${CATEGORIES[item]}`}</GameTitle>
                </Link>
              );
            })}
          </CategoriesContainer>
        )}
      </ContextProvider>
      <Header strong>게임 카테고리</Header>
      <Divider />
      <CategoriesContainer>
        {channels &&
          channels.map((channel) => {
            return (
              <Link to={`/channel/${channel.id}`} key={`${channel.id}`}>
                <GameItem>
                  <GameImage src={images[channel.id]} />
                  <GameIcon
                    onClick={(e) =>
                      updateFavorites(e, channel.id, channel.name)
                    }
                  >
                    <StarBorderIcon fontSize="small" sx={{ color: 'red' }} />
                  </GameIcon>
                </GameItem>
                <GameTitle
                  color={COLOR_SIGNATURE}
                  weight={700}
                >{`${channel.name}`}</GameTitle>
              </Link>
            );
          })}
      </CategoriesContainer>
    </CategoriesPageContainer>
  );
}

export default CategoriesPage;
