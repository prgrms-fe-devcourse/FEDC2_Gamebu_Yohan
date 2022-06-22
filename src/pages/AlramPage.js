import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useCheckAuth from '@hooks/useCheckAuth';
import styled from '@emotion/styled';
import { fetchNotifications, seenNotificationAll } from '@utils/alarm';
import AlarmCard from '@components/AlarmCard';
import Header from '@components/Header';

const Container = styled.div``;

function AlramPage() {
  useCheckAuth();
  const [notifications, setNotifications] = useState(null);

  const uncheckedList = useMemo(() => {
    if (!notifications) return [];
    return notifications.filter((item) => !item.seen);
  }, [notifications]);

  const checkedList = useMemo(() => {
    if (!notifications) return [];
    return notifications.filter((item) => item.seen);
  }, [notifications]);

  const updateNotifications = async () => {
    const response = await fetchNotifications();
    Array.isArray(response) &&
      setNotifications(
        response.filter(
          ({ like, comment, message }) => like || comment || message
        )
      );
  };

  const initPage = useCallback(async () => {
    await updateNotifications();
    await seenNotificationAll();
  }, []);

  useEffect(() => {
    initPage();
  }, [initPage]);

  return (
    <Container>
      {uncheckedList.length !== 0 && <Header level={1}>새 알림</Header>}
      <>
        {uncheckedList.map((item) => (
          <AlarmCard notification={item} key={item._id} />
        ))}
      </>
      {checkedList.length !== 0 && <Header level={1}>지난 알림</Header>}
      <>
        {checkedList.map((item) => (
          <AlarmCard notification={item} key={item._id} />
        ))}
      </>
    </Container>
  );
}
export default AlramPage;
