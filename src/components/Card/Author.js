import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { COLOR_BG } from '@utils/color';
import CommentIcon from '@mui/icons-material/Comment';
import Thumbnail from '@components/Thumbnail';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TagList from '@components/TagChip/TagList';

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: 1fr 4fr;
  align-items: center;
  gap: 2px 8px;
  background-color: ${COLOR_BG};
  color: #444;
`;

const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-row: span 3;
`;

const Title = styled.div`
  font-size: 1rem;
`;

const TinyText = styled.div`
  font-size: 12px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  & .MuiSvgIcon-root {
    fill: gray;
    font-size: 1rem;
  }
`;

const InfoWrapper = styled.div`
  font-size: 12px;
  display: flex;
  justify-content: space-between;
`;

const convertDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

function Author({ data, badge, icon, ...props }) {
  const { author, title, createdAt, comments, likes, tag } = data;
  const { fullName, isOnline } = author;

  return (
    <Container {...props}>
      <AvatarWrapper>
        <Thumbnail name={fullName} isOnline={isOnline} badge={badge} />
        <TinyText>{fullName}</TinyText>
      </AvatarWrapper>
      <Title> {title}</Title>
      <TagList tags={tag} />
      <InfoWrapper>
        <TinyText>작성 {convertDate(createdAt)}</TinyText>
        {icon && (
          <IconWrapper>
            <CommentIcon />
            {comments.length}
            <FavoriteIcon />
            {likes.length}
          </IconWrapper>
        )}
      </InfoWrapper>
    </Container>
  );
}

Author.propTypes = {
  data: PropTypes.shape({
    author: PropTypes.shape({
      email: PropTypes.string.isRequired,
      fullName: PropTypes.string.isRequired,
      isOnline: PropTypes.bool.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    comments: PropTypes.array,
    likes: PropTypes.array,
    tag: PropTypes.array,
  }).isRequired,
  badge: PropTypes.bool,
  icon: PropTypes.bool,
};

Author.defaultProps = {
  badge: false,
  icon: false,
};

export default Author;
