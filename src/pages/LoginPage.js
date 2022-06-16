import React, { useState, useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { useNavigate, Link } from 'react-router-dom';
import { COLOR_BG, COLOR_MAIN } from '@utils/color';
import useForm from '@hooks/useForm';
import { fetch } from '@utils/fetch';
import useCookieToken from '@hooks/useCookieToken';
import useActionContext from '@hooks/useActionContext';
import useValueContext from '@hooks/useValueContext';
import GoBack from '@components/GoBack';

const ContentWrapper = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 3rem);
`;

const FlexGrowBox = styled.div`
  flex-grow: ${({ grow }) => grow};
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
  margin-top: 1rem;
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
  const { setCookie } = useCookieToken();
  const { login } = useActionContext();
  const { isLogin } = useValueContext();
  const { values, errors, isLoading, handleChange, handleSubmit } = useForm({
    initialValues: {
      id: '',
      password: '',
    },
    onSubmit: async () => {
      const { response, token, user } = await fetch('login', {
        method: 'POST',
        data: {
          email: values.id,
          password: values.password,
        },
      });

      const isError = Boolean(response);
      if (isError) {
        if (response?.status === 400) {
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

      setCookie(token);
      login(user);
    },
    validate: ({ id, password }) => {
      const newErrors = {};
      if (!id) newErrors.id = '아이디를 입력하지 않았습니다';
      const regexId = /[^0-9a-zA-Z]/g;
      const filteredId = id.replace(regexId, '');
      if (id !== filteredId)
        newErrors.id = '사용할 수 없는 문자가 포함되어 있습니다';
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
      <GoBack />
      <Collapse in={warningAlertInfo.visible}>
        <LoginWarningAlert severity="warning" onClose={handleClickAlert}>
          {warningAlertInfo.message}
        </LoginWarningAlert>
      </Collapse>
      <FlexGrowBox grow={1} />
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
      <FlexGrowBox grow={2} />
    </ContentWrapper>
  );
}

export default LoginPage;
