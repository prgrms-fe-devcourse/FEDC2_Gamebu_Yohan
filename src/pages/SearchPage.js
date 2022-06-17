import Card from '@components/Card';
import Header from '@components/Header';
import styled from '@emotion/styled';
import useAsyncFn from '@hooks/useAsyncFn';
import { Button, IconButton, TextField } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { searchAll } from '@utils/search';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { COLOR_SIGNATURE } from '@utils/color';
import List from '@components/List';

const HeaderBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const ListWrapper = styled.div`
  flex-grow: 1;
`;
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 5rem 1fr 1fr;
  grid-template-columns: 100%;
  justify-items: center;
`;
const RouteLink = styled(Link)`
  text-decoration: none;
  color: ${COLOR_SIGNATURE};
`;
function SearchPage() {
  const inputRef = useRef(null);
  const [searchParam, setSearchParam] = useSearchParams();
  const [inputError, setInputError] = useState({
    error: false,
    helperText: '',
  });
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
  const filterUser = () => {
    if (!Array.isArray(searchResult.value)) return [];
    return searchResult.value.filter((data) => data.fullName);
  };
  const filterPost = () => {
    if (!Array.isArray(searchResult.value)) return [];
    return searchResult.value
      .filter((data) => data.title)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };
  const InputProps = {
    endAdornment: (
      <IconButton onClick={handleSearchClick}>
        <SearchRoundedIcon fontSize="large" aria-label="search" />
      </IconButton>
    ),
    style: { fontSize: 20 },
  };

  return (
    <Container>
      <TextField
        fullWidth
        InputProps={InputProps}
        inputRef={inputRef}
        onKeyDown={handleKeyDown}
        {...inputError}
      />
      {!searchResult.isLoading && searchParam.get('k') && (
        <>
          <HeaderBox>
            <HeaderWrapper>
              <Header level={1} strong>
                사용자
              </Header>
              <Button variant="text" color="primary">
                <RouteLink to={`/search/user?k=${searchParam.get('k')}`}>
                  모두 보기
                </RouteLink>
              </Button>
            </HeaderWrapper>
            <ListWrapper>
              <List
                items={filterUser()}
                keyName="_id"
                alt="키워드에 해당하는 결과가 없습니다"
                limit={3}
                gap="8px"
                frame={<Card.User />}
              />
            </ListWrapper>
          </HeaderBox>
          <HeaderBox>
            <HeaderWrapper>
              <Header level={1} strong>
                포스트
              </Header>
              <Button variant="text" color="primary">
                <RouteLink to={`/search/post?k=${searchParam.get('k')}`}>
                  모두 보기
                </RouteLink>
              </Button>
            </HeaderWrapper>
            <ListWrapper>
              <List
                items={filterPost()}
                keyName="_id"
                alt="키워드에 해당하는 결과가 없습니다"
                limit={3}
                gap="8px"
                frame={<Card.Post />}
              />
            </ListWrapper>
          </HeaderBox>
        </>
      )}
      {!searchParam.get('k') && (
        <Header margin="10% 0">검색어를 입력해 파티를 찾아보세요!</Header>
      )}
      {searchResult.isLoading && <Header margin="10% 0">로딩중!</Header>}
    </Container>
  );
}

export default SearchPage;
