import styled from '@emotion/styled';
import useAsyncFn from '@hooks/useAsyncFn';
import { IconButton, TextField } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { searchAll } from '@utils/search';
import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { COLOR_MAIN, COLOR_SIGNATURE } from '@utils/color';

const CustomTextField = styled(TextField)`
  & label.Mui-focused {
    color: ${COLOR_SIGNATURE};
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: ${COLOR_MAIN};
    }
  }
`;

const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 5rem 1fr;
  grid-template-columns: 100%;
  justify-items: center;
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
    inputRef.current.value = keyword;
    if (keyword === null) return;
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
      <CustomTextField
        fullWidth
        InputProps={InputProps}
        inputRef={inputRef}
        onKeyDown={handleKeyDown}
        {...inputError}
      />
      <Outlet context={{ ...searchResult }} />
    </Container>
  );
}

export default SearchPage;
