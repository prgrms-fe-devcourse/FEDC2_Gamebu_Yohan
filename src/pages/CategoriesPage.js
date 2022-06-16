import React, { useEffect, useState } from 'react';
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
import useAsync from '@hooks/useAsync';
import { authFetch } from '@utils/fetch';

const GAME_ITEM = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
  border: 1px solid ${COLOR_MAIN};
  border-radius: 0.4rem;
  display: grid;
  overflow: hidden;
  grid-template-rows: repeat(2, 1fr);
`;

const CATEGORIES_CONTAINER = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const STYLED_IMG = styled.img`
  min-width: 100%;
  max-width: 100%;
  height: 100px;
`;

const ICON_WRAPPER = styled.div`
  position: absolute;
  z-index: 1000;
  top: 0;
  right: 0;
`;

const GAME_TITLE = styled.div`
  text-align: center;
  font-size: 0.75rem;
  font-weight: 700;
  color: ${COLOR_SIGNATURE};
  margin-top: 0.1rem;
`;

function CategoriesPage() {
  let { user } = useValueContext();
  const [channels] = useState(CHANNELS);
  const [images] = useState([maple, lol, battleground, lostark, overwatch]);

  const test = async (e, id, name) => {
    e.preventDefault();
    let likes = [];
    if (user.username) {
      likes = JSON.parse(user.username);
    }

    likes.push(id);

    alert(`즐겨찾기에 ${name} 채널을 추가하시겠습니까?`);

    const res = await authFetch('settings/update-user', {
      method: 'PUT',
      data: {
        fullName: user.fullName,
        username: JSON.stringify(likes),
      },
    });
    user = res;
  };

  return (
    <>
      <ContextProvider>
        {/* <div>ContextProvider : {user && user.username}</div> */}
        {/* <div>
          ContextProvider :{' '}
          {stars &&
            stars.map((item) => {
              return CATEGORIES[item];
            })}
        </div> */}
        {console.log(user)}
      </ContextProvider>
      <Header strong>게임 카테고리</Header>
      <Divider />
      <CATEGORIES_CONTAINER>
        {channels &&
          channels.map((channel, index) => {
            return (
              <Link to={`/channel/${channel.id}`} key={`${channel.id}`}>
                <GAME_ITEM>
                  <STYLED_IMG src={images[index]} />
                  <ICON_WRAPPER
                    onClick={(e) => test(e, channel.id, channel.name)}
                  >
                    <StarBorderIcon fontSize="small" sx={{ color: 'red' }} />
                  </ICON_WRAPPER>
                </GAME_ITEM>
                <GAME_TITLE>{`${channel.name}`}</GAME_TITLE>
              </Link>
            );
          })}
      </CATEGORIES_CONTAINER>
      <Header strong>즐겨찾기 목록</Header>
      {/* TODO : 즐겨찾기 기능 작성 후 기능 추가 */}
      <Divider />
    </>
  );
}

export default CategoriesPage;
