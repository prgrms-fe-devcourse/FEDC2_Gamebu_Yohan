import useAsyncFn from '@hooks/useAsyncFn';
import { searchAll } from '@utils/search';
import React, { useEffect, useRef, useState } from 'react';

function SearchPage() {
  const inputRef = useRef(null);
  const [userList, setUserList] = useState([]);
  const [postList, setPostList] = useState([]);
  const [searchResult, asyncSearchAll] = useAsyncFn(
    async (keyword) => {
      return searchAll(keyword);
    },
    [inputRef]
  );
  const handleKeyDown = ({ key }) => {
    if (key === 'Enter' && inputRef.current.value) {
      asyncSearchAll(inputRef.current.value);
    }
  };
  const classify = (datas) => {
    if (!datas) return;
    setUserList(datas.filter((data) => data.fullName));
    setPostList(datas.filter((data) => data.title));
  };
  useEffect(() => {
    const { isLoading, value } = searchResult;
    if (!isLoading) {
      classify(value);
    }
  }, [searchResult]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <div>
        <input ref={inputRef} onKeyDown={handleKeyDown} />
      </div>
      <ul>
        {userList.map(({ fullName, email, _id }) => (
          <li key={_id}>
            <div>{fullName}</div>
            <div>{email}</div>
          </li>
        ))}
      </ul>
      <ul>
        {postList.map(({ title, createdAt, _id }) => (
          <li key={_id}>
            <div>{title}</div>
            <div>{createdAt}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchPage;
