import React, { useState, useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate, Link } from 'react-router-dom';
import { COLOR_BG, COLOR_MAIN } from '@utils/color';
import useForm from '@hooks/useForm';
import { fetch } from '@utils/fetch';
import useCookieToken from '@hooks/useCookieToken';

const ContentWrapper = styled.div`
  padding: 1.5rem;
`;

const LoginHeader = styled.h1`
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

const LoginButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const LoginButton = styled(Button)`
  width: 8rem;
  color: black;
  background-color: white;
  border-color: ${COLOR_MAIN};
  &:hover {
    background-color: white;
    border-color: ${COLOR_MAIN};
  }
`;

const LoginWarningAlert = styled(Alert)`
  font-size: 0.75rem;
`;

const SignupLinkBox = styled(Box)`
  margin-top: 1rem;
  text-align: center;
`;

const SignupLink = styled(Link)`
  color: red;
  font-weight: bold;
  text-decoration: none;
`;

const helperText = {
  id: '아이디를 입력하세요',
  password: '비밀번호를 입력하세요',
};

function LoginPage() {
  const [warningAlertInfo, setWarningAlertInfo] = useState({
    visible: false,
    message: '',
  });

  const navigate = useNavigate();
  const { isLogin, setCookie } = useCookieToken();
  const { values, errors, isLoading, handleChange, handleSubmit } = useForm({
    initialValues: {
      id: '',
      password: '',
    },
    onSubmit: async () => {
      const response = await fetch('login', {
        method: 'POST',
        data: {
          email: values.id,
          password: values.password,
        },
      });

      const isError = Boolean(response?.response);
      if (isError) {
        if (response?.response?.status === 400) {
          setWarningAlertInfo({
            visible: true,
            message: '아이디 또는 비밀번호를 잘못 입력했습니다',
          });
        } else {
          setWarningAlertInfo({
            visible: true,
            message: '로그인 요청 중 오류가 발생했습니다',
          });
        }
        return;
      }

      setCookie(response.token);
      navigate('/');
    },
    validate: ({ id, password }) => {
      const newErrors = {};
      if (!id) newErrors.id = '아이디를 입력하지 않았습니다';
      if (!password) newErrors.password = '비밀번호를 입력하지 않았습니다';
      return newErrors;
    },
  });

  const handleClickAlert = useCallback(() => {
    setWarningAlertInfo((prevWarningAlertInfo) => ({
      ...prevWarningAlertInfo,
      visible: false,
    }));
  }, []);

  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, [isLogin, navigate]);

  return (
    <ContentWrapper>
      <Collapse in={warningAlertInfo.visible}>
        <LoginWarningAlert severity="warning" onClose={handleClickAlert}>
          {warningAlertInfo.message}
        </LoginWarningAlert>
      </Collapse>
      <LoginHeader>Login</LoginHeader>
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
          <LoginButtonWrapper>
            <LoginButton
              type="submit"
              variant="outlined"
              className="login_button"
              disabled={isLoading}
            >
              로그인
            </LoginButton>
          </LoginButtonWrapper>
        </Form>
      </FormWrapper>
      <SignupLinkBox>
        아이디 없으신가요?&nbsp;
        <SignupLink to="/signup">회원가입하기</SignupLink>
      </SignupLinkBox>
    </ContentWrapper>
  );
}

export default LoginPage;
