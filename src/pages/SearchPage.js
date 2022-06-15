import Card from '@components/Card';
import Header from '@components/Header';
import styled from '@emotion/styled';
import useAsyncFn from '@hooks/useAsyncFn';
import { Button, IconButton, TextField } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { searchAll } from '@utils/search';
import React, { useEffect, useRef, useState } from 'react';

const List = styled.ul`
  overflow-y: auto;
  & > li {
    margin-top: 4px;
  }
`;
const ListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const ListContainer = styled.div`
  flex-grow: 1;
`;
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const PageWrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 5rem 1fr 1fr;
  grid-template-columns: 100%;
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
    inputRef.current.value = inputRef.current.value.trim();
    if (inputRef.current.value.length > 2) {
      setInputError(false);
      asyncSearchAll(inputRef.current.value);
    } else setInputError(true);
  };

  const classifyFetchData = (datas) => {
    if (!datas) return;
    setUserList(datas.filter((data) => data.fullName));
    setPostList(
      datas
        .filter((data) => data.title)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    );
  };

  useEffect(() => {
    const { isLoading, value } = searchResult;
    if (!isLoading) {
      classifyFetchData(value);
    }
  }, [searchResult]);

  return (
    <PageWrapper>
      <TextField
        fullWidth
        InputProps={{
          endAdornment: (
            <IconButton>
              <SearchRoundedIcon fontSize="large" aria-label="search" />
            </IconButton>
          ),
          style: { fontSize: 20 },
        }}
        inputRef={inputRef}
        onKeyDown={handleKeyDown}
        {...inputErrorAttr}
      />
      <ListWrapper>
        <HeaderWrapper>
          <Header level={1} strong>
            사용자
          </Header>
          <Button variant="text" color="primary">
            모두 보기
          </Button>
        </HeaderWrapper>

        <ListContainer>
          {userList.length === 0 ? (
            <Header>키워드에 해당하는 결과가 없습니다</Header>
          ) : (
            <List>
              {userList.slice(0, 3).map((user) => (
                <li key={user._id}>
                  <Card.User>{user}</Card.User>
                </li>
              ))}
            </List>
          )}
        </ListContainer>
      </ListWrapper>
      <ListWrapper>
        <HeaderWrapper>
          <Header level={1} strong>
            포스트
          </Header>
          <Button variant="text" color="primary">
            모두 보기
          </Button>
        </HeaderWrapper>
        <ListContainer>
          {postList.length === 0 ? (
            <Header>키워드에 해당하는 결과가 없습니다</Header>
          ) : (
            <List>
              {postList.slice(0, 3).map((post) => (
                <li key={post._id}>
                  <Card.Post>{post}</Card.Post>
                </li>
              ))}
            </List>
          )}
        </ListContainer>
      </ListWrapper>
    </PageWrapper>
  );
}

export default SearchPage;
