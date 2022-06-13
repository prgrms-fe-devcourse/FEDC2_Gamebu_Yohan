import Card from '@components/Card';
import Header from '@components/Header';
import styled from '@emotion/styled';
import useAsyncFn from '@hooks/useAsyncFn';
import { searchAll } from '@utils/search';
import React, { useEffect, useRef, useState } from 'react';

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 2rem;
  margin-bottom: 1rem;
  padding: 0 1rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  font-size: 1rem;
`;
const List = styled.ul`
  margin: 8px 0;
  & > li {
    margin-top: 4px;
  }
`;

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
    <>
      <Input ref={inputRef} onKeyDown={handleKeyDown} />
      {userList.length !== 0 && (
        <Header level={1} strong>
          사용자
        </Header>
      )}
      <List>
        {userList.map((user) => (
          <li key={user._id}>
            <Card.User>{user}</Card.User>
          </li>
        ))}
      </List>
      {postList.length !== 0 && (
        <Header level={1} strong>
          포스트
        </Header>
      )}
      <List>
        {postList.map((post) => (
          <li key={post._id}>
            <Card.Post>{post}</Card.Post>
          </li>
        ))}
      </List>
    </>
  );
}

export default SearchPage;
