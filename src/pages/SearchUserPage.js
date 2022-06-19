import React from 'react';
import Card from '@components/Card';
import Header from '@components/Header';
import styled from '@emotion/styled';
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
function SearchUserPage() {
  const { value } = useOutletContext();
  const [searchParam] = useSearchParams();

  const filterUser = () => {
    if (!value) return [];
    if (!Array.isArray(value)) return [];
    return value.filter((data) => data.fullName);
  };
  return (
    <HeaderBox>
      {searchParam.get('k') ? (
        <>
          <HeaderWrapper>
            <Header level={1} strong>
              사용자
            </Header>
          </HeaderWrapper>
          <ListWrapper>
            <List
              items={filterUser()}
              keyName="_id"
              alt="키워드에 해당하는 결과가 없습니다"
              limit={100}
              gap="8px"
              frame={<Card.User />}
            />
          </ListWrapper>
        </>
      ) : (
        <Header>검색을 통해 파티를 구해보세요!</Header>
      )}
    </HeaderBox>
  );
}

export default SearchUserPage;
