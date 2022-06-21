import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PropTypes from 'prop-types';

function GoBack({ destination }) {
  const navigate = useNavigate();

  const handleClickBackIcon = useCallback(() => {
    if (destination) {
      navigate(`/${destination}`);
      return;
    }
    navigate(-1);
  }, [destination, navigate]);

  return <ArrowBackIosNewIcon onClick={handleClickBackIcon} />;
}

GoBack.propTypes = {
  destination: PropTypes.string,
};

GoBack.defaultProps = {
  destination: '',
};

export default GoBack;
