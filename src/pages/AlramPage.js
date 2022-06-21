import React from 'react';
import { authFetch } from '@utils/fetch';
import useCheckAuth from '@hooks/useCheckAuth';

function AlramPage() {
  useCheckAuth();
  const handleClickTest = async () => {
    const response = await authFetch('notifications');
    console.log(response);
  };

  return (
    <div>
      AlramPage
      <button type="button" onClick={handleClickTest}>
        test
      </button>
    </div>
  );
}

export default AlramPage;
