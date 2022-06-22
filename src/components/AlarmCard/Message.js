import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { convertDate } from '@utils/time';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import { COLOR_MAIN } from '@utils/color';
import { Link, useNavigate } from 'react-router-dom';

const Container = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 3rem 1fr;
  margin: 1rem 0;
  padding-top: 1rem;
  border-top: 0.0125rem solid rgba(0, 0, 0, 0.3);
  align-items: center;
  gap: 0.5rem;
  &.MuiPaper-root {
    width: 100%;
  }
`;
const IconWrapper = styled.div`
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  & .MuiSvgIcon-root {
    color: ${COLOR_MAIN};
  }
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  & > div {
    line-height: 1.2;
  }
`;
const LinkWrapper = styled.div`
  & a {
    color: rgb(25, 118, 210);
  }
`;

const DateWrapper = styled.p`
  font-size: 0.75rem;
  color: ${COLOR_MAIN};
`;
function Message({ authorName, authorId, date }) {
  const navigate = useNavigate();
  const handleClick = useCallback((e) => {
    e.stopPropagation();
  }, []);
  return (
    <Container
      variant="outlined"
      onClick={() => navigate(`/message/${authorId}`)}
    >
      <IconWrapper>
        <EmailRoundedIcon />
      </IconWrapper>
      <ContentContainer>
        <LinkWrapper>
          <Link to={`/profile/${authorId}`} onClick={handleClick}>
            {authorName}
          </Link>{' '}
          님이 메시지를 남겼습니다.
        </LinkWrapper>
        <DateWrapper>{convertDate(date)}</DateWrapper>
      </ContentContainer>
    </Container>
  );
}

Message.propTypes = {
  authorName: PropTypes.string.isRequired,
  authorId: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default Message;
