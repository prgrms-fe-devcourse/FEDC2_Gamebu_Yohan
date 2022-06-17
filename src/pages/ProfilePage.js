import React from 'react';
import styled from '@emotion/styled';
import GoBack from '@components/GoBack';
import Thumbnail from '@components/Thumbnail';
import useValueContext from '@hooks/useValueContext';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { COLOR_MAIN } from '@utils/color';

const ContentWrapper = styled.div`
  padding: 1.5rem;
`;

const ProfileTopbar = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NoneDecorationLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const LinkButton = styled(Button)`
  width: 8rem;
  color: black;
  background-color: white;
  border-color: ${COLOR_MAIN};

  &:hover {
    background-color: white;
    border-color: ${COLOR_MAIN};
  }
`;

const ThumbnailCover = styled.div`
  display: flex;
  justify-content: center;

  & div {
    width: 10rem;
    height: 10rem;
  }
`;

const UserFullNameWrapper = styled.div`
  text-align: center;
  position: relative;
`;

const EditIconRight = styled(EditIcon)`
  position: absolute;
  right: 0;
  bottom: 0;
`;

const ProfileMenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProfileMenu = styled.div`
  flex-grow: 1;
  text-align: center;
`;

function ProfilePage() {
  const { user } = useValueContext();

  return (
    <ContentWrapper>
      <ProfileTopbar>
        <GoBack />
        <LinkButton variant="outlined" size="small">
          <NoneDecorationLink to="/channel/categories">
            즐겨찾기 수정
          </NoneDecorationLink>
        </LinkButton>
      </ProfileTopbar>
      {user && (
        <ThumbnailCover>
          <Thumbnail
            image={user?.image}
            name={user?.fullName}
            badge={false}
            isOnline={user?.isOnline}
          />
        </ThumbnailCover>
      )}
      <UserFullNameWrapper>
        {user?.fullName}
        <EditIconRight />
      </UserFullNameWrapper>
      <hr />
      <ProfileMenuWrapper>
        <ProfileMenu>팔로잉&nbsp;{user?.following?.length || 0}</ProfileMenu>
        <ProfileMenu>팔로우&nbsp;{user?.followers?.length || 0}</ProfileMenu>
      </ProfileMenuWrapper>
    </ContentWrapper>
  );
}

export default ProfilePage;
