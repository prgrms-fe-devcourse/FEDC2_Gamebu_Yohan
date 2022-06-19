import ClickAwayPopper from '@components/ClickAwayPopper';

export default {
  title: 'Component/ClickAwayPopper',
  component: ClickAwayPopper,
};

export function Default() {
  return (
    <ClickAwayPopper>
      <button type="button">POP</button>
      <div>hi</div>
      <div>this is</div>
      <div>POPPER!</div>
    </ClickAwayPopper>
  );
}
