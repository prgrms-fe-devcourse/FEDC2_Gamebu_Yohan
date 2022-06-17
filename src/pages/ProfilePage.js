import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import GoBack from '@components/GoBack';
import Thumbnail from '@components/Thumbnail';
import useValueContext from '@hooks/useValueContext';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { COLOR_MAIN } from '@utils/color';
import EditFullNameModal from '@components/EditFullNameModal';

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

const ProfileMenuWrapper = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const UserFullNameWrapper = styled.div`
  text-align: center;
  position: relative;
`;

const Span = styled.span`
  font-size: 1.5rem;
`;

const EditIconRight = styled(EditIcon)`
  position: absolute;
  right: 0;
  bottom: 0;
`;

const UserMenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UserMenu = styled.div`
  flex-grow: 1;
  text-align: center;
`;

function ProfilePage() {
  const { user } = useValueContext();
  const [visible, setVisible] = useState(false);

  const handleClickEditIcon = useCallback(() => {
    setVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setVisible(false);
  }, []);

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
      <ProfileMenuWrapper>
        <UserFullNameWrapper>
          <Span>{user?.fullName}</Span>
          <EditIconRight onClick={handleClickEditIcon} />
          <EditFullNameModal
            visible={visible}
            handleCloseModal={handleCloseModal}
          />
        </UserFullNameWrapper>
        <hr />
        <UserMenuWrapper>
          <UserMenu>팔로잉&nbsp;{user?.following?.length || 0}</UserMenu>
          <UserMenu>팔로우&nbsp;{user?.followers?.length || 0}</UserMenu>
        </UserMenuWrapper>
      </ProfileMenuWrapper>
    </ContentWrapper>
  );
}

export default ProfilePage;
