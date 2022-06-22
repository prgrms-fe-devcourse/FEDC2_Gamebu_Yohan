import { Card, ClickAwayListener, Fade, Popper } from '@mui/material';
import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const ContentWrapper = styled(Card)``;
const StyledPopper = styled(Popper)`
  z-index: 1001;
`;
function ClickAwayPopper({
  children,
  id,
  placement,
  popperProps,
  contentProps,
}) {
  const [pop, setPop] = useState(false);
  const popperRef = useRef(null);
  const handlePopperClick = useCallback(() => {
    setPop((previousState) => !previousState);
  }, []);
  const handlePopperClickAway = useCallback(() => {
    setPop(false);
  }, []);
  const handlePopperClose = useCallback(() => {
    setPop(false);
  });
  const [trigger, ...contents] = React.Children.toArray(children).filter(
    (item) => React.isValidElement(item)
  );
  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={handlePopperClickAway}
    >
      <div>
        {React.cloneElement(trigger, {
          ref: popperRef,
          'aria-describedby': id,
          onClick: handlePopperClick,
        })}
        <StyledPopper
          id={id}
          open={pop}
          anchorEl={popperRef.current}
          placement={placement}
          transition
          {...popperProps}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <ContentWrapper {...contentProps}>
                {contents.map((content) =>
                  React.cloneElement(content, { onClose: handlePopperClose })
                )}
              </ContentWrapper>
            </Fade>
          )}
        </StyledPopper>
      </div>
    </ClickAwayListener>
  );
}

ClickAwayPopper.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  placement: PropTypes.oneOf([
    'auto-end',
    'auto-start',
    'auto',
    'bottom-end',
    'bottom-start',
    'bottom',
    'left-end',
    'left-start',
    'left',
    'right-end',
    'right-start',
    'right',
    'top-end',
    'top-start',
    'top',
  ]),
  popperProps: PropTypes.object,
  contentProps: PropTypes.object,
};

ClickAwayPopper.defaultProps = {
  placement: 'bottom',
  popperProps: {},
  contentProps: {},
};
export default ClickAwayPopper;
