import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { getMyMessageList } from '@utils/message';
import useValueContext from '@hooks/useValueContext';
import { useNavigate } from 'react-router-dom';
import useInterval from '@hooks/useInterval';
import Card from '@components/Card';
import SkeletonMessage from '@components/SkeletonMessage';
import useCheckAuth from '@hooks/useCheckAuth';
import useCookieToken from '@hooks/useCookieToken';
import { GAMEBU_TOKEN } from '@utils/constants';

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
`;

function MessagePage() {
  const [myMessageList, setMyMessageList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useValueContext();
  const [token] = useCookieToken(GAMEBU_TOKEN);
  const navigate = useNavigate();
  useCheckAuth();

  const handleClickGetMessageButton = useCallback(() => {
    if (token) {
      getMyMessageList().then((response) => {
        setMyMessageList(response);
        setLoading(false);
      });
    }
  }, [token]);

  useInterval(handleClickGetMessageButton, 3000);

  const Loaded =
    myMessageList.length && user
      ? myMessageList.map(({ message, receiver, sender }) => {
          const you = receiver._id !== user._id ? receiver : sender;
          const { _id } = you;
          return (
            <Card.User key={_id} onClick={() => navigate(`/message/${_id}`)}>
              {{ ...you, email: message }}
            </Card.User>
          );
        })
      : '아직 대화한 상대가 없어요';

  return (
    <div>
      <Title>메시지 목록</Title>
      {loading ? <SkeletonMessage.Card repeat={5} /> : Loaded}
    </div>
  );
}

export default MessagePage;
