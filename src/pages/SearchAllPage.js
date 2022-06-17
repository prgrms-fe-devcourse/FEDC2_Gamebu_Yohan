import Card from '@components/Card';
import Header from '@components/Header';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import React from 'react';
import { Link, useOutletContext, useSearchParams } from 'react-router-dom';
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

  const filterUser = () => {
    if (!value) return [];
    if (!Array.isArray(value)) return [];
    return value.filter((data) => data.fullName);
  };
  const filterPost = () => {
    if (!value) return [];
    if (!Array.isArray(value)) return [];
    return value
      .filter((data) => data.title)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };
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
      ) : (
        <Header>검색을 통해 파티를 구해보세요!</Header>
      )}
    </Container>
  );
}

export default SearchAllPage;
