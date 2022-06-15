import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import styled from '@emotion/styled';
import { COLOR_BG, COLOR_MAIN } from '@utils/color';
import { Card } from '@mui/material';
import Divider from '@components/Divider';
import Tag from '@components/Tag';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { authFetch } from '@utils/fetch';

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
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1rem;
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

const HeartIconButton = styled(IconButton)`
  margin-left: 2rem;
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

function ChannelPostCard({ title, updatedAt, fullName, postId, likes, tag }) {
  const [buttonIsClicked, setButtonIsClicked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);

  // TODO: 사용자 id를 가져와야함
  const userId = '629f07fa7e01ad1cb7250131';

  useEffect(() => {
    setLikeCount(likes.length);
    const data = likes.find((item) => item.user === userId);

    if (data) {
      const id = data._id;
    }

    // 새로고침했을 때  내가 좋아요 눌러놓은 페이지 인지 확인
    const filteredLikes = likes.filter((item) => item.user === userId);
    if (filteredLikes.length > 0) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [likes, title]);

  const applicationButtonClick = (e) => {
    e.stopPropagation();
    console.log('buttonClick');
    setButtonIsClicked(!buttonIsClicked);
  };

  const postClick = () => {
    console.log(postId);
  };

  const fetchLike = async (boolean) => {
    if (boolean) {
      // array.find를 통해서 사용자가 누른 좋아요 객체를 반환받고 객체의 id 값을 delete api body에 담아서 보낸다
      const data = likes.find((item) => item.user === userId);
      console.log('data:', data);

      if (!data) return;

      const id = data._id;

      await authFetch('likes/delete', {
        method: 'DELETE',
        body: {
          id,
        },
      });
    } else {
      const res = await authFetch('likes/create', {
        method: 'POST',
        body: {
          postId,
        },
      });
      console.log(res);
    }
  };

  const heartClick = (e) => {
    e.stopPropagation();
    if (isLiked) {
      fetchLike(isLiked);
      setLikeCount(likeCount - 1);
    } else {
      fetchLike(isLiked);
      setLikeCount(likeCount + 1);
    }
    // isLiked 가 true 면 좋아요취소 api 후 낙관적업데이트 : 좋아요 후 낙관적 업데이트
    setIsLiked(!isLiked);
    console.log('heartClick');
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
        {updatedAt.slice(0, 10)}
      </UserNameAndDate>
      <TagAndHeart>
        {TagDummy.slice(0, 4).map((item, index) => (
          <Tag
            backgroundColor={TagColor[index]}
            content={item}
            key={item}
            style={{
              boxSizing: 'borderBox',
              borderRadius: '0.5rem',
              padding: '0.1rem 0.25rem',
              fontSize: '0.75rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#eee',
              marginLeft: '0.2rem',
              marginRight: 0,
            }}
          />
        ))}
        {TagDummy.length > 4 ? (
          <TagSpan style={{ marginLeft: '0.5rem' }}>...</TagSpan>
        ) : null}
        <HeartIconButton onClick={heartClick}>
          {isLiked ? (
            <FavoriteIcon color="error" />
          ) : (
            <FavoriteBorderIcon color="error" />
          )}
        </HeartIconButton>
        {likeCount}
      </TagAndHeart>
    </CardContainer>
  );
}

ChannelPostCard.propTypes = {
  likes: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  postId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default ChannelPostCard;
