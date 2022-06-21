import { useState, useCallback, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { COLOR_MAIN } from '@utils/color';
import useCookieToken from '@hooks/useCookieToken';
import { CHANNEL_MODAL_VISIBLE } from '@utils/constants';
import useValueContext from '@hooks/useValueContext';
import useActionContext from '@hooks/useActionContext';
import useOurSnackbar from '@hooks/useOurSnackbar';
import { authUserAPI } from '@utils/user';

const ModalContentWrapper = styled(Box)`
  position: absolute;
  top: 50%;
  left: 2rem;
  right: 2rem;
  transform: translate(0, -50%);
  background-color: white;
  border: 2px solid ${COLOR_MAIN};
  box-shadow: 24;
  padding: 2rem;
`;

const P = styled.p`
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const ColorButton = styled(Button)`
  color: black;
  border-color: ${COLOR_MAIN};

  &:hover {
    border-color: ${COLOR_MAIN};
  }
`;

const Label = styled.label`
  font-size: 0.75rem;
`;

function InterestedChannelModal() {
  const [openModalInCookie, setCookie] = useCookieToken(
    CHANNEL_MODAL_VISIBLE,
    'on'
  );
  const [open, setOpen] = useState(false);
  const { initialLoading, user } = useValueContext();
  const { login } = useActionContext();
  const renderSnackbar = useOurSnackbar();
  const ref = useRef();

  const handleCloseModal = useCallback(() => {
    setCookie(ref.current.checked ? 'off' : 'on');
    setOpen(false);
  }, [setCookie]);

  const getAuthUser = useCallback(async () => {
    authUserAPI().then((result) => {
      if (result) {
        login(result);
        renderSnackbar('자동 로그인', true);
      }
    });
  }, [login, renderSnackbar]);

  useEffect(() => {
    if (initialLoading) {
      getAuthUser();
    }
  }, [initialLoading, getAuthUser]);

  useEffect(() => {
    if (openModalInCookie === 'on' && user) {
      try {
        const NoneInterestedChannel = !JSON.parse(user.username)?.length;
        if (NoneInterestedChannel) {
          setOpen(true);
        }
      } catch (error) {
        setOpen(true);
      }
    }
  }, [openModalInCookie, user]);

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalContentWrapper>
        <P>아직 관심 채널이 설정되지 않았습니다</P>
        <ButtonContainer>
          <div>
            <input id="checkbox" ref={ref} type="checkbox" />
            <Label htmlFor="checkbox">다시 보지 않기</Label>
          </div>
          <ColorButton
            variant="outlined"
            size="small"
            onClick={handleCloseModal}
          >
            닫기
          </ColorButton>
        </ButtonContainer>
      </ModalContentWrapper>
    </Modal>
  );
}

export default InterestedChannelModal;
