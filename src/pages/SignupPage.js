import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import { COLOR_BG, COLOR_MAIN } from '@utils/color';
import useForm from '@hooks/useForm';
import { fetch } from '@utils/fetch';
import GoBack from '@components/GoBack';
import { regexId, regexName } from '@utils/constants';
import { useNavigate } from 'react-router-dom';

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

  & p {
    margin-left: 0;
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
  padding: 1.5rem;
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

const helperText = {
  id: '아이디를 입력하세요',
  name: '이름을 입력하세요',
  password: '비밀번호를 입력하세요',
  passwordConfirm: '비밀번호를 한번 더 입력해주세요',
};

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
      const { response } = await fetch('signup', {
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
      if (!id) newErrors.id = '아이디를 입력하지 않았습니다';
      const filteredId = id.replace(regexId, '');
      if (id !== filteredId)
        newErrors.id = '아이디에 사용할 수 없는 문자가 포함되어 있습니다';
      if (!name) newErrors.name = '이름을 입력하지 않았습니다';
      const filteredName = name.replace(regexName, '');
      if (name !== filteredName)
        newErrors.name = '이름에 사용할 수 없는 문자가 포함되어 있습니다';
      if (!password) newErrors.password = '비밀번호를 입력하지 않았습니다';
      if (!passwordConfirm)
        newErrors.passwordConfirm = '비밀번호를 한번 더 입력하지 않았습니다';
      if (password !== passwordConfirm)
        newErrors.passwordConfirm = '같은 비밀번호를 입력하지 않았습니다';
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
          <TextField
            placeholder={helperText.id}
            values={values.id}
            onChange={handleChange}
            helperText={errors.id || helperText.id}
            fullWidth
            name="id"
            error={Boolean(errors.id)}
          />
          <TextField
            placeholder={helperText.name}
            values={values.name}
            onChange={handleChange}
            helperText={errors.name || helperText.name}
            fullWidth
            name="name"
            error={Boolean(errors.name)}
          />
          <TextField
            placeholder={helperText.password}
            value={values.password}
            onChange={handleChange}
            helperText={errors.password || helperText.password}
            fullWidth
            name="password"
            type="password"
            autoComplete="on"
            error={Boolean(errors.password)}
          />
          <TextField
            placeholder={helperText.passwordConfirm}
            value={values.passwordConfirm}
            onChange={handleChange}
            helperText={errors.passwordConfirm || helperText.passwordConfirm}
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
