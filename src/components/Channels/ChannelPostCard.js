import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import styled from '@emotion/styled';
import { COLOR_MAIN } from '@utils/color';
import { Card } from '@mui/material';
import Divider from '@components/Divider';
import Tag from '@components/Tag';

const HeaderAndButton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const UserNameAndDate = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 0.75rem;
`;

const TagAndHeart = styled.div`
  margin-top: 0.3rem;
  display: flex;
  justify-content: 'flex-start';
  align-items: center;
`;

const Title = styled.div`
  font-size: 1rem;
`;

const ApplicaitonButton = styled.div`
  width: 4rem;
  height: 1.2rem;
  background-color: ${(props) => (props.isClick ? '#3f51b5' : '#e91e63')};
  color: #eee;
  font-size: 0.75rem;
  text-align: center;
  border-radius: 0.3rem;
  vertical-align: middle;
  line-height: 1.2rem;
`;

const CardContainer = styled(Card)`
  box-sizing: border-box;
  background-color: ${COLOR_MAIN};
  width: 100%;
  height: 5rem;
  margin-bottom: 0.5rem;
  padding: 1rem 1rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TagSpan = styled.span`
  margin-left: 0.5rem;
`;

const TagDummy = [
  'AD',
  '솔로랭크',
  '자유랭크',
  '파티모집',
  '레이드함께',
  '추가태그칸',
];

const TagColor = ['#c51162', '#26a69a', '#29b6f6', '#aed581'];

function ChannelPostCard({ title, createdAt, fullName, _id }) {
  const [buttonIsClicked, setButtonIsClicked] = useState(false);
  useEffect(() => {
    console.log(title);
  }, []);

  const applicationButtonClick = (e) => {
    e.stopPropagation();
    console.log('buttonClick');
    setButtonIsClicked(!buttonIsClicked);
  };

  const postClick = () => {
    console.log('postClick!');
  };
  return (
    <CardContainer onClick={postClick}>
      <HeaderAndButton>
        <Title>{title}</Title>
        <ApplicaitonButton
          onClick={applicationButtonClick}
          isClick={buttonIsClicked}
        >
          {buttonIsClicked ? '신청완료' : '신청하기'}
        </ApplicaitonButton>
      </HeaderAndButton>
      <UserNameAndDate>
        {fullName}
        <Divider type="vertical" />
        {createdAt.slice(0, 10)}
      </UserNameAndDate>
      <TagAndHeart>
        {TagDummy.slice(0, 4).map((item, index) => (
          <Tag backgroundColor={TagColor[index]} content={item} key={item} />
        ))}
        {TagDummy.length > 4 ? (
          <TagSpan style={{ marginLeft: '0.5rem' }}>...</TagSpan>
        ) : null}
      </TagAndHeart>
    </CardContainer>
  );
}

ChannelPostCard.propTypes = {
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
};

export default ChannelPostCard;
