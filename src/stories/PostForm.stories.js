import PostForm from '@components/PostForm';

export default {
  title: 'Component/PostForm',
  component: PostForm,
  argTypes: {},
};

export function Default(args) {
  return <PostForm {...args} />;
}
