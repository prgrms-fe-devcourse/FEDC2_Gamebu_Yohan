import Card from '@components/Card';
import Header from '@components/Header';
import styled from '@emotion/styled';
import useAsyncFn from '@hooks/useAsyncFn';
import { Button, IconButton, TextField } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { searchAll } from '@utils/search';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

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
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();
  const [inputError, setInputError] = useState({
    error: false,
    helperText: '',
  });
  const [userList, setUserList] = useState([]);
  const [postList, setPostList] = useState([]);
  const [searchResult, searchWithKeword] = useAsyncFn(
    async (keyword) => searchAll(keyword),
    [inputRef]
  );
  const isValidKeyword = (keyword) => {
    const searchKeyword = keyword.trim();
    if (!searchKeyword) {
      setInputError({ error: true, helperText: '검색어를 입력하세요' });
      return false;
    }
    if (searchKeyword.length < 3) {
      setInputError({ error: true, helperText: '3글자 이상 입력하세요' });
      return false;
    }
    setInputError({ error: false, helperText: '' });
    return true;
  };

  useEffect(() => {
    const keyword = searchParam.get('k');
    if (keyword === null) return;
    inputRef.current.value = keyword;
    isValidKeyword(keyword) && searchWithKeword(keyword);
  }, [searchParam, searchWithKeword]);

  const handleKeyDown = ({ key }) => {
    if (key !== 'Enter') return;
    inputRef.current.value = inputRef.current.value.trim();
    isValidKeyword(inputRef.current.value) &&
      setSearchParam({ k: inputRef.current.value });
  };

  const handleSearchClick = () => {
    inputRef.current.value = inputRef.current.value.trim();
    isValidKeyword(inputRef.current.value) &&
      setSearchParam({ k: inputRef.current.value });
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
            <IconButton onClick={handleSearchClick}>
              <SearchRoundedIcon fontSize="large" aria-label="search" />
            </IconButton>
          ),
          style: { fontSize: 20 },
        }}
        inputRef={inputRef}
        onKeyDown={handleKeyDown}
        {...inputError}
      />
      <ListWrapper>
        <HeaderWrapper>
          <Header level={1} strong>
            사용자
          </Header>
          <Button
            onClick={() => {
              navigate(`/search/user?k=${searchParam.get('k')}`);
            }}
            variant="text"
            color="primary"
          >
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
          <Button
            onClick={() => {
              navigate(`/search/post?k=${searchParam.get('k')}`);
            }}
            variant="text"
            color="primary"
          >
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
