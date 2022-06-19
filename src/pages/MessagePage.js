import React, { useState, useCallback } from 'react';
import { getMyMessageList } from '@utils/message';
import useValueContext from '@hooks/useValueContext';

function MessagePage() {
  const [myMessageList, setMyMessageList] = useState([]);
  const { user } = useValueContext();

  const handleClickGetMessageButton = useCallback(() => {
    getMyMessageList().then((response) => setMyMessageList(response));
  }, []);

  return (
    <div>
      <div>MessagePage</div>
      <div>
        <button type="button" onClick={handleClickGetMessageButton}>
          나의 메시지함 요청
        </button>
        <button type="button" onClick={() => console.log(myMessageList)}>
          나의 메시지함 보기
        </button>
      </div>
      <div>
        {myMessageList.map((myMessage) => {
          const { message, receiver, sender, seen } = myMessage;
          const you = receiver._id === user._id ? receiver : sender;
          const { _id, email, fullName } = you;
          return (
            <div
              key={_id}
              style={{
                marginTop: '5px',
                marginBottom: '5px',
                border: '1px solid black',
              }}
            >
              <div>상대방 아이디: {email}</div>
              <div>상대방 이름: {fullName}</div>
              <div>message: {message}</div>
              <div>읽었나?: {seen ? 'O' : 'X'}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MessagePage;
