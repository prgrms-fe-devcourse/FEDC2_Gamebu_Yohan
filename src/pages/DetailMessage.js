import React, { useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getDetailMessage, postMessage } from '@utils/message';
import useValueContext from '@hooks/useValueContext';
import useInterval from '@hooks/useInterval';

function DetailMessage() {
  const [messageList, setMessageList] = useState([]);
  const inputRef = useRef();
  const { user } = useValueContext();
  const { userId } = useParams();

  const handleClickGetMessageButton = useCallback(() => {
    console.log(456);
    getDetailMessage(userId).then((response) => setMessageList(response));
  }, [userId]);

  const keepInterval = useInterval(handleClickGetMessageButton, 1500);

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    postMessage({
      method: 'POST',
      data: {
        message: inputRef.current.value,
        receiver: userId,
      },
    });
    inputRef.current.value = '';
    keepInterval();
  };

  return (
    <div>
      <div>DetailMessage</div>
      <button type="button" onClick={handleClickGetMessageButton}>
        get message
      </button>
      {messageList.length &&
        user &&
        messageList.map((messageOne) => {
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
      <form onSubmit={handleSubmitMessage}>
        <input ref={inputRef} />
        <button type="submit">전송</button>
      </form>
    </div>
  );
}

export default DetailMessage;
