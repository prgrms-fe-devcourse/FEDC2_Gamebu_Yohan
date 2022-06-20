import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import { COLOR_BG, COLOR_MAIN, COLOR_SIGNATURE } from '@utils/color';
import useForm from '@hooks/useForm';
import GoBack from '@components/GoBack';
import { regexId, regexName } from '@utils/constants';
import { useNavigate } from 'react-router-dom';
import { signupAPI } from '@utils/user';

const ContentWrapper = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 3rem);
`;

const FlexGrowBox = styled.div`
  flex-grow: ${({ grow }) => grow};
`;

const SignupHeader = styled.h1`
  font-size: 2rem;
  text-align: center;
  padding: 1.5rem;
`;

const FormWrapper = styled.div`
  background-color: ${COLOR_BG};
  color: ${COLOR_MAIN};
  border-radius: 0.5rem;
  & p {
    margin-top: 0.5rem;
  }

  & .MuiOutlinedInput-root {
    background-color: white;
  }

  & .MuiOutlinedInput-root.Mui-focused fieldset {
    border-color: ${COLOR_MAIN};
  }
`;

const Form = styled.form`
  padding: 1.5rem 1rem;
  & .MuiTextField-root {
    margin-bottom: 1rem;
  }
`;

const StyledTextField = styled(TextField)`
  & .MuiInputLabel-root {
    color: ${COLOR_MAIN};
  }

  & .Mui-focused.MuiInputLabel-root {
    color: ${COLOR_SIGNATURE};
  }
`;

const SignupButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SignupButton = styled(Button)`
  width: 8rem;
  color: black;
  background-color: white;
  border-color: ${COLOR_MAIN};

  &:hover {
    background-color: white;
    border-color: ${COLOR_MAIN};
  }
`;

const SignupWarningAlert = styled(Alert)`
  font-size: 0.75rem;
  margin-top: 1rem;
`;

function SignupPage() {
  const [warningAlertInfo, setWarningAlertInfo] = useState({
    visible: false,
    message: '',
  });

  const navigate = useNavigate();
  const { values, errors, isLoading, handleChange, handleSubmit } = useForm({
    initialValues: {
      id: '',
      name: '',
      password: '',
      passwordConfirm: '',
    },
    onSubmit: async () => {
      const { response } = await signupAPI({
        method: 'POST',
        data: {
          email: values.id,
          fullName: values.name,
          password: values.password,
        },
      });

      const isError = Boolean(response);
      if (isError) {
        if (response?.status === 400) {
          setWarningAlertInfo({
            visible: true,
            message: '입력하신 아이디는 가입할 수 없습니다',
          });
        } else {
          setWarningAlertInfo({
            visible: true,
            message: '회원가입 요청 중 오류가 발생했습니다',
          });
        }
        return;
      }

      navigate('/login');
    },
    validate: ({ id, name, password, passwordConfirm }) => {
      const newErrors = {};
      if (!id) newErrors.id = '아이디를 입력하세요';
      const filteredId = id.replace(regexId, '');
      if (id !== filteredId)
        newErrors.id = '아이디에 사용할 수 없는 문자가 포함되어 있습니다';
      if (!name) newErrors.name = '이름을 입력하세요';
      const filteredName = name.replace(regexName, '');
      if (name !== filteredName)
        newErrors.name = '이름에 사용할 수 없는 문자가 포함되어 있습니다';
      if (!password) newErrors.password = '비밀번호를 입력하세요';
      if (!passwordConfirm)
        newErrors.passwordConfirm = '비밀번호 확인을 입력하세요';
      if (password !== passwordConfirm)
        newErrors.passwordConfirm =
          '비밀번호와 비밀번호 확인이 일치하지 않습니다';
      return newErrors;
    },
  });

  const handleClickAlert = useCallback(() => {
    setWarningAlertInfo((prevWarningAlertInfo) => ({
      ...prevWarningAlertInfo,
      visible: false,
    }));
  }, []);

  return (
    <ContentWrapper>
      <GoBack />
      <Collapse in={warningAlertInfo.visible}>
        <SignupWarningAlert severity="warning" onClose={handleClickAlert}>
          {warningAlertInfo.message}
        </SignupWarningAlert>
      </Collapse>
      <FlexGrowBox grow={1} />
      <SignupHeader>회원가입</SignupHeader>
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          <StyledTextField
            label="아이디"
            values={values.id}
            onChange={handleChange}
            helperText={errors.id}
            fullWidth
            name="id"
            error={Boolean(errors.id)}
          />
          <StyledTextField
            label="이름"
            values={values.name}
            onChange={handleChange}
            helperText={errors.name}
            fullWidth
            name="name"
            error={Boolean(errors.name)}
          />
          <StyledTextField
            label="비밀번호"
            value={values.password}
            onChange={handleChange}
            helperText={errors.password}
            fullWidth
            name="password"
            type="password"
            autoComplete="on"
            error={Boolean(errors.password)}
          />
          <StyledTextField
            label="비밀번호 확인"
            value={values.passwordConfirm}
            onChange={handleChange}
            helperText={errors.passwordConfirm}
            fullWidth
            name="passwordConfirm"
            type="password"
            autoComplete="on"
            error={Boolean(errors.passwordConfirm)}
          />
          <SignupButtonWrapper>
            <SignupButton
              type="submit"
              variant="outlined"
              className="signup_button"
              disabled={isLoading}
            >
              회원가입
            </SignupButton>
          </SignupButtonWrapper>
        </Form>
      </FormWrapper>
      <FlexGrowBox grow={2} />
    </ContentWrapper>
  );
}

export default SignupPage;
