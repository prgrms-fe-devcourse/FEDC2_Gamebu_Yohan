import React, { useState, useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import GoBack from '@components/GoBack';
import Thumbnail from '@components/Thumbnail';
import useValueContext from '@hooks/useValueContext';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import { Link, useParams } from 'react-router-dom';
import { COLOR_MAIN } from '@utils/color';
import EditFullNameModal from '@components/EditFullNameModal';
import { getUserInfo } from '@utils/user';

const ContentWrapper = styled.div`
  padding: 1.5rem;
`;

const ProfileTopbar = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProfileWarningAlert = styled(Alert)`
  font-size: 0.75rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
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
  const { userId } = useParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    visible: false,
    success: false,
    message: '',
  });
  const [targetUser, setTargetUser] = useState(null);

  const handleClickAlert = useCallback(() => {
    setAlertInfo((prevAlertInfo) => ({
      ...prevAlertInfo,
      visible: false,
    }));
  }, []);

  const handleSuccessProfile = useCallback(() => {
    setAlertInfo({
      visible: true,
      success: true,
      message: '이름 변경을 완료했습니다',
    });
  }, []);

  const handleErrorProfile = useCallback(() => {
    setAlertInfo({
      visible: true,
      success: false,
      message: '이름 변경 중 오류가 발생했습니다',
    });
  }, []);

  const handleClickEditIcon = useCallback(() => {
    setModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  useEffect(() => {
    getUserInfo(userId).then((response) => setTargetUser(response));
  }, [userId]);

  const LinkToCategories =
    user?._id === targetUser?._id ? (
      <LinkButton variant="outlined" size="small">
        <NoneDecorationLink to="/channel/categories">
          즐겨찾기 수정
        </NoneDecorationLink>
      </LinkButton>
    ) : null;

  const ProfileAlert =
    user?._id === targetUser?._id ? (
      <Collapse in={alertInfo.visible}>
        <ProfileWarningAlert
          severity={alertInfo.success ? 'success' : 'warning'}
          onClose={handleClickAlert}
        >
          {alertInfo.message}
        </ProfileWarningAlert>
      </Collapse>
    ) : null;

  const EditfullNameIcon =
    user?._id === targetUser?._id ? (
      <>
        <EditIconRight onClick={handleClickEditIcon} />
        <EditFullNameModal
          visible={modalVisible}
          handleCloseModal={handleCloseModal}
          onSuccess={handleSuccessProfile}
          onError={handleErrorProfile}
        />
      </>
    ) : null;

  return (
    <ContentWrapper>
      <ProfileTopbar>
        <GoBack />
        {LinkToCategories}
      </ProfileTopbar>
      {ProfileAlert}
      <ThumbnailCover>
        <Thumbnail
          image={targetUser?.image || null}
          name={targetUser?.fullName || '로딩 중'}
          badge={!targetUser}
          isOnline={targetUser?.isOnline}
        />
      </ThumbnailCover>
      <ProfileMenuWrapper>
        <UserFullNameWrapper>
          <Span>{targetUser?.fullName}</Span>
          {EditfullNameIcon}
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
