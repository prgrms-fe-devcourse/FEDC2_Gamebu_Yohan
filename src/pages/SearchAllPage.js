import Card from '@components/Card';
import Header from '@components/Header';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import React, { useMemo } from 'react';
import { Link, useOutletContext, useSearchParams } from 'react-router-dom';
import { COLOR_SIGNATURE } from '@utils/color';

const HeaderBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
  & a {
    color: inherit;
  }
`;
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Container = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 100%;
  justify-items: center;
`;
const RouteLink = styled(Link)`
  text-decoration: none;
  color: ${COLOR_SIGNATURE};
`;
function SearchAllPage() {
  const { value } = useOutletContext();
  const [searchParam] = useSearchParams();

  const filterUser = useMemo(() => {
    if (!value) return [];
    if (!Array.isArray(value)) return [];
    return value.filter((data) => data.fullName);
  }, [value]);

  const filterPost = useMemo(() => {
    if (!value) return [];
    if (!Array.isArray(value)) return [];
    return value
      .filter((data) => data.title)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [value]);

  return (
    <Container>
      {searchParam.get('k') ? (
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
              {filterUser.length !== 0
                ? filterUser.slice(0, 3).map((item) => (
                    <Link to={`/profile/${item._id}`} key={item._id}>
                      <Card.User>{item}</Card.User>
                    </Link>
                  ))
                : '키워드에 해당하는 결과가 없습니다'}
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
              {filterPost.length !== 0
                ? filterPost.slice(0, 3).map((item) => (
                    <Link to={`/posts/details/${item._id}`} key={item._id}>
                      <Card.Post>{item}</Card.Post>
                    </Link>
                  ))
                : '키워드에 해당하는 결과가 없습니다'}
            </ListWrapper>
          </HeaderBox>
        </>
      ) : (
        <Header>검색을 통해 파티를 구해보세요!</Header>
      )}
    </Container>
  );
}

export default SearchAllPage;
