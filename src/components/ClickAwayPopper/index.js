import { ClickAwayListener, Fade, Popper } from '@mui/material';
import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const ContentWrapper = styled.div`
  box-sizing: border-box;
  padding: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
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
        <Popper
          id={id}
          open={pop}
          anchorEl={popperRef.current}
          placement={placement}
          transition
          {...popperProps}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              {contents.length > 1 ? (
                <ContentWrapper {...contentProps}>
                  {contents.map((content) => React.cloneElement(content))}
                </ContentWrapper>
              ) : (
                React.cloneElement(contents[0], contentProps)
              )}
            </Fade>
          )}
        </Popper>
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
