import TextInput from '@components/TextInput';

export default {
  title: 'Component/TextInput',
  component: TextInput,
  argTypes: {
    title: { control: 'text', defaultValue: '제목' },
    fieldSize: { control: 'text', defaultValue: 'normal' },
  },
};

export function Default(args) {
  return <TextInput {...args} />;
}
