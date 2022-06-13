import Card from '@components/Card';

export default {
  title: 'Component/Card',
  component: Card,
};
const userObject = {
  role: 'Regular',
  emailVerified: false,
  banned: false,
  isOnline: false,
  posts: [],
  likes: [],
  comments: [],
  followers: [],
  following: [],
  notifications: [],
  messages: [],
  _id: '629f07fa7e01ad1cb7250131',
  fullName: 'KimDongEon { id : 1, first : Kim, last : DongEon }',
  email: 'dongeon',
  createdAt: '2022-06-07T08:10:34.258Z',
  updatedAt: '2022-06-08T08:09:54.007Z',
  __v: 0,
  username: 'eondongkim',
};
export function User() {
  return <Card.User>{userObject}</Card.User>;
}

const postObject = {
  likes: [],
  comments: [],
  _id: '629f12427e01ad1cb725019b',
  title: 'Kim',
  channel: '629f0c7c7e01ad1cb7250151',
  author: '629e29cc7e80a91c96fdf2d5',
  createdAt: '2022-06-07T08:54:26.956Z',
  updatedAt: '2022-06-07T08:54:26.956Z',
  __v: 0,
};

export function Post() {
  return <Card.Post>{postObject}</Card.Post>;
}
