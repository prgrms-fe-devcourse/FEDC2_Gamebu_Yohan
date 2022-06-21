import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate, Link } from 'react-router-dom';
import { COLOR_BG, COLOR_MAIN, COLOR_SIGNATURE } from '@utils/color';
import useForm from '@hooks/useForm';
import useCookieToken from '@hooks/useCookieToken';
import useActionContext from '@hooks/useActionContext';
import useValueContext from '@hooks/useValueContext';
import GoBack from '@components/GoBack';
import { GAMEBU_TOKEN, regexId } from '@utils/constants';
import { loginAPI } from '@utils/user';
import useOurSnackbar from '@hooks/useOurSnackbar';

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
  border-radius: 0.5rem;
  background-color: ${COLOR_BG};
  color: ${COLOR_MAIN};

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

const StyledTextField = styled(TextField)`
  & .MuiInputLabel-root {
    color: ${COLOR_MAIN};
  }

  & .Mui-focused.MuiInputLabel-root {
    color: ${COLOR_SIGNATURE};
  }
`;
const Form = styled.form`
  padding: 1.5rem 1rem;
  & .MuiTextField-root {
    margin-bottom: 1.5rem;
  }
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

const SignupLinkBox = styled(Box)`
  margin-top: 1rem;
  text-align: center;
`;

const SignupLink = styled(Link)`
  color: red;
  font-weight: bold;
  text-decoration: none;
`;

function LoginPage() {
  const navigate = useNavigate();
  const [, setToken] = useCookieToken(GAMEBU_TOKEN);
  const { login } = useActionContext();
  const { isLogin } = useValueContext();
  const renderSnackbar = useOurSnackbar();
  const { values, errors, isLoading, handleChange, handleSubmit } = useForm({
    initialValues: {
      id: '',
      password: '',
    },
    onSubmit: async () => {
      const { response, token, user } = await loginAPI({
        method: 'POST',
        data: {
          email: values.id,
          password: values.password,
        },
      });

      const isError = Boolean(response);
      if (isError) {
        if (response?.status === 400) {
          renderSnackbar('아이디나 비밀번호가 다릅니다');
        } else {
          renderSnackbar('로그인', false);
        }
        return;
      }

      setToken(token);
      renderSnackbar('로그인', true);
      login(user);
    },
    validate: ({ id, password }) => {
      const newErrors = {};
      if (!id) newErrors.id = '아이디를 입력하세요';
      const filteredId = id.replace(regexId, '');
      if (id !== filteredId)
        newErrors.id = '사용할 수 없는 문자가 포함되어 있습니다';
      if (!password) newErrors.password = '비밀번호를 입력하세요';
      return newErrors;
    },
  });

  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, [isLogin, navigate]);

  return (
    <ContentWrapper>
      <GoBack />
      <FlexGrowBox grow={1} />
      <LoginHeader>Login</LoginHeader>
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
