import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import ContextProvider from '@contexts/ContextProvider';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { COLOR_MAIN, COLOR_SIGNATURE } from '@utils/color';
import Header from '@components/Header';
import Divider from '@components/Divider';
import { CATEGORIES, CHANNELS } from '@utils/constants';
import maple from '@assets/img/maple.png';
import lol from '@assets/img/lol.png';
import lostark from '@assets/img/lostark.png';
import overwatch from '@assets/img/overwatch.png';
import battleground from '@assets/img/battleground.png';
import useValueContext from '@hooks/useValueContext';
import { authFetch } from '@utils/fetch';
import useActionContext from '@hooks/useActionContext';
import {
  GameIcon,
  GameImage,
  GameTitle,
  MessageTitle,
} from '@components/Categories';

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
  const [images] = useState({
    '62a7367f5517e27ffcab3bcb': maple,
    '62a736925517e27ffcab3bcf': lol,
    '62a736a15517e27ffcab3bd5': battleground,
    '62a818db5517e27ffcab3ce2': lostark,
    '62a818e85517e27ffcab3ce6': overwatch,
  });
  useEffect(() => {
    if (user && user.username) {
      setUserFavorites(JSON.parse(user.username));
    }
  }, [user]);
  const updateFavorites = useCallback(
    async (e, id, name) => {
      e.preventDefault();
      let likes = [];
      if (user.username) {
        likes = JSON.parse(user.username);
      }
      if (likes.includes(id)) {
        alert('이미 추가된 채널입니다.');
        // TODO : Toast 또는 다른 UI로직
        return;
      }
      likes.push(id);
      likes.sort();
      setUserFavorites([...userFavorites, likes]);
      alert(`즐겨찾기에 ${name} 채널을 추가`);
      const res = await authFetch('settings/update-user', {
        method: 'PUT',
        data: {
          fullName: user.fullName,
          username: JSON.stringify(likes),
        },
      });
      favorites(res);
    },
    [userFavorites, favorites, user]
  );
  const deleteFavorites = useCallback(
    async (e, id) => {
      e.preventDefault();
      alert(`즐겨찾기에서 ${CATEGORIES[id]} 채널을 삭제`);
      const newFavorites = userFavorites.filter((item) => item !== id);
      setUserFavorites(newFavorites);
      const res = await authFetch('settings/update-user', {
        method: 'PUT',
        data: {
          username: JSON.stringify(newFavorites),
        },
      });
      favorites(res);
    },
    [userFavorites, favorites]
  );
  return (
    <>
      <ContextProvider>
        <Header strong>즐겨찾기 목록</Header>
        <Divider />
        {userFavorites.length > 0 ? (
          <CategoriesContainer>
            {userFavorites.map((item) => {
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
        ) : (
          <MessageContainer>
            <MessageTitle color={COLOR_MAIN} weight={400}>
              즐겨찾기를 등록해보세요.
            </MessageTitle>
          </MessageContainer>
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
    </>
  );
}
export default CategoriesPage;
