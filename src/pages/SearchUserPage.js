import React, { useMemo } from 'react';
import Card from '@components/Card';
import Header from '@components/Header';
import styled from '@emotion/styled';
import { Link, useOutletContext, useSearchParams } from 'react-router-dom';

const HeaderBox = styled.div`
  width: 100%;
  height: 100%;
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
  margin: 8px 0;
`;
function SearchUserPage() {
  const { value } = useOutletContext();
  const [searchParam] = useSearchParams();

  const filterUser = useMemo(() => {
    if (!value) return [];
    if (!Array.isArray(value)) return [];
    return value.filter((data) => data.fullName);
  }, [value]);
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
            {filterUser.length !== 0
              ? filterUser.map((item) => (
                  <Link to={`/profile/${item._id}`}>
                    <Card.User key={item._id}>{item}</Card.User>
                  </Link>
                ))
              : '키워드에 해당하는 결과가 없습니다'}
          </ListWrapper>
        </>
      ) : (
        <Header>검색을 통해 파티를 구해보세요!</Header>
      )}
    </HeaderBox>
  );
}

export default SearchUserPage;
