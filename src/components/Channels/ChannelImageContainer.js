/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import styled from '@emotion/styled';
import Image from '@components/Image';
import { authFetch, fetch } from '@utils/fetch';
import axios from 'axios';

function ChannelImageContainer({ url }) {
  const testFullName = {
    id: 2,
    first: 'Ko',
    last: 'GwangFeel',
  };
  const form = new FormData();
  form.append(
    'title',
    JSON.stringify({
      dt: '칼바람 할래요',
      tg: ['칼바람', '초보환영'],
      dd: 'abcd <-- 친추주세영',
    })
  );
  form.append('image', null);
  form.append('channelId', '62a817a85517e27ffcab3cce');

  const DONG_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYyOWYwN2ZhN2UwMWFkMWNiNzI1MDEzMSIsImVtYWlsIjoiZG9uZ2VvbiJ9LCJpYXQiOjE2NTUxOTM5NTF9.GtiQO30CJg2VQQT4CCKOz3yZYjwzEw66aqlwe-ZC8GQ';

  const pushForm = async () => {
    const res = await authFetch('posts/create', {
      method: 'POST',
      'Content-Type': 'multipart/form-data',
      data: form,
    });
    console.log(res);
  };

  const checkPost = async () => {
    const res = await fetch('posts/62a974694f54343f5dea4d12');
    console.log(res);
    console.log(res.title);
    console.log(JSON.parse(res.title).dt);
  };

  // const test = async () => {
  //   const response = await fetch('search/all/feel');
  //   console.log('response[0]');
  //   console.log(response[0]);
  //   console.log('response[0].fullName');
  //   console.log(response[0].fullName);
  //   console.log('JSON.parse(response[0].fullName)');
  //   console.log(JSON.parse(response[0].fullName));
  // };

  useEffect(() => {
    // pushData();
    // pushForm();
    // checkPost();
    // test();
  }, []);

  // console.log(url);
  return (
    <Image
      width="100%"
      height="7.5rem"
      src={require(`${url}`)}
      mode="cover"
      block={false}
      lazy={false}
      threshold={0}
      placeholder=""
    />
  );
}

ChannelImageContainer.propTypes = {
  url: PropTypes.string.isRequired,
};

export default ChannelImageContainer;
