import { maple, lol, lostark, overwatch, battleground } from '@assets/img';

export const CHANNELS = [
  {
    id: '62b2c99563a66405b814409e',
    name: '메이플스토리',
  },
  {
    id: '62b2c98063a66405b8144096',
    name: '리그오브레전드',
  },
  {
    id: '62b2c9a363a66405b81440a2',
    name: '배틀그라운드',
  },
  {
    id: '62b2c9a963a66405b81440a6',
    name: '로스트아크',
  },
  {
    id: '62b2c9ae63a66405b81440aa',
    name: '오버워치',
  },
];

export const CATEGORIES = {
  '62b2c99563a66405b814409e': '메이플스토리',
  '62b2c98063a66405b8144096': '리그오브레전드',
  '62b2c9a363a66405b81440a2': '배틀그라운드',
  '62b2c9a963a66405b81440a6': '로스트아크',
  '62b2c9ae63a66405b81440aa': '오버워치',
};

export const IMAGES = {
  '62b2c99563a66405b814409e': maple,
  '62b2c98063a66405b8144096': lol,
  '62b2c9a363a66405b81440a2': battleground,
  '62b2c9a963a66405b81440a6': lostark,
  '62b2c9ae63a66405b81440aa': overwatch,
};

export const NOT_FOUND_IMAGE =
  'https://images.unsplash.com/flagged/photo-1580234748052-2c23d8b27a71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjZ8fGdhbWV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60';

export const GAMEBU_TOKEN = 'GAMEBU_TOKEN';
export const CHANNEL_MODAL_VISIBLE = 'CHANNEL_MODAL_VISIBLE';

export const regexId = /[^0-9a-zA-Z]/g;
export const regexName = /[^0-9a-zA-Zㄱ-ㅎ가-힣]/g;

export const MAX_NAME_LENGTH = 10;
export const MAX_ID_LENGTH = 20;
export const MAX_PASSWORD_LENGTH = 20;
export const MIN_LENGTH = 4;
