import { authFetch } from '@utils/fetch';

const endpoints = {
  createLikes: 'likes/create',
  deleteLikes: 'likes/delete',
};

export const createLikes = (postId) => {
  return authFetch('likes/create', {
    method: 'POST',
    data: {
      postId,
    },
  });
};
export const deleteLikes = (likesId) => {
  return authFetch(endpoints.deleteLikes, {
    method: 'DELETE',
    data: {
      id: likesId,
    },
  });
};
