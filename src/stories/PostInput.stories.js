import PostInput from '@components/PostInput';

export default {
  title: 'Component/PostInput',
  component: PostInput,
  argTypes: {
    title: { control: 'text', defaultValue: '제목' },
    fieldSize: { control: 'text', defaultValue: 'normal' },
  },
};

export function Default(args) {
  return <PostInput {...args} />;
}
