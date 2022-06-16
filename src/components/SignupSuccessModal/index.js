import { useCallback } from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { COLOR_MAIN } from '@utils/color';

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
  justify-content: flex-end;
  gap: 1rem;
`;

const NoneDecorationLink = styled(Link)`
  text-decoration: none;
`;

const ColorButton = styled(Button)`
  color: black;
  border-color: ${COLOR_MAIN};

  &:hover {
    border-color: ${COLOR_MAIN};
  }
`;

function SignupSuccessModal({ visible }) {
  const navigate = useNavigate();

  const closeModal = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <Modal
      open={visible}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalContentWrapper>
        <P>회원가입을 완료했습니다</P>
        <P>
          로그인 후 관심 채널을 설정하면
          <br />
          빠르게 볼 수 있습니다
        </P>
        <P>지금 로그인 하시겠습니까?</P>
        <ButtonContainer>
          <ColorButton variant="outlined" size="small">
            <NoneDecorationLink to="/login">로그인</NoneDecorationLink>
          </ColorButton>
          <ColorButton variant="outlined" size="small">
            <NoneDecorationLink to="/">홈으로</NoneDecorationLink>
          </ColorButton>
        </ButtonContainer>
      </ModalContentWrapper>
    </Modal>
  );
}

SignupSuccessModal.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default SignupSuccessModal;
