import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Divider from '@components/Divider';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { convertDate } from '@utils/time';

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const TitleWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  & > div {
    line-height: normal;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
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
const AccountIcon = styled(AccountBoxIcon)`
  fill: gray;
  font-size: 1.5rem;
  cursor: pointer;
`;
function Post({ children }) {
  const { title, updatedAt, comments, likes } = children;
  const { dt: postTitle } = JSON.parse(title);
  return (
    <Container>
      <TitleWrapper>{postTitle || title}</TitleWrapper>
      <InfoWrapper>
        <AccountIcon />
        <div style={{ flexGrow: 1 }}>{convertDate(updatedAt)}</div>
        <IconWrapper>
          <CommentIcon />
          <div>{comments.length}</div>
        </IconWrapper>
        <Divider type="vertical" size={4} />
        <IconWrapper>
          <FavoriteRoundedIcon />
          <div>{likes.length}</div>
        </IconWrapper>
      </InfoWrapper>
    </Container>
  );
}

Post.propTypes = {
  children: PropTypes.shape({
    title: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    likes: PropTypes.array.isRequired,
  }),
};

Post.defaultProps = {
  children: null,
};

export default Post;
