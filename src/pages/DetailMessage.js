import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDetailMessage } from '@utils/message';
import useValueContext from '@hooks/useValueContext';

function DetailMessage() {
  const [messageList, setMessageList] = useState([]);
  const { user } = useValueContext();
  const { userId } = useParams();

  const handleClickGetMessageButton = () => {
    getDetailMessage(userId).then((response) => setMessageList(response));
  };

  return (
    <div>
      <div>DetailMessage</div>
      <button type="button" onClick={handleClickGetMessageButton}>
        get message
      </button>
      {messageList.map((messageOne) => {
        const { message, seen, sender, _id } = messageOne;
        const isMe = sender._id === user._id;

        return (
          <div
            key={_id}
            style={{
              marginTop: '5px',
              marginBottom: '5px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: isMe ? 'flex-end' : 'flex-start',
            }}
          >
            <div>내용: {message}</div>
            <div>읽었나?: {seen ? 'O' : 'X'}</div>
          </div>
        );
      })}
    </div>
  );
}

export default DetailMessage;
