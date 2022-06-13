import Card from '@components/Card';
import Header from '@components/Header';
import styled from '@emotion/styled';
import useAsyncFn from '@hooks/useAsyncFn';
import { TextField } from '@mui/material';
import { searchAll } from '@utils/search';
import React, { useEffect, useRef, useState } from 'react';

const List = styled.ul`
  margin: 8px 0;
  & > li {
    margin-top: 4px;
  }
`;
const Container = styled.div`
  overflow-y: scroll;
`;

function SearchPage() {
  const inputRef = useRef(null);
  const [inputError, setInputError] = useState(false);
  const [userList, setUserList] = useState([]);
  const [postList, setPostList] = useState([]);

  const inputErrorAttr = {
    error: inputError,
    helperText: inputError ? '3글자 이상 입력해주세요.' : '',
  };
  const [searchResult, asyncSearchAll] = useAsyncFn(
    async (keyword) => {
      return searchAll(keyword);
    },
    [inputRef]
  );

  const handleKeyDown = ({ key }) => {
    if (key !== 'Enter' || !inputRef.current.value) return;
    if (inputRef.current.value.length > 2) {
      setInputError(false);
      asyncSearchAll(inputRef.current.value);
    } else setInputError(true);
  };

  const classifyFetchData = (datas) => {
    if (!datas) return;
    setUserList(datas.filter((data) => data.fullName));
    setPostList(datas.filter((data) => data.title));
  };

  useEffect(() => {
    const { isLoading, value } = searchResult;
    if (!isLoading) {
      classifyFetchData(value);
    }
  }, [searchResult]);

  return (
    <Container>
      <TextField
        inputRef={inputRef}
        onKeyDown={handleKeyDown}
        {...inputErrorAttr}
        sx={{ width: '100%', marginBottom: '1rem' }}
      />
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
    </Container>
  );
}

export default SearchPage;
