import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { COLOR_BG, COLOR_SIGNATURE } from '@utils/color';
import { Card } from '@mui/material';
import Divider from '@components/Divider';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useNavigate } from 'react-router-dom';
import TagList from '@components/TagChip/TagList';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';

const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 0.75rem;
`;

const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Title = styled.div`
  font-size: 1rem;
`;

const CardContainer = styled(Card)`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  padding: 1rem;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  background-color: ${COLOR_BG};
`;

const TagSpan = styled.span`
  margin-left: 0.5rem;
  color: ${COLOR_SIGNATURE};
`;

const TagListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
  & .MuiList-root {
    padding: 0.25rem;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  gap: 0.25rem;
`;
function ChannelPostCard({
  title,
  tag,
  updatedAt,
  fullName,
  numberOfLike,
  isLiked,
  numberOfComment,
  postId,
}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/posts/details/${postId}`);
  };

  return (
    <CardContainer onClick={handleClick}>
      <Title>{title}</Title>
      <InfoWrapper>
        {fullName}
        <Divider type="vertical" />
        {updatedAt.slice(0, 10)}
      </InfoWrapper>
      <FooterContainer>
        <TagListWrapper>
          <TagList tags={tag.slice(0, 3)} simple />
          {tag.length > 3 && <TagSpan>+{tag.length - 3}</TagSpan>}
        </TagListWrapper>
        <IconContainer>
          <CommentRoundedIcon fontSize="small" />
          {numberOfComment}
        </IconContainer>
        <IconContainer>
          {isLiked ? (
            <FavoriteRoundedIcon fontSize="small" color="error" />
          ) : (
            <FavoriteBorderRoundedIcon fontSize="small" color="error" />
          )}
          {numberOfLike}
        </IconContainer>
      </FooterContainer>
    </CardContainer>
  );
}

ChannelPostCard.propTypes = {
  title: PropTypes.string.isRequired,
  tag: PropTypes.array.isRequired,
  updatedAt: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  postId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  numberOfLike: PropTypes.number,
  isLiked: PropTypes.bool,
  numberOfComment: PropTypes.number,
};

ChannelPostCard.defaultProps = {
  numberOfLike: 0,
  isLiked: false,
  numberOfComment: 0,
};

export default ChannelPostCard;
