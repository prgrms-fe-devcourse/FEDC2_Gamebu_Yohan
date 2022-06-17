import TagChipGroup from '@components/TagChip/TagChipGroup';

export default {
  title: 'Component/TagChipGroup',
  component: TagChipGroup,
  argTypes: {
    list: { defaultValue: ['딜러', '힐러', 'RPG', '경쟁'], control: 'object' },
    simple: { defaultValue: false, control: 'boolean' },
    onDelete: { defaultvalue: false, control: 'boolean' },
    wrap: { control: 'inline-radio', options: ['wrap', 'skip'] },
    sx: {
      defaultValue: {
        width: 300,
        height: 100,
        border: '1px solid blue',
      },
    },
  },
};

export function Default(args) {
  return <TagChipGroup {...args} />;
}

export function simple(args) {
  return <TagChipGroup {...args} />;
}
