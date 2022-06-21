import React from 'react';
import styled from '@emotion/styled';
import { useSnackbar } from 'notistack';
import Button from '@mui/material/Button';
import useValueContext from './useValueContext';

const WhiteColorButton = styled(Button)`
  color: white;
`;

const useOurSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { ref } = useValueContext();

  const renderSnackbar = (message, isSuccess) =>
    enqueueSnackbar(message, {
      variant: isSuccess ? 'success' : 'warning',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
      action: (key) => (
        <WhiteColorButton onClick={() => ref.current.closeSnackbar(key)}>
          닫기
        </WhiteColorButton>
      ),
      autoHideDuration: 3000,
    });

  return renderSnackbar;
};

export default useOurSnackbar;
