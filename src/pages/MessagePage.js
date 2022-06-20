import React, { useState, useCallback } from 'react';
import { getMyMessageList } from '@utils/message';
import useValueContext from '@hooks/useValueContext';
import { useNavigate, Link } from 'react-router-dom';
import useInterval from '@hooks/useInterval';

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
      <Link to="/">home</Link>
      <div>MessagePage</div>
      <div>
        {myMessageList.length &&
          user &&
          myMessageList.map((myMessage) => {
            console.log(myMessage);
            const { message, receiver, sender, seen, createdAt } = myMessage;
            const you = receiver._id !== user._id ? receiver : sender;
            const { _id, email, fullName } = you;
            return (
              <button
                key={`${_id}-${createdAt}`}
                type="button"
                style={{ border: '1px solid black', width: '100%' }}
                onClick={() => navigate(`/message/${_id}`)}
              >
                <div
                  style={{
                    marginTop: '5px',
                    marginBottom: '5px',
                  }}
                >
                  <div>상대방 아이디: {email}</div>
                  <div>상대방 이름: {fullName}</div>
                  <div>message: {message}</div>
                  <div>읽었나?: {seen ? 'O' : 'X'}</div>
                </div>
              </button>
            );
          })}
      </div>
    </div>
  );
}

export default MessagePage;
