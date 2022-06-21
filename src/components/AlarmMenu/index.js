import styled from '@emotion/styled';
import useValueContext from '@hooks/useValueContext';
import { Button } from '@mui/material';
import { seenNotificationAll } from '@utils/alarm';
import { COLOR_SIGNATURE } from '@utils/color';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 3fr 1fr;
  align-items: center;
  justify-items: center;
  padding: 0.5rem 1rem;

  & > button {
    justify-self: end;
  }

  & > a {
    display: block;
    justify-self: stretch;
    & > button {
      width: 100%;
    }
  }
`;
const LinkButton = styled(Button)`
  font-weight: 700;
  font-family: inherit;
  &.MuiButton-root {
    background-color: ${COLOR_SIGNATURE};
  }
  &.MuiButton-root:hover {
    background-color: ${COLOR_SIGNATURE};
  }
`;

function AlarmMenu() {
  const { user } = useValueContext();
  const notifications = useMemo(() => {
    if (!user) return [];
    return user.notifications;
  }, [user]);
  return (
    <Container>
      <LinkButton
        size="small"
        variant="contained"
        onClick={() => seenNotificationAll()}
      >
        모두 읽음
      </LinkButton>
      {notifications.length === 0 ? (
        <p>모든 알림을 확인했습니다.</p>
      ) : (
        <p>{notifications.length}개의 알림이 있습니다.</p>
      )}
      <Link to="/alarm">
        <LinkButton size="small" variant="contained">
          전체 알림 보기
        </LinkButton>
      </Link>
    </Container>
  );
}

export default AlarmMenu;
