import TagChip from '@components/TagChip';

export default {
  title: 'Component/TagChip',
  component: TagChip,
  argTypes: {
    label: { defaultValue: '파티', control: 'text' },
    size: { defaultValue: 'medium', control: 'text' },
  },
};

export function Default(args) {
  return <TagChip {...args} />;
}
