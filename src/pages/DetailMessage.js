import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { getDetailMessage, postMessage } from '@utils/message';
import useValueContext from '@hooks/useValueContext';
import useInterval from '@hooks/useInterval';
import useCheckAuth from '@hooks/useCheckAuth';
import useCookieToken from '@hooks/useCookieToken';
import { GAMEBU_TOKEN } from '@utils/constants';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';

const MessageContainer = styled.div`
  & {
    --rad: 20px;
    --rad-sm: 3px;
    font: 16px/1.5 sans-serif;
    box-sizing: border-box;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    max-width: 500px;
    width: 100%;
    height: calc(100% - 2rem);
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

const Container = styled.div`
  box-sizing: border-box;
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 3rem;
`;

const Form = styled.form`
  display: flex;
  padding: 0 2rem 0.5rem 2rem;
  gap: 1rem;
`;

const BottomDiv = styled.div`
  height: 1px;
`;

function DetailMessage() {
  const [messageList, setMessageList] = useState([]);
  const inputRef = useRef();
  const bottomRef = useRef();
  const { user } = useValueContext();
  const { userId } = useParams();
  const [token] = useCookieToken(GAMEBU_TOKEN);
  useCheckAuth();

  const handleClickGetMessageButton = useCallback(() => {
    if (token) {
      console.log(456);
      getDetailMessage(userId).then((response) => setMessageList(response));
    }
  }, [userId, token]);

  const keepInterval = useInterval(handleClickGetMessageButton, 1500);

  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    const input = inputRef.current.querySelector('input');
    await postMessage({
      method: 'POST',
      data: {
        message: input.value,
        receiver: userId,
      },
    });
    input.value = '';
    keepInterval();
    bottomRef.current.scrollIntoView();
  };

  useEffect(() => {
    setTimeout(() => {
      bottomRef.current.scrollIntoView();
    }, 100);
  }, []);

  return (
    <Container>
      <MessageContainer className="chat">
        {messageList.length && user
          ? messageList.map(({ message, sender, _id }) => {
              const isMe = sender._id === user._id;
              return (
                <div key={_id} className={`msg ${isMe ? 'sent' : 'rcvd'}`}>
                  {message}
                </div>
              );
            })
          : '아직 대화가 없어요'}
        <BottomDiv ref={bottomRef}>&nbsp;</BottomDiv>
      </MessageContainer>
      <Form onSubmit={handleSubmitMessage}>
        <Input ref={inputRef} fullWidth />
        <Button type="submit" variant="outlined">
          전송
        </Button>
      </Form>
    </Container>
  );
}

export default DetailMessage;