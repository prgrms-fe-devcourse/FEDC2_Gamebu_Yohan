import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import Header from '@components/Header';
import Divider from '@components/Divider';
import useValueContext from '@hooks/useValueContext';
import useActionContext from '@hooks/useActionContext';
import { CATEGORIES, CHANNELS, IMAGES } from '@utils/constants';
import { authFetch } from '@utils/fetch';
import { MessageTitle } from '@components/Categories';
import { COLOR_MAIN } from '@utils/color';
import CategoryItem from '@components/CategoryItem';
import useOurSnackbar from '@hooks/useOurSnackbar';

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
  const renderSnackbar = useOurSnackbar();

  const unlikes = useMemo(() => {
    if (!Array.isArray(CHANNELS)) return [];
    if (!Array.isArray(userFavorites)) return CHANNELS;
    return CHANNELS.filter((channel) => !userFavorites.includes(channel.id));
  }, [userFavorites]);

  useEffect(() => {
    if (user && user.username) {
      setUserFavorites(JSON.parse(user.username));
    } else {
      setUserFavorites([]);
    }
  }, [user]);

  const updateFavorites = useCallback(
    async (e, id, name) => {
      e.preventDefault();

      const newFavorites = user.username ? JSON.parse(user.username) : [];
      newFavorites.push(id);
      newFavorites.sort();
      setUserFavorites(newFavorites);

      const res = await authFetch('settings/update-user', {
        method: 'PUT',
        data: {
          fullName: user.fullName,
          username: JSON.stringify(newFavorites),
        },
      });

      let isSuccess = false;
      if (res) isSuccess = true;
      renderSnackbar(`${name} ????????? ???????????? ??????`, isSuccess);

      favorites(res);
    },
    [favorites, user, renderSnackbar]
  );

  const deleteFavorites = useCallback(
    async (e, id) => {
      e.preventDefault();

      const newFavorites = userFavorites.filter((item) => item !== id);
      setUserFavorites(newFavorites);

      const res = await authFetch('settings/update-user', {
        method: 'PUT',
        data: {
          fullName: user.fullName,
          username: JSON.stringify(newFavorites),
        },
      });

      let isSuccess = false;
      if (res) isSuccess = true;
      renderSnackbar(`${CATEGORIES[id]} ????????? ???????????? ??????`, isSuccess);

      favorites(res);
    },
    [userFavorites, renderSnackbar, user, favorites]
  );

  return (
    <CategoriesPageContainer>
      {isLogin && (
        <div>
          <Header strong>???????????? ??????</Header>
          <Divider />
          {userFavorites.length === 0 ? (
            <MessageContainer>
              <MessageTitle color={COLOR_MAIN} weight={400}>
                ??????????????? ??????????????????.
              </MessageTitle>
            </MessageContainer>
          ) : (
            <CategoriesContainer>
              {userFavorites.map((item) => (
                <Link to={`/channel/${item}`} key={`${item}`}>
                  <CategoryItem
                    likes
                    img={IMAGES[item]}
                    title={CATEGORIES[item]}
                    icon
                    onIconClick={(e) => deleteFavorites(e, item)}
                  />
                </Link>
              ))}
            </CategoriesContainer>
          )}
        </div>
      )}
      <Header strong>?????? ????????????</Header>
      <Divider />
      {unlikes.length === 0 ? (
        <MessageContainer>
          <MessageTitle color={COLOR_MAIN} weight={400}>
            ?????? ????????? ?????? ????????????!
            <br /> ?????? ??????????????? ??????????????????~
          </MessageTitle>
        </MessageContainer>
      ) : (
        <CategoriesContainer>
          {unlikes.map((channel) => {
            return (
              <Link to={`/channel/${channel.id}`} key={`${channel.id}`}>
                <CategoryItem
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
