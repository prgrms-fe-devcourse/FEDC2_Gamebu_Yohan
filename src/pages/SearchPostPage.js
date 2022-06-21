import Card from '@components/Card';
import Header from '@components/Header';
import styled from '@emotion/styled';
import React from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import List from '@components/List';

const HeaderBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const ListWrapper = styled.div`
  flex-grow: 1;
`;
const HeaderWrapper = styled.div`
  margin: 8px 0;
`;
function SearchPostPage() {
  const { value } = useOutletContext();
  const [searchParam] = useSearchParams();

  const filterPost = () => {
    if (!value) return [];
    if (!Array.isArray(value)) return [];
    return value
      .filter((data) => data.title)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };
  return (
    <HeaderBox>
      {searchParam.get('k') ? (
        <>
          <HeaderWrapper>
            <Header level={1} strong>
              포스트
            </Header>
          </HeaderWrapper>
          <ListWrapper>
            <List
              items={filterPost()}
              keyName="_id"
              alt="키워드에 해당하는 결과가 없습니다"
              limit={100}
              gap="8px"
              frame={<Card.Post />}
            />
          </ListWrapper>
        </>
      ) : (
        <Header>검색을 통해 파티를 구해보세요!</Header>
      )}
    </HeaderBox>
  );
}

export default SearchPostPage;
