import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function GoBack() {
  const navigate = useNavigate();

  const handleClickBackIcon = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return <ArrowBackIosNewIcon onClick={handleClickBackIcon} />;
}

export default GoBack;
