import React from 'react';
import styled from '@emotion/styled';
import { COLOR_SIGNATURE } from '@utils/color';
import Header from '@components/Header';
import Divider from '@components/Divider';
import maple from '../assets/img/maple.png';
import lol from '../assets/img/lol.png';
import lostark from '../assets/img/lostark.png';
import overwatch from '../assets/img/overwatch.png';
import battleground from '../assets/img/battleground.png';

const GAME_ITEM = styled.div`
  width: 100%;
  height: 100px;
  border: 1px solid black;
  display: grid;
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
  return (
    <>
      <Header strong>게임 카테고리</Header>
      <Divider />
      <CATEGORIES_CONTAINER>
        <GAME_ITEM>
          <STYLED_IMG src={maple} />
          <GAME_TITLE>메이플스토리</GAME_TITLE>
        </GAME_ITEM>
        <GAME_ITEM>
          <STYLED_IMG src={lol} />
          <GAME_TITLE>리그오브레전드</GAME_TITLE>
        </GAME_ITEM>
        <GAME_ITEM>
          <STYLED_IMG src={lostark} />
          <GAME_TITLE>로스트아크</GAME_TITLE>
        </GAME_ITEM>
        <GAME_ITEM>
          <STYLED_IMG src={overwatch} />
          <GAME_TITLE>오버워치</GAME_TITLE>
        </GAME_ITEM>
        <GAME_ITEM>
          <STYLED_IMG src={battleground} />
          <GAME_TITLE>배틀그라운드</GAME_TITLE>
        </GAME_ITEM>
      </CATEGORIES_CONTAINER>
      <Header strong>즐겨찾기 목록</Header>
      {/* TODO : 즐겨찾기 기능 작성 후 기능 추가 */}
      <Divider />
    </>
  );
}

export default CategoriesPage;
