import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { COLOR_MAIN, COLOR_SIGNATURE } from '@utils/color';
import Header from '@components/Header';
import Divider from '@components/Divider';
import { CHANNELS } from '@utils/constants';
import maple from '../assets/img/maple.png';
import lol from '../assets/img/lol.png';
import lostark from '../assets/img/lostark.png';
import overwatch from '../assets/img/overwatch.png';
import battleground from '../assets/img/battleground.png';

const GAME_ITEM = styled.div`
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

const GAME_TITLE = styled.div`
  text-align: center;
  font-size: 0.75rem;
  font-weight: 700;
  color: ${COLOR_SIGNATURE};
  margin-top: 0.1rem;
`;

function CategoriesPage() {
  const [channels] = useState(CHANNELS);
  const [images] = useState([maple, lol, battleground, lostark, overwatch]);

  return (
    <>
      <Header strong>게임 카테고리</Header>
      <Divider />
      <CATEGORIES_CONTAINER>
        {channels &&
          channels.map((channel, index) => {
            return (
              <Link to={`/channel/${channel.id}`} key={`${channel.id}`}>
                <GAME_ITEM>
                  <STYLED_IMG src={images[index]} />
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
