import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import useForm from '@hooks/useForm';
import useValueContext from '@hooks/useValueContext';
import useActionContext from '@hooks/useActionContext';
import { COLOR_MAIN } from '@utils/color';
import { changeMyInfoAPI } from '@utils/user';
import { regexName, MAX_NAME_LENGTH } from '@utils/constants';

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

  & .MuiOutlinedInput-root {
    background-color: white;
  }

  & .MuiOutlinedInput-root.Mui-focused fieldset {
    border-color: ${COLOR_MAIN};
  }
`;

const ButtonContainer = styled.div`
  padding-top: 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const ColorButton = styled(Button)`
  color: black;
  border-color: ${COLOR_MAIN};

  &:hover {
    border-color: ${COLOR_MAIN};
  }
`;

const helperText = '변경할 이름을 입력해주세요';

function EditFullNameModal({ visible, handleCloseModal, onSuccess, onError }) {
  const { user } = useValueContext();
  const { login } = useActionContext();
  const { values, errors, isLoading, handleChange, handleSubmit } = useForm({
    initialValues: {
      fullName: '',
    },
    onSubmit: async () => {
      const data = await changeMyInfoAPI({
        method: 'PUT',
        data: {
          fullName: values.fullName,
          username: user?.username
            ? JSON.stringify(JSON.parse(user.username))
            : [],
        },
      });
      const isError = Boolean(data?.response);
      if (isError) {
        onError();
      } else {
        login(data);
        onSuccess();
      }
      handleCloseModal();
    },
    validate: ({ fullName }) => {
      const newErrors = {};
      if (!fullName) newErrors.fullName = '변경할 이름을 입력하지 않았습니다';
      const filteredName = fullName.replace(regexName, '');
      if (fullName !== filteredName)
        newErrors.fullName = '사용할 수 없는 문자가 포함되어 있습니다';
      if (fullName.length > MAX_NAME_LENGTH)
        newErrors.fullName = '변경할 이름이 너무 깁니다';
      return newErrors;
    },
  });

  return (
    <Modal
      open={visible}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalContentWrapper>
        <form onSubmit={handleSubmit}>
          <TextField
            placeholder={helperText}
            values={values.fullName}
            onChange={handleChange}
            helperText={errors.fullName || helperText.fullName}
            fullWidth
            name="fullName"
            error={Boolean(errors.fullName)}
          />
          <ButtonContainer>
            <ColorButton
              type="submit"
              variant="outlined"
              size="small"
              disabled={isLoading}
            >
              수정
            </ColorButton>
            <ColorButton
              variant="outlined"
              size="small"
              onClick={handleCloseModal}
            >
              닫기
            </ColorButton>
          </ButtonContainer>
        </form>
      </ModalContentWrapper>
    </Modal>
  );
}

EditFullNameModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
};

EditFullNameModal.defaultProps = {
  handleCloseModal: () => {},
  onSuccess: () => {},
  onError: () => {},
};

export default EditFullNameModal;
