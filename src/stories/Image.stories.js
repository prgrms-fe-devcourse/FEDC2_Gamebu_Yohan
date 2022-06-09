import Image from '../components/Image';

export default {
  title: 'Component/Image',
  component: Image,
  argTypes: {
    src: {
      name: 'src',
      type: { name: 'string', required: true },
      defaultValue: 'https://picsum.photos/200',
      control: { type: 'text' },
    },
    alt: {
      name: 'alt',
      control: 'text',
    },
    width: {
      defaultValue: 200,
      control: { type: 'range', min: 200, max: 600 },
    },
    height: {
      defaultValue: 200,
      control: { type: 'range', min: 200, max: 600 },
    },
    mode: {
      defaultValue: 'cover',
      options: ['cover', 'fill', 'contain'],
      control: { type: 'inline-radio' },
    },
    block: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    placeholder: {
      type: { name: 'string' },
      defaultValue: 'https://via.placeholder.com/200',
      control: { type: 'text' },
    },
    lazy: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    threshold: {
      type: { name: 'number' },
      control: { type: 'number' },
      defaultValue: 0.5,
    },
  },
};

export function Default(args) {
  return (
    <>
      <Image {...args} />
      <Image {...args} />
    </>
  );
}

export function Lazy(args) {
  const { src } = args;
  return (
    <>
      {Array.from(new Array(20), (_, k) => k).map((i) => (
        <Image {...args} lazy block src={`${src}?${i}`} key={i} />
      ))}
    </>
  );
}
