import Header from '../components/Header';

export default {
  title: 'Component/Header',
  component: Header,
  argTypes: {
    level: { control: { type: 'range', min: 1, max: 6 } },
    color: { control: 'color' },
    strong: { control: 'boolean' },
    underline: { control: 'boolean' },
  },
};

export function Default(args) {
  return <Header {...args}>Header</Header>;
}
