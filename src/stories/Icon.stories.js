import Icon from '@components/Icon';

export default {
  title: 'Component/Icon',
  component: Icon,
  argTypes: {
    name: { defaultValue: 'box', control: 'text' },
    size: { defaultValue: 16, control: 'number' },
    strokeWidth: { defaultValue: 2, control: 'number' },
    color: { defaultValue: '#000', control: 'color' },
    rotate: { defaultValue: 0, control: { type: 'range', min: 0, max: 360 } },
  },
};

export function Default(args) {
  return <Icon {...args} />;
}
