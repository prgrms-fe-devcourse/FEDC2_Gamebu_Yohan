import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import styled from '@emotion/styled';
import { COLOR_MAIN } from '@utils/color';
import { Card } from '@mui/material';
import Divider from '@components/Divider';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { authFetch } from '@utils/fetch';
import { useNavigate } from 'react-router-dom';
import TagList from '@components/TagChip/TagList';

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

const Footer = styled.div`
  display: flex;
  justify-content: space-around;
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
  position: relative;
`;

const TagSpan = styled.span`
  margin-left: 0.5rem;
  color: #8e24aa;
`;

const HeartIconButton = styled(IconButton)``;

const TagPartContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  height: 2rem;
`;

const LikeButtonContainer = styled.div`
  height: 2rem;
  display: flex;
  align-items: center;
`;

export const TagColor = ['#c51162', '#26a69a', '#29b6f6', '#aed581'];

function Header({ title, onClick, isClicked }) {
  return (
    <HeaderAndButton>
      <Title>{title}</Title>
      <ApplicaitonButton onClick={onClick} isClick={isClicked}>
        {isClicked ? '신청완료' : '신청하기'}
      </ApplicaitonButton>
    </HeaderAndButton>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isClicked: PropTypes.bool.isRequired,
};

function UserInfo({ name, updateDate }) {
  return (
    <UserNameAndDate>
      {name}
      <Divider type="vertical" />
      {updateDate}
    </UserNameAndDate>
  );
}

UserInfo.propTypes = {
  name: PropTypes.string.isRequired,
  updateDate: PropTypes.string.isRequired,
};

function TagPart({ tag }) {
  return (
    <TagPartContainer>
      <TagList tags={tag.slice(0, 4)} simple />
      {tag.length > 4 ? <TagSpan>+{tag.length - 4}</TagSpan> : null}
    </TagPartContainer>
  );
}
TagPart.propTypes = {
  tag: PropTypes.array.isRequired,
};

function LikeButton({ onClick, isLiked, likeCount }) {
  return (
    <LikeButtonContainer>
      <HeartIconButton onClick={onClick}>
        {isLiked ? (
          <FavoriteIcon color="error" />
        ) : (
          <FavoriteBorderIcon color="error" />
        )}
      </HeartIconButton>
      {likeCount}
    </LikeButtonContainer>
  );
}
LikeButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likeCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
};

function ChannelPostCard({
  title,
  updatedAt,
  fullName,
  postId,
  likes,
  tag,
  channelId,
  comments,
  content,
  authorId,
  changeLikeCount,
}) {
  const [buttonIsClicked, setButtonIsClicked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const navigate = useNavigate();

  // TODO: 사용자 id를 가져와야함
  const userId = '629f07fa7e01ad1cb7250131';

  useEffect(() => {
    setLikeCount(likes.length);

    // 새로고침했을 때  내가 좋아요 눌러놓은 페이지 인지 확인
    const filteredLikes = likes.filter((item) => item.user === userId);
    if (filteredLikes.length > 0) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [likes]);

  const applicationButtonClick = (e) => {
    e.stopPropagation();
    setButtonIsClicked(!buttonIsClicked);
  };

  const toDetailInfo = {
    tag,
    title,
    fullName,
    comments,
    content,
    isLiked,
    postId,
    channelId,
    authorId,
    updatedAt,
    likes,
  };

  const postClick = () => {
    navigate(`/posts/details/${postId}`, {
      replace: false,
      state: toDetailInfo,
    });
  };

  const postNotification = async (res) => {
    await authFetch('notifications/create', {
      method: 'POST',
      data: {
        notificationType: 'LIKE',
        notificationTypeId: res._id,
        userId,
        postId: res.post,
      },
    });
  };

  const fetchLike = async (boolean) => {
    if (boolean) {
      // array.find를 통해서 사용자가 누른 좋아요 객체를 반환받고 객체의 id 값을 delete api body에 담아서 보낸다
      const data = likes.find((item) => item.user === userId);

      if (!data) return;
      const id = data._id;
      await authFetch('likes/delete', {
        method: 'DELETE',
        data: {
          id,
        },
      });

      changeLikeCount(false, postId);
    } else {
      const res = await authFetch('likes/create', {
        method: 'POST',
        data: {
          postId,
        },
      });

      postNotification(res);
      changeLikeCount(true, postId, res._id);
    }
  };

  const heartClick = (e) => {
    e.stopPropagation();
    if (isLiked) {
      fetchLike(isLiked);
      setLikeCount(likeCount - 1);
      // 불린값을 통해 좋아요 취소인지 좋아요 추가인지 구분
    } else {
      fetchLike(isLiked);
      setLikeCount(likeCount + 1);
    }
    // isLiked 가 true 면 좋아요취소 api 후 낙관적업데이트 : 좋아요 후 낙관적 업데이트
    setIsLiked(!isLiked);
  };

  return (
    <CardContainer onClick={postClick}>
      <Header
        title={title}
        onClick={applicationButtonClick}
        isClicked={buttonIsClicked}
      />
      <UserInfo name={fullName} updateDate={updatedAt.slice(0, 10)} />
      <Footer>
        <TagPart tag={tag} />
        <LikeButton
          onClick={heartClick}
          isLiked={isLiked}
          likeCount={likeCount}
        />
      </Footer>
    </CardContainer>
  );
}

ChannelPostCard.propTypes = {
  likes: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  tag: PropTypes.array.isRequired,
  updatedAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  postId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  authorId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  channelId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  comments: PropTypes.array.isRequired,
  changeLikeCount: PropTypes.func.isRequired,
};

export default ChannelPostCard;
