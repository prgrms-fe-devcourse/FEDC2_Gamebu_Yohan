import React from 'react';
import styled from '@emotion/styled';
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
  border: 1px solid blue;
  gap: 1rem;
`;

const STYLED_IMG = styled.img`
  min-width: 100%;
  max-width: 100%;
  height: 100px;
`;

function CategoriesPage() {
  return (
    <>
      <div>CategoriesPage</div>
      <CATEGORIES_CONTAINER>
        <GAME_ITEM>
          <STYLED_IMG src={maple} />
          <span>title here</span>
        </GAME_ITEM>
        <GAME_ITEM>
          <STYLED_IMG src={lol} />
          <span>title here</span>
        </GAME_ITEM>
        <GAME_ITEM>
          <STYLED_IMG src={lostark} />
          <span>title here</span>
        </GAME_ITEM>
        <GAME_ITEM>
          <STYLED_IMG src={overwatch} />
          <span>title here</span>
        </GAME_ITEM>
        <GAME_ITEM>
          <STYLED_IMG src={battleground} />
          <span>title here</span>
        </GAME_ITEM>
      </CATEGORIES_CONTAINER>
    </>
  );
}

export default CategoriesPage;
