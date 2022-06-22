import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import {
  getDetailMessage,
  postMessage,
  postMessageNotification,
} from '@utils/message';
import useValueContext from '@hooks/useValueContext';
import useInterval from '@hooks/useInterval';
import useCheckAuth from '@hooks/useCheckAuth';
import useCookieToken from '@hooks/useCookieToken';
import { GAMEBU_TOKEN } from '@utils/constants';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import GoBack from '@components/GoBack';
import SkeletonMessage from '@components/SkeletonMessage';
import { getUserInfo } from '@utils/user';

const MessageContainer = styled.div`
  & {
    --rad: 20px;
    --rad-sm: 3px;
    font: 16px/1.5 sans-serif;
    box-sizing: border-box;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding: 0 2rem;
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
  grid-template-rows: 3rem 1fr 3rem;
`;

const GoBackWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 1rem 1rem 0 1rem;
`;

const Title = styled.h1`
  text-align: center;
  flex-grow: 1;
`;

const FitDiv = styled.div`
  width: fit-content;
`;

const Time = styled.div`
  text-align: ${({ isMe }) => (isMe ? 'end' : 'start')};
  font-size: 0.75rem;
`;

const Form = styled.form`
  display: flex;
  padding: 0 2rem 0.5rem 2rem;
  gap: 1rem;
`;

const BottomDiv = styled.div`
  height: 1rem;
`;

function DetailMessage() {
  const [loading, setLoading] = useState(true);
  const [messageList, setMessageList] = useState([]);
  const [you, setYou] = useState(null);
  const [bottomDivVisible, setBottomDivVisible] = useState(true);
  const inputRef = useRef();
  const bottomRef = useRef();
  const { user } = useValueContext();
  const { userId } = useParams();
  const [token] = useCookieToken(GAMEBU_TOKEN);
  useCheckAuth();

  const handleClickGetMessageButton = useCallback(() => {
    if (token) {
      getDetailMessage(userId).then((response) => {
        setMessageList(response);
        setLoading(false);
        setBottomDivVisible(false);
      });
    }
  }, [userId, token]);

  const keepInterval = useInterval(handleClickGetMessageButton, 1500);

  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    const input = inputRef.current.querySelector('input');
    const response = await postMessage({
      method: 'POST',
      data: {
        message: input.value,
        receiver: userId,
      },
    });
    await postMessageNotification(response?._id, userId);
    setBottomDivVisible(true);
    input.value = '';
    keepInterval();
  };

  const Loaded =
    messageList.length && user ? (
      messageList.map(({ message, sender, _id, createdAt }) => {
        const isMe = sender._id === user._id;
        return (
          <span key={_id}>
            <Time isMe={isMe}>{createdAt.slice(0, 16).replace('T', ' ')}</Time>
            <FitDiv className={`msg ${isMe ? 'sent' : 'rcvd'}`}>
              {message}
            </FitDiv>
          </span>
        );
      })
    ) : (
      <div>아직 대화가 없어요</div>
    );

  useEffect(() => {
    getUserInfo(userId).then((response) => setYou(response));
  }, [userId]);

  useEffect(() => {
    if (bottomDivVisible) {
      bottomRef.current.scrollIntoView();
    }
  }, [bottomDivVisible]);

  return (
    <Container>
      <GoBackWrapper>
        <GoBack destination="message" />
        <Title>{you?.fullName} 채팅방</Title>
      </GoBackWrapper>
      <MessageContainer className="chat">
        {loading ? <SkeletonMessage.Detail repeat={16} /> : Loaded}
        {bottomDivVisible && <BottomDiv>&nbsp;</BottomDiv>}
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
