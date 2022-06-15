import React from 'react';
import PropTypes from 'prop-types';

function AvatarGroup({ children, shape, size, ...props }) {
  const avatars = React.Children.toArray(children)
    .filter((child) => {
      if (React.isValidElement(child) && child.props.__TYPE === 'Avatar') {
        return true;
      }
      return false;
    })
    .map((avatar, index, avatars) =>
      React.cloneElement(avatar, {
        ...avatar.props,
        size,
        shape,
        style: {
          ...avatar.props.style,
          marginLeft: -size / 5,
          zIndex: avatars.length - index,
        },
      })
    );
  return (
    <div {...props} style={{ paddingLeft: size / 5 }}>
      {avatars}
    </div>
  );
}

AvatarGroup.propTypes = {
  children: PropTypes.node.isRequired,
  shape: PropTypes.oneOf(['circle', 'round', 'square']),
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  props: PropTypes.object,
};

AvatarGroup.defaultProps = {
  shape: 'circle',
  size: 70,
  props: {},
};

export default AvatarGroup;
