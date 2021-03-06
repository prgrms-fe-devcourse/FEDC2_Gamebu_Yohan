import React, { useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { COLOR_BG, COLOR_MAIN, COLOR_SIGNATURE } from '@utils/color';
import useForm from '@hooks/useForm';
import GoBack from '@components/GoBack';
import {
  regexId,
  regexName,
  MAX_ID_LENGTH,
  MAX_NAME_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_LENGTH,
} from '@utils/constants';
import { useNavigate } from 'react-router-dom';
import { signupAPI } from '@utils/user';
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

function SignupPage() {
  const idRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const renderSnackbar = useOurSnackbar();
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
          renderSnackbar('?????? ???????????? ??????????????????');
        } else {
          renderSnackbar('????????????', false);
        }
        return;
      }
      renderSnackbar('????????????', true);
      navigate('/login');
    },
    validate: ({ id, name, password, passwordConfirm }) => {
      const newErrors = {};
      if (id.length < MIN_LENGTH) newErrors.id = '???????????? ?????? ????????????';
      if (!id) newErrors.id = '???????????? ???????????????';
      const filteredId = id.replace(regexId, '');
      if (id !== filteredId)
        newErrors.id = '???????????? ????????? ??? ?????? ????????? ???????????? ????????????';

      if (!name) newErrors.name = '????????? ???????????????';
      const filteredName = name.replace(regexName, '');
      if (name !== filteredName)
        newErrors.name = '????????? ????????? ??? ?????? ????????? ???????????? ????????????';

      if (password.length < MIN_LENGTH)
        newErrors.password = '??????????????? ?????? ????????????';
      if (!password) newErrors.password = '??????????????? ???????????????';
      if (!passwordConfirm)
        newErrors.passwordConfirm = '???????????? ????????? ???????????????';
      if (password !== passwordConfirm)
        newErrors.passwordConfirm =
          '??????????????? ???????????? ????????? ???????????? ????????????';
      return newErrors;
    },
  });

  useEffect(() => {
    idRef.current
      .querySelector('[name=id]')
      .setAttribute('maxlength', MAX_ID_LENGTH);
    nameRef.current
      .querySelector('[name=name]')
      .setAttribute('maxlength', MAX_NAME_LENGTH);
    passwordRef.current
      .querySelector('[name=password]')
      .setAttribute('maxlength', MAX_PASSWORD_LENGTH);
    passwordConfirmRef.current
      .querySelector('[name=passwordConfirm]')
      .setAttribute('maxlength', MAX_PASSWORD_LENGTH);
  }, []);

  return (
    <ContentWrapper>
      <GoBack />
      <FlexGrowBox grow={1} />
      <SignupHeader>????????????</SignupHeader>
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          <StyledTextField
            ref={idRef}
            label="?????????"
            values={values.id}
            onChange={handleChange}
            helperText={errors.id}
            fullWidth
            name="id"
            error={Boolean(errors.id)}
          />
          <StyledTextField
            ref={nameRef}
            label="??????"
            values={values.name}
            onChange={handleChange}
            helperText={errors.name}
            fullWidth
            name="name"
            error={Boolean(errors.name)}
          />
          <StyledTextField
            ref={passwordRef}
            label="????????????"
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
            ref={passwordConfirmRef}
            label="???????????? ??????"
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
              ????????????
            </SignupButton>
          </SignupButtonWrapper>
        </Form>
      </FormWrapper>
      <FlexGrowBox grow={2} />
    </ContentWrapper>
  );
}

export default SignupPage;
