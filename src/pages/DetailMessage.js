import React, { useState, useRef, useCallback } from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { getDetailMessage, postMessage } from '@utils/message';
import useValueContext from '@hooks/useValueContext';
import useInterval from '@hooks/useInterval';

const MessageContainer = styled.div`
  & {
    --rad: 20px;
    --rad-sm: 3px;
    font: 16px/1.5 sans-serif;
    display: flex;
    flex-direction: column;
    padding: 20px;
    max-width: 500px;
    margin: auto;
  }

  .msg {
    position: relative;
    max-width: 75%;
    padding: 7px 15px;
    margin-bottom: 2px;
    word-wrap: break-word;
  }

  .msg.sent {
    border-radius: var(--rad) var(--rad-sm) var(--rad-sm) var(--rad);
    background: #42a5f5;
    color: #fff;
    margin-left: auto;
  }

  .msg.rcvd {
    border-radius: var(--rad-sm) var(--rad) var(--rad) var(--rad-sm);
    background: #f1f1f1;
    color: #555;
    margin-right: auto;
  }

  .msg.sent:first-of-type,
  .msg.rcvd + .msg.sent {
    border-top-right-radius: var(--rad);
  }

  .msg.rcvd:first-of-type,
  .msg.sent + .msg.rcvd {
    border-top-left-radius: var(--rad);
  }

  .msg::before {
    font-size: 0.8rem;
    position: absolute;
    bottom: 100%;
    color: #888;
    white-space: nowrap;
    display: none;
  }

  .msg.sent::before {
    right: 15px;
  }

  .msg.rcvd::before {
    left: 15px;
  }

  .msg:first-of-type::before,
  .msg.sent + .msg.rcvd::before,
  .msg.rcvd + .msg.sent::before {
    display: block;
  }
`;

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
      <MessageContainer className="chat">
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
      </MessageContainer>
      <form onSubmit={handleSubmitMessage}>
        <input ref={inputRef} />
        <button type="submit">전송</button>
      </form>
    </>
  );
}

export default DetailMessage;
