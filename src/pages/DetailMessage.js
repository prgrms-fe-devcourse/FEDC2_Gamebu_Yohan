import React, { useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getDetailMessage, postMessage } from '@utils/message';
import useValueContext from '@hooks/useValueContext';
import useInterval from '@hooks/useInterval';
import './DetailMessage.css';

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
    <>
      <div className="chat">
        {messageList.length &&
          user &&
          messageList.map(({ message, sender, _id }) => {
            const isMe = sender._id === user._id;
            return (
              <div key={_id} className={`msg ${isMe ? 'sent' : 'rcvd'}`}>
                {message}
              </div>
            );
          })}
      </div>
      <form onSubmit={handleSubmitMessage}>
        <input ref={inputRef} />
        <button type="submit">전송</button>
      </form>
    </>
  );
}

export default DetailMessage;
