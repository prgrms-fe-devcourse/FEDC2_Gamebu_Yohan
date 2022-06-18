import ShortTagList from '@components/TagChip/ShortTagList';

export default {
  title: 'Component/TagList',
  component: ShortTagList,
  argTypes: {
    list: {
      defaultValue: [
        '딜러',
        '파티',
        '듀오',
        'RPG',
        'FPS',
        '레이드',
        '탱커',
        '서폿',
      ],
      control: 'object',
    },
    simple: { defaultValue: false, control: 'boolean' },
    onDelete: { defaultValue: false, control: 'boolean' },
    wrap: {
      defaultValue: 'skip',
      control: 'inline-radio',
      options: ['wrap', 'skip'],
    },
    sx: {
      defaultValue: {
        width: 500,
        height: 100,
        border: '1px solid blue',
      },
    },
  },
};

export function Default(args) {
  return <ShortTagList {...args} />;
}

export function simple(args) {
  return <ShortTagList {...args} />;
}
