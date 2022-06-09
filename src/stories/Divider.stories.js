import Divider from '../components/Divider';

export default {
  title: 'Component/Divider',
  component: Divider,
};

export function Horizontal() {
  return (
    <>
      <span>item 1</span>
      <Divider type="horizontal" />
      <span>item 2</span>
    </>
  );
}

export function Vertical() {
  return (
    <>
      <span>item 1</span>
      <Divider type="vertical" />
      <span>item 2</span>
    </>
  );
}
