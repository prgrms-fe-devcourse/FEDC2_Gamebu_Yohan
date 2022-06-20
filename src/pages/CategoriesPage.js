import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import ContextProvider from '@contexts/ContextProvider';
import Header from '@components/Header';
import Divider from '@components/Divider';
import useValueContext from '@hooks/useValueContext';
import useActionContext from '@hooks/useActionContext';
import { CATEGORIES, CHANNELS, IMAGES } from '@utils/constants';
import { authFetch } from '@utils/fetch';
import { MessageTitle } from '@components/Categories';
import { COLOR_MAIN } from '@utils/color';
import Toast from '@components/Toast';
import CategoriItem from '@components/CategoryItem';

const CategoriesPageContainer = styled.div`
  position: relative;
`;

const CategoriesContainer = styled.div`
  width: 100%;
  display: grid;
  grid-auto-rows: 1fr;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 1rem 0;
`;

const MessageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1rem 0;
`;

function CategoriesPage() {
  const { user, isLogin } = useValueContext();
  const { favorites } = useActionContext();
  const [userFavorites, setUserFavorites] = useState([]);
  const [toastState, setToastState] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const unlikes = useMemo(() => {
    if (!Array.isArray(CHANNELS)) return [];
    if (!Array.isArray(userFavorites)) return CHANNELS;
    return CHANNELS.filter((channel) => !userFavorites.includes(channel.id));
  }, [userFavorites]);
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

      const newFavorites = user.username ? JSON.parse(user.username) : [];
      newFavorites.push(id);
      newFavorites.sort();
      setUserFavorites(newFavorites);
      handleToastState(`즐겨찾기에 ${name} 채널을 추가합니다.`);

      const res = await authFetch('settings/update-user', {
        method: 'PUT',
        data: {
          fullName: user.fullName,
          username: JSON.stringify(newFavorites),
        },
      });
      favorites(res);
    },
    [favorites, user, handleToastState]
  );

  const deleteFavorites = useCallback(
    async (e, id) => {
      e.preventDefault();

      const newFavorites = userFavorites.filter((item) => item !== id);
      setUserFavorites(newFavorites);

      handleToastState(`즐겨찾기에서 ${CATEGORIES[id]} 채널을 삭제합니다.`);

      const res = await authFetch('settings/update-user', {
        method: 'PUT',
        data: {
          fullName: user.fullName,
          username: JSON.stringify(newFavorites),
        },
      });
      favorites(res);
    },
    [userFavorites, handleToastState, user, favorites]
  );

  return (
    <CategoriesPageContainer>
      {toastState && (
        <Toast>
          <span>{toastMessage}</span>
        </Toast>
      )}
      {isLogin && (
        <ContextProvider>
          <Header strong>즐겨찾기 목록</Header>
          <Divider />
          {userFavorites.length === 0 ? (
            <MessageContainer>
              <MessageTitle color={COLOR_MAIN} weight={400}>
                즐겨찾기를 등록해보세요.
              </MessageTitle>
            </MessageContainer>
          ) : (
            <CategoriesContainer>
              {userFavorites.map((item) => (
                <Link to={`/channel/${item}`} key={`${item}`}>
                  <CategoriItem
                    img={IMAGES[item]}
                    title={CATEGORIES[item]}
                    icon
                    onIconClick={(e) => deleteFavorites(e, item)}
                  />
                </Link>
              ))}
            </CategoriesContainer>
          )}
        </ContextProvider>
      )}
      <Header strong>게임 카테고리</Header>
      <Divider />
      {unlikes.length === 0 ? (
        <MessageContainer>
          <MessageTitle color={COLOR_MAIN} weight={400}>
            모든 게임을 좋아 하는군요!
            <br /> 다음 업데이트를 기다려주세요~
          </MessageTitle>
        </MessageContainer>
      ) : (
        <CategoriesContainer>
          {unlikes.map((channel) => {
            return (
              <Link to={`/channel/${channel.id}`} key={`${channel.id}`}>
                <CategoriItem
                  img={IMAGES[channel.id]}
                  title={channel.name}
                  icon={Boolean(user)}
                  onIconClick={(e) =>
                    updateFavorites(e, channel.id, channel.name)
                  }
                />
              </Link>
            );
          })}
        </CategoriesContainer>
      )}
    </CategoriesPageContainer>
  );
}

export default CategoriesPage;
