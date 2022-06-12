import React from 'react';
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { COLOR_BG, COLOR_MAIN } from '@utils/color';
import useForm from '@hooks/useForm';

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

const helperText = {
  id: '아이디를 입력하세요',
  password: '비밀번호를 입력하세요',
};

function LoginPage() {
  const { values, errors, isLoading, handleChange, handleSubmit } = useForm({
    initialValues: {
      id: '',
      password: '',
    },
    onSubmit: () => {
      // TODO 로그인 요청
      console.log(values);
    },
    validate: ({ id, password }) => {
      const newErrors = {};
      if (!id) newErrors.id = '아이디를 입력하지 않았습니다';
      if (!password) newErrors.password = '비밀번호를 입력하지 않았습니다';
      return newErrors;
    },
  });

  return (
    <ContentWrapper>
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
            >
              로그인
            </LoginButton>
          </LoginButtonWrapper>
        </Form>
      </FormWrapper>
    </ContentWrapper>
  );
}

export default LoginPage;
