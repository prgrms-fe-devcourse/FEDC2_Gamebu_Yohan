import React, { useState, useCallback } from 'react';
import { getMyMessageList } from '@utils/message';
import useValueContext from '@hooks/useValueContext';
import { useNavigate } from 'react-router-dom';
import useInterval from '@hooks/useInterval';
import Card from '@components/Card';

function MessagePage() {
  const [myMessageList, setMyMessageList] = useState([]);
  const { user } = useValueContext();
  const navigate = useNavigate();

  const handleClickGetMessageButton = useCallback(() => {
    console.log(123);
    getMyMessageList().then((response) => setMyMessageList(response));
  }, []);

  useInterval(handleClickGetMessageButton, 3000);

  return (
    <div>
      {myMessageList.length && user
        ? myMessageList.map(({ message, receiver, sender }) => {
            const you = receiver._id !== user._id ? receiver : sender;
            const { _id } = you;
            return (
              <Card.User key={_id} onClick={() => navigate(`/message/${_id}`)}>
                {{ ...you, email: message }}
              </Card.User>
            );
          })
        : '아직 대화한 상대가 없어요'}
    </div>
  );
}

export default MessagePage;
