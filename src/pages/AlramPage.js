import React from 'react';
import { authFetch } from '@utils/fetch';

function AlramPage() {
  const handleClickTest = async () => {
    // const array = ['글1', '글2', '글3'];
    // const array = [];

    const response = await authFetch('settings/update-user', {
      method: 'PUT',
      data: {
        fullName: 'fullName222',
        username: JSON.stringify([]),
      },
    });

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
