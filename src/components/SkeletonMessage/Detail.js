import React from 'react';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import PropTypes from 'prop-types';

function Detail({ repeat }) {
  const repeatArr = Array.from({ length: repeat }, (_, index) => index);

  return (
    <Stack spacing={1}>
      {repeatArr.map((val) => (
        <Skeleton key={val} variant="rectangular" width="80%" height={38} />
      ))}
    </Stack>
  );
}

Detail.propTypes = {
  repeat: PropTypes.number,
};

Detail.defaultProps = {
  repeat: 3,
};

export default Detail;
